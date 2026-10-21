import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { AlertCircle, ArrowUpRight, CheckCircle2, Loader2, Send } from 'lucide-react'
import { SITE, SOCIAL_LINKS } from '../config/site'
import { SocialIcon } from './Icons'
import { Reveal } from './Reveal'

interface FormValues {
  name: string
  email: string
  subject: string
  message: string
}
type FormErrors = Partial<Record<keyof FormValues, string>>
type Status = 'idle' | 'preparing' | 'opened'

const EMPTY: FormValues = { name: '', email: '', subject: '', message: '' }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(v: FormValues): FormErrors {
  const e: FormErrors = {}
  if (v.name.trim().length < 2) e.name = 'Please enter your full name (at least 2 characters).'
  if (!v.email.trim()) e.email = 'Please enter your email address.'
  else if (!EMAIL_RE.test(v.email.trim())) e.email = 'That email address does not look right.'
  if (v.subject.trim().length < 3) e.subject = 'Please add a subject (at least 3 characters).'
  if (v.message.trim().length < 10) e.message = 'Your message should be at least 10 characters.'
  return e
}

/**
 * No backend or email service is configured, so this form does NOT send
 * anything by itself. After validation it opens the visitor's email app with
 * the message pre-filled (mailto). To send directly from the site, connect a
 * service (e.g. Formspree, EmailJS or your own API) inside `handleSubmit`.
 */
export function Contact() {
  const [values, setValues] = useState<FormValues>(EMPTY)
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({})
  const [status, setStatus] = useState<Status>('idle')

  const update =
    (field: keyof FormValues) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const next = { ...values, [field]: e.target.value }
      setValues(next)
      if (touched[field]) setErrors(validate(next))
      if (status !== 'idle') setStatus('idle')
    }

  const blur = (field: keyof FormValues) => () => {
    setTouched((t) => ({ ...t, [field]: true }))
    setErrors(validate(values))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    setTouched({ name: true, email: true, subject: true, message: true })
    if (Object.keys(found).length > 0) {
      const firstKey = (Object.keys(found) as (keyof FormValues)[])[0]
      document.getElementById(`contact-${firstKey}`)?.focus()
      return
    }

    setStatus('preparing')
    const body = `${values.message.trim()}\n\n— ${values.name.trim()} (${values.email.trim()})`
    const href = `mailto:${SITE.email}?subject=${encodeURIComponent(
      values.subject.trim(),
    )}&body=${encodeURIComponent(body)}`

    window.setTimeout(() => {
      window.location.href = href
      setStatus('opened')
    }, 350)
  }

  const field = (key: keyof FormValues) => ({
    id: `contact-${key}`,
    value: values[key],
    onChange: update(key),
    onBlur: blur(key),
    'aria-invalid': errors[key] ? (true as const) : undefined,
    'aria-describedby': errors[key] ? `contact-${key}-error` : undefined,
  })

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="container">
        <Reveal>
          <p className="eyebrow mono">/ 06 — Contact</p>
          <h2 id="contact-title" className="section__title section__title--xl">
            Have an Idea? <span className="gradient-text">Let&apos;s Build Something Great.</span>
          </h2>
          <p className="section__sub">
            I&apos;m always interested in connecting with developers, discussing ideas, and
            exploring interesting projects.
          </p>
        </Reveal>

        <div className="contact__layout">
          <ul className="contact__cards">
            {SOCIAL_LINKS.map((s, i) => (
              <li key={s.id}>
                <Reveal delay={0.06 * i} className="card-wrap">
                  <a
                    className="card contact-card"
                    href={s.href}
                    {...(s.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    aria-label={`${s.label}: ${s.handle}${s.external ? ' (opens in a new tab)' : ''}`}
                  >
                    <span className="contact-card__icon">
                      <SocialIcon id={s.id} size={20} />
                    </span>
                    <span className="contact-card__text">
                      <strong>{s.label}</strong>
                      <span className="muted">{s.handle}</span>
                    </span>
                    <ArrowUpRight size={18} aria-hidden="true" className="contact-card__arrow" />
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal delay={0.1} className="card-wrap">
            <form className="card form" onSubmit={handleSubmit} noValidate>
              <div className="form__row">
                <div className="field">
                  <label htmlFor="contact-name">Full name</label>
                  <input type="text" autoComplete="name" {...field('name')} />
                  {errors.name && (
                    <p id="contact-name-error" className="field__error" role="alert">
                      <AlertCircle size={14} aria-hidden="true" /> {errors.name}
                    </p>
                  )}
                </div>
                <div className="field">
                  <label htmlFor="contact-email">Email address</label>
                  <input type="email" autoComplete="email" {...field('email')} />
                  {errors.email && (
                    <p id="contact-email-error" className="field__error" role="alert">
                      <AlertCircle size={14} aria-hidden="true" /> {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="field">
                <label htmlFor="contact-subject">Subject</label>
                <input type="text" {...field('subject')} />
                {errors.subject && (
                  <p id="contact-subject-error" className="field__error" role="alert">
                    <AlertCircle size={14} aria-hidden="true" /> {errors.subject}
                  </p>
                )}
              </div>

              <div className="field">
                <label htmlFor="contact-message">Message</label>
                <textarea rows={5} {...field('message')} />
                {errors.message && (
                  <p id="contact-message-error" className="field__error" role="alert">
                    <AlertCircle size={14} aria-hidden="true" /> {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="btn btn--primary btn--block"
                disabled={status === 'preparing'}
              >
                {status === 'preparing' ? (
                  <>
                    <Loader2 size={18} className="spin" aria-hidden="true" /> Opening your email app…
                  </>
                ) : (
                  <>
                    Send via email app <Send size={16} aria-hidden="true" />
                  </>
                )}
              </button>

              <p className="form__note muted">
                This form doesn&apos;t send messages on its own. It opens your email app with
                everything filled in — your message is only sent when you press send there.
              </p>

              <div role="status" aria-live="polite">
                {status === 'opened' && (
                  <p className="form__status">
                    <CheckCircle2 size={16} aria-hidden="true" /> Your email app should have opened.
                    If nothing happened, write to{' '}
                    <a href={`mailto:${SITE.email}`}>{SITE.email}</a> directly.
                  </p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
