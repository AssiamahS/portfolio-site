# sylvesterassiamah.com

Personal site. One file, no build step.

- `index.html` — the whole site (styles + markup + the reveal-on-scroll script).
- `jobs/index.html` — /jobs, the live job-search dashboard. Reads https://assiamahs.github.io/scipio/health.json client-side; no build, no data in the repo.
- Hosted on Cloudflare Pages (project `portfolio-site`, production branch `main`). The GitHub auto-deploy is dead; deploy by hand from the pm account:
  `mkdir -p dist && cp -R index.html jobs dist/ && wrangler pages deploy dist --project-name portfolio-site --branch main --commit-dirty=false`
- Same design system as djsylvester.com and drandrewassiamah.com: Unbounded + Archivo, dark panels, amber/violet accents.

Edit `index.html` and push.
