# Data Management Policy

---

| Field | Details |
|---|---|
| **Document ID** | POL-DMP-001 |
| **Version** | 1.0 |
| **Classification** | Confidential |
| **Owner** | Chief Data Officer / Chief Risk Officer (CRO) |
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
3. [Data Classification](#3-data-classification)
4. [Market Data Integrity](#4-market-data-integrity)
5. [Client Data Protection](#5-client-data-protection)
6. [Data Retention](#6-data-retention)
7. [Data Quality](#7-data-quality)
8. [Access Controls](#8-access-controls)
9. [Review](#9-review)

---

## 1. Purpose

This policy establishes the data governance framework for [Organisation Name], ensuring the integrity, confidentiality, and availability of market data and client data in compliance with SC-GL/6-2023, the Personal Data Protection Act 2010 (PDPA), and Securities Commission Malaysia regulatory expectations.

## 2. Scope

This policy applies to:

- All data created, received, processed, stored, or transmitted by [Organisation Name]
- Market data, trade data, order data, settlement data, and reference data
- Client personal data, account data, and transaction records
- Data in all forms: structured, unstructured, electronic, and physical
- All employees, contractors, and third parties handling [Organisation Name]'s data

## 3. Data Classification

All data shall be classified at creation or receipt according to the following scheme:

| Classification | Description | Handling Requirements |
|---|---|---|
| **Restricted** | Highly sensitive — regulatory, trade secrets, pre-trade information | Encrypted at rest and in transit, strict need-to-know, no external sharing without Board approval |
| **Confidential** | Client PII, account data, internal financials | Encrypted at rest and in transit, role-based access, NDA required for third-party sharing |
| **Internal** | Operational data, internal communications | Access limited to employees, standard controls |
| **Public** | Published reports, marketing material | No restrictions on access |

- Data owners shall assign classification upon data creation
- Reclassification shall be performed when business context changes
- Data classification labels shall be applied in [DLP tool / metadata tags / document headers]

## 4. Market Data Integrity

Market data is critical to fair and orderly capital markets. [Organisation Name] shall ensure:

- **Source validation**: Market data feeds shall be sourced from [approved exchanges / data vendors] only
- **Integrity checks**: Automated validation shall detect anomalies in price, volume, and timestamp data
- **Latency monitoring**: Market data latency shall not exceed [N] milliseconds for [real-time trading systems]
- **Reconciliation**: Market data shall be reconciled against [source / reference data] [daily / in real-time]
- **Audit trail**: All changes to market data configurations shall be logged with user, timestamp, and reason

| Control | Frequency | Owner |
|---|---|---|
| Market data feed health check | Continuous | [Trading Operations] |
| Data integrity reconciliation | [Daily] | [Data Management Team] |
| Market data vendor assessment | [Annually] | [Vendor Management] |

## 5. Client Data Protection

- Client personal data shall be handled in accordance with the PDPA 2010 and SC-GL/6-2023
- Collection of client data shall be limited to what is necessary for legitimate business purposes
- Client consent shall be obtained and recorded per PDPA requirements
- Cross-border transfer of client data shall comply with Section 129 of the PDPA and POL-CLD-001 data residency requirements
- Client data breaches shall be managed per POL-IRP-001 and reported to the Securities Commission Malaysia as required

## 6. Data Retention

| Data Category | Retention Period | Legal Basis | Disposal Method |
|---|---|---|---|
| Trade records | [7] years | CMSA 2007 | Secure deletion with certification |
| Client account data | [7] years after account closure | CMSA 2007, PDPA | Secure deletion with certification |
| Market data (raw feeds) | [N] years | SC-GL/6-2023 | Secure deletion |
| Audit logs | [7] years | SC-GL/6-2023 | Secure deletion |
| Email and communications | [N] years | Internal policy | Secure deletion |
| [Additional category] | [Period] | [Basis] | [Method] |

- Data shall not be retained beyond the defined retention period without documented justification
- Disposal shall be verified and certified by [Data Management Team / IT Security]

## 7. Data Quality

[Organisation Name] shall maintain data quality standards to support reliable decision-making and regulatory reporting:

- **Accuracy**: Data shall be validated at point of entry and through periodic reconciliation
- **Completeness**: Mandatory fields shall be enforced in all systems of record
- **Timeliness**: Data shall be available within [agreed SLAs] of creation or receipt
- **Consistency**: Data definitions shall be standardised in a [data dictionary / data catalogue]

| Metric | Target | Measurement Frequency |
|---|---|---|
| Data accuracy rate | [N]% | [Monthly] |
| Missing field rate | Below [N]% | [Monthly] |
| Data reconciliation pass rate | [N]% | [Daily] |
| Data issue resolution time | Within [N] business days | [Ongoing] |

## 8. Access Controls

- Access to data shall be granted on a least-privilege, need-to-know basis aligned with data classification
- Data access requests shall be approved by:

| Data Classification | Approval Required |
|---|---|
| Restricted | Data Owner + CISO |
| Confidential | Data Owner |
| Internal | Line Manager |
| Public | No approval required |

- Access to market data systems and client data repositories shall require MFA
- Data access logs shall be monitored by the SOC and reviewed [quarterly]
- Privileged access to databases shall be managed via [PAM solution] with session recording
- Data Loss Prevention (DLP) controls shall monitor and prevent unauthorised data exfiltration

## 9. Review

This policy shall be reviewed [annually] or upon:

- Material changes to SC-GL/6-2023, PDPA, or related data regulations
- Significant data breaches or data quality incidents
- Material changes to data handling practices or technology systems

| Review Date | Reviewed By | Changes Made |
|---|---|---|
| [Date] | [Name / Role] | Initial release |
