# sc-gtrm — SC Malaysia Technology Risk Management Guidelines

**Last updated:** 2026-03-25

## What This Is
Structured knowledge base for Securities Commission Malaysia's Guidelines on Technology Risk Management (GTRM) for capital market intermediaries. SPA explorer with JSON data layers.

## Architecture
- **SPA**: `index.html` + `app.js` + `style.css` (vanilla JS, no build step)
- **Data**: JSON files across controls, requirements, cross-references, risk-management, evidence
- **Schema**: GRC Portfolio v2.0 Standardized Schema

## Key Data Files
- `controls/library.json` — 35 controls
- `controls/domains.json` — Domain structure
- `requirements/by-domain/` — 10 domains: governance-oversight, technology-risk-assessment, cybersecurity, cloud-services, third-party-risk, data-management, incident-management, business-continuity, technology-audit, emerging-technology
- `cross-references/rmit-mapping.json` — Comparison with BNM RMiT
- `cross-references/nist-mapping.json` — NIST CSF alignment

## Conventions
- Kebab-case slugs for all IDs
- SC Malaysia regulates capital market intermediaries (distinct from BNM banking supervision)

## Important
- SC-GTRM applies to capital market intermediaries, NOT banks (banks use RMiT)
- Emerging technology domain covers AI, blockchain, cloud — check for SC advisories
- Technology audit requirements include independent assessment obligations

## Related Repos

- [RMIT](https://github.com/dawuds/RMIT) — BNM equivalent for banking (comparison mappings available)
- [nacsa](https://github.com/dawuds/nacsa) — NACSA NCII requirements (capital markets may be designated)
- [nist](https://github.com/dawuds/nist) — NIST CSF 2.0 baseline
- [bcm-dr](https://github.com/dawuds/bcm-dr) — BCM requirements referenced by SC-GTRM