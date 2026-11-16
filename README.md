# Rulax Technology Website

A Vite + React marketing website for Rulax Technology, with a small Express API for contact and newsletter submissions.

## Local development

```bash
npm install
npm run dev
```

The frontend runs on http://localhost:5173 and proxies API requests to the Express server on port 5000.

## Production build

```bash
npm install
npm run build
npm run start
```

This serves the built React app from the `dist` folder and keeps the API available at `/api/*`.

## Publishing / deployment

This project is set up for Node.js hosting platforms such as Render, Railway, or a VPS.

Recommended runtime:
- Node 22 LTS
- npm install
- npm run build
- npm run start

The repository includes a `render.yaml` file for Render deployment.

Example environment variables:
- `NODE_ENV=production`
- `PORT=10000`
- `CORS_ORIGIN=https://your-domain.com`
- `WHATSAPP_NUMBER=918838099509`
- `INSTAGRAM_HANDLE=rulaxtechnology`
- SMTP values for email delivery (optional)

If SMTP is not configured, contact submissions are still saved locally in the server data folder for safe fallback handling.
