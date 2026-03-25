# Technology Risk Assessment Procedure

---

| Field | Details |
|---|---|
| **Document ID** | PRO-TRA-001 |
| **Version** | 1.0 |
| **Classification** | Confidential |
| **Owner** | Chief Risk Officer (CRO) |
| **Effective Date** | [DD/MM/YYYY] |
| **Next Review Date** | [DD/MM/YYYY + 1 year] |
| **Approved By** | Chief Risk Officer (CRO) |
| **Regulatory Reference** | SC-GL/6-2023 |

---

> **NOTICE:** This is an indicative template. Customise for your organisation. Not legal advice. AI-generated content.

---

## Table of Contents

1. [Purpose](#1-purpose)
2. [Scope](#2-scope)
3. [Risk Identification](#3-risk-identification)
4. [Risk Analysis](#4-risk-analysis)
5. [Risk Evaluation](#5-risk-evaluation)
6. [Risk Treatment](#6-risk-treatment)
7. [Monitoring](#7-monitoring)
8. [Reporting](#8-reporting)

---

## 1. Purpose

This procedure defines the step-by-step process for conducting technology risk assessments at [Organisation Name], ensuring consistent identification, analysis, evaluation, and treatment of technology risks in compliance with SC-GL/6-2023 and the enterprise risk management framework (POL-TRM-001).

## 2. Scope

This procedure applies to:

- All technology systems classified as [Critical / High] in the asset register
- New systems, applications, and infrastructure prior to deployment
- Material changes to existing systems (as defined by the change management process)
- Third-party technology services and cloud deployments
- Algorithmic trading systems and automated order execution platforms

## 3. Risk Identification

### 3.1 Process Steps

| Step | Activity | Responsible | Output |
|---|---|---|---|
| 3.1.1 | Review technology asset register and system classification | Risk Analyst | Asset scope list |
| 3.1.2 | Identify threats applicable to each asset (see 3.2) | Risk Analyst, System Owner | Threat catalogue |
| 3.1.3 | Identify vulnerabilities from scanning, audits, and incident history | CISO, IT Operations | Vulnerability list |
| 3.1.4 | Identify existing controls and their effectiveness | Risk Analyst, Control Owners | Control inventory |
| 3.1.5 | Document risk scenarios combining threat, vulnerability, and impact | Risk Analyst | Risk scenario register |

### 3.2 Risk Categories

Include but not limited to:

- **Infrastructure risks**: Hardware failure, network outage, capacity shortfall
- **Cybersecurity risks**: Malware, ransomware, phishing, advanced persistent threats
- **Data risks**: Data breach, data corruption, data loss
- **Algorithmic trading risks**: Erroneous algorithms, flash crash triggers, runaway orders, latency spikes affecting execution quality
- **Third-party risks**: Vendor failure, supply chain compromise, cloud outage
- **Change management risks**: Failed deployments, regression defects
- **Regulatory risks**: Non-compliance with SC-GL/6-2023, CMSA 2007

## 4. Risk Analysis

### 4.1 Risk Rating Matrix (5x5)

**Likelihood Scale:**

| Rating | Level | Description |
|---|---|---|
| 1 | Rare | May occur only in exceptional circumstances (less than once in [5] years) |
| 2 | Unlikely | Could occur but not expected (once in [2-5] years) |
| 3 | Possible | Might occur at some time (once per [1-2] years) |
| 4 | Likely | Will probably occur in most circumstances (once per [quarter]) |
| 5 | Almost Certain | Expected to occur regularly ([monthly] or more) |

**Impact Scale:**

| Rating | Level | Financial Impact | Operational Impact | Regulatory Impact |
|---|---|---|---|---|
| 1 | Insignificant | Below RM [amount] | Minor inconvenience, no client impact | No regulatory interest |
| 2 | Minor | RM [range] | Brief disruption, limited client impact | Informal SC enquiry |
| 3 | Moderate | RM [range] | Significant disruption, some client impact | Formal SC enquiry |
| 4 | Major | RM [range] | Extended outage, material client impact | SC enforcement action |
| 5 | Catastrophic | Above RM [amount] | Trading halt, market impact, systemic risk | Licence suspension/revocation |

### 4.2 Risk Heat Map

| | Insignificant (1) | Minor (2) | Moderate (3) | Major (4) | Catastrophic (5) |
|---|---|---|---|---|---|
| **Almost Certain (5)** | Medium | High | High | Critical | Critical |
| **Likely (4)** | Medium | Medium | High | High | Critical |
| **Possible (3)** | Low | Medium | Medium | High | High |
| **Unlikely (2)** | Low | Low | Medium | Medium | High |
| **Rare (1)** | Low | Low | Low | Medium | Medium |

### 4.3 Assessment Steps

| Step | Activity | Responsible |
|---|---|---|
| 4.3.1 | Assign likelihood rating to each risk scenario | Risk Analyst, System Owner |
| 4.3.2 | Assign impact rating considering financial, operational, and regulatory dimensions | Risk Analyst, Business Owner |
| 4.3.3 | Calculate inherent risk rating (Likelihood x Impact) | Risk Analyst |
| 4.3.4 | Assess control effectiveness and calculate residual risk | Risk Analyst, Control Owner |

## 5. Risk Evaluation

- Compare residual risk ratings against the Board-approved risk appetite (POL-TRM-001, Section 4)
- Determine treatment required:

| Residual Risk | Action Required | Approval |
|---|---|---|
| **Critical** | Immediate treatment — escalate to Board | Board / Risk Committee |
| **High** | Treatment plan within [N] days | CRO |
| **Medium** | Treatment plan within [N] days | Risk Owner |
| **Low** | Accept and monitor | Risk Owner |

## 6. Risk Treatment

For each risk requiring treatment, document:

- [ ] Risk ID and description
- [ ] Selected treatment option: Mitigate / Transfer / Avoid / Accept
- [ ] Specific control actions and implementation steps
- [ ] Responsible owner and target completion date
- [ ] Expected residual risk after treatment
- [ ] Cost-benefit justification for treatment approach
- [ ] Compensating controls if full mitigation is not feasible

Treatment plans shall be recorded in the [risk register / GRC tool] and tracked per Section 7.

## 7. Monitoring

| Activity | Frequency | Responsible |
|---|---|---|
| Review risk treatment plan progress | [Monthly] | Risk Owner |
| Update risk ratings based on new information | [Quarterly] | Risk Analyst |
| Full technology risk reassessment | [Annually] | CRO, CISO |
| Ad-hoc reassessment (post-incident or material change) | As needed | Risk Analyst |
| Key Risk Indicator (KRI) monitoring | [Monthly] | Risk Analyst |

### Key Risk Indicators

| KRI | Threshold | Data Source |
|---|---|---|
| System uptime for critical systems | Below [N]% | Monitoring tools |
| Outstanding critical/high vulnerabilities | Above [N] | Vulnerability scanner |
| Overdue risk treatment actions | Above [N] | Risk register |
| Cybersecurity incidents | Above [N] per month | SIEM / incident tracker |
| Failed changes to production | Above [N]% | Change management system |

## 8. Reporting

| Report | Audience | Frequency | Content |
|---|---|---|---|
| Risk assessment summary | CRO, CISO | Upon completion | Full findings and treatment plans |
| Technology risk dashboard | CRO, CTO, CISO | Monthly | KRIs, risk heat map, treatment status |
| Board risk report | Board / Risk Committee | Quarterly | Critical/high risks, trends, appetite breaches |
| SC regulatory report | Securities Commission Malaysia | As required | Per SC-GL/6-2023 reporting obligations |

All risk assessment records shall be retained for [7] years per POL-DMP-001.
