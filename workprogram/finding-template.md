# SC-GL/6-2023 Technology Risk Management — Finding / Observation Template

| Field | Value |
|---|---|
| **Framework** | SC-GL/6-2023 Guidelines on Technology Risk Management |
| **Version** | 1.0 |
| **Date** | 2026-03-27 |
| **Entity Name** | ___________________________ |
| **Assessment Period** | ___________________________ |
| **Assessor** | ___________________________ |

> **Disclaimer:** This finding template is constructed-indicative and intended for educational purposes only. It is not a verbatim extract from Securities Commission Malaysia guidelines and does not constitute legal, regulatory, or professional advice. AI-generated content. Always consult the official SC-GL/6-2023 guidelines and qualified regulatory counsel.

---

## Finding Template

Copy and complete this template for each finding or observation.

```
------------------------------------------------------------------------
FINDING ID:         [GTRM-YYYY-NNN]
TITLE:              [Concise description of the finding]
------------------------------------------------------------------------
DOMAIN:             [Domain name from SC-GL/6-2023]
CONTROL REFERENCE:  [Control slug from library.json]
SEVERITY:           [Critical / High / Medium / Low / Informational]
------------------------------------------------------------------------

FINDING DESCRIPTION:
[Detailed description of the condition observed. What was found?
Include specific evidence, dates, and scope.]

CRITERIA:
[What should be in place? Reference the SC-GL/6-2023 expectation
or control requirement.]

RISK / IMPACT:
[What is the risk or potential impact to the entity, its clients,
or market integrity if this finding is not addressed?]

RECOMMENDATION:
[Specific, actionable recommendation to remediate the finding.
Include expected maturity target where relevant.]

------------------------------------------------------------------------
MANAGEMENT RESPONSE:



TARGET REMEDIATION DATE:



RESPONSIBLE OWNER:



STATUS:             [Open / In Progress / Remediated / Accepted / Closed]
------------------------------------------------------------------------
```

---

## Example Findings

### Example 1: Critical Finding

```
------------------------------------------------------------------------
FINDING ID:         GTRM-2026-001
TITLE:              No documented incident response plan for capital
                    market operations
------------------------------------------------------------------------
DOMAIN:             Incident Management
CONTROL REFERENCE:  incident-response-plan
SEVERITY:           Critical
------------------------------------------------------------------------

FINDING DESCRIPTION:
The entity does not have a documented technology incident response
plan. During interviews with the CISO and IT Operations Manager on
15 March 2026, it was confirmed that incident response is handled
on an ad-hoc basis with no written procedures. There is no defined
incident classification scheme, no escalation matrix, and no
assigned incident response team. The entity experienced 3 unplanned
trading system outages in the past 12 months, each handled
reactively without structured coordination.

CRITERIA:
SC-GL/6-2023 expects capital market intermediaries to develop and
maintain a technology incident response plan with classification,
escalation, containment, and recovery procedures. The plan should
include defined SC notification requirements and be tested through
regular exercises.

RISK / IMPACT:
Without a documented incident response plan, the entity faces:
- Delayed containment of cyber incidents, potentially extending
  market disruption or data exposure
- Non-compliance with SC incident notification requirements,
  risking regulatory action
- Inconsistent response leading to prolonged recovery times for
  trading and settlement systems
- Reputational damage if incident handling is perceived as
  inadequate by SC or market participants

RECOMMENDATION:
1. Develop a comprehensive incident response plan covering
   classification, escalation, containment, eradication, recovery,
   and post-incident review within 60 days.
2. Establish and formally appoint an incident response team with
   defined roles and responsibilities.
3. Define SC notification criteria and timelines aligned with
   SC-GL/6-2023 requirements.
4. Conduct a tabletop exercise within 90 days of plan approval.
Target maturity: Level 2 (Mature) — Documented plan with regular
exercises.

------------------------------------------------------------------------
MANAGEMENT RESPONSE:



TARGET REMEDIATION DATE:



RESPONSIBLE OWNER:



STATUS:             Open
------------------------------------------------------------------------
```

### Example 2: Medium Finding

```
------------------------------------------------------------------------
FINDING ID:         GTRM-2026-002
TITLE:              DR testing does not cover all critical capital
                    market systems
------------------------------------------------------------------------
DOMAIN:             Business Continuity
CONTROL REFERENCE:  dr-testing-programme
SEVERITY:           Medium
------------------------------------------------------------------------

FINDING DESCRIPTION:
Review of the entity's most recent DR test (conducted November
2025) found that the test scope covered only the primary trading
platform and email systems. The settlement system, client portal,
and market data feed infrastructure were excluded from the test
scope. The BIA identifies all five systems as critical with RTO of
4 hours or less. The entity has not participated in
Bursa Malaysia industry-wide DR exercises in the last 2 years.

CRITERIA:
SC-GL/6-2023 expects annual DR testing for all critical market
systems, including participation in industry-wide exercises
coordinated by Bursa Malaysia or SC. DR testing scope should align
with the BIA and cover all systems with defined RTO/RPO targets.

RISK / IMPACT:
- Untested recovery procedures for settlement and client-facing
  systems may fail during an actual disaster, leading to extended
  market disruption
- Settlement failures could result in financial loss and regulatory
  penalties
- Non-participation in industry DR exercises reduces coordination
  readiness with market infrastructure providers

RECOMMENDATION:
1. Expand the next DR test (scheduled H2 2026) to include all
   systems classified as critical in the BIA: trading platform,
   settlement system, client portal, market data feeds, and email.
2. Confirm participation in the next Bursa Malaysia industry-wide
   DR exercise.
3. Document test results, gaps identified, and remediation actions
   for each system tested.
Target maturity: Level 2 (Mature) — Annual DR testing with
industry participation.

------------------------------------------------------------------------
MANAGEMENT RESPONSE:



TARGET REMEDIATION DATE:



RESPONSIBLE OWNER:



STATUS:             Open
------------------------------------------------------------------------
```

### Example 3: Low / Informational Finding

```
------------------------------------------------------------------------
FINDING ID:         GTRM-2026-003
TITLE:              Technology risk policy suite review dates overdue
------------------------------------------------------------------------
DOMAIN:             Governance and Oversight
CONTROL REFERENCE:  technology-risk-policy-suite
SEVERITY:           Low
------------------------------------------------------------------------

FINDING DESCRIPTION:
Review of the entity's technology risk policy suite found that 4 of
7 policies have not been reviewed within the required annual cycle.
Specifically:
- Cybersecurity Policy: last reviewed January 2024 (14 months
  overdue)
- Data Management Policy: last reviewed March 2024 (12 months
  overdue)
- Cloud Services Policy: last reviewed November 2023 (16 months
  overdue)
- Outsourcing Policy: last reviewed February 2024 (13 months
  overdue)
The remaining 3 policies (BCP, Incident Management, Change
Management) were reviewed within the last 12 months. All policies
have current board approval signatures from their last review
cycle.

CRITERIA:
SC-GL/6-2023 expects capital market intermediaries to maintain a
comprehensive technology risk policy suite reviewed and approved by
the board at least annually. Policies should reflect current
threats, technology changes, and regulatory expectations.

RISK / IMPACT:
- Policies may not reflect current threat landscape, technology
  environment, or regulatory expectations
- Board oversight of technology risk policies is diminished when
  reviews are overdue
- Low immediate operational risk as policy content remains broadly
  relevant, but gap widens over time

RECOMMENDATION:
1. Schedule review of all 4 overdue policies within the next 60
   days.
2. Implement a policy review calendar with automated reminders at
   30 and 60 days before annual review dates.
3. Bundle policy reviews into a single board paper for efficiency.

------------------------------------------------------------------------
MANAGEMENT RESPONSE:



TARGET REMEDIATION DATE:



RESPONSIBLE OWNER:



STATUS:             Open
------------------------------------------------------------------------
```

---

## Finding Severity Guide

| Severity | Definition | Expected Remediation |
|---|---|---|
| **Critical** | A fundamental control is absent or completely ineffective. Immediate risk to market integrity, client data, or regulatory compliance. Likely to result in SC regulatory action if not addressed. | Immediate action required. Remediation plan within 2 weeks; implementation within 60 days. |
| **High** | A significant control weakness that materially increases risk exposure. The control exists but has substantial gaps in design or operation. | Remediation plan within 30 days; implementation within 90 days. |
| **Medium** | A control operates but with notable gaps in scope, consistency, or documentation. Risk is elevated but partially mitigated by other controls. | Remediation within 6 months. |
| **Low** | A minor control weakness or documentation gap. The control is largely effective but could be improved. Limited immediate risk impact. | Remediation within 12 months or next review cycle. |
| **Informational** | An observation or improvement opportunity. No control weakness identified, but the entity could benefit from enhancement to reach a higher maturity level. | At management discretion. |

---

## Remediation Priority Matrix

Use the matrix below to prioritise findings based on severity and ease of remediation.

|  | **Easy to Remediate** (< 30 days, low cost) | **Moderate Effort** (1-3 months, moderate cost) | **Significant Effort** (3-6 months, high cost) |
|---|---|---|---|
| **Critical** | Priority 1 — Do immediately | Priority 1 — Fast-track resources | Priority 1 — Begin planning immediately, interim mitigations required |
| **High** | Priority 2 — Quick win | Priority 2 — Schedule in current quarter | Priority 2 — Plan and budget for next quarter |
| **Medium** | Priority 3 — Quick win | Priority 3 — Schedule within 6 months | Priority 3 — Plan within annual cycle |
| **Low** | Priority 4 — Bundle with other changes | Priority 4 — Include in next review cycle | Priority 4 — Consider in strategic planning |
| **Informational** | Note for continuous improvement | Note for continuous improvement | Note for continuous improvement |

---

## Finding Summary Register

Use this table to track all findings from the assessment.

| Finding ID | Title | Domain | Severity | Status | Owner | Target Date |
|---|---|---|---|---|---|---|
| GTRM-2026-001 | | | | Open | | |
| GTRM-2026-002 | | | | Open | | |
| GTRM-2026-003 | | | | Open | | |
| GTRM-2026-004 | | | | Open | | |
| GTRM-2026-005 | | | | Open | | |

---

## Finding Count Summary

| Severity | Count |
|---|---|
| Critical | |
| High | |
| Medium | |
| Low | |
| Informational | |
| **Total** | |

---

> **Disclaimer:** This finding template is constructed-indicative and intended for educational purposes only. It does not constitute legal, regulatory, or professional advice. Content is AI-generated. Always consult the official SC-GL/6-2023 guidelines and qualified regulatory counsel.
