# valentines

A retro pixel-art history of our events, built with React + Vite. The main screen is a "pick a memory" menu; each entry launches its own little experience (first up: the "will you be my valentine?" game — try to click "no", good luck).

## Structure

- `src/App.jsx` — renders the event menu, or the selected event's component
- `src/events/index.js` — the `EVENTS` registry; **add new events here**
- `src/events/valentine/` — the valentine game, fully self-contained (screens, hook, config, styles)
- `src/components/EventMenu.jsx` — the main menu
- `src/hooks/useBackgroundAudio.js` — background-music autoplay/unlock, reusable by any event
- `src/styles/base.css` — shared variables (colors, pixel-heart SVGs, font), layout, `.pixel-btn`
- `src/styles/ambient.css` — shared decorative backdrop (`.page--ambient`)

## Adding an event

1. Create `src/events/<name>/` with a top-level component (own `.page` wrapper, screens, styles).
2. Add `{ id, name, date, Component }` to `EVENTS` in `src/events/index.js`.
   Use `Component: null` to list an event before it's built (selecting it does nothing).

## Scripts

```sh
npm run dev      # start dev server (port 5173)
npm run build    # production build to dist/
npm run preview  # serve the production build locally
npm run lint     # eslint
npm run format   # prettier --write
```

## Deployment

Deployed on Vercel, which auto-detects Vite: build command `vite build`, output directory `dist/`. No extra config needed.
