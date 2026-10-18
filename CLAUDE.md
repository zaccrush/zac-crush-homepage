# CLAUDE.md

Personal site for **Zac Crush** — combat sports broadcaster, storyteller, host. Deployed at zaccrush.com from this repo via Netlify (push to `main` ships). No build step.

## What's here
- `index.html` — the only page: header (Signal Box mark + name), the brand reel, footer (socials, Crush Combat, East ≠ West). All CSS/JS inline, system fonts, no frameworks.
- `assets/video/zac-crush-brand-reel.mp4` + `-poster.jpg` — the reel. The page shows a branded "Signal incoming" slate if the MP4 is missing or can't play.
- `assets/og/zac-crush-og.png` — 1200×630 share card.
- `favicon.svg` / `favicon.ico` / `apple-touch-icon.png` / `icon-192.png` / `icon-512.png` — from logo **02 Tally App Badge**.
- `robots.txt`, `sitemap.xml` (with video extension), `site.webmanifest`, `_redirects` (old Crush Combat Agency pages → `/` 301), `_headers`, `404.html`.

## Brand tokens (01 — SIGNAL suite)
Pitch Black `#050505` · Signal Gold `#E5B84B` · Tally Red `#EE2B2B` · Warm Cream `#F5F0E6`. Heavy sans for the name, monospace caps for HUD labels.

## Swapping the reel
Encode for web, then replace the two files (keep the names, or update index.html, sitemap.xml and the JSON-LD together):

    ffmpeg -i reel.mp4 -c:v libx264 -preset slow -crf 23 -profile:v high -pix_fmt yuv420p -vf scale=1920:-2 -c:a aac -b:a 128k -movflags +faststart assets/video/zac-crush-brand-reel.mp4
    ffmpeg -ss 3 -i reel.mp4 -frames:v 1 -q:v 3 assets/video/zac-crush-brand-reel-poster.jpg

If the duration changes, update `PT24S` in the JSON-LD, `video:duration` in sitemap.xml and the `00:24` label.
