# Incident Response Policy

---

| Field | Details |
|---|---|
| **Document ID** | POL-IRP-001 |
| **Version** | 1.0 |
| **Classification** | Confidential |
| **Owner** | Chief Information Security Officer (CISO) |
| **Effective Date** | [DD/MM/YYYY] |
| **Next Review Date** | [DD/MM/YYYY + 1 year] |
| **Approved By** | Board of Directors |
| **Regulatory Reference** | SC-GL/2-2023 (R1-2024) |

---

> **NOTICE:** This is an indicative template. Customise for your organisation. Not legal advice. AI-generated content.

---

## Table of Contents

1. [Purpose](#1-purpose)
2. [Scope](#2-scope)
3. [Incident Classification](#3-incident-classification)
4. [Incident Response Team](#4-incident-response-team)
5. [SC Notification Requirements](#5-sc-notification-requirements)
6. [Escalation](#6-escalation)
7. [Communication](#7-communication)
8. [Post-Incident Review](#8-post-incident-review)
9. [Review](#9-review)

---

## 1. Purpose

This policy establishes the incident management framework for [Organisation Name], ensuring timely detection, response, and recovery from technology and cybersecurity incidents that could impact capital market operations, client data, or regulatory compliance under SC-GL/2-2023 (R1-2024).

## 2. Scope

This policy applies to:

- All technology and cybersecurity incidents affecting [Organisation Name]'s systems, data, or services
- Incidents impacting trading systems, settlement platforms, market data feeds, and client-facing services
- Incidents involving third-party vendors or outsourced services
- All employees, contractors, and third parties involved in incident detection, response, or communication

## 3. Incident Classification

Incidents shall be classified by severity, with particular attention to market impact:

| Severity | Description | Market Impact | Response Time |
|---|---|---|---|
| **P1 — Critical** | Trading system outage, data breach affecting clients, market data manipulation | Direct impact on market integrity or investor protection | Immediate — within [15] minutes |
| **P2 — High** | Partial system outage, significant security breach, settlement system disruption | Potential market or client impact | Within [1] hour |
| **P3 — Medium** | Service degradation, contained security event, non-critical system failure | Minimal market impact | Within [4] hours |
| **P4 — Low** | Minor technical issue, isolated event, no data compromise | No market impact | Within [1] business day |

### Market Impact Considerations

The following factors shall elevate incident severity:

- [ ] Trading halt or inability to execute/settle orders
- [ ] Compromise of market-sensitive or pre-trade information
- [ ] Unauthorised access to client accounts or data
- [ ] Disruption to price discovery or market data dissemination
- [ ] Impact on multiple market participants
- [ ] Regulatory reporting system failure

## 4. Incident Response Team

### 4.1 Core Incident Response Team

| Role | Responsibility | Contact |
|---|---|---|
| **Incident Commander** | Overall incident coordination and decision authority | [Name / Role] |
| **CISO** | Cybersecurity incident leadership and SC liaison | [Contact details] |
| **IT Operations Lead** | Technical investigation and system recovery | [Contact details] |
| **Legal Counsel** | Regulatory and legal advice, notification obligations | [Contact details] |
| **Communications Lead** | Internal and external communications | [Contact details] |
| **Business Continuity Lead** | BCP activation and business recovery | [Contact details] |

### 4.2 Extended Team (Activated for P1/P2)

- Chief Executive Officer / Managing Director
- Chief Risk Officer
- Head of Trading Operations
- Head of Compliance
- External forensics provider: [Provider name, contact]
- External legal counsel: [Firm name, contact]

## 5. SC Notification Requirements

Under SC-GL/2-2023 (R1-2024), [Organisation Name] shall notify the Securities Commission Malaysia of material technology incidents:

| Notification Type | Timeframe | Channel | Content |
|---|---|---|---|
| **Initial notification** | Within [N] hours of P1/P2 incident detection | [Email / SC portal / hotline] | Incident summary, systems affected, initial impact assessment |
| **Interim update** | Within [N] hours of initial notification | [Email / SC portal] | Root cause analysis progress, containment status, client impact |
| **Final report** | Within [N] business days of incident closure | [Formal written report] | Full root cause, impact, remediation, lessons learned |

- The CISO shall be responsible for all SC notifications, with review by Legal Counsel
- All SC notifications shall be approved by [CEO / CRO] before submission
- A register of all SC notifications shall be maintained and reported to the Board [quarterly]

## 6. Escalation

| Trigger | Escalation To | Timeframe |
|---|---|---|
| P1 incident declared | CEO, CRO, Board Chair | Immediate |
| Client data breach confirmed | Legal Counsel, Compliance, CRO | Within [1] hour |
| Trading system impact exceeding [N] minutes | Head of Trading, CEO | Within [30] minutes |
| Incident unresolved beyond [N] hours | CTO, CRO | At [N]-hour mark |
| Media enquiry received | Communications Lead, CEO | Immediate |
| Incident involves suspected fraud or market manipulation | Compliance, Legal, CEO | Immediate |

- Escalation shall not require full confirmation of impact — err on the side of early escalation
- After-hours escalation shall follow the on-call roster maintained by [IT Operations / SOC]

## 7. Communication

### 7.1 Internal Communication

- Incident status updates shall be provided every [N] minutes for P1, [N] hours for P2
- Communication channels: [incident management platform / war room / dedicated channel]
- All incident communications shall use the classification marking "Confidential — Incident Response"

### 7.2 External Communication

- Client notifications shall be issued for incidents affecting client services or data
- Media statements shall be approved by [CEO / Communications Lead] before release
- Regulatory communications shall follow Section 5 above
- No employee shall discuss incidents externally without authorisation from the Incident Commander

## 8. Post-Incident Review

- A post-incident review (PIR) shall be conducted for all P1 and P2 incidents within [N] business days of closure
- PIR shall document:
  - Root cause analysis
  - Timeline of detection, response, and recovery
  - Effectiveness of incident response procedures
  - Remediation actions with owners and target dates
  - Lessons learned and process improvements
- PIR findings shall be reported to [Risk Committee / Board] within [N] business days
- Remediation actions shall be tracked in [risk register / issue tracker] until closure

## 9. Review

This policy shall be reviewed [annually] or upon:

- Material changes to SC-GL/2-2023 (R1-2024) or related incident reporting requirements
- Following any P1 incident
- Material changes to the technology environment or organisational structure

| Review Date | Reviewed By | Changes Made |
|---|---|---|
| [Date] | [Name / Role] | Initial release |
