# Deploying the Monexus website

This folder IS the website root. Everything is static — no build step on the server.

## 0. State right now: NO DOMAIN SET (deliberate)
`SITE_URL` in `build_site.py` is still `https://monexus.example`, so the build
DISABLES every absolute-URL SEO tag: no canonical, no og:url, no JSON-LD, no
sitemap.xml. This is the safe state — a canonical pointing at a domain you don't
own hurts ranking more than having none. The site builds and works normally.

To switch it all on later: set `SITE_URL` to the real domain, re-run the build,
commit, push. Nothing else needs changing.

## 1. Publish to GitHub Pages
    gh auth login                        # one time
    gh repo create monexus-site --public --source=. --remote=origin --push

Then: repo → Settings → Pages → Source = "Deploy from a branch", Branch = `main`, folder = `/ (root)`.
Live within ~1 minute at  https://<your-user>.github.io/monexus-site/

## 2. Custom domain (after you register one)
1. Registrar → DNS. For an apex domain (monexus.com) add four A records:
       185.199.108.153
       185.199.109.153
       185.199.110.153
       185.199.111.153
   For a subdomain (www.monexus.com) add a CNAME → <your-user>.github.io
2. Repo → Settings → Pages → Custom domain → enter it → tick "Enforce HTTPS".
3. Add a file named `CNAME` here containing just the domain, and commit it.
4. Set `SITE_URL` in build_site.py to the same domain, re-run, commit, push.

## 3. Get it into Google
- https://search.google.com/search-console → add the domain → verify (DNS TXT record).
- Submit `sitemap.xml`.
- Indexing typically takes a few days. It is never instant.

## Re-deploying after edits
    python3 /Users/jaydencheng/Downloads/monexus-build/build_site.py
    cd /Users/jaydencheng/Downloads/monexus-site && git add -A && git commit -m "update" && git push
