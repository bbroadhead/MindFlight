# MindFlight (Prototype)

MindFlight is a **non-clinical**, mobile-first **wellness & resilience** prototype intended for an Air Force Spark Tank submission.

## What’s in this prototype
- **Daily Check‑In** (30–60 seconds): mood + stress + energy + sleep + optional reflection note
- **AI Coach (local, narrow scope)**: reflection prompts + tool suggestions (no diagnosis, no treatment)
- **Tools**: breathing (4‑4‑8), grounding (5‑4‑3‑2‑1), sleep reset tips
- **Resources**: crisis navigation (resource-only; available without login)
- **Leader View (demo UI)**: **anonymous, aggregated trends** only (synthetic data, no drill-down)

## Privacy posture (prototype intent)
- Designed to avoid PII and to keep data strictly personal.
- Saved check-ins are stored on-device via AsyncStorage (web uses browser storage).

## Run locally
```bash
npm install
npm run start
# then press "w" for web
```

## Notes for production hardening
- Replace prototype login with CAC SSO / DS Logon.
- Add governance review for content, crisis navigation, and AI boundaries.
- Add proper backend + encryption-at-rest in the data store.
