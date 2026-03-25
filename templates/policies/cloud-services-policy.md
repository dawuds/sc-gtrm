# Cloud Services Policy

---

| Field | Details |
|---|---|
| **Document ID** | POL-CLD-001 |
| **Version** | 1.0 |
| **Classification** | Confidential |
| **Owner** | Chief Technology Officer (CTO) |
| **Effective Date** | [DD/MM/YYYY] |
| **Next Review Date** | [DD/MM/YYYY + 1 year] |
| **Approved By** | Board of Directors |
| **Regulatory Reference** | SC-GL/6-2023 |

---

> **NOTICE:** This is an indicative template. Customise for your organisation. Not legal advice. AI-generated content.

---

## Table of Contents

1. [Purpose](#1-purpose)
2. [Scope](#2-scope)
3. [Cloud Strategy](#3-cloud-strategy)
4. [Approved Cloud Service Providers](#4-approved-cloud-service-providers)
5. [Risk Assessment](#5-risk-assessment)
6. [Data Residency](#6-data-residency)
7. [Access Controls](#7-access-controls)
8. [Encryption](#8-encryption)
9. [Exit Strategy](#9-exit-strategy)
10. [Review](#10-review)

---

## 1. Purpose

This policy governs the adoption, use, and management of cloud services by [Organisation Name], ensuring that cloud deployments meet the regulatory expectations of SC-GL/6-2023 and maintain the confidentiality, integrity, and availability of capital market operations.

## 2. Scope

This policy applies to:

- All cloud service deployments (IaaS, PaaS, SaaS) used by [Organisation Name]
- Public, private, hybrid, and multi-cloud environments
- All data processed, stored, or transmitted via cloud services, including market data and client data
- All business units, employees, and third parties provisioning or consuming cloud services

## 3. Cloud Strategy

- [Organisation Name] adopts a [cloud-first / cloud-selective / hybrid] strategy
- Cloud services shall be used for [approved workload categories, e.g., non-critical applications, development/test, analytics]
- The following workloads [shall / shall not] be hosted in cloud environments without Board-level approval:
  - Trading execution engines: [Permitted / Not Permitted]
  - Client personal data: [Permitted with controls / Not Permitted]
  - Market data feeds: [Permitted / Not Permitted]
  - Settlement and clearing systems: [Permitted / Not Permitted]

## 4. Approved Cloud Service Providers

All cloud services shall be procured from pre-approved CSPs only. Shadow IT and unapproved cloud usage is prohibited.

| CSP | Services Approved | Classification Tier | Last Assessment Date |
|---|---|---|---|
| [CSP Name] | [IaaS, PaaS, SaaS] | [Tier 1 / Tier 2] | [Date] |
| [CSP Name] | [Services] | [Tier] | [Date] |
| [CSP Name] | [Services] | [Tier] | [Date] |

- New CSPs shall be assessed per PRO-VAS-001 before onboarding
- Approved CSP list shall be reviewed [annually]

## 5. Risk Assessment

- A cloud-specific risk assessment shall be completed before deploying any new cloud service
- Assessments shall evaluate:
  - Data classification of workloads to be migrated
  - CSP security posture (certifications: ISO 27001, SOC 2, CSA STAR)
  - Regulatory compliance implications under SC-GL/6-2023
  - Concentration risk — dependency on a single CSP
  - Jurisdictional and legal risks
- Risk assessments shall be documented and approved by [CRO / Risk Committee]

## 6. Data Residency

- Data classified as [Confidential / Restricted] shall be stored within [Malaysia / approved jurisdictions]
- Client personal data shall comply with the Personal Data Protection Act 2010 (PDPA)
- Where data is processed outside Malaysia, [Organisation Name] shall:
  - Obtain legal opinion on cross-border data transfer compliance
  - Ensure contractual protections equivalent to Malaysian data protection standards
  - Notify the Securities Commission Malaysia if required under SC-GL/6-2023

| Data Classification | Permitted Residency | Encryption Required |
|---|---|---|
| Public | Any region | In transit |
| Internal | [Approved regions] | In transit and at rest |
| Confidential | Malaysia only | In transit and at rest, customer-managed keys |
| Restricted | Malaysia only | In transit and at rest, customer-managed keys, HSM |

## 7. Access Controls

- Cloud environments shall enforce identity and access management (IAM) with:
  - Multi-factor authentication (MFA) for all administrative access
  - Role-based access control (RBAC) aligned with least privilege
  - Just-in-time (JIT) access for privileged operations
- Service accounts shall be inventoried, reviewed [quarterly], and secured with [managed identities / certificate-based auth]
- Cloud console access logs shall be forwarded to the SOC/SIEM

## 8. Encryption

- All data at rest in cloud environments shall be encrypted using [AES-256 / equivalent]
- All data in transit shall be encrypted using [TLS 1.2+ / IPsec]
- Encryption key management:

| Key Type | Management | Rotation |
|---|---|---|
| Platform-managed keys | CSP | Per CSP policy |
| Customer-managed keys (CMK) | [Organisation Name] via [KMS] | [N] months |
| Bring Your Own Key (BYOK) | [Organisation Name] via [HSM] | [N] months |

- Keys for [Confidential / Restricted] data shall be customer-managed at minimum

## 9. Exit Strategy

- [Organisation Name] shall maintain a documented cloud exit plan for each critical cloud service
- Exit plans shall include:
  - Data extraction procedures and formats
  - Service migration timeline (target: [N] weeks)
  - Alternative service providers or on-premises fallback
  - Contractual provisions for data return and deletion
  - Testing of data portability [annually]
- The Board shall be notified of any CSP relationship posing concentration risk exceeding [threshold]

## 10. Review

This policy shall be reviewed [annually] or upon:

- Material changes to SC-GL/6-2023 or related cloud computing guidelines
- Significant cloud security incidents
- Changes to CSP service terms, certifications, or risk posture
- Material changes to [Organisation Name]'s cloud strategy

| Review Date | Reviewed By | Changes Made |
|---|---|---|
| [Date] | [Name / Role] | Initial release |
