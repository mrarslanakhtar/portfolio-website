import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeader from '@/components/SectionHeader'

gsap.registerPlugin(ScrollTrigger)

const MEDIUM_URL = 'https://medium.com/@mrarslanakhtar'
const FEED_URL = 'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@mrarslanakhtar'

interface Article {
  title: string
  link: string
  pubDate: string
  categories: string[]
  excerpt: string
  readingTime: number
}

// Shape of the rss2json response we consume (only the fields we read).
interface Rss2JsonItem {
  title?: string
  link?: string
  pubDate?: string
  content?: string
  description?: string
  categories?: string[]
}
interface Rss2JsonResponse {
  status?: string
  items?: Rss2JsonItem[]
}

type FeedState = 'loading' | 'ready' | 'fallback'

function formatDate(value: string) {
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function WritingSection() {
  const [state, setState] = useState<FeedState>('loading')
  const [articles, setArticles] = useState<Article[]>([])
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const controller = new AbortController()

    fetch(FEED_URL, { signal: controller.signal })
      .then((res) => (res.ok ? (res.json() as Promise<Rss2JsonResponse>) : Promise.reject(new Error('bad status'))))
      .then((data) => {
        const items = data.status === 'ok' ? data.items ?? [] : []
        const parsed: Article[] = items.slice(0, 6).map((item) => {
          const raw = (item.content || item.description || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
          return {
            title: item.title ?? 'Untitled',
            link: item.link ?? MEDIUM_URL,
            pubDate: item.pubDate ?? '',
            categories: item.categories ?? [],
            excerpt: raw ? raw.slice(0, 150).trimEnd() + '…' : '',
            readingTime: Math.max(1, Math.ceil((raw.split(' ').length || 1) / 200)),
          }
        })
        if (parsed.length > 0) {
          setArticles(parsed)
          setState('ready')
        } else {
          setState('fallback')
        }
      })
      .catch((err) => {
        if (controller.signal.aborted) return
        console.warn('Medium feed unavailable, showing fallback:', err)
        setState('fallback')
      })

    return () => controller.abort()
  }, [])

  // Reveal cards once they exist; scoped to a gsap context for clean teardown.
  useEffect(() => {
    if (state !== 'ready' || !gridRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.article-card', {
        opacity: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 82%' },
      })
    }, gridRef)
    return () => ctx.revert()
  }, [state])

  return (
    <section id="writing" className="section bg-graphite-deep">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            index="06"
            label="Writing"
            title="Notes from the research."
            lede="Published breakdowns of SSO, IAM, and access-control failure modes — pulled live from Medium."
          />
          <a href={MEDIUM_URL} target="_blank" rel="noopener noreferrer" className="link-underline font-mono text-[12px] tracking-wide pb-2">
            All essays <span aria-hidden="true">↗</span>
          </a>
        </div>

        {state === 'loading' && (
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="card p-6 h-52 animate-pulse opacity-40" aria-hidden="true" />
            ))}
            <span className="sr-only">Loading latest essays…</span>
          </div>
        )}

        {state === 'ready' && (
          <div ref={gridRef} className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {articles.map((a) => (
              <a
                key={a.link}
                href={a.link}
                target="_blank"
                rel="noopener noreferrer"
                className="article-card card card-hover p-6 flex flex-col group"
              >
                <div className="flex items-center gap-2 data-label">
                  <span>Medium</span>
                  {a.pubDate && <span className="text-stone-muted/60">· {formatDate(a.pubDate)}</span>}
                </div>
                <h3 className="mt-4 font-display text-xl text-cream leading-snug group-hover:text-cyan transition-colors line-clamp-3">
                  {a.title}
                </h3>
                {a.excerpt && <p className="body-text mt-3 !text-[0.92rem] line-clamp-3 flex-1">{a.excerpt}</p>}
                <div className="mt-5 pt-4 border-t border-[var(--hairline)] font-mono text-[11px] tracking-wide text-stone-muted">
                  {a.readingTime} min read
                </div>
              </a>
            ))}
          </div>
        )}

        {state === 'fallback' && (
          <div className="mt-14 card p-8 md:p-10 flex flex-col items-start gap-5 max-w-2xl">
            <p className="body-text">
              The live Medium feed couldn't be reached right now. The essays are still published — read them directly on
              Medium, where the SSO and access-control write-ups live.
            </p>
            <a href={MEDIUM_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              Read on Medium <span aria-hidden="true">↗</span>
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
