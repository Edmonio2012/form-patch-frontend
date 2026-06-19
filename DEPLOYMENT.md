# Form Patch Frontend Deployment

## Production Fixes Applied

- `.npmrc` sets `legacy-peer-deps=true` so Vercel npm installs do not fail on older peer metadata.
- React-related packages were moved to versions that declare React 19 support:
  - `cmdk@^1.1.1`
  - `embla-carousel-react@^8.6.0`
  - `react-resizable-panels@^4.11.2`
  - `vaul@^1.1.2`
  - `@types/react@^19.2.0`
  - `@types/react-dom@^19.2.0`
- `tsconfig.json` now type-checks the real `src` directory.
- Vite resolves `@/*` to the real `src` directory and builds to `dist/public`.
- `vercel.json` pins the build command, install command, output directory, and SPA fallback.

## Vercel Settings

- Framework preset: Vite
- Install command: `npm install`
- Build command: `npm run build`
- Output directory: `dist/public`
- Production domain: `form-patch-frontend.vercel.app`

## Production Environment Variables

Set these in Vercel Project Settings. Do not commit a real `.env.production`.

```env
VITE_APP_ID=form-patch
VITE_APP_TITLE=Form Patch
VITE_SUPABASE_URL=https://qzzfymbuiiaunowdzrbr.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_FRONTEND_FORGE_API_URL=https://form-patch-backend.vercel.app
VITE_FRONTEND_FORGE_API_KEY=your-production-frontend-api-key
VITE_OAUTH_PORTAL_URL=https://your-oauth-provider.com
VITE_ANALYTICS_ENDPOINT=https://www.google-analytics.com/collect
VITE_ANALYTICS_WEBSITE_ID=G-X5HVF16XWC
```

## Local Verification

Run these before pushing to GitHub:

```bash
npm install
npm run type-check
npm run lint
npm run build
```

Expected result: `dist/public` is created and Vercel can serve `index.html`.

## Troubleshooting

- `ERESOLVE` during Vercel install: confirm `.npmrc` is committed and Vercel uses `npm install`.
- Blank page after deploy: check Vercel output directory is `dist/public`.
- Calculator API failures: confirm `VITE_FRONTEND_FORGE_API_URL` points to the deployed backend and backend `CORS_ORIGIN` includes the frontend domain.
- 404 on refresh: confirm `vercel.json` has the SPA rewrite to `/index.html`.

## Rollback

1. In Vercel, open Deployments.
2. Promote the last known-good frontend deployment.
3. If the bad deploy came from Git, revert the commit and push.
4. Re-run `npm run build` locally before redeploying.
