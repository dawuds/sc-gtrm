# BCM/DR Testing Procedure

---

| Field | Details |
|---|---|
| **Document ID** | PRO-BCM-001 |
| **Version** | 1.0 |
| **Classification** | Confidential |
| **Owner** | Head of Business Continuity |
| **Effective Date** | [DD/MM/YYYY] |
| **Next Review Date** | [DD/MM/YYYY + 1 year] |
| **Approved By** | Chief Risk Officer (CRO) |
| **Regulatory Reference** | SC-GL/2-2023 (R1-2024) |

---

> **NOTICE:** This is an indicative template. Customise for your organisation. Not legal advice. AI-generated content.

---

## Table of Contents

1. [Purpose](#1-purpose)
2. [Scope](#2-scope)
3. [Test Types](#3-test-types)
4. [Trading System Recovery](#4-trading-system-recovery)
5. [Settlement Continuity](#5-settlement-continuity)
6. [Test Schedule](#6-test-schedule)
7. [Test Report Template](#7-test-report-template)
8. [Lessons Learned](#8-lessons-learned)

---

## 1. Purpose

This procedure defines the testing methodology for Business Continuity Management (BCM) and Disaster Recovery (DR) arrangements at [Organisation Name], with particular emphasis on the resilience of trading systems and settlement operations as required by SC-GL/2-2023 (R1-2024).

## 2. Scope

This procedure applies to:

- All critical and high-availability trading platforms and order management systems
- Settlement and clearing systems
- Market data feed infrastructure
- Client-facing portals and communication channels
- Supporting infrastructure: network, data centres, cloud environments
- Critical vendor and third-party service dependencies
- Staff relocation and alternate site arrangements

## 3. Test Types

### 3.1 Tabletop Exercise

| Parameter | Details |
|---|---|
| **Objective** | Validate decision-making, escalation paths, and communication plans |
| **Participants** | Senior management, incident response team, business continuity coordinators |
| **Method** | Facilitator-led walkthrough of a scenario with discussion at decision points |
| **Duration** | [2-4] hours |
| **Frequency** | [Semi-annually] |

Scenario examples for capital market intermediaries:

- Cyber attack resulting in trading platform outage during market hours
- Data centre failure requiring failover to DR site
- Critical market data vendor outage
- Ransomware incident affecting settlement systems
- [Additional scenario relevant to organisation]

### 3.2 Functional Test

| Parameter | Details |
|---|---|
| **Objective** | Verify technical recovery procedures for specific systems |
| **Participants** | IT Operations, system owners, business users for validation |
| **Method** | Execute recovery procedures in [DR / isolated] environment |
| **Duration** | [4-8] hours per system |
| **Frequency** | [Annually] for each critical system |

Test activities:

| Step | Activity | Responsible |
|---|---|---|
| 3.2.1 | Restore system from backup to DR environment | IT Operations |
| 3.2.2 | Validate system functionality and data integrity | System Owner, Business Users |
| 3.2.3 | Measure Recovery Time Actual (RTA) against RTO target | BCM Team |
| 3.2.4 | Measure Recovery Point Actual (RPA) against RPO target | BCM Team |
| 3.2.5 | Document results and deviations | BCM Team |

### 3.3 Full-Scale DR Test

| Parameter | Details |
|---|---|
| **Objective** | Validate end-to-end recovery of all critical systems and business operations from DR site |
| **Participants** | All critical function staff, IT Operations, senior management, critical vendors |
| **Method** | Simulated disaster with full failover to DR site and business operations from alternate location |
| **Duration** | [1-2] business days |
| **Frequency** | [Annually] |

| Step | Activity | Responsible |
|---|---|---|
| 3.3.1 | Declare simulated disaster and activate BCP | Crisis Management Team |
| 3.3.2 | Relocate critical staff to alternate site (if applicable) | BCM Coordinators |
| 3.3.3 | Initiate DR failover for all critical systems | IT Operations |
| 3.3.4 | Execute trading system recovery (Section 4) | Trading Operations, IT Operations |
| 3.3.5 | Execute settlement continuity procedures (Section 5) | Settlement Operations |
| 3.3.6 | Validate client-facing services and communications | Business Units |
| 3.3.7 | Operate from DR for [N] hours to confirm stability | All participants |
| 3.3.8 | Execute failback to primary site | IT Operations |
| 3.3.9 | Validate normal operations restored | All participants |

## 4. Trading System Recovery

### 4.1 Recovery Objectives

| System | RTO | RPO | Minimum Service Level |
|---|---|---|---|
| Trading execution engine | [N] hours | [N] minutes | Order submission and execution |
| Order management system | [N] hours | [N] minutes | Order routing and status |
| Market data distribution | [N] hours | [N] minutes | Real-time price feeds |
| Risk management (pre-trade) | [N] hours | [N] minutes | Pre-trade risk checks active |
| Client trading portal | [N] hours | [N] hours | Client order entry |

### 4.2 Recovery Steps

| Step | Activity | Responsible | Target Time |
|---|---|---|---|
| 4.2.1 | Activate DR trading systems from last known-good state | IT Operations | T+[N] min |
| 4.2.2 | Restore market data connectivity to DR site | IT Operations | T+[N] min |
| 4.2.3 | Validate pre-trade risk controls are operational | Risk Management | T+[N] min |
| 4.2.4 | Reconcile open orders and positions with exchange records | Trading Operations | T+[N] min |
| 4.2.5 | Execute test trades in [UAT / controlled mode] | Trading Operations | T+[N] min |
| 4.2.6 | Confirm connectivity to [Bursa Malaysia / exchanges] | IT Operations | T+[N] min |
| 4.2.7 | Obtain sign-off to resume live trading | Head of Trading, CRO | T+[N] min |

### 4.3 Trading System Test Checklist

- [ ] Order submission and execution confirmed
- [ ] Market data feeds displaying correctly
- [ ] Pre-trade risk limits enforced
- [ ] Kill switch functional (see PRO-ATC-001)
- [ ] Position reconciliation accurate
- [ ] Client connectivity restored
- [ ] Regulatory reporting systems operational

## 5. Settlement Continuity

### 5.1 Recovery Objectives

| System | RTO | RPO |
|---|---|---|
| Settlement processing system | [N] hours | [N] hours |
| SWIFT / payment gateway | [N] hours | [N] hours |
| Custodian interface | [N] hours | [N] hours |
| Regulatory reporting | [N] hours | [N] hours |

### 5.2 Continuity Steps

| Step | Activity | Responsible |
|---|---|---|
| 5.2.1 | Activate DR settlement systems | IT Operations |
| 5.2.2 | Validate connectivity to clearing house and custodians | Settlement Operations |
| 5.2.3 | Reconcile pending settlements against counterparty records | Settlement Operations |
| 5.2.4 | Process test settlement transactions | Settlement Operations |
| 5.2.5 | Confirm SWIFT/payment gateway connectivity | Treasury Operations |
| 5.2.6 | Validate regulatory reporting capability | Compliance |

## 6. Test Schedule

| Test Type | Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|---|
| Tabletop exercise | [Scenario] | | [Scenario] | |
| Trading system functional test | | [Systems] | | |
| Settlement system functional test | | | [Systems] | |
| Network/infrastructure DR test | [Scope] | | | |
| Full-scale DR test | | | | [Full scope] |
| Vendor BCP participation test | | [Vendors] | | |
| Alternate site activation test | | | [Test] | |

- Test schedule shall be approved by [CRO / Risk Committee] at the start of each year
- The Securities Commission Malaysia shall be notified of test results as required by SC-GL/2-2023 (R1-2024)

## 7. Test Report Template

Each BCM/DR test shall produce a report containing:

| Section | Content |
|---|---|
| **Test ID** | [Unique test reference] |
| **Test type** | Tabletop / Functional / Full-scale |
| **Date conducted** | [Date] |
| **Participants** | [Names and roles] |
| **Scenario** | [Description of simulated incident] |
| **Systems tested** | [List of systems in scope] |
| **RTO target vs. actual** | [For each system] |
| **RPO target vs. actual** | [For each system] |
| **Test result** | Pass / Partial Pass / Fail |
| **Issues identified** | [List with severity] |
| **Remediation actions** | [Actions, owners, target dates] |
| **Recommendations** | [Process and plan improvements] |
| **Sign-off** | [BCM Lead, CRO] |

## 8. Lessons Learned

### 8.1 Post-Test Review

| Step | Activity | Responsible | Timeframe |
|---|---|---|---|
| 8.1.1 | Conduct debrief session with all participants | BCM Lead | Within [N] business days |
| 8.1.2 | Document findings: what worked, what failed, what was missing | BCM Lead | Within [N] business days |
| 8.1.3 | Assign remediation actions for identified gaps | CRO / BCM Lead | Within [N] business days |
| 8.1.4 | Update BCP/DR plans based on findings | BCM Lead | Within [N] business days |
| 8.1.5 | Report results and remediation plan to [Risk Committee / Board] | CRO | Next committee meeting |
| 8.1.6 | Track remediation actions to closure | BCM Lead | Until all closed |

### 8.2 Continuous Improvement

- Lessons from each test shall be incorporated into subsequent test scenarios
- RTO/RPO targets shall be reassessed [annually] based on test results and business changes
- BCM/DR plans shall be updated within [N] days of any test that identifies gaps
- Year-on-year test result trends shall be reported to the Board [annually]
