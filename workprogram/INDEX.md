# SC-GTRM Work Program — SC-GL/6-2023 Control Review

*Last updated: 2026-03-31*

> **NOTICE:** Constructed for educational purposes. Customise for your engagement. Not legal or regulatory advice. AI-generated content — review before use.

## Overview

End-to-end assessor toolkit for reviewing technology risk management controls under SC-GL/6-2023. Covers **35 controls** across **10 domains** with **181 sub-procedures** for capital market intermediaries regulated by the Securities Commission Malaysia.

## AWP Workbook (Primary Deliverable)

**`SC-GTRM-AWP.xlsx`** — 7-sheet professional audit work program:

| Sheet | Content | Controls | Sub-Procedures |
|-------|---------|----------|----------------|
| Methodology & Approach | Engagement details, assessment methods, sampling methodology, conclusion scale, limitations, sign-off | — | — |
| Governance, Risk & Audit | Governance, Risk Assessment, Technology Audit | 10 | 54 |
| Cybersecurity | Threat mgmt, SOC, vuln mgmt, network security | 4 | 27 |
| Resilience & Incident Mgmt | Business Continuity, Incident Management | 8 | 38 |
| Third-Party & Cloud | Vendor risk, outsourcing, cloud services | 7 | 33 |
| Data & Emerging Technology | Data governance, market data, algo trading, AI/ML, DLT | 6 | 29 |
| Scoring Summary | Auto-aggregated scores with formulas | 35 | — |

**AWP Features:**
- 12-column format (6 pre-populated + 6 blank for fieldwork)
- Control context rows: PURPOSE / EXPECTATION / KEY RISK for all 35 controls
- Sampling methodology with population-based tables aligned to risk tiers
- Data validation dropdowns on all Conclusion cells
- Automated scoring: control → domain → overall aggregation
- Risk tiers: Critical (7), Standard (25), Conditional (3)
- Regenerate: `python3 workprogram/generate-awp.py`

## Report Template

**`SC-GTRM-Report-Template.docx`** — Professional Word assessment report:
- Cover page, document control, table of contents
- Executive summary with domain scoring table
- Methodology (methods, sampling, conclusion scale, limitations)
- Detailed findings for all 35 controls across 10 domains
- Maturity assessment, recommendations summary
- Management response and assessor declaration
- Appendices: evidence index, glossary
- Regenerate: `python3 workprogram/generate-report.py`

## Evidence Folder Generator

**`generate-evidence-folders.py`** — Creates standardized 57-directory structure:
- `00-Engagement/` — Engagement letters, scope, team
- `01-Governance-Risk-Audit/` — GRA-01 through GRA-10
- `02-Cybersecurity/` — CYB-01 through CYB-04
- `03-Resilience-Incident/` — RIM-01 through RIM-08
- `04-Third-Party-Cloud/` — TPC-01 through TPC-07
- `05-Data-Emerging-Tech/` — DET-01 through DET-06
- `06-Workpapers/` — Scoring, interviews, correspondence
- `07-Reporting/` — Draft, final, management responses

Run: `python3 workprogram/generate-evidence-folders.py ./my-engagement`

## SPA Explorer Reference Files

| # | File | Purpose | Audience |
|---|------|---------|----------|
| 1 | [testing-procedures.json](testing-procedures.json) | 181 testing procedures for SPA Work Program view | Assessor |
| 2 | [evidence-map.json](evidence-map.json) | 41 per-control evidence items | Assessor |
| 3 | [maturity-scoring.md](maturity-scoring.md) | 0-3 scale scoring worksheet | Assessor |
| 4 | [document-request-list.md](document-request-list.md) | Pre-assessment document request (~76 items) | Client |
| 5 | [finding-template.md](finding-template.md) | Observation template with severity guide | Assessor / Client |

## AWP Source Data

JSON files in `awp-data/` are the source of truth for the AWP workbook. Edit these to modify sub-procedures, then regenerate the Excel:

| File | Ref Range | Controls |
|------|-----------|----------|
| `sheet2-governance-risk-audit.json` | GRA-1 to GRA-10 | 10 |
| `sheet3-cybersecurity.json` | CYB-1 to CYB-4 | 4 |
| `sheet4-resilience-incident.json` | RIM-1 to RIM-8 | 8 |
| `sheet5-third-party-cloud.json` | TPC-1 to TPC-7 | 7 |
| `sheet6-data-emerging-tech.json` | DET-1 to DET-6 | 6 |

## Assessment Workflow

1. **Scoping** — Review controls, mark N/A in AWP, set risk tiers
2. **Evidence folders** — Run `generate-evidence-folders.py`, create engagement structure
3. **Document request** — Send `document-request-list.md` to client
4. **Fieldwork** — Work through AWP sheets, enter conclusions per sub-procedure
5. **Scoring** — Scoring Summary sheet auto-aggregates from fieldwork conclusions
6. **Reporting** — Fill in `SC-GTRM-Report-Template.docx` with findings
7. **Submission** — Finalize report for SC submission

## Related Assets

| Asset | Location | Purpose |
|-------|----------|---------|
| Control library | `controls/library.json` | 35 controls with maturity definitions |
| Domain structure | `controls/domains.json` | 10 domain definitions |
| Requirements | `requirements/by-domain/` | Per-domain regulatory requirements |
| Evidence index | `evidence/index.json` | Domain-level evidence (original) |
| Templates | `templates/` | 20 policy/procedure/register/report templates |
| Cross-references | `cross-references/` | RMiT and NIST CSF mappings |
| Risk management | `risk-management/` | Risk register and methodology |
| SPA explorer | `index.html` | Browse all data at `https://dawuds.github.io/sc-gtrm/` |
