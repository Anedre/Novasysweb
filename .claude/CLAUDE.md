# Novasys frontend context

## Project identity
- Corporate/marketing site for **Novasys del Perú**.
- Stack: **React 18 + Vite + JSX + React Router + react-helmet-async + framer-motion**.
- Content is **Spanish-first** and aimed at **B2B / enterprise** buyers in Peru and LatAm.
- Main business lines currently surfaced in the UI: **Software Empresarial**, **Infraestructura HP/HPE**, and **Cloud AWS**.

## Architecture snapshot
- This is a **mixed codebase**:
  - **v3 / modern pattern**: `src/pages`, `src/components/sections`, `src/design-system`, `src/data`
  - **legacy but still active**: `src/components/Soluciones*`, `src/components/Soluciones-Amazon*`, `src/components/Soluciones-HP*`
- Route source of truth: `src/router.jsx`
- Global shell: `src/App.jsx` + `src/AppLayout.jsx`
- Theme source of truth: `src/context/ThemeContext.jsx`
- Canonical link management: `src/hooks/Canonical.jsx`

## Preferred pattern for new work
- For **new pages/routes**, prefer:
  - route component in `src/pages`
  - reusable sections in `src/components/sections`
  - primitives from `src/design-system`
  - **CSS Modules** for new page/section styles
- Prefer **data-driven content** in `src/data/*.js` when the content is repeated, card-based, or shared across pages.
- For page-level SEO, use `Helmet` or `SEOHead`.

## Legacy code rules
- Do **not** migrate legacy screens to v3 unless the task explicitly asks for modernization.
- For files under `src/components/Soluciones*`, keep the existing structure, class naming, and plain CSS approach unless the task is a migration.
- Respect old theme behavior on legacy screens: some pages still rely on `body.night` / `body.day`.
- When editing legacy pages, avoid accidental visual rewrites outside the requested scope.

## Routing and navigation rules
- `src/router.jsx` mixes new pages, legacy screens, and **legacy redirects**.
- Preserve existing public URLs and redirects unless the task explicitly approves route changes.
- If you add or rename a route, check whether `Header`, `Footer`, or `src/data/*` also need updates.
- Do not casually remove legacy redirect entries; old links may still depend on them.

## SEO and content rules
- Keep copy in **Spanish** unless the user asks otherwise.
- Tone: **credible, consultative, enterprise**, not hype-heavy.
- Do not invent certifications, KPIs, client wins, or backend capabilities.
- If you add or significantly reposition a page, include a meaningful `<title>` and meta description.
- Keep partner positioning consistent with the current site: **AWS, HP/HPE, Oracle**.
- The contact form is currently a **frontend stub**; do not imply a live backend integration unless it is explicitly implemented.

## Theme and UI rules
- New v3 UI uses tokens from `src/design-system/tokens.css`.
- New theme system uses `[data-theme="dark"]`, but some legacy code still depends on `body.night`.
- Reuse design-system primitives before creating new ad-hoc wrappers:
  - `Button`
  - `Section`
  - `Container`
  - `SectionHeader`
  - `Card`
  - `Stat`
  - `LazyImage`

## High-signal folders
- `src/pages` — route-level v3 pages
- `src/components/sections` — reusable landing sections
- `src/design-system` — preferred UI primitives and tokens
- `src/data` — services, solutions, cases, stats, partners
- `src/components/layout` — shell, header, footer
- `src/scripts/Mapa` — Mapbox-based maps; requires `VITE_MAPBOX_TOKEN`
- `src/components/Soluciones*` — legacy pages still in production
- `vite.config.js` — build chunking and optimization strategy

## Commands
- Dev server: `npm run dev`
- Production build: `npm run build`
- Lint: `npm run lint`
- Preview build: `npm run preview`

## Validation expectations
- Prefer **targeted validation first**:
  - inspect imports, routes, data dependencies, and SEO impact
  - lint touched JS/JSX files when practical
  - use a full build only when the change justifies it
- Current repo caveats:
  - `npm run lint` has a **large pre-existing backlog**; do not assume every reported issue came from the current change.
  - In this environment `npm run build` can fail if Rollup optional native deps are missing (`@rollup/rollup-linux-x64-gnu`). Reinstall dependencies before treating that as an app bug.
- If a change touches routing, SEO, shared data, or navigation, mention that impact clearly in the final summary.

## Avoid
- Do not hand-edit `dist/`, `node_modules/`, or Amplify generated artifacts.
- Do not introduce TypeScript unless the task explicitly asks for it.
- Do not add a new global state library for simple page work.
- Do not duplicate content that already belongs in `src/data/*`.

## Useful file references
- `src/main.jsx`
- `src/App.jsx`
- `src/AppLayout.jsx`
- `src/router.jsx`
- `src/context/ThemeContext.jsx`
- `src/design-system/index.js`
- `src/components/ui/SEOHead/SEOHead.jsx`
- `src/data/services.js`
- `src/data/solutions.js`
- `src/data/cases.js`
- `src/components/Soluciones/Ventas/Ventas.jsx`
