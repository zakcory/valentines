# valentines

A retro pixel-art "will you be my valentine?" page built with React + Vite. Press start, try to click "no" (good luck), click "yes", and watch the fake CRT shutdown.

## Structure

- `src/App.jsx` — screen switcher; picks a screen from the game state
- `src/hooks/useValentineGame.js` — all game state and logic
- `src/hooks/useBackgroundAudio.js` — background-music autoplay/unlock
- `src/components/` — one presentational component per screen, each with its own CSS file
- `src/constants/gameConfig.js` — taunt messages and timing constants
- `src/styles/base.css` — shared variables (colors, pixel-heart SVGs, font) and layout

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
