# Vercel SPA 404 Fix Pack

This adds a `vercel.json` so every route rewrites to `index.html` (required for client-side routing in Vite/React SPAs).

## Steps
1) Put **vercel.json** in your repo root (same level as `index.html` or your app source).
2) Commit & push:
   ```bash
   git add vercel.json
   git commit -m "fix: SPA rewrite to index.html"
   git push
   ```
3) Vercel will rebuild and deploy automatically. The 404 on client-side routes should be gone.

## Notes
- If using Vite, ensure your build script and output are correct:
  ```json
  { "scripts": { "build": "vite build" } }
  ```
  Build output directory should be `dist`.
- Cloudflare Pages users: add a `_redirects` file at project root with:
  ```
  /*    /index.html   200
  ```
