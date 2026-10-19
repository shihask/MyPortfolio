import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Canonical + absolute og:image/og:url are only emitted when the real domain
// is known (DEFAULT_SITE_URL or VITE_SITE_URL).
function siteUrlMeta(siteUrl: string): Plugin {
  return {
    name: 'site-url-meta',
    transformIndexHtml(html) {
      if (!siteUrl) return html.replace('%OG_IMAGE%', '/og-image.png')
      const origin = siteUrl.replace(/\/$/, '')
      return html
        .replace('%OG_IMAGE%', `${origin}/og-image.png`)
        .replace(
          '</head>',
          `    <link rel="canonical" href="${origin}/" />\n    <meta property="og:url" content="${origin}/" />\n  </head>`,
        )
    },
  }
}

// Production domain. Override with VITE_SITE_URL (e.g. for a staging domain).
const DEFAULT_SITE_URL = 'https://shihas.online'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  return {
    plugins: [react(), tailwindcss(), siteUrlMeta(env.VITE_SITE_URL || DEFAULT_SITE_URL)],
  }
})
