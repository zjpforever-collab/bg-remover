# BG Remover - AI Image Background Remover

A modern, AI-powered web application to remove image backgrounds. Built with **Next.js + TypeScript + Tailwind CSS** for the frontend and **Cloudflare Workers** for the backend API.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Cloudflare](https://img.shields.io/badge/Cloudflare-Workers-orange)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![Tailwind](https://img.shields.io/badge/Tailwind-3-blue)

## Features

- 📤 Drag & drop or click to upload images
- 🎨 Supports JPG, PNG, and WebP formats
- ✨ AI-powered background removal using Remove.bg API
- 📱 Mobile-responsive dark theme design
- ⬇️ Download transparent PNG images
- 📊 Daily usage limit (5 free uses per day)

## Tech Stack

- **Frontend:** Next.js 15, TypeScript, Tailwind CSS
- **Backend:** Cloudflare Workers (API proxy)
- **API:** Remove.bg
- **Deployment:** Cloudflare Pages

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm
- Cloudflare account
- Remove.bg API key (free tier available)

### Local Development

1. **Clone and install dependencies:**
   ```bash
   cd bg-remover-next
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env.local
   ```
   
   Get your free Remove.bg API key at: https://www.remove.bg/api

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **For full local testing with API:**
   
   a. Start Cloudflare Workers locally:
   ```bash
   npx wrangler dev --port 8787
   ```
   
   b. Update your environment variable in `.env.local`:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8787/api
   ```

## Deployment

### Deploy to Cloudflare Pages (Frontend)

1. **Push your code to GitHub**

2. **Connect to Cloudflare Pages:**
   - Go to Cloudflare Dashboard → Pages → Create project
   - Connect your GitHub repository
   - Build settings:
     - Build command: `npm run build`
     - Build output directory: `.next` (or `out` for static export)

3. **Set environment variables:**
   - In Cloudflare Pages → Settings → Environment Variables
   - Add: `NEXT_PUBLIC_API_URL` = your Workers URL

### Deploy Cloudflare Workers (Backend)

1. **Deploy the API:**
   ```bash
   cd bg-remover-next
   
   # Login to Cloudflare
   npx wrangler login
   
   # Set your Remove.bg API key as a secret
   npx wrangler secret put REMOVE_BG_API_KEY
   # Enter your API key when prompted
   
   # Deploy to production
   npx wrangler deploy
   ```

2. **Update your frontend API URL:**
   
   After deploying, update your environment variable in Cloudflare Pages:
   ```
   NEXT_PUBLIC_API_URL=https://your-workers-subdomain.workers.dev/api
   ```

## Project Structure

```
bg-remover-next/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── page.tsx      # Main page
│   │   ├── layout.tsx    # Root layout
│   │   └── globals.css   # Global styles
│   ├── components/       # React components
│   │   ├── Header.tsx
│   │   ├── UploadArea.tsx
│   │   ├── ResultView.tsx
│   │   ├── ProcessingModal.tsx
│   │   └── UsageLimit.tsx
│   ├── hooks/           # Custom React hooks
│   │   └── useImageProcessor.ts
│   ├── utils/           # Utility functions
│   │   └── api.ts
│   └── types/           # TypeScript types
│       └── index.ts
├── workers/
│   └── api.ts           # Cloudflare Workers API
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── wrangler.toml
└── README.md
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `REMOVE_BG_API_KEY` | Your Remove.bg API key (required for Workers) |
| `NEXT_PUBLIC_API_URL` | URL of your deployed Workers API |

## Remove.bg API

- **Free tier:** 50 API calls/month
- **Paid plans:** Start at $0.009/call
- Sign up at: https://www.remove.bg/api

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

If you encounter any issues:
1. Check the console for error messages
2. Verify your Remove.bg API key is valid
3. Ensure your Cloudflare Workers are properly deployed
