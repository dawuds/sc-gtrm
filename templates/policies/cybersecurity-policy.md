# Cybersecurity Policy

---

| Field | Details |
|---|---|
| **Document ID** | POL-CSP-001 |
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
3. [Threat Management](#3-threat-management)
4. [Security Operations Centre (SOC)](#4-security-operations-centre-soc)
5. [Vulnerability Management](#5-vulnerability-management)
6. [Network Security](#6-network-security)
7. [Access Control](#7-access-control)
8. [Incident Response](#8-incident-response)
9. [Security Awareness](#9-security-awareness)
10. [Review](#10-review)

---

## 1. Purpose

This policy establishes the cybersecurity requirements for protecting [Organisation Name]'s information assets, trading systems, client data, and market data infrastructure against cyber threats, in compliance with SC-GL/2-2023 (R1-2024).

## 2. Scope

This policy applies to:

- All information systems, networks, endpoints, and data owned or managed by [Organisation Name]
- All employees, contractors, and third-party service providers
- Trading platforms, order management systems, market data feeds, and settlement systems
- Cloud-hosted and on-premises environments

## 3. Threat Management

### 3.1 Threat Intelligence

- [Organisation Name] shall maintain a threat intelligence capability, either in-house or via [third-party provider]
- Threat intelligence feeds shall be integrated into SOC monitoring tools
- Threat briefings relevant to the Malaysian capital markets sector shall be reviewed [weekly / monthly]

### 3.2 Threat Landscape Assessment

- A formal threat landscape assessment shall be conducted [annually]
- Assessments shall consider: nation-state actors, cybercriminals, hacktivists, insider threats, and supply chain attacks
- Findings shall inform security control priorities and investment decisions

## 4. Security Operations Centre (SOC)

| Parameter | Requirement |
|---|---|
| **Operating model** | [In-house / Managed SOC / Hybrid] |
| **Coverage** | [24/7 / Business hours + on-call] |
| **SIEM platform** | [Platform name] |
| **Log retention** | [N] months online, [N] months archived |
| **Escalation SLA** | Critical alerts triaged within [N] minutes |

- SOC shall monitor all critical systems including trading platforms and market data feeds
- Detection use cases shall be reviewed and updated [quarterly]
- SOC effectiveness shall be tested via [red team / purple team / tabletop exercises] at least [annually]

## 5. Vulnerability Management

- All systems shall be scanned for vulnerabilities per the schedule in PRO-VMP-001
- Remediation SLAs:

| Severity | Remediation SLA |
|---|---|
| Critical | [N] days |
| High | [N] days |
| Medium | [N] days |
| Low | [N] days |

- Penetration testing shall be conducted [annually] on internet-facing systems and critical trading infrastructure
- Results shall be reported to [CISO / CRO] and tracked to remediation

## 6. Network Security

- Network architecture shall implement defence-in-depth with segmentation between:
  - Trading network zones
  - Corporate network zones
  - DMZ and internet-facing services
  - Management and monitoring networks
- All external connections shall be protected by [next-generation firewalls / IPS]
- Network traffic to and from trading systems shall be monitored for anomalous patterns
- Remote access shall require [VPN with MFA / zero-trust network access]

## 7. Access Control

- Access shall be granted on a least-privilege, need-to-know basis
- Privileged accounts shall be managed via [PAM solution] with session recording
- Multi-factor authentication (MFA) is mandatory for:
  - All remote access
  - All privileged / administrative accounts
  - Access to trading systems and client data repositories
- Access reviews shall be conducted [quarterly] for privileged accounts and [semi-annually] for all other accounts
- Terminated user access shall be revoked within [N] hours

## 8. Incident Response

- All cybersecurity incidents shall be managed per POL-IRP-001 and PRO-IRP-001
- The CISO shall maintain a cybersecurity incident response team (CSIRT) comprising [roles]
- The Securities Commission Malaysia shall be notified of material cyber incidents within [N] hours as required by SC-GL/2-2023 (R1-2024)
- Cyber incident simulations shall be conducted [annually]

## 9. Security Awareness

- All employees shall complete cybersecurity awareness training within [N] days of onboarding and [annually] thereafter
- Phishing simulation exercises shall be conducted [quarterly]
- Role-based training shall be provided for:
  - IT and development staff
  - Trading desk personnel
  - Senior management and Board members
- Awareness metrics shall be reported to [CISO / Risk Committee] [quarterly]

| Metric | Target |
|---|---|
| Training completion rate | [N]% |
| Phishing simulation click rate | Below [N]% |
| Repeat offender rate | Below [N]% |

## 10. Review

This policy shall be reviewed [annually] or upon:

- Material changes to SC-GL/2-2023 (R1-2024) or related cybersecurity regulations
- Significant cybersecurity incidents affecting [Organisation Name] or the capital markets sector
- Material changes to the threat landscape or technology environment

| Review Date | Reviewed By | Changes Made |
|---|---|---|
| [Date] | [Name / Role] | Initial release |
