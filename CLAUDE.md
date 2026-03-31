# sc-gtrm — SC Malaysia Technology Risk Management Guidelines

**Last updated:** 2026-03-31

## What This Is
Complete assessment toolkit for Securities Commission Malaysia's Guidelines on Technology Risk Management (SC-GL/2-2023 (R1-2024)) for capital market intermediaries. Includes SPA explorer and structured JSON data. **Tier 1 Focus Area** in the GRC portfolio.

## Portfolio Role
One of 5 Tier 1 focus areas. End-to-end assessment capability: 35 controls across 10 domains with 181 sub-procedures. AWP artifacts (workbook, report template, generators, evidence tools) are in Tech-Audit/SC-GTRM/ (private repo). Remaining work: deeper cross-references with NACSA and PDPA repos.

## Quick Start
- **Browse**: Open `index.html` or visit `https://dawuds.github.io/sc-gtrm/`
- **Validate**: `node validate.js`

## Architecture
- **SPA**: `index.html` + `app.js` + `style.css` (vanilla JS, no build step)
- **Data**: JSON files across controls, requirements, cross-references, risk-management, evidence
- **Schema**: GRC Portfolio v2.0 Standardized Schema

## SPA Explorer Views
8 views: Overview, Controls (with detail drill-down), **Work Program** (5 tabs: Testing Procedures, Evidence Map, Document Request, Maturity Scoring, Findings Template), Risk Management, Evidence, Cross-References, Requirements. Plus global search and CSV/PDF export.

## Key Data Files
- `controls/library.json` — 35 controls with maturity levels
- `controls/domains.json` — 10 domain definitions
- `requirements/by-domain/` — 10 domain requirement files
- `cross-references/rmit-mapping.json` — BNM RMiT comparison
- `cross-references/nist-mapping.json` — NIST CSF 2.0 alignment
- `evidence/index.json` — Domain-level evidence guidance
- `risk-management/` — Risk register + methodology
- `audit-integration.json` — Maps 35 controls to Tech-Audit/SC-GTRM audit procedures

## Templates (`templates/`)
20 templates: 6 policies, 6 procedures, 4 registers, 4 reports. See `templates/INDEX.md`.

## Conventions
- Kebab-case slugs for all IDs
- AWP refs: GRA-1..10, CYB-1..4, RIM-1..8, TPC-1..7, DET-1..6
- SC Malaysia regulates capital market intermediaries (distinct from BNM banking supervision)

## Important
- SC-GTRM applies to capital market intermediaries, NOT banks (banks use RMiT)
- Emerging technology domain covers AI, blockchain, cloud — check for SC advisories
- Technology audit requirements include independent assessment obligations
- AWP artifacts (Excel workbook, Word report template, generators, evidence folder tools) are in Tech-Audit/SC-GTRM/ (private repo). This repo contains compliance data only.

## Related Repos
- [nacsa](https://github.com/dawuds/nacsa) — NACSA NCII requirements; capital market systems may be designated (Tier 1)
- [pdpa-my](https://github.com/dawuds/pdpa-my) — PDPA applies to capital market client data (Tier 1)
- [iesp](https://github.com/dawuds/IESP) — Parallel assessment framework for BNM-regulated entities (Tier 1)
- [AI-Governance](https://github.com/dawuds/AI-Governance) — SC advisory on algorithmic trading and AI governance (Tier 1)
- [Tech-Audit/SC-GTRM](https://github.com/dawuds/Tech-Audit) — SC-GTRM audit toolkit (AWP workbook, report template, generators, evidence tools) (Tier 2)
- [RMIT](https://github.com/dawuds/RMIT) — BNM equivalent for banking (comparison mappings available)
- [nist](https://github.com/dawuds/nist) — NIST CSF 2.0 baseline
- [grc](https://github.com/dawuds/grc) — Portfolio hub
