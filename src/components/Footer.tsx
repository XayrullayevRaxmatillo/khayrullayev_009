import { ArrowUp } from 'lucide-react'
import { SITE, SOCIAL_LINKS } from '../config/site'
import { SocialIcon } from './Icons'

export function Footer() {
  const year = new Date().getFullYear()

  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="logo__mark">RH</span>
          <div>
            <p className="footer__name">{SITE.name}</p>
            <p className="muted footer__tag">{SITE.tagline}</p>
          </div>
        </div>

        <ul className="footer__social" aria-label="Social links">
          {SOCIAL_LINKS.map((s) => (
            <li key={s.id}>
              <a
                className="icon-btn tooltip"
                href={s.href}
                {...(s.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                aria-label={`${s.label}${s.external ? ' (opens in a new tab)' : ''}`}
                data-tip={s.label}
              >
                <SocialIcon id={s.id} size={18} />
              </a>
            </li>
          ))}
        </ul>

        <button type="button" className="btn btn--ghost btn--sm" onClick={toTop}>
          Back to top <ArrowUp size={15} aria-hidden="true" />
        </button>
      </div>
      <div className="container footer__legal muted">
        <p>
          © {year} {SITE.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
