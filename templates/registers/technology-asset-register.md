# Technology Asset Register

---

| Field | Details |
|---|---|
| **Document ID** | SCGTRM-REG-002 |
| **Version** | 1.0 |
| **Classification** | Confidential |
| **Owner** | Chief Technology Officer |
| **Effective Date** | [Date] |
| **Next Review Date** | [Date + 3 months] |
| **Regulatory Reference** | SC-GL/6-2023 |

---

## Asset Inventory

| ID | Asset Name | Type | Criticality | Owner | Location | Vendor | Support End | Dependencies | Data Classification |
|---|---|---|---|---|---|---|---|---|---|
| TA-001 | [Trading Platform] | Application | Critical | [Owner] | [DC/Cloud] | [Vendor] | [Date] | [Settlement, Market Data] | Confidential |
| TA-002 | [Settlement System] | Application | Critical | [Owner] | [DC/Cloud] | [Vendor] | [Date] | [Trading, Banking] | Confidential |
| TA-003 | [Market Data Feed] | Infrastructure | Critical | [Owner] | [DC] | [Vendor] | [Date] | [Trading Platform] | Internal |
| TA-004 | [Client Portal] | Application | High | [Owner] | [Cloud] | [Vendor] | [Date] | [CRM, Trading] | Confidential |
| TA-005 | [Algorithmic Trading Engine] | Application | Critical | [Owner] | [DC] | [In-house] | N/A | [Market Data, Risk Engine] | Restricted |

## Criticality Classification

| Level | Definition | RTO | RPO |
|---|---|---|---|
| **Critical** | Failure causes immediate market impact, regulatory breach, or settlement failure | < 2 hours | < 15 minutes |
| **High** | Failure causes significant operational disruption or client impact | < 4 hours | < 1 hour |
| **Medium** | Failure causes moderate inconvenience, workarounds available | < 8 hours | < 4 hours |
| **Low** | Failure has minimal operational impact | < 24 hours | < 24 hours |
