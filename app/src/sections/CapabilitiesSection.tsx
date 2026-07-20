import ScrollRevealText from '@/components/ScrollRevealText'
import SectionHeader from '@/components/SectionHeader'

type Capability = { title: string; items: string[] }

const capabilities: Capability[] = [
  {
    title: 'Identity & federation',
    items: ['SAML / OIDC federation', 'IdP ↔ SP trust configuration', 'SCIM provisioning surfaces', 'Session federation & handoff'],
  },
  {
    title: 'SSO trust chains',
    items: ['Assertion & signature validation', 'Redirect / callback handling', 'Token audience & binding', 'Cross-domain SSO bridges'],
  },
  {
    title: 'Broken access control',
    items: ['IDOR & object-reference abuse', 'Cross-tenant isolation', 'Privilege escalation paths', 'Authorization-logic review'],
  },
  {
    title: 'OAuth · SAML · JWT',
    items: ['Grant & flow abuse', 'PKCE and redirect_uri validation', 'JWT algorithm & claims handling', 'SAML signature-wrapping'],
  },
  {
    title: 'Methodology',
    items: ['Manual authentication-flow analysis', 'Adversarial threat modeling', 'Reproducible detection patterns', 'Executive-grade reporting'],
  },
  {
    title: 'Framework alignment',
    items: ['OWASP ASVS', 'OWASP API Security Top 10', 'CWE classification', 'Risk-to-remediation mapping'],
  },
]

export default function CapabilitiesSection() {
  return (
    <section id="capabilities" className="section bg-graphite-deep">
      <div className="shell">
        <SectionHeader
          index="04"
          label="Capabilities"
          title="The surface I actually work across."
          lede="Not a set of progress bars — the concrete territory of identity, access control, and the trust plumbing underneath enterprise SSO."
        />

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--hairline)] border border-[var(--hairline)] rounded-lg overflow-hidden">
          {capabilities.map((cap, i) => (
            <ScrollRevealText key={cap.title} mode="line" delay={(i % 3) * 0.05}>
              <div className="h-full bg-graphite p-7 lg:p-8">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-brass text-[12px] tracking-widest">0{i + 1}</span>
                  <h3 className="section-title-sm">{cap.title}</h3>
                </div>
                <ul className="mt-5 space-y-2.5">
                  {cap.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-stone-muted text-[0.95rem] leading-relaxed">
                      <span aria-hidden="true" className="mt-2 h-1 w-1 rounded-full bg-cyan/60 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollRevealText>
          ))}
        </div>
      </div>
    </section>
  )
}
