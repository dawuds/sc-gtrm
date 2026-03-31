# sc-gtrm — SC Malaysia Technology Risk Management Guidelines

**Last updated:** 2026-03-31

## What This Is
Complete assessment toolkit for Securities Commission Malaysia's Guidelines on Technology Risk Management (SC-GL/6-2023) for capital market intermediaries. Includes SPA explorer, professional AWP workbook, report template, and evidence management tooling. **Tier 1 Focus Area** in the GRC portfolio.

## Portfolio Role
One of 5 Tier 1 focus areas. End-to-end assessment capability: 35 controls across 10 domains with 181 sub-procedures, automated scoring, Word report template, and evidence folder generator. Remaining work: deeper cross-references with NACSA and PDPA repos.

## Quick Start
- **Browse**: Open `index.html` or visit `https://dawuds.github.io/sc-gtrm/`
- **Validate**: `node validate.js`
- **Generate AWP**: `python3 workprogram/generate-awp.py`
- **Generate Report**: `python3 workprogram/generate-report.py`
- **Generate Evidence Folders**: `python3 workprogram/generate-evidence-folders.py ./my-engagement`

## Architecture
- **SPA**: `index.html` + `app.js` + `style.css` (vanilla JS, no build step)
- **Data**: JSON files across controls, requirements, cross-references, risk-management, evidence
- **Work Program**: AWP data (JSON) + Python generators producing .xlsx and .docx
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

## Work Program (`workprogram/`)
Professional assessor toolkit matching DAC AWP format:

| Deliverable | File | Description |
|-------------|------|-------------|
| AWP Workbook | `SC-GTRM-AWP.xlsx` | 7-sheet Excel: Methodology, 5 assessment sheets (181 sub-procedures), Scoring Summary with formulas |
| Report Template | `SC-GTRM-Report-Template.docx` | Word report with all 35 controls, executive summary, findings, management response |
| Testing Procedures | `testing-procedures.json` | Per-control test steps for SPA explorer |
| Evidence Map | `evidence-map.json` | 41 granular evidence items per control |
| Document Request | `document-request-list.md` | Client-facing checklist (76 items) |
| Maturity Scoring | `maturity-scoring.md` | 0-3 scale scoring worksheet |
| Finding Template | `finding-template.md` | Observation template with examples |

**Generators** (Python, require openpyxl + python-docx):
- `generate-awp.py` — Produces AWP workbook from `awp-data/` JSON source
- `generate-report.py` — Produces Word report template
- `generate-evidence-folders.py` — Creates 57-directory evidence structure

**AWP Features:**
- 12-column format (6 pre-populated + 6 blank for fieldwork)
- Control context rows (purpose, expectation, key risk) for all 35 controls
- Sampling methodology with population-based tables and risk tiers
- Data validation dropdowns on Conclusion cells
- Automated scoring: control-level, domain-level, overall aggregation
- Risk tier classification: Critical (7), Standard (25), Conditional (3)

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
- AWP data is source-of-truth; regenerate outputs after editing JSON

## Related Repos
- [nacsa](https://github.com/dawuds/nacsa) — NACSA NCII requirements; capital market systems may be designated (Tier 1)
- [pdpa-my](https://github.com/dawuds/pdpa-my) — PDPA applies to capital market client data (Tier 1)
- [iesp](https://github.com/dawuds/IESP) — Parallel assessment framework for BNM-regulated entities (Tier 1)
- [AI-Governance](https://github.com/dawuds/AI-Governance) — SC advisory on algorithmic trading and AI governance (Tier 1)
- [Tech-Audit](https://github.com/dawuds/Tech-Audit) — Audit methodology; SC-GTRM domain planned (Tier 2)
- [RMIT](https://github.com/dawuds/RMIT) — BNM equivalent for banking (comparison mappings available)
- [nist](https://github.com/dawuds/nist) — NIST CSF 2.0 baseline
- [grc](https://github.com/dawuds/grc) — Portfolio hub
