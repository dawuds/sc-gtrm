# Incident Response Procedure

---

| Field | Details |
|---|---|
| **Document ID** | PRO-IRP-001 |
| **Version** | 1.0 |
| **Classification** | Confidential |
| **Owner** | Chief Information Security Officer (CISO) |
| **Effective Date** | [DD/MM/YYYY] |
| **Next Review Date** | [DD/MM/YYYY + 1 year] |
| **Approved By** | Chief Information Security Officer (CISO) |
| **Regulatory Reference** | SC-GL/2-2023 (R1-2024) |

---

> **NOTICE:** This is an indicative template. Customise for your organisation. Not legal advice. AI-generated content.

---

## Table of Contents

1. [Purpose](#1-purpose)
2. [Scope](#2-scope)
3. [Detection and Triage](#3-detection-and-triage)
4. [Containment](#4-containment)
5. [Eradication](#5-eradication)
6. [Recovery](#6-recovery)
7. [SC Notification](#7-sc-notification)
8. [Post-Incident Review](#8-post-incident-review)
9. [Evidence Preservation](#9-evidence-preservation)

---

## 1. Purpose

This procedure provides step-by-step operational guidance for responding to technology and cybersecurity incidents at [Organisation Name], implementing the requirements of POL-IRP-001 and meeting the incident response expectations of SC-GL/2-2023 (R1-2024).

## 2. Scope

This procedure applies to:

- All confirmed or suspected technology and cybersecurity incidents
- Incidents detected by SOC, reported by staff, or notified by third parties
- Incidents affecting trading systems, market data, settlement systems, client data, and supporting infrastructure
- This procedure shall be activated by any member of the incident response team or SOC

## 3. Detection and Triage

### 3.1 Detection Sources

| Source | Examples | Initial Handler |
|---|---|---|
| SOC/SIEM alerts | Intrusion detection, anomaly alerts, log correlation | SOC Analyst |
| User reports | Phishing, suspicious activity, system malfunction | IT Service Desk |
| Automated monitoring | System health, trading platform alerts, DLP alerts | IT Operations |
| Third-party notification | Vendor alerts, threat intelligence, regulatory advisory | CISO |
| External report | Law enforcement, CERT, media | CISO, Legal |

### 3.2 Triage Steps

| Step | Activity | Responsible | Target Time |
|---|---|---|---|
| 3.2.1 | Log incident in [incident management system] with initial details | SOC Analyst / Service Desk | Within [15] minutes of detection |
| 3.2.2 | Perform initial assessment: scope, affected systems, data impact | SOC Analyst | Within [30] minutes |
| 3.2.3 | Classify severity per POL-IRP-001 incident classification table | SOC Analyst / Incident Commander | Within [30] minutes |
| 3.2.4 | Activate incident response team for P1/P2 incidents | Incident Commander | Immediately upon classification |
| 3.2.5 | Initiate escalation per POL-IRP-001 escalation matrix | Incident Commander | Per escalation timeframes |
| 3.2.6 | Assess whether trading operations are impacted — notify Head of Trading | Incident Commander | Within [30] minutes |

## 4. Containment

### 4.1 Short-Term Containment

| Step | Activity | Responsible |
|---|---|---|
| 4.1.1 | Isolate affected systems from the network (without powering off if forensics needed) | IT Operations |
| 4.1.2 | Block malicious IPs, domains, or accounts identified | SOC / Network Security |
| 4.1.3 | Disable compromised user accounts | Identity and Access Management |
| 4.1.4 | Activate backup trading systems or failover if trading is impacted | Trading Operations, IT Operations |
| 4.1.5 | Preserve volatile evidence before containment actions (see Section 9) | Forensics Lead |

### 4.2 Long-Term Containment

| Step | Activity | Responsible |
|---|---|---|
| 4.2.1 | Apply temporary patches or configuration changes to prevent reinfection | IT Operations |
| 4.2.2 | Implement enhanced monitoring on affected segments | SOC |
| 4.2.3 | Rebuild compromised systems from known-clean images if required | IT Operations |
| 4.2.4 | Validate containment by monitoring for indicators of compromise (IOCs) | SOC |

### 4.3 Decision Matrix

| Scenario | Containment Action | Authorisation Required |
|---|---|---|
| Confirmed ransomware | Immediate network isolation | Incident Commander |
| Trading system compromise | Activate failover, isolate primary | Incident Commander + Head of Trading |
| Client data breach | Disable affected access paths, preserve logs | Incident Commander + CISO |
| Suspected insider threat | Covert monitoring, restrict access without alerting | CISO + Legal + HR |
| DDoS attack | Activate DDoS mitigation, reroute traffic | IT Operations |

## 5. Eradication

| Step | Activity | Responsible |
|---|---|---|
| 5.1 | Identify root cause and all affected systems | Forensics Lead, IT Operations |
| 5.2 | Remove malware, backdoors, and unauthorised access mechanisms | IT Security |
| 5.3 | Apply permanent patches and security updates | IT Operations |
| 5.4 | Reset credentials for all affected and potentially compromised accounts | Identity and Access Management |
| 5.5 | Verify eradication through scanning and monitoring | SOC, IT Security |
| 5.6 | Update threat intelligence with IOCs from this incident | SOC |

## 6. Recovery

| Step | Activity | Responsible | Verification |
|---|---|---|---|
| 6.1 | Restore systems from verified clean backups | IT Operations | Hash verification of backup integrity |
| 6.2 | Rebuild systems from hardened base images where required | IT Operations | Configuration baseline check |
| 6.3 | Perform security testing before returning to production | IT Security | Vulnerability scan, config audit |
| 6.4 | Restore trading systems and validate order processing | Trading Operations | End-to-end trade test |
| 6.5 | Validate market data feed integrity and reconciliation | Trading Operations | Data reconciliation report |
| 6.6 | Gradually restore user access with enhanced monitoring | Identity and Access Management, SOC | Access audit log review |
| 6.7 | Confirm normal operations and close containment measures | Incident Commander | System health dashboard |

### Recovery Priority Order

1. Trading execution and order management systems
2. Settlement and clearing systems
3. Market data feeds and distribution
4. Client-facing portals and APIs
5. Internal operational systems
6. Non-critical supporting systems

## 7. SC Notification

Notifications to the Securities Commission Malaysia shall follow POL-IRP-001, Section 5.

| Step | Activity | Responsible | Timeframe |
|---|---|---|---|
| 7.1 | Assess whether incident meets SC notification threshold | CISO, Legal | Within [1] hour of P1/P2 classification |
| 7.2 | Prepare initial notification using SC notification template | CISO | Within [N] hours of incident detection |
| 7.3 | Obtain approval from [CEO / CRO] | CISO | Before submission |
| 7.4 | Submit initial notification via [SC portal / designated channel] | CISO | Within [N] hours |
| 7.5 | Submit interim updates as situation develops | CISO | Within [N] hours of initial notification |
| 7.6 | Submit final incident report | CISO | Within [N] business days of closure |

### SC Notification Criteria

Notify the SC when an incident involves:

- [ ] Disruption to trading, settlement, or clearing operations exceeding [N] minutes
- [ ] Compromise of client personal data or account information
- [ ] Compromise of market-sensitive information
- [ ] System breaches by external threat actors
- [ ] Incidents affecting multiple market participants
- [ ] Activation of business continuity arrangements

## 8. Post-Incident Review

| Step | Activity | Responsible | Timeframe |
|---|---|---|---|
| 8.1 | Schedule PIR meeting within [N] business days of incident closure | Incident Commander | [N] business days |
| 8.2 | Compile incident timeline, actions taken, and evidence | Forensics Lead | Before PIR meeting |
| 8.3 | Conduct PIR meeting with all involved parties | Incident Commander | Scheduled date |
| 8.4 | Document root cause, contributing factors, and lessons learned | Incident Commander | Within [N] days of PIR |
| 8.5 | Assign remediation actions with owners and deadlines | CRO / CISO | Within [N] days of PIR |
| 8.6 | Report PIR findings to [Risk Committee / Board] | CRO | Next committee meeting |
| 8.7 | Track remediation actions to closure | Risk Management | Until all closed |

## 9. Evidence Preservation

### 9.1 Evidence Collection

| Evidence Type | Collection Method | Priority |
|---|---|---|
| Volatile memory (RAM) | Memory dump tools (e.g., [tool]) | Highest — collect before shutdown |
| System logs | Export from SIEM, copy from log servers | High |
| Network traffic captures | PCAP from network taps/SIEM | High |
| Disk images | Forensic imaging tools (e.g., [tool]) | High |
| Access logs | Export from IAM, PAM, application logs | High |
| Email evidence | Preserve in legal hold | Medium |

### 9.2 Chain of Custody

- All evidence shall be logged in the evidence register with: item, collector, date/time, hash value, storage location
- Evidence shall be stored in [secure evidence locker / encrypted storage] with restricted access
- Chain of custody shall be maintained for potential legal or regulatory proceedings
- Evidence retention period: [N] years or as directed by Legal Counsel
