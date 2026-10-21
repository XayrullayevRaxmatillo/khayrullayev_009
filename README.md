# Rahmatilloh Xayrullayev — Portfolio

React + TypeScript + Vite + Framer Motion. Plain CSS (no Tailwind), Lucide icons.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview
```

## Where to edit things

| What                          | File                      |
| ----------------------------- | ------------------------- |
| Name, email, social links     | `src/config/site.ts`      |
| Projects (add / edit)         | `src/config/projects.ts`  |
| Tech stack                    | `src/config/skills.ts`    |
| Journey timeline              | `src/config/journey.ts`   |
| Colours / theme tokens        | top of `src/index.css`    |

### Adding a project
Add an object to `PROJECTS`. Set `repoUrl` / `demoUrl` **only** when real public URLs exist;
otherwise the card shows "Demo coming soon". Put a real screenshot in `public/projects/` and
set `screenshot: '/projects/name.webp'` — until then a generic wireframe is shown.

### Contact form
No email service is configured, so the form validates and then opens the visitor's email app
(`mailto:`). To send directly, plug Formspree / EmailJS / your own API into `handleSubmit`
in `src/components/Contact.tsx`.

### GitHub section
Reads the public GitHub REST API (no token, no secrets). Rate limits and errors are handled
with a retry button.

## Deploy (Vercel)
Import the repo; framework preset **Vite**. `vercel.json` rewrites every path to `index.html`
so the custom 404 page is shown for unknown URLs.
