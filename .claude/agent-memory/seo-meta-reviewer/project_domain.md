---
name: Domain and metadataBase
description: Deployed domain and metadataBase URL used in layout.tsx metadata
type: project
---

metadataBase is currently set to: https://marktatarynov.dev (placeholder — user must confirm or update before deployment).

**Why:** Next.js metadataBase resolves all relative og:image and canonical URLs. An incorrect domain means social sharing links and canonical tags point to the wrong origin.
**How to apply:** Verify this domain is correct with the user before any production deployment. If a different domain is used (e.g. Vercel subdomain), update metadataBase in src/app/layout.tsx accordingly.
