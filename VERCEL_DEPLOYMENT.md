# Atelier Beauty — Vercel Deployment Readiness

## Result

Atelier Beauty is a **React 19 + Vite 7 static single-page application**. The Vercel deployment path issue was corrected by making `pnpm build` produce only the static Vite output, while preserving the Express server as an explicit `pnpm build:server` option for local production previews. The compiled server now resolves `dist/public` correctly whether it is run from `dist/index.js` or from the source layout.

The public image and favicon URLs remain external CDN URLs, and the frontend contains no Manus-only `/manus-storage/` references.

## Files changed in this pass

| File | Change | Why |
|---|---|---|
| `package.json` | Added `engines.node: "22.x"`; changed `build` to `vite build`; added `build:server` for the optional Express preview bundle. | Vercel serves the static Vite output and does not need to build the unused Express placeholder. |
| `server/index.ts` | Added candidate static paths and checks for `index.html` before selecting the directory. | Prevents the compiled/source path mismatch that caused the deployment issue. |
| `vercel.json` | Added Vite preset, frozen-lockfile install, `pnpm build`, `dist/public`, and SPA rewrite. | Makes Vercel’s settings explicit and supports direct SPA navigation. |
| `VERCEL_DEPLOYMENT.md` | Added this report. | Records settings, variables, commands, and checks. |

No secrets, API keys, database credentials, or private environment values were added or modified.

## Correct Vercel settings

| Setting | Value |
|---|---|
| Framework Preset | **Vite** |
| Root Directory | Repository root, `.` |
| Install Command | `pnpm install --frozen-lockfile` |
| Build Command | `pnpm build` |
| Output Directory | `dist/public` |
| Development Command | `pnpm dev` |
| Node.js Version | **22.x** |
| Functions | None required for the current static homepage |

These values are committed in `vercel.json`. Vercel’s Vite guidance recommends a rewrite to `/index.html` for SPA deep links [1]. Vercel currently supports Node 20.x, 22.x, and 24.x major versions, and the repository now pins the tested 22.x major [2].

## Environment variables

**No environment variable is required for the current visible homepage.** The active homepage does not import `MapView` and does not call the OAuth helper.

The source tree contains optional template integrations. Add these only if those features are later connected to the UI:

| Variable | Required now? | Used by |
|---|---:|---|
| `VITE_OAUTH_PORTAL_URL` | No | `client/src/const.ts` OAuth helper |
| `VITE_APP_ID` | No | `client/src/const.ts` OAuth helper |
| `VITE_FRONTEND_FORGE_API_URL` | No | `client/src/components/Map.tsx` |
| `VITE_FRONTEND_FORGE_API_KEY` | No | `client/src/components/Map.tsx` |

Only variables prefixed with `VITE_` are appropriate for browser-exposed Vite configuration. Never put private credentials in a `VITE_` variable or in `vercel.json`.

## Confirmed fixes and verification

The following checks passed:

```bash
pnpm install --frozen-lockfile
pnpm check
pnpm build
pnpm build:server
```

The static build produces `dist/public/index.html`. The optional compiled server produces `dist/index.js`. A smoke test started the compiled server on a temporary port, received HTTP 200 for `/`, and confirmed the returned HTML contains the Atelier Beauty page.

The public CDN audit found no `/manus-storage/` references in `client/src` or `client/index.html`. Every current public image and favicon URL returned HTTP 200 during verification.

The build still emits a chunk-size warning above 500 kB. This is a performance warning, not a deployment blocker. Code splitting can be added later if real-world performance testing warrants it.

## Local production verification

Run from the repository root:

```bash
pnpm install --frozen-lockfile
pnpm check
pnpm build
pnpm preview --host
```

To verify the optional Express preview path instead:

```bash
pnpm build:server
NODE_ENV=production PORT=4173 pnpm start
```

Then open the printed preview URL and check the homepage, navigation anchors, mobile menu, booking modal, Before & After slider, gallery lightbox, scroll-to-top control, and all public images.

## Deployment steps

For dashboard deployment, import the repository into Vercel, keep the repository root as the Root Directory, confirm the Vite preset and the settings above, and deploy a preview first. After checking the preview, promote the verified commit to production. Do not add environment variables for the current homepage.

For CLI deployment, authenticate and deploy from the repository root:

```bash
pnpm dlx vercel login
pnpm dlx vercel --prod
```

## Post-deployment checklist

| Check | Expected result |
|---|---|
| `/` | Homepage loads with no broken image state. |
| Direct refresh | SPA shell loads instead of a Vercel 404. |
| `/404` | The intended not-found page renders. |
| Mobile viewport | No horizontal overflow; navigation and controls remain usable. |
| Before & After | Natural image is full-height, left-aligned, and clipped horizontally by the slider. |
| Gallery lightbox | Uploaded images open and close correctly. |
| Browser console | No uncaught exceptions or failed asset requests. |
| Vercel build logs | Node 22.x is used and `pnpm build` completes successfully. |
| Favicon and metadata | Title, description, favicon, and social metadata appear correctly. |

## Remaining items requiring external services

The booking form is currently a frontend interaction and does not persist appointments or send notifications. OAuth and maps are template integrations and require the variables above plus external-service configuration if enabled. Public CDN assets are external dependencies, so their availability should be checked after deployment. No database, API route, serverless function, CORS configuration, or persistent filesystem is required by the current homepage.

## References

[1]: https://vercel.com/docs/frameworks/frontend/vite "Vite on Vercel"
[2]: https://vercel.com/docs/functions/runtimes/node-js/node-js-versions "Supported Node.js versions"
