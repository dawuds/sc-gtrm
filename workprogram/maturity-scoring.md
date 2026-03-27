# SC-GL/6-2023 Technology Risk Management — Maturity Scoring Worksheet

| Field | Value |
|---|---|
| **Framework** | SC-GL/6-2023 Guidelines on Technology Risk Management |
| **Version** | 1.0 |
| **Date** | 2026-03-27 |
| **Entity Name** | ___________________________ |
| **Assessor** | ___________________________ |
| **Assessment Period** | ___________________________ |

> **Disclaimer:** This worksheet is constructed-indicative and intended for educational purposes only. It is not a verbatim extract from Securities Commission Malaysia guidelines and does not constitute legal, regulatory, or professional advice. AI-generated content. Always consult the official SC-GL/6-2023 guidelines and qualified regulatory counsel before conducting formal assessments.

---

## Scoring Methodology

### Maturity Scale

| Score | Level | Description |
|---|---|---|
| **0** | Not Implemented | No evidence of the control being in place. The activity is absent or completely informal. |
| **1** | Basic | Ad-hoc or reactive implementation. Controls exist but are inconsistent, undocumented, or dependent on individual effort. |
| **2** | Mature | Documented, structured, and consistently applied. Controls are repeatable, measured, and reviewed periodically. |
| **3** | Advanced | Optimised and continuously improving. Controls are automated where appropriate, integrated across the enterprise, and leverage analytics or emerging capabilities. |
| **N/A** | Not Applicable | The control does not apply to the entity's operations (must be justified in Assessor Notes). |

### Scoring Rules

- Each control receives a score of 0, 1, 2, 3, or N/A.
- **Domain Score** = Average of all scored controls in the domain (N/A controls are excluded from the denominator).
- **Overall Score** = Weighted average of domain scores, using the weights assigned in the summary table.

### Weighted Scoring

Domain weights reflect the relative importance of each domain to the entity's risk profile. Default weights are equal (1.0 per domain). Adjust weights based on entity type:

| Entity Type | Suggested Higher Weights | Suggested Lower Weights |
|---|---|---|
| Broker-dealer (with algo trading) | Cybersecurity, Business Continuity, Emerging Technology | Cloud Services |
| Fund manager | Data Management, Third-Party Risk | Emerging Technology (if no algo trading) |
| Market operator | Business Continuity, Cybersecurity, Incident Management | Cloud Services (if on-premises) |
| Digital asset exchange | Emerging Technology, Cybersecurity, Incident Management | — |

Weights must be documented and justified in the assessment report.

---

## Domain 1: Governance and Oversight

**Domain Description:** Controls for establishing technology risk governance structures, board and senior management accountability, technology risk appetite, and roles and responsibilities for capital market entities regulated by SC Malaysia.

| Control Slug | Control Name | Score (0-3 / N/A) | Evidence Ref | Assessor Notes |
|---|---|---|---|---|
| technology-risk-governance-framework | Technology Risk Governance Framework | | | |
| ciso-designation | CISO Designation & Authority | | | |
| technology-risk-policy-suite | Technology Risk Policy Suite | | | |
| technology-risk-reporting | Technology Risk Reporting | | | |

**Maturity Level Reference:**

| Control | Basic (1) | Mature (2) | Advanced (3) |
|---|---|---|---|
| technology-risk-governance-framework | Ad-hoc governance with no formal framework | Documented framework with committee structure | Integrated governance with real-time risk dashboards |
| ciso-designation | Security responsibilities assigned to IT manager | Dedicated CISO with board reporting | CISO with enterprise-wide authority and strategic influence |
| technology-risk-policy-suite | Partial policy coverage with inconsistent review | Complete policy suite with annual board review | Dynamic policies with automated compliance monitoring |
| technology-risk-reporting | Ad-hoc reporting on incidents only | Structured quarterly reporting with KRIs | Real-time risk dashboard with predictive analytics |

**Domain 1 Score:** _____ / 3.0

---

## Domain 2: Cybersecurity

**Domain Description:** Controls for protecting capital market systems and data from cyber threats, including threat management, security operations, vulnerability management, and security architecture for market operators and intermediaries.

| Control Slug | Control Name | Score (0-3 / N/A) | Evidence Ref | Assessor Notes |
|---|---|---|---|---|
| cyber-threat-management | Cyber Threat Management | | | |
| security-operations-centre | Security Operations Centre | | | |
| vulnerability-management-programme | Vulnerability Management Programme | | | |
| network-security-architecture | Network Security Architecture | | | |

**Maturity Level Reference:**

| Control | Basic (1) | Mature (2) | Advanced (3) |
|---|---|---|---|
| cyber-threat-management | Reactive threat response only | Proactive threat intelligence with SOC | Advanced threat hunting with ML-based detection |
| security-operations-centre | Basic log monitoring during business hours | 24/7 SOC with SIEM and SOAR | AI-augmented SOC with automated response orchestration |
| vulnerability-management-programme | Ad-hoc patching with no scanning | Regular scanning with risk-based patching SLAs | Continuous scanning with automated patch deployment |
| network-security-architecture | Flat network with basic firewall | Segmented network with IDS/IPS and monitoring | Zero-trust architecture with microsegmentation |

**Domain 2 Score:** _____ / 3.0

---

## Domain 3: Technology Risk Assessment

**Domain Description:** Controls for systematic identification, analysis, evaluation, and treatment of technology risks specific to capital market operations, including algorithmic trading risks and market infrastructure dependencies.

| Control Slug | Control Name | Score (0-3 / N/A) | Evidence Ref | Assessor Notes |
|---|---|---|---|---|
| technology-risk-assessment-framework | Technology Risk Assessment Framework | | | |
| algorithmic-trading-risk-controls | Algorithmic Trading Risk Controls | | | |
| technology-change-risk-assessment | Technology Change Risk Assessment | | | |

**Maturity Level Reference:**

| Control | Basic (1) | Mature (2) | Advanced (3) |
|---|---|---|---|
| technology-risk-assessment-framework | Ad-hoc risk identification | Structured annual assessment with defined methodology | Continuous risk assessment with automated risk signals |
| algorithmic-trading-risk-controls | Basic order size limits only | Comprehensive pre-trade and post-trade controls with kill switch | Real-time ML-based anomaly detection with automated circuit breakers |
| technology-change-risk-assessment | Changes deployed without risk assessment | Risk-based change classification with approval gates | Automated risk scoring with continuous deployment pipelines |

**Domain 3 Score:** _____ / 3.0

---

## Domain 4: Cloud Services

**Domain Description:** Controls for cloud service adoption, risk assessment, data residency, and governance specific to capital market intermediaries, covering market data and client information protection in cloud environments.

| Control Slug | Control Name | Score (0-3 / N/A) | Evidence Ref | Assessor Notes |
|---|---|---|---|---|
| cloud-risk-assessment | Cloud Risk Assessment | | | |
| cloud-data-governance | Cloud Data Governance | | | |
| cloud-exit-strategy | Cloud Exit Strategy | | | |

**Maturity Level Reference:**

| Control | Basic (1) | Mature (2) | Advanced (3) |
|---|---|---|---|
| cloud-risk-assessment | No cloud-specific risk assessment | Structured cloud risk framework applied per engagement | Continuous cloud security posture monitoring |
| cloud-data-governance | Basic encryption with CSP-managed keys | BYOK with data classification and access monitoring | Automated data governance with DLP and rights management |
| cloud-exit-strategy | No cloud exit planning | Documented exit plans with portability requirements | Tested multi-cloud failover with automated migration |

**Domain 4 Score:** _____ / 3.0

---

## Domain 5: Third-Party Risk

**Domain Description:** Controls for managing technology outsourcing and third-party service provider risks for capital market entities, including vendor assessment, monitoring, and contractual requirements aligned with SC guidelines.

| Control Slug | Control Name | Score (0-3 / N/A) | Evidence Ref | Assessor Notes |
|---|---|---|---|---|
| third-party-risk-assessment | Third-Party Risk Assessment | | | |
| outsourcing-governance | Outsourcing Governance | | | |
| vendor-performance-monitoring | Vendor Performance Monitoring | | | |
| fourth-party-oversight | Fourth-Party Oversight | | | |

**Maturity Level Reference:**

| Control | Basic (1) | Mature (2) | Advanced (3) |
|---|---|---|---|
| third-party-risk-assessment | Basic vendor checks at onboarding | Tiered assessment programme with annual reviews | Continuous vendor risk monitoring with automated scoring |
| outsourcing-governance | Informal outsourcing management | Formal governance with policy and board oversight | Integrated outsourcing governance with enterprise risk |
| vendor-performance-monitoring | Reliance on vendor self-reporting | Automated SLA monitoring with exception reporting | Predictive performance analytics with proactive management |
| fourth-party-oversight | No fourth-party visibility | Fourth-party register with assessment | Continuous supply chain risk monitoring |

**Domain 5 Score:** _____ / 3.0

---

## Domain 6: Data Management

**Domain Description:** Controls for ensuring integrity, confidentiality, and availability of market data and client information, including data governance frameworks, classification, and protection measures for capital market operations.

| Control Slug | Control Name | Score (0-3 / N/A) | Evidence Ref | Assessor Notes |
|---|---|---|---|---|
| data-governance-framework | Data Governance Framework | | | |
| market-data-integrity | Market Data Integrity | | | |
| client-data-protection | Client Data Protection | | | |

**Maturity Level Reference:**

| Control | Basic (1) | Mature (2) | Advanced (3) |
|---|---|---|---|
| data-governance-framework | No formal data governance | Documented framework with classification and quality controls | Automated data governance with lineage tracking |
| market-data-integrity | Manual data quality checks | Automated validation with reconciliation | Real-time data quality monitoring with anomaly detection |
| client-data-protection | Basic encryption with minimal access controls | Comprehensive DLP with RBAC and monitoring | Zero-trust data protection with automated classification |

**Domain 6 Score:** _____ / 3.0

---

## Domain 7: Business Continuity

**Domain Description:** Controls for maintaining continuity of capital market operations, trading systems, and settlement processes during technology disruptions, including BCM and DR requirements specific to market infrastructure.

| Control Slug | Control Name | Score (0-3 / N/A) | Evidence Ref | Assessor Notes |
|---|---|---|---|---|
| bcm-programme | BCM Programme for Market Operations | | | |
| trading-system-resilience | Trading System Resilience | | | |
| dr-testing-programme | DR Testing Programme | | | |
| settlement-continuity | Settlement Continuity | | | |

**Maturity Level Reference:**

| Control | Basic (1) | Mature (2) | Advanced (3) |
|---|---|---|---|
| bcm-programme | Basic BCP without market-specific considerations | Comprehensive BCP with market operation focus | Dynamic BCP with real-time impact assessment |
| trading-system-resilience | Single trading system with manual recovery | Redundant systems with tested failover | Active-active trading with zero-downtime failover |
| dr-testing-programme | No regular DR testing | Annual DR testing with industry participation | Continuous DR readiness with automated failover testing |
| settlement-continuity | No alternative settlement procedures | Documented manual fallback with testing | Automated settlement failover with real-time coordination |

**Domain 7 Score:** _____ / 3.0

---

## Domain 8: Incident Management

**Domain Description:** Controls for detecting, responding to, and recovering from technology incidents affecting capital market operations, including mandatory notification to SC and coordination with market participants.

| Control Slug | Control Name | Score (0-3 / N/A) | Evidence Ref | Assessor Notes |
|---|---|---|---|---|
| incident-response-plan | Incident Response Plan | | | |
| sc-incident-notification | SC Incident Notification | | | |
| cyber-incident-coordination | Cyber Incident Coordination | | | |
| incident-post-mortem | Incident Post-Mortem & Lessons Learned | | | |

**Maturity Level Reference:**

| Control | Basic (1) | Mature (2) | Advanced (3) |
|---|---|---|---|
| incident-response-plan | Ad-hoc incident response | Documented plan with regular exercises | Automated incident orchestration with playbooks |
| sc-incident-notification | Manual notification with inconsistent timing | Standardised notification process with tracking | Automated notification workflow with regulatory alerts |
| cyber-incident-coordination | No coordination mechanisms | Established protocols with key stakeholders | Real-time coordination platform with automated sharing |
| incident-post-mortem | Informal verbal debrief | Structured post-mortem with tracked actions | Automated trend analysis with preventive recommendations |

**Domain 8 Score:** _____ / 3.0

---

## Domain 9: Technology Audit

**Domain Description:** Controls for independent assessment and assurance of technology risk management effectiveness, including internal audit capabilities, external assessments, and regulatory examination readiness for SC-regulated entities.

| Control Slug | Control Name | Score (0-3 / N/A) | Evidence Ref | Assessor Notes |
|---|---|---|---|---|
| technology-audit-programme | Technology Audit Programme | | | |
| regulatory-examination-readiness | Regulatory Examination Readiness | | | |
| penetration-testing-programme | Penetration Testing Programme | | | |

**Maturity Level Reference:**

| Control | Basic (1) | Mature (2) | Advanced (3) |
|---|---|---|---|
| technology-audit-programme | Ad-hoc technology audits | Risk-based annual programme with qualified auditors | Continuous assurance with automated testing |
| regulatory-examination-readiness | Scramble to prepare for examinations | Standing evidence library with regular updates | Continuous compliance monitoring with regulatory dashboard |
| penetration-testing-programme | No regular penetration testing | Annual testing with qualified testers | Continuous red team exercises with purple team collaboration |

**Domain 9 Score:** _____ / 3.0

---

## Domain 10: Emerging Technology

**Domain Description:** Controls for assessing and managing risks associated with emerging technologies in capital markets, including algorithmic trading, artificial intelligence, distributed ledger technology, and digital assets.

| Control Slug | Control Name | Score (0-3 / N/A) | Evidence Ref | Assessor Notes |
|---|---|---|---|---|
| algorithmic-trading-governance | Algorithmic Trading Governance | | | |
| ai-ml-risk-management | AI/ML Risk Management | | | |
| dlt-digital-asset-controls | DLT & Digital Asset Controls | | | |

**Maturity Level Reference:**

| Control | Basic (1) | Mature (2) | Advanced (3) |
|---|---|---|---|
| algorithmic-trading-governance | No formal algorithm governance | Documented approval and testing process | Automated algorithm monitoring with anomaly detection |
| ai-ml-risk-management | No AI/ML risk framework | Model risk management for AI applications | Comprehensive AI governance with continuous monitoring |
| dlt-digital-asset-controls | No DLT-specific controls | Security assessments and key management procedures | Formal verification of smart contracts with continuous monitoring |

**Domain 10 Score:** _____ / 3.0

---

## Summary Scoring Table

| # | Domain | Controls | Domain Score | Weight | Weighted Score |
|---|---|---|---|---|---|
| 1 | Governance and Oversight | 4 | _____ | _____ | _____ |
| 2 | Cybersecurity | 4 | _____ | _____ | _____ |
| 3 | Technology Risk Assessment | 3 | _____ | _____ | _____ |
| 4 | Cloud Services | 3 | _____ | _____ | _____ |
| 5 | Third-Party Risk | 4 | _____ | _____ | _____ |
| 6 | Data Management | 3 | _____ | _____ | _____ |
| 7 | Business Continuity | 4 | _____ | _____ | _____ |
| 8 | Incident Management | 4 | _____ | _____ | _____ |
| 9 | Technology Audit | 3 | _____ | _____ | _____ |
| 10 | Emerging Technology | 3 | _____ | _____ | _____ |
| | **Total** | **35** | | **Sum of Weights:** _____ | **Overall Score:** _____ |

**Overall Score Calculation:** Sum of Weighted Scores / Sum of Weights = _____ / 3.0

---

## Interpretation Guide

| Score Range | Rating | Interpretation |
|---|---|---|
| **0.0 - 1.0** | Significant Gaps | Critical deficiencies exist. Immediate remediation required. Entity may not meet minimum SC-GL/6-2023 expectations. |
| **1.0 - 2.0** | Developing | Controls are partially implemented but lack consistency and documentation. Focused improvement plan needed. |
| **2.0 - 2.5** | Mature | Controls are documented, structured, and consistently applied. Entity meets SC-GL/6-2023 expectations with minor improvement opportunities. |
| **2.5 - 3.0** | Advanced | Controls are optimised, automated, and continuously improving. Entity exceeds baseline expectations and demonstrates leading practice. |

---

## Overall Assessment Narrative

**Overall Maturity Rating:** _____________________________

**Key Strengths:**

1. _______________________________________________________________
2. _______________________________________________________________
3. _______________________________________________________________

**Key Gaps / Areas for Improvement:**

1. _______________________________________________________________
2. _______________________________________________________________
3. _______________________________________________________________

**Priority Recommendations:**

1. _______________________________________________________________
2. _______________________________________________________________
3. _______________________________________________________________

**Assessor Signature:** ___________________________ **Date:** _______________

**Reviewer Signature:** ___________________________ **Date:** _______________

---

> **Disclaimer:** This worksheet is constructed-indicative and intended for educational purposes only. It does not constitute legal, regulatory, or professional advice. Content is AI-generated. Always consult the official SC-GL/6-2023 guidelines and qualified regulatory counsel.
