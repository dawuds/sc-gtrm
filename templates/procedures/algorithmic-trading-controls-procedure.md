# Algorithmic Trading Controls Procedure

---

| Field | Details |
|---|---|
| **Document ID** | PRO-ATC-001 |
| **Version** | 1.0 |
| **Classification** | Confidential |
| **Owner** | Head of Trading / Chief Technology Officer (CTO) |
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
3. [Pre-Trade Risk Controls](#3-pre-trade-risk-controls)
4. [Kill Switch Procedures](#4-kill-switch-procedures)
5. [Algorithm Approval Process](#5-algorithm-approval-process)
6. [Algorithm Testing Requirements](#6-algorithm-testing-requirements)
7. [Market Manipulation Prevention](#7-market-manipulation-prevention)
8. [Monitoring and Surveillance](#8-monitoring-and-surveillance)
9. [Reporting](#9-reporting)

---

## 1. Purpose

This procedure establishes the operational controls for algorithmic and automated trading systems at [Organisation Name], ensuring that trading algorithms operate within defined risk parameters and comply with SC-GL/2-2023 (R1-2024) technology risk management requirements and Securities Commission Malaysia market conduct expectations.

## 2. Scope

This procedure applies to:

- All algorithmic trading strategies deployed in production by [Organisation Name]
- High-frequency trading (HFT) systems, if applicable
- Smart order routing (SOR) algorithms
- Automated market-making algorithms
- Direct Market Access (DMA) systems provided to clients
- All trading venues accessed: [Bursa Malaysia, other venues]
- Pre-production testing, UAT, and simulation environments for trading algorithms

## 3. Pre-Trade Risk Controls

### 3.1 Price Limits

| Control | Parameter | Value | Action on Breach |
|---|---|---|---|
| **Single order price limit** | Maximum deviation from reference price | [N]% | Order rejected |
| **Spread limit** | Maximum bid-ask spread for market-making algos | [N] ticks | Order rejected or held |
| **Price collar** | Orders outside [exchange / internal] price band | [N]% from last traded price | Order rejected |
| **Stale price protection** | Order based on market data older than [N] seconds | [N] seconds | Order held for manual review |

### 3.2 Volume Limits

| Control | Parameter | Value | Action on Breach |
|---|---|---|---|
| **Single order quantity limit** | Maximum shares/lots per order | [N] units | Order rejected |
| **Cumulative volume limit** | Maximum aggregate volume per algo per [period] | [N] units per [hour/day] | Algo throttled or paused |
| **Notional value limit** | Maximum order value | RM [amount] | Order rejected |
| **Cumulative notional limit** | Maximum aggregate value per algo per [period] | RM [amount] per [day] | Algo paused, escalation |
| **Message rate limit** | Maximum orders/amendments per second | [N] per second | Algo throttled |

### 3.3 Position Limits

| Control | Parameter | Value |
|---|---|---|
| **Net position limit per instrument** | Maximum net exposure | [N] units / RM [amount] |
| **Gross position limit per algo** | Maximum gross exposure | RM [amount] |
| **Portfolio-level limit** | Aggregate across all algos | RM [amount] |
| **Loss limit per algo** | Maximum unrealised loss before auto-stop | RM [amount] |
| **Daily loss limit (firm-wide)** | Aggregate loss across all algos | RM [amount] |

All pre-trade risk controls shall be implemented in [hardware / software] and operate with latency not exceeding [N] microseconds.

## 4. Kill Switch Procedures

### 4.1 Kill Switch Levels

| Level | Scope | Trigger | Authorisation | Effect |
|---|---|---|---|---|
| **Level 1** | Single algorithm | Pre-defined parameter breach | Automatic | Cancel all open orders from algo, halt algo |
| **Level 2** | All algorithms for a specific instrument | Unusual market conditions in instrument | Trading desk + Risk | Cancel all algo orders in instrument |
| **Level 3** | All algorithms across all instruments | Firm-wide risk event, system malfunction | Head of Trading + CRO | Cancel all algo orders, halt all algos |
| **Level 4** | Full market disconnect | System integrity compromise, exchange directive | CTO + CEO | Disconnect from all trading venues |

### 4.2 Kill Switch Activation Steps

| Step | Activity | Responsible |
|---|---|---|
| 4.2.1 | Identify trigger condition (automatic or manual) | Trading Systems / Risk / SOC |
| 4.2.2 | Activate kill switch at appropriate level | Authorised personnel per 4.1 |
| 4.2.3 | Confirm all targeted orders cancelled via exchange acknowledgement | Trading Operations |
| 4.2.4 | Verify algo has halted and no new orders submitted | Trading Systems |
| 4.2.5 | Assess position and exposure following cancellation | Risk Management |
| 4.2.6 | Notify [Head of Trading, CRO, Compliance] | Trading Operations |
| 4.2.7 | Notify Bursa Malaysia / exchange if required | Compliance |
| 4.2.8 | Document activation in [incident log / trading systems log] | Trading Operations |

### 4.3 Kill Switch Testing

- Kill switch functionality shall be tested [monthly] during non-trading hours
- Test results shall confirm cancellation within [N] milliseconds of activation
- Failed kill switch tests shall be treated as [P1 / P2] incidents per POL-IRP-001

## 5. Algorithm Approval Process

| Step | Activity | Responsible | Gate |
|---|---|---|---|
| 5.1 | Strategy proposal and business case | Quant / Trading Desk | -- |
| 5.2 | Risk assessment of algorithm behaviour and market impact | Risk Management | Risk sign-off |
| 5.3 | Compliance review for market conduct rules | Compliance | Compliance sign-off |
| 5.4 | Technical review of code quality and control integration | Technology / CTO | Technical sign-off |
| 5.5 | Testing in simulation environment (Section 6) | Quant / QA Team | Test pass |
| 5.6 | UAT with business validation | Trading Desk | UAT sign-off |
| 5.7 | Pre-trade risk control calibration and verification | Risk Management | Control verification |
| 5.8 | Final approval for production deployment | Algorithm Governance Committee: [Head of Trading, CRO, CTO, Compliance] | Committee approval |
| 5.9 | Controlled production launch with enhanced monitoring | Trading Systems, Risk | -- |

### Algorithm Change Management

- Material changes to approved algorithms shall follow the full approval process (Steps 5.2-5.8)
- Minor parameter adjustments shall require approval from [Head of Trading + Risk Management]
- All changes shall be version-controlled and auditable

## 6. Algorithm Testing Requirements

### 6.1 Testing Stages

| Stage | Environment | Objective | Duration |
|---|---|---|---|
| **Unit testing** | Development | Code correctness, logic validation | Per development cycle |
| **Backtesting** | Historical data | Strategy performance, risk metrics | [N] years of historical data |
| **Simulation testing** | Simulated market environment | Behaviour under normal and stress conditions | Minimum [N] weeks |
| **Stress testing** | Simulated with extreme scenarios | Performance under flash crash, illiquidity, high volatility | [N] scenarios |
| **UAT** | Pre-production (live market data, simulated execution) | End-to-end validation with business users | Minimum [N] days |
| **Controlled production** | Production with reduced limits | Live market with conservative parameters | [N] days |

### 6.2 Mandatory Test Scenarios

- [ ] Normal market conditions — standard volume and volatility
- [ ] High volatility — market moves exceeding [N] standard deviations
- [ ] Low liquidity — order book depth below [N]% of normal
- [ ] Market data disruption — delayed, stale, or missing data
- [ ] Exchange circuit breaker activation
- [ ] Kill switch activation and recovery
- [ ] Network latency spike exceeding [N] milliseconds
- [ ] Concurrent algorithm interaction (if multiple algos trade same instruments)

## 7. Market Manipulation Prevention

### 7.1 Prohibited Patterns

[Organisation Name] algorithms shall be designed to prevent, and monitored for, the following:

| Pattern | Description | Detection Method |
|---|---|---|
| **Spoofing** | Placing orders with intent to cancel before execution | Order-to-trade ratio monitoring |
| **Layering** | Multiple orders at different price levels to create false depth | Order book analysis |
| **Quote stuffing** | High-frequency order submission to slow exchange systems | Message rate monitoring |
| **Momentum ignition** | Orders designed to trigger other algorithms | Price impact analysis |
| **Wash trading** | Trading against oneself to inflate volumes | Trade surveillance |
| **Marking the close** | Orders to influence closing price | End-of-day order pattern analysis |

### 7.2 Controls

- Order-to-trade ratio shall not exceed [N]:1 per instrument per session
- Algorithms shall include mandatory minimum resting time of [N] milliseconds for orders
- Self-trade prevention controls shall be active for all algorithms
- All algorithms shall have unique identifiers for audit trail purposes

## 8. Monitoring and Surveillance

### 8.1 Real-Time Monitoring

| Monitor | Parameter | Alert Threshold | Responsible |
|---|---|---|---|
| Algorithm P&L | Per-algo unrealised P&L | Loss exceeding RM [amount] | Risk Management |
| Order rate | Orders per second per algo | Exceeding [N] per second | Trading Systems |
| Fill rate | Execution rate vs. expected | Deviation exceeding [N]% | Trading Desk |
| Market impact | Price movement post-execution | Exceeding [N] bps | Risk Management |
| Position exposure | Net and gross exposure | Approaching [N]% of limit | Risk Management |
| Error rate | Rejected/failed orders | Exceeding [N] per [period] | Trading Systems |

### 8.2 Post-Trade Surveillance

| Activity | Frequency | Responsible |
|---|---|---|
| Trade pattern analysis for market manipulation indicators | [Daily] | Compliance Surveillance |
| Order-to-trade ratio review | [Daily] | Compliance Surveillance |
| Algorithm performance vs. benchmark | [Daily / Weekly] | Trading Desk, Risk |
| Cross-algorithm interaction review | [Weekly] | Risk Management |
| Regulatory reporting reconciliation | [Daily] | Compliance |

## 9. Reporting

| Report | Audience | Frequency | Content |
|---|---|---|---|
| Algorithm performance dashboard | Head of Trading, CTO | Real-time | P&L, positions, risk utilisation, alerts |
| Kill switch activation report | CRO, Compliance | On each activation | Trigger, impact, resolution |
| Algorithm risk summary | Risk Committee | [Monthly] | Active algos, risk metrics, incidents, limit breaches |
| Surveillance findings | Compliance, CRO | [Monthly] | Manipulation indicators, investigations, regulatory reports |
| SC regulatory report | Securities Commission Malaysia | As required per SC-GL/2-2023 (R1-2024) | Algorithm inventory, incidents, control effectiveness |
| Algorithm governance report | Board / Risk Committee | [Quarterly] | New approvals, changes, decommissions, risk posture |

All algorithm trading records, orders, and audit logs shall be retained for [7] years per POL-DMP-001.
