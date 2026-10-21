import { useCallback, useEffect, useState } from 'react'
import { ArrowUpRight, GitFork, MapPin, RefreshCw, Star } from 'lucide-react'
import { SITE, getSocial } from '../config/site'
import type { GitHubRepo, GitHubUser } from '../types'
import { GitHubIcon } from './Icons'
import { Reveal } from './Reveal'

type State =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready'; user: GitHubUser; repos: GitHubRepo[] }

const API = 'https://api.github.com'

async function getJson<T>(url: string, signal: AbortSignal): Promise<T> {
  const res = await fetch(url, {
    signal,
    headers: { Accept: 'application/vnd.github+json' },
  })
  if (res.status === 403 || res.status === 429) {
    throw new Error('GitHub rate limit reached. Please try again in a little while.')
  }
  if (res.status === 404) throw new Error('GitHub profile not found.')
  if (!res.ok) throw new Error(`GitHub responded with an error (${res.status}).`)
  return (await res.json()) as T
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

export function GitHubActivity() {
  const [state, setState] = useState<State>({ status: 'loading' })
  const [attempt, setAttempt] = useState(0)
  const github = getSocial('github')

  useEffect(() => {
    const controller = new AbortController()
    setState({ status: 'loading' })

    Promise.all([
      getJson<GitHubUser>(`${API}/users/${SITE.githubUser}`, controller.signal),
      getJson<GitHubRepo[]>(
        `${API}/users/${SITE.githubUser}/repos?sort=updated&per_page=6&type=owner`,
        controller.signal,
      ),
    ])
      .then(([user, repos]) => setState({ status: 'ready', user, repos }))
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === 'AbortError') return
        const message =
          err instanceof Error ? err.message : 'Could not load GitHub data right now.'
        setState({ status: 'error', message })
      })

    return () => controller.abort()
  }, [attempt])

  const retry = useCallback(() => setAttempt((a) => a + 1), [])

  return (
    <section id="github" className="section" aria-labelledby="github-title">
      <div className="container">
        <Reveal>
          <p className="eyebrow mono">/ 05 — Open source</p>
          <h2 id="github-title" className="section__title">
            On GitHub
          </h2>
          <p className="section__sub">
            Live data from the public GitHub API — only real numbers, nothing invented.
          </p>
        </Reveal>

        {state.status === 'loading' && (
          <div className="gh__grid" aria-busy="true" aria-live="polite">
            <div className="card skeleton gh__profile" />
            <div className="gh__repos">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="card skeleton gh__repo" />
              ))}
            </div>
          </div>
        )}

        {state.status === 'error' && (
          <div className="card gh__error" role="alert">
            <p>{state.message}</p>
            <div className="gh__error-actions">
              <button type="button" className="btn btn--ghost btn--sm" onClick={retry}>
                <RefreshCw size={15} aria-hidden="true" /> Try again
              </button>
              <a
                className="btn btn--primary btn--sm"
                href={github.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open GitHub profile <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
          </div>
        )}

        {state.status === 'ready' && (
          <div className="gh__grid">
            <Reveal className="card-wrap">
              <article className="card gh__profile">
                <img
                  className="gh__avatar"
                  src={`${state.user.avatar_url}&s=160`}
                  alt={`${state.user.name ?? state.user.login} on GitHub`}
                  width={80}
                  height={80}
                  loading="lazy"
                  decoding="async"
                />
                <h3>{state.user.name ?? state.user.login}</h3>
                <p className="mono muted">@{state.user.login}</p>
                {state.user.bio && <p className="muted">{state.user.bio}</p>}
                {state.user.location && (
                  <p className="gh__loc muted">
                    <MapPin size={14} aria-hidden="true" /> {state.user.location}
                  </p>
                )}
                <dl className="gh__stats">
                  <div>
                    <dt>Repositories</dt>
                    <dd>{state.user.public_repos}</dd>
                  </div>
                  <div>
                    <dt>Followers</dt>
                    <dd>{state.user.followers}</dd>
                  </div>
                  <div>
                    <dt>Following</dt>
                    <dd>{state.user.following}</dd>
                  </div>
                </dl>
                <a
                  className="btn btn--primary btn--block"
                  href={state.user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitHubIcon size={16} /> View all repositories
                </a>
              </article>
            </Reveal>

            <div className="gh__repos">
              {state.repos.length === 0 && (
                <div className="card empty">
                  <p>No public repositories to show yet.</p>
                </div>
              )}
              {state.repos.map((repo, i) => (
                <Reveal key={repo.id} delay={0.05 * i} className="card-wrap">
                  <a
                    className="card gh__repo"
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="gh__repo-head">
                      <h3 className="mono">{repo.name}</h3>
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </div>
                    <p className="muted">{repo.description ?? 'No description provided.'}</p>
                    <div className="gh__meta">
                      {repo.language && <span className="tag">{repo.language}</span>}
                      <span className="gh__metric" title="Stars">
                        <Star size={14} aria-hidden="true" /> {repo.stargazers_count}
                        <span className="sr-only"> stars</span>
                      </span>
                      <span className="gh__metric" title="Forks">
                        <GitFork size={14} aria-hidden="true" /> {repo.forks_count}
                        <span className="sr-only"> forks</span>
                      </span>
                      <span className="muted gh__date">Updated {formatDate(repo.updated_at)}</span>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
