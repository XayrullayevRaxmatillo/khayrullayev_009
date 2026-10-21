import { ArrowLeft } from 'lucide-react'

export function NotFound() {
  return (
    <main className="notfound">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__grid" />
        <div className="hero__orb hero__orb--v" />
      </div>
      <div className="notfound__inner">
        <p className="mono eyebrow">ERROR · 404</p>
        <h1 className="notfound__code gradient-text">404</h1>
        <p className="lead">This page doesn&apos;t exist — maybe the link is old, or mistyped.</p>
        <a href="/" className="btn btn--primary">
          <ArrowLeft size={18} aria-hidden="true" /> Back to the portfolio
        </a>
      </div>
    </main>
  )
}
