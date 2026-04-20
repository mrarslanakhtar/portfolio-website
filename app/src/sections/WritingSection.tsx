import { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollRevealText from '@/components/ScrollRevealText'

gsap.registerPlugin(ScrollTrigger)

interface Article {
  title: string;
  pubDate: string;
  link: string;
  thumbnail: string;
  categories: string[];
  excerpt: string;
  readingTime: number;
}

export default function WritingSection() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@mrarslanakhtar')
      .then(res => res.json())
      .then(data => {
        if (data.items) {
          const parsedArticles = data.items.slice(0, 6).map((item: any) => {
            let thumb = item.thumbnail;
            const contentStr = item.content || item.description || '';
            if (!thumb) {
              const match = contentStr.match(/<img[^>]+src="([^">]+)"/);
              if (match) thumb = match[1];
            }
            
            // Clean HTML for excerpt
            let rawText = contentStr.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
            const excerpt = rawText.substring(0, 160) + '...';
            const readingTime = Math.max(1, Math.ceil(rawText.split(' ').length / 200));

            return {
              ...item,
              thumbnail: thumb,
              excerpt,
              readingTime
            }
          });
          setArticles(parsedArticles)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching Medium feed:', err)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (loading || articles.length === 0 || !cardsRef.current) return

    const cards = cardsRef.current.querySelectorAll('.article-card')
    gsap.fromTo(cards, 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 80%'
        }
      }
    )
  }, [loading, articles])

  return (
    <section id="writing" className="relative py-[120px] bg-navy-deep">
      <div className="absolute inset-0 decorative-grid-faint pointer-events-none" />

      <div className="relative w-full mx-auto px-6 md:px-12 lg:px-20 xl:px-32">
        <div className="text-left mb-8">
          <ScrollRevealText mode="chars" as="h2" className="section-heading">
            WRITING & PUBLICATIONS
          </ScrollRevealText>
        </div>

        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-10">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-cyan animate-pulse shadow-[0_0_8px_var(--cyan)]" />
            <span className="font-mono text-[11px] font-bold tracking-[0.15em] text-cyan uppercase">
              [ LIVE // medium.com/@mrarslanakhtar ]
            </span>
          </div>
          <a href="https://medium.com/@mrarslanakhtar" target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] tracking-[0.1em] text-stone-muted hover:text-cyan transition-colors uppercase flex items-center gap-2 group">
            VIEW ALL 
            <span className="group-hover:translate-x-1 transition-transform">↗</span>
          </a>
        </div>

        {loading ? (
          <div className="flex justify-center text-cyan py-10 font-mono text-sm uppercase tracking-widest animate-pulse">
            [ FETCHING LIVE INTEL... ]
          </div>
        ) : (
          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, i) => (
              <a 
                key={i}
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="article-card group flex flex-col bg-[#080b13]/80 border border-white/5 backdrop-blur-xl rounded-2xl p-0 overflow-hidden hover:-translate-y-2 hover:border-cyan/30 hover:shadow-[0_0_30px_rgba(0,229,255,0.15)] transition-all duration-300 opacity-0"
              >
                <div className="relative w-full h-48 bg-navy-deep overflow-hidden">
                  <div className="absolute top-3 left-3 bg-[#080b13]/80 backdrop-blur-md text-cyan text-[9px] font-mono font-bold tracking-widest uppercase px-2.5 py-1 rounded border border-cyan/20 z-10">
                    MEDIUM
                  </div>
                  {article.thumbnail ? (
                    <img 
                      src={article.thumbnail} 
                      alt={article.title}
                      className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-cyan/20 border-b border-white/5 font-mono text-xs">
                       [ NO IMAGE ]
                    </div>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-heading font-bold text-[17px] leading-snug text-cream mb-3 group-hover:text-cyan transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  
                  <p className="text-stone-muted text-[13px] leading-relaxed line-clamp-3 mb-6 flex-1">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-[10px] font-mono text-stone-muted/70 mb-5">
                    <div className="flex items-center gap-1.5">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      {new Date(article.pubDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase()}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {article.readingTime} MIN
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {article.categories && article.categories.slice(0, 3).map((cat, idx) => (
                      <span key={idx} className="font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-cyan bg-cyan/5 border border-cyan/10 px-2 py-1 rounded-full">
                        {cat.replace(/-/g, ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
