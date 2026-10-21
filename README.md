# sylvesterassiamah.com

Personal site. One file, no build step.

- `index.html` — the whole site (styles + markup + the reveal-on-scroll script).
- Hosted on Cloudflare Pages (project `portfolio-site`, production branch `main`). The GitHub auto-deploy is dead; deploy by hand from the pm account:
  `mkdir -p dist && cp index.html dist/ && wrangler pages deploy dist --project-name portfolio-site --branch main --commit-dirty=false`
- Main page design: Apple-style liquid glass, frosted translucent panels over a drifting colour field, system font, light + dark.

Edit `index.html` and push.

## The board

Projects live in the `PROJECTS` array at the top of the `<script>`. Each entry has a status
(live / building / soon / client). Add `launch: "2026-10-22T00:00:00-04:00"` to get a countdown
in "Coming soon"; when it passes, the card flips to Live on its own. `repo` pulls the real
last-push time from GitHub on page load.

