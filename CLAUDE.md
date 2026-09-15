# Code Components — Portfolio

Juan Gomez-Vara's interactive component portfolio.
Live: https://code-components-eta.vercel.app
Repo: juancodez/code-components

## What this is
A single-page portfolio with two sections:
1. **Hero** — personal intro, animated role text, logo ticker, recent projects grid
2. **Code Components gallery** — live interactive demos with tweakable controls and copyable source

## Stack
- Vite + React + TypeScript
- bun (package manager + script runner)
- vite-plugin-singlefile (each tile ships as a self-contained HTML export)
- No UI library, no router — vanilla CSS, plain React

## Folder structure
```
public/
  avatar.jpg          → Juan's headshot (circular avatar in hero)
  projects/           → project screenshot images (drop .jpg/.png here)
src/
  sections/           → full-page sections as standalone components
  components/         → small shared UI pieces (buttons, badges, etc.)
  tiles/              → code component demo tiles (one file per component)
  assets/             → icons, SVGs, fonts
  App.tsx             → root layout: <Hero /> then <gallery>
  App.css             → all styles (single flat CSS file)
```

## How to add a new code component tile
1. Create `src/tiles/MyComponentTile.tsx` — exports a named `MyComponentTile`
2. Add `{ slug: "my-component", Tile: MyComponentTile }` to the `TILES` array in `App.tsx`
3. Decrease the ghost count by bumping `TOTAL` only when you actually add the tile
4. Run `bun run build` to verify it builds clean before deploying

## How to add a project card to the hero
Edit the `PROJECTS` array in `App.tsx`. Each entry:
```ts
{ name: "Project Name", type: "Product | Website | Web3 | Plugin", bg: "gradient or color" }
```
Drop a real screenshot in `public/projects/project-name.jpg` and set `bg` to `url('/projects/project-name.jpg')` (use `background-size: cover` in `.project-img`).

## Dev commands
```
bun run dev      → local dev server (http://localhost:5173)
bun run build    → production build into dist/
bun run preview  → preview the production build locally
```

## Deploy
Vercel. Push to main → auto-deploy. No env vars needed.

## Design tokens (in App.css)
| Token         | Value     | Used for                     |
|---------------|-----------|------------------------------|
| text-primary  | #1d2939   | headings, name               |
| text-secondary| #667085   | body, role, subtitles        |
| text-muted    | #98a1b2   | ticker logos, placeholders   |
| border        | #f2f4f7   | card borders, btn border     |
| bg-page       | #f2f2f0   | page background              |
| bg-card       | #fff      | card background              |
| bg-btn-light  | #f8f9fa   | secondary button bg          |

## Avatar
File: `public/avatar.jpg` — do not rename, referenced as `/avatar.jpg` in App.tsx.
To update: drop a new file at the same path, same name.

## Owner
Juan Gomez-Vara — juangomezvara@gmail.com
