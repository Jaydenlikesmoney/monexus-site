# Monexus — multi-page website

Static multi-page build with a real URL per section. Shared assets live in ./assets and are cached across pages.

## Pages
- index.html — Platform (home)
- science.html — The Science
- products.html — Pipeline, Products & Early Results
- partners.html — Evidence & Partners
- team.html — Team & Advisors
- investors.html — For Investors

## Host it
Upload this whole folder to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages, S3, or your own server). index.html is the homepage.

## Clean URLs (optional)
To serve /products instead of /products.html: Netlify/Vercel/Cloudflare Pages do this automatically; Nginx: `try_files $uri $uri.html $uri/ =404;`; Apache: `Options +MultiViews`. Then you can drop the `.html` from links.

## Adjust the team photos
Open `assets/team.css` and edit the three numbers on each person's line — `--z` (zoom), `--x` (left/right), `--y` (up/down) — then reload the Team page. Raise `--z` to crop in on a face; nudge `--x`/`--y` to re-centre. `--size` sets the circle diameter. To replace a photo entirely, tell me and I'll externalise the image files.

Research-stage. Not medical advice.
