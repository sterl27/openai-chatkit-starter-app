# Alic3x Backend Connection Snapshot

Last verified: 2026-03-15

## Active Google Cloud context

- Account: `sterl27@gmail.com`
- Project: `alic3x-claw`
- Region: `us-central1`
- Service: `alic3x-backend`

## Service URLs

- Primary: `https://alic3x-backend-laoxn6peca-uc.a.run.app`
- Alternate: `https://alic3x-backend-947651162472.us-central1.run.app`

## Access model

- Anonymous requests: `403 Forbidden`
- Authenticated requests (Google identity token): allowed

## Verified routes

- `GET /health` -> `200`
- `GET /ready` -> `200`
- `GET /docs` -> `200`
- `GET /openapi.json` -> `200`
- `GET /googlechat` -> `405` (endpoint exists, likely POST-only)

## Notes

- Root path `GET /` returns `404` (service is reachable, route not implemented).
- This snapshot confirms backend connectivity and auth requirements.
