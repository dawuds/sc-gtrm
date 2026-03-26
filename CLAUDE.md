# sc-gtrm — SC Malaysia Technology Risk Management Guidelines

**Last updated:** 2026-03-26

## What This Is
Structured knowledge base for Securities Commission Malaysia's Guidelines on Technology Risk Management (GTRM) for capital market intermediaries. SPA explorer with JSON data layers. **Tier 1 Focus Area** in the GRC portfolio.

## Portfolio Role
One of 5 Tier 1 focus areas. Complete SPA with 35 controls across 10 domains. Needs templates, validate.js, and deeper integration with other Tier 1 repos (NACSA, PDPA cross-references).

## Quick Start
Open `index.html` in a browser. Run `node validate.js` to check data integrity.

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
- [nacsa](https://github.com/dawuds/nacsa) — NACSA NCII requirements; capital market systems may be designated (Tier 1)
- [pdpa-my](https://github.com/dawuds/pdpa-my) — PDPA applies to capital market client data (Tier 1)
- [iesp](https://github.com/dawuds/IESP) — Parallel assessment framework for BNM-regulated entities (Tier 1)
- [AI-Governance](https://github.com/dawuds/AI-Governance) — SC advisory on algorithmic trading and AI governance (Tier 1)
- [Tech-Audit](https://github.com/dawuds/Tech-Audit) — Audit methodology; SC-GTRM domain planned (Tier 2)
- [RMIT](https://github.com/dawuds/RMIT) — BNM equivalent for banking (comparison mappings available)
- [nist](https://github.com/dawuds/nist) — NIST CSF 2.0 baseline
- [grc](https://github.com/dawuds/grc) — Portfolio hub
