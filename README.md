# ADZIVO Website
Zero-dependency static site + Cloudflare Worker for the contact form. All files sit in one folder (no sub-folders).

- Edit content: `site.config.mjs`. Layout/copy: `pages.mjs`. Styles: `styles.css`.
- Cloudflare: Workers & Pages > Create > Connect to Git. Build command `node build.mjs`, Deploy command `npx wrangler deploy`, project name `adzivo-site`.
- Contact form variables (see `env.example`): RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL. Without them the form honestly reports "not configured".
- Replace demo case studies, fill contact details, and get Privacy/Terms reviewed before publishing.
