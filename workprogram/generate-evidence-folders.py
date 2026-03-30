#!/usr/bin/env python3
"""
SC-GTRM Evidence Folder Structure Generator

Creates a standardised evidence folder structure for SC-GL/6-2023
technology risk management assessments. Generates the directory tree
and README.md files with control references, expected evidence, and
naming conventions.

Usage:
    python3 generate-evidence-folders.py [output_directory]

If no output directory is specified, creates SC-GTRM-Evidence/ in the
current working directory.
"""

import os
import sys
import json
from pathlib import Path

# ---------------------------------------------------------------------------
# Folder structure definition
# ---------------------------------------------------------------------------

STRUCTURE = {
    "00-Engagement": {
        "subfolders": [
            "engagement-letter",
            "scope-agreement",
            "team-assignment",
            "entity-information",
            "planning-notes",
        ],
    },
    "01-Governance-Risk-Audit": {
        "subfolders": [
            "GRA-01-governance-framework",
            "GRA-02-ciso-designation",
            "GRA-03-policy-suite",
            "GRA-04-risk-reporting",
            "GRA-05-risk-assessment-framework",
            "GRA-06-algo-trading-controls",
            "GRA-07-change-risk-assessment",
            "GRA-08-audit-programme",
            "GRA-09-regulatory-readiness",
            "GRA-10-penetration-testing",
        ],
        "awp_sheet": "Sheet 2 — Governance, Risk & Audit",
    },
    "02-Cybersecurity": {
        "subfolders": [
            "CYB-01-threat-management",
            "CYB-02-soc",
            "CYB-03-vulnerability-management",
            "CYB-04-network-security",
        ],
        "awp_sheet": "Sheet 3 — Cybersecurity",
    },
    "03-Resilience-Incident": {
        "subfolders": [
            "RIM-01-bcm-programme",
            "RIM-02-trading-resilience",
            "RIM-03-dr-testing",
            "RIM-04-settlement-continuity",
            "RIM-05-incident-response",
            "RIM-06-sc-notification",
            "RIM-07-incident-coordination",
            "RIM-08-post-mortem",
        ],
        "awp_sheet": "Sheet 4 — Resilience & Incident Management",
    },
    "04-Third-Party-Cloud": {
        "subfolders": [
            "TPC-01-third-party-assessment",
            "TPC-02-outsourcing-governance",
            "TPC-03-vendor-monitoring",
            "TPC-04-fourth-party",
            "TPC-05-cloud-risk-assessment",
            "TPC-06-cloud-data-governance",
            "TPC-07-cloud-exit-strategy",
        ],
        "awp_sheet": "Sheet 5 — Third-Party & Cloud",
    },
    "05-Data-Emerging-Tech": {
        "subfolders": [
            "DET-01-data-governance",
            "DET-02-market-data-integrity",
            "DET-03-client-data-protection",
            "DET-04-algo-trading-governance",
            "DET-05-ai-ml-risk",
            "DET-06-dlt-digital-assets",
        ],
        "awp_sheet": "Sheet 6 — Data & Emerging Technology",
    },
    "06-Workpapers": {
        "subfolders": [
            "scoring",
            "interviews",
            "correspondence",
            "review-notes",
        ],
    },
    "07-Reporting": {
        "subfolders": [
            "draft-report",
            "final-report",
            "management-responses",
            "presentation",
        ],
    },
}

# ---------------------------------------------------------------------------
# AWP control data (extracted from awp-data JSON files)
# ---------------------------------------------------------------------------

GRA_CONTROLS = [
    {
        "ref": "GRA-01",
        "name": "Technology Risk Governance Framework",
        "risk_tier": "Critical",
        "expected_evidence": (
            "Board-approved governance framework; technology risk committee charter "
            "and minutes (last 4 quarters); organisational chart; three lines of "
            "defence documentation; risk appetite statement with KRI thresholds; "
            "SC-GL/6-2023 coverage mapping"
        ),
    },
    {
        "ref": "GRA-02",
        "name": "CISO Designation & Authority",
        "risk_tier": "Standard",
        "expected_evidence": (
            "CISO appointment letter or board resolution; qualifications and "
            "certifications; job description with scope of authority; org chart "
            "showing reporting independence; board reporting records; resource "
            "and budget allocation evidence"
        ),
    },
    {
        "ref": "GRA-03",
        "name": "Technology Risk Policy Suite",
        "risk_tier": "Standard",
        "expected_evidence": (
            "Complete policy suite covering all technology risk domains; board "
            "approval records; policy review schedule and version history; policy "
            "distribution and acknowledgement records; SC-GL/6-2023 alignment mapping"
        ),
    },
    {
        "ref": "GRA-04",
        "name": "Technology Risk Reporting",
        "risk_tier": "Standard",
        "expected_evidence": (
            "Quarterly technology risk reports to board (last 4 quarters); KRI "
            "dashboards; incident trend reports; emerging technology risk briefings; "
            "board meeting minutes noting risk report discussions; action tracking "
            "from board risk decisions"
        ),
    },
    {
        "ref": "GRA-05",
        "name": "Technology Risk Assessment Framework",
        "risk_tier": "Standard",
        "expected_evidence": (
            "Risk assessment methodology document; annual risk assessment report; "
            "technology risk register; risk treatment plans; risk assessment for "
            "algorithmic trading and market infrastructure; ERM integration evidence"
        ),
    },
    {
        "ref": "GRA-06",
        "name": "Algorithmic Trading Risk Controls",
        "risk_tier": "Standard",
        "expected_evidence": (
            "Pre-trade and post-trade risk control configurations; kill switch "
            "capability evidence and test records; algorithm testing and approval "
            "records; market manipulation monitoring evidence; position and order "
            "limit configurations"
        ),
    },
    {
        "ref": "GRA-07",
        "name": "Technology Change Risk Assessment",
        "risk_tier": "Standard",
        "expected_evidence": (
            "Change risk classification criteria; risk assessments for critical "
            "changes; testing and approval gate records; rollback procedures; "
            "CAB meeting minutes; post-implementation reviews"
        ),
    },
    {
        "ref": "GRA-08",
        "name": "Technology Audit Programme",
        "risk_tier": "Standard",
        "expected_evidence": (
            "Risk-based technology audit plan; auditor qualifications and "
            "independence evidence; audit reports and findings; board audit "
            "committee reporting; finding remediation tracker with closure evidence"
        ),
    },
    {
        "ref": "GRA-09",
        "name": "Regulatory Examination Readiness",
        "risk_tier": "Standard",
        "expected_evidence": (
            "SC-GL/6-2023 evidence library; self-assessment reports; examination "
            "response team roster; prior examination findings tracker; regulatory "
            "change monitoring records"
        ),
    },
    {
        "ref": "GRA-10",
        "name": "Penetration Testing Programme",
        "risk_tier": "Standard",
        "expected_evidence": (
            "Penetration testing reports (annual); tester qualifications and "
            "independence evidence; scope covering trading systems and client "
            "portals; finding remediation tracker; board audit committee reporting"
        ),
    },
]

CYB_CONTROLS = [
    {
        "ref": "CYB-01",
        "name": "Cyber Threat Management",
        "risk_tier": "Standard",
        "expected_evidence": (
            "Threat intelligence programme charter; CTI feed subscriptions "
            "(MyCERT, SC advisories, FS-ISAC); threat assessment reports (last 2 "
            "cycles); threat hunting reports; threat information sharing records; "
            "quarterly threat landscape board briefings"
        ),
    },
    {
        "ref": "CYB-02",
        "name": "Security Operations Centre",
        "risk_tier": "Critical",
        "expected_evidence": (
            "SOC architecture and charter; SIEM log source inventory; detection "
            "rule inventory with MITRE ATT&CK mapping; 24/7 shift rosters; "
            "sample alert tickets (8); SOC performance metrics (MTTD/MTTR, last "
            "4 quarters); SOC effectiveness assessment; analyst training records"
        ),
    },
    {
        "ref": "CYB-03",
        "name": "Vulnerability Management Programme",
        "risk_tier": "Standard",
        "expected_evidence": (
            "Vulnerability management policy; scanning schedule and tool configs; "
            "scan reports (last 3); asset coverage cross-reference; patching SLAs; "
            "patch compliance reports; penetration testing integration; exception "
            "register; quarterly vulnerability trend reports"
        ),
    },
    {
        "ref": "CYB-04",
        "name": "Network Security Architecture",
        "risk_tier": "Standard",
        "expected_evidence": (
            "Network architecture diagrams (current, version-controlled); VLAN "
            "and segmentation configs; firewall rule sets for critical segments; "
            "IDS/IPS deployment map and alert samples; exchange connectivity "
            "security evidence; firewall rule review report; architecture review "
            "report (annual)"
        ),
    },
]

RIM_CONTROLS = [
    {
        "ref": "RIM-01",
        "name": "BCM Programme for Market Operations",
        "risk_tier": "Critical",
        "expected_evidence": (
            "BIA for capital market functions; BCP covering trading, clearing, "
            "settlement, custody; RTO/RPO register with DR test validation; Bursa "
            "Malaysia and clearing house coordination records; BCP review schedule "
            "and change log"
        ),
    },
    {
        "ref": "RIM-02",
        "name": "Trading System Resilience",
        "risk_tier": "Critical",
        "expected_evidence": (
            "Trading system architecture diagrams with redundancy; failover test "
            "reports (last 12 months); capacity planning documentation with "
            "headroom calculations; alternative trading channel procedures and "
            "test records; real-time monitoring dashboards and alert logs"
        ),
    },
    {
        "ref": "RIM-03",
        "name": "DR Testing Programme",
        "risk_tier": "Standard",
        "expected_evidence": (
            "Current-year DR test plan; test scenarios with success criteria; "
            "industry DR exercise participation records; data recovery and "
            "integrity test results; DR gap remediation tracker with closure "
            "evidence"
        ),
    },
    {
        "ref": "RIM-04",
        "name": "Settlement Continuity",
        "risk_tier": "Standard",
        "expected_evidence": (
            "Alternative settlement procedures; BMD coordination arrangements; "
            "manual fallback test records and processing times; communication "
            "protocols with clearing participants; post-recovery reconciliation "
            "procedures and exercise records"
        ),
    },
    {
        "ref": "RIM-05",
        "name": "Incident Response Plan",
        "risk_tier": "Critical",
        "expected_evidence": (
            "IRP document with all phases; incident classification matrix; "
            "escalation matrix with market-hours timelines; IR team roster with "
            "alternates; tabletop exercise records (capital market scenarios); "
            "IRP review schedule and change log"
        ),
    },
    {
        "ref": "RIM-06",
        "name": "SC Incident Notification",
        "risk_tier": "Critical",
        "expected_evidence": (
            "SC notification criteria aligned with SC-GL/6-2023; notification "
            "workflow with timelines; pre-approved notification templates; SC "
            "follow-up tracker; notification process assurance/tabletop test "
            "records"
        ),
    },
    {
        "ref": "RIM-07",
        "name": "Cyber Incident Coordination",
        "risk_tier": "Standard",
        "expected_evidence": (
            "External communication protocols (SC, MyCERT, Bursa, peers); "
            "contact directory with quarterly verification; industry working "
            "group participation records; threat intelligence sharing records; "
            "joint exercise participation (last 24 months)"
        ),
    },
    {
        "ref": "RIM-08",
        "name": "Incident Post-Mortem & Lessons Learned",
        "risk_tier": "Standard",
        "expected_evidence": (
            "Post-mortem policy/procedure; root cause analysis reports (5 sampled); "
            "lessons learned repository; improvement action tracker with closure "
            "rates; trend analysis reports; management reporting on improvement "
            "actions"
        ),
    },
]

TPC_CONTROLS = [
    {
        "ref": "TPC-01",
        "name": "Third-Party Risk Assessment",
        "risk_tier": "Standard",
        "expected_evidence": (
            "Vendor risk tiering methodology; third-party register with tier "
            "classifications; due diligence assessments for critical vendors; "
            "vendor security posture evidence (SOC 2, ISO 27001); ongoing risk "
            "monitoring reports; annual reassessment records with trend analysis"
        ),
    },
    {
        "ref": "TPC-02",
        "name": "Outsourcing Governance",
        "risk_tier": "Standard",
        "expected_evidence": (
            "Outsourcing policy aligned with SC-GL/6-2023; board approval records "
            "for material outsourcing; contracts with mandatory provisions (SLAs, "
            "right-to-audit, PDPA, exit); quarterly outsourcing risk reports to "
            "board; SC notification compliance records"
        ),
    },
    {
        "ref": "TPC-03",
        "name": "Vendor Performance Monitoring",
        "risk_tier": "Standard",
        "expected_evidence": (
            "SLA monitoring framework and metrics; monthly vendor performance "
            "reports for critical vendors; SLA breach escalation records; service "
            "credit/penalty application records; periodic vendor governance meeting "
            "minutes"
        ),
    },
    {
        "ref": "TPC-04",
        "name": "Fourth-Party Oversight",
        "risk_tier": "Standard",
        "expected_evidence": (
            "Fourth-party register / sub-contractor disclosures; fourth-party risk "
            "assessments for critical supply chains; sub-contracting contractual "
            "provisions with flow-down obligations; concentration risk analysis "
            "and mitigation plans"
        ),
    },
    {
        "ref": "TPC-05",
        "name": "Cloud Risk Assessment",
        "risk_tier": "Standard",
        "expected_evidence": (
            "Cloud risk assessment framework; shared responsibility matrices; "
            "data residency assessments (PDPA compliance); CSP certifications "
            "(SOC 2, ISO 27001, CSA STAR); cloud security posture assessment "
            "reports; completed risk assessments for all cloud engagements"
        ),
    },
    {
        "ref": "TPC-06",
        "name": "Cloud Data Governance",
        "risk_tier": "Standard",
        "expected_evidence": (
            "Cloud data inventory with classification labels; BYOK encryption "
            "configuration evidence; IAM policies and MFA enforcement; privileged "
            "access register; data access monitoring and anomaly detection "
            "records; data residency enforcement configurations"
        ),
    },
    {
        "ref": "TPC-07",
        "name": "Cloud Exit Strategy",
        "risk_tier": "Standard",
        "expected_evidence": (
            "Cloud exit plans for material deployments; data portability and "
            "format specifications; migration test records with integrity "
            "validation; alternative provider assessments; BCP integration for "
            "cloud contingency scenarios"
        ),
    },
]

DET_CONTROLS = [
    {
        "ref": "DET-01",
        "name": "Data Governance Framework",
        "risk_tier": "Standard",
        "expected_evidence": (
            "Data governance framework with roles (owners, stewards, custodians); "
            "data classification scheme applied to market and client data; data "
            "quality standards and monitoring reports; PDPA compliance assessment "
            "and ROPA; data retention/disposal policy and disposal records"
        ),
    },
    {
        "ref": "DET-02",
        "name": "Market Data Integrity",
        "risk_tier": "Standard",
        "expected_evidence": (
            "Market data feed validation rules and exception logs; latency and "
            "accuracy monitoring reports; reconciliation reports (pricing, "
            "corporate actions, reference data); data correction procedures "
            "and audit trails"
        ),
    },
    {
        "ref": "DET-03",
        "name": "Client Data Protection",
        "risk_tier": "Critical",
        "expected_evidence": (
            "Encryption configs (AES-256 at rest, TLS 1.2+ in transit); RBAC "
            "configurations and access review results (12 sampled accounts); "
            "DLP deployment evidence and alert investigation records (8 sampled); "
            "DPIA reports; cross-border data transfer register and PDPA safeguards"
        ),
    },
    {
        "ref": "DET-04",
        "name": "Algorithmic Trading Governance",
        "risk_tier": "Conditional",
        "expected_evidence": (
            "Algorithm approval records with risk/compliance sign-off; backtesting "
            "and simulation test results; production monitoring dashboards; "
            "periodic re-approval records; algorithm inventory with version control "
            "(N/A if no algorithmic trading)"
        ),
    },
    {
        "ref": "DET-05",
        "name": "AI/ML Risk Management",
        "risk_tier": "Conditional",
        "expected_evidence": (
            "AI/ML model inventory with risk tiers; model validation reports; "
            "bias assessment reports for client-facing models; explainability "
            "outputs; model monitoring reports with drift detection; lifecycle "
            "management records (N/A if no AI/ML deployment)"
        ),
    },
    {
        "ref": "DET-06",
        "name": "DLT & Digital Asset Controls",
        "risk_tier": "Conditional",
        "expected_evidence": (
            "Applicability determination record; smart contract audit reports; "
            "HSM key management and wallet control evidence; SC licensing "
            "assessment; DLT infrastructure monitoring dashboards "
            "(N/A if no DLT/digital asset activities)"
        ),
    },
]

SECTION_DATA = {
    "01-Governance-Risk-Audit": {
        "title": "Governance, Risk & Audit",
        "description": (
            "This section covers the foundational governance, risk assessment, and "
            "audit controls required by SC-GL/6-2023. It spans three domains: "
            "Governance & Oversight, Technology Risk Assessment, and Technology "
            "Audit. These controls establish board accountability, risk "
            "management structures, and independent assurance for technology "
            "risk in capital market operations."
        ),
        "controls": GRA_CONTROLS,
    },
    "02-Cybersecurity": {
        "title": "Cybersecurity",
        "description": (
            "This section covers cybersecurity controls for protecting capital "
            "market systems and data. It addresses threat management, security "
            "operations, vulnerability management, and network security "
            "architecture, with particular focus on trading system protection "
            "and market data integrity."
        ),
        "controls": CYB_CONTROLS,
    },
    "03-Resilience-Incident": {
        "title": "Resilience & Incident Management",
        "description": (
            "This section covers business continuity and incident management "
            "controls. It spans BCM for market operations, trading system "
            "resilience, DR testing, settlement continuity, incident response, "
            "SC notification obligations, coordination, and post-mortem "
            "processes."
        ),
        "controls": RIM_CONTROLS,
    },
    "04-Third-Party-Cloud": {
        "title": "Third-Party & Cloud",
        "description": (
            "This section covers third-party risk management and cloud service "
            "governance. It addresses vendor assessment, outsourcing governance, "
            "performance monitoring, fourth-party oversight, cloud risk "
            "assessment, cloud data governance, and exit strategy planning."
        ),
        "controls": TPC_CONTROLS,
    },
    "05-Data-Emerging-Tech": {
        "title": "Data & Emerging Technology",
        "description": (
            "This section covers data management and emerging technology controls. "
            "It addresses data governance, market data integrity, client data "
            "protection, and conditionally applicable controls for algorithmic "
            "trading governance, AI/ML risk management, and DLT/digital asset "
            "activities."
        ),
        "controls": DET_CONTROLS,
    },
}


# ---------------------------------------------------------------------------
# README content generators
# ---------------------------------------------------------------------------


def generate_root_readme():
    """Generate the root SC-GTRM-Evidence/README.md content."""
    lines = [
        "# SC-GTRM Assessment -- Evidence Folder Structure",
        "",
        "## Purpose",
        "",
        "This folder structure supports the collection, organisation, and tracking "
        "of evidence for an SC-GL/6-2023 (Guidelines on Technology Risk Management) "
        "assessment of a capital market intermediary regulated by the Securities "
        "Commission Malaysia. It is aligned with the SC-GTRM Assessor Work "
        "Programme (AWP) and covers all 35 controls across 10 domains.",
        "",
        "## Folder Index",
        "",
        "| Folder | Purpose | AWP Sheet Reference |",
        "|--------|---------|---------------------|",
        "| `00-Engagement/` | Engagement administration, scope, and planning | Pre-assessment |",
        "| `01-Governance-Risk-Audit/` | Governance, risk assessment, and audit controls (GRA-01 to GRA-10) | Sheet 2 |",
        "| `02-Cybersecurity/` | Threat management, SOC, vulnerability management, network security (CYB-01 to CYB-04) | Sheet 3 |",
        "| `03-Resilience-Incident/` | BCM, trading resilience, DR, settlement continuity, incident management (RIM-01 to RIM-08) | Sheet 4 |",
        "| `04-Third-Party-Cloud/` | Third-party risk, outsourcing governance, cloud controls (TPC-01 to TPC-07) | Sheet 5 |",
        "| `05-Data-Emerging-Tech/` | Data governance, market data integrity, client data protection, emerging tech (DET-01 to DET-06) | Sheet 6 |",
        "| `06-Workpapers/` | Assessment workpapers, scoring, interviews, and review notes | Cross-cutting |",
        "| `07-Reporting/` | Draft and final reports, management responses, presentations | Post-assessment |",
        "",
        "## Evidence File Naming Convention",
        "",
        "Use the following format for all evidence files:",
        "",
        "```",
        "{REF}-{NN}-{description}.{ext}",
        "```",
        "",
        "Where:",
        "- **{REF}** -- Control reference (e.g., `GRA-01`, `CYB-02`, `RIM-05`)",
        "- **{NN}** -- Sequential number within the control (e.g., `01`, `02`, `03`)",
        "- **{description}** -- Brief kebab-case description of the evidence",
        "- **{ext}** -- File extension (`.pdf`, `.xlsx`, `.png`, `.docx`, etc.)",
        "",
        "**Examples:**",
        "- `GRA-01-03-board-approved-framework.pdf`",
        "- `CYB-02-01-soc-architecture-diagram.png`",
        "- `RIM-05-02-tabletop-exercise-report.pdf`",
        "- `TPC-01-05-vendor-soc2-report.pdf`",
        "- `DET-03-01-encryption-config-evidence.xlsx`",
        "",
        "## Evidence Status Tracking",
        "",
        "Track evidence status using the following lifecycle:",
        "",
        "| Status | Description |",
        "|--------|-------------|",
        "| **Requested** | Evidence has been requested from the entity via DRL |",
        "| **Received** | Evidence has been received but not yet reviewed |",
        "| **Reviewed** | Evidence has been reviewed for completeness and relevance |",
        "| **Verified** | Evidence has been assessed and supports the control finding |",
        "",
        "Use the `evidence-map.json` in the workprogram directory to track status "
        "programmatically, or maintain a tracking spreadsheet in `06-Workpapers/`.",
        "",
        "## Confidentiality Notice",
        "",
        "**CONFIDENTIAL -- ASSESSMENT MATERIAL**",
        "",
        "This folder contains confidential information obtained during a regulatory "
        "technology risk assessment. Contents may include sensitive business "
        "information, security configurations, client data references, and "
        "regulatory correspondence. Access is restricted to authorised assessment "
        "team members. Do not distribute outside the engagement team without "
        "written approval from the engagement lead.",
        "",
        "All evidence must be handled in accordance with the entity's data "
        "classification requirements and the assessment engagement letter terms.",
        "",
    ]
    return "\n".join(lines)


def generate_section_readme(section_key):
    """Generate README for assessment sections (01-05)."""
    data = SECTION_DATA[section_key]
    controls = data["controls"]

    lines = [
        f"# {data['title']}",
        "",
        f"{data['description']}",
        "",
        "## Controls in This Section",
        "",
        "| Ref | Control Name | Risk Tier | Expected Evidence |",
        "|-----|-------------|-----------|-------------------|",
    ]

    for ctrl in controls:
        lines.append(
            f"| {ctrl['ref']} | {ctrl['name']} | {ctrl['risk_tier']} | "
            f"{ctrl['expected_evidence']} |"
        )

    lines.extend([
        "",
        "## Evidence Organisation",
        "",
        "Place evidence for each control in the corresponding subfolder. "
        "Use the naming convention defined in the root README:",
        "",
        "```",
        "{REF}-{NN}-{description}.{ext}",
        "```",
        "",
        "For controls marked **Conditional**, document the applicability "
        "determination before collecting evidence. If the control is not "
        "applicable, place the N/A determination record in the subfolder.",
        "",
    ])

    return "\n".join(lines)


def generate_engagement_readme():
    """Generate README for 00-Engagement."""
    lines = [
        "# Engagement Administration",
        "",
        "Pre-assessment engagement materials and planning documentation.",
        "",
        "## Subfolders",
        "",
        "| Subfolder | Contents |",
        "|-----------|----------|",
        "| `engagement-letter/` | Signed engagement letter, terms of reference, and scope definition |",
        "| `scope-agreement/` | Agreed assessment scope, exclusions, and boundary documentation |",
        "| `team-assignment/` | Assessment team roster, roles, independence declarations, and NDA records |",
        "| `entity-information/` | Entity background, organisation charts, system inventory, and regulatory licences |",
        "| `planning-notes/` | Risk-based planning notes, materiality assessments, and preliminary meeting records |",
        "",
    ]
    return "\n".join(lines)


def generate_workpapers_readme():
    """Generate README for 06-Workpapers."""
    lines = [
        "# Workpapers",
        "",
        "Assessment working papers, analysis, and supporting documentation "
        "that are not tied to a specific control evidence folder.",
        "",
        "## Subfolders",
        "",
        "| Subfolder | Contents |",
        "|-----------|----------|",
        "| `scoring/` | Maturity scoring worksheets, control effectiveness ratings, and aggregated results |",
        "| `interviews/` | Interview notes, attendee lists, and follow-up action items from assessment meetings |",
        "| `correspondence/` | Email correspondence, document request tracking, and clarification records |",
        "| `review-notes/` | Reviewer comments, quality assurance review records, and engagement manager notes |",
        "",
    ]
    return "\n".join(lines)


def generate_reporting_readme():
    """Generate README for 07-Reporting."""
    lines = [
        "# Reporting",
        "",
        "Assessment deliverables from draft through final issuance.",
        "",
        "## Subfolders",
        "",
        "| Subfolder | Contents |",
        "|-----------|----------|",
        "| `draft-report/` | Draft assessment report versions and internal review comments |",
        "| `final-report/` | Final signed assessment report and executive summary |",
        "| `management-responses/` | Entity management responses to findings and remediation commitments |",
        "| `presentation/` | Board presentation, executive briefing slides, and closing meeting materials |",
        "",
    ]
    return "\n".join(lines)


# ---------------------------------------------------------------------------
# Main logic
# ---------------------------------------------------------------------------


def create_evidence_folders(base_dir):
    """Create the full evidence folder structure and README files."""
    root = Path(base_dir) / "SC-GTRM-Evidence"

    if root.exists():
        print(f"ERROR: Target directory already exists: {root}")
        print("Remove it first or specify a different output directory.")
        sys.exit(1)

    dirs_created = 0
    files_created = 0

    # Create root
    root.mkdir(parents=True)
    dirs_created += 1

    # Write root README
    root_readme = root / "README.md"
    root_readme.write_text(generate_root_readme(), encoding="utf-8")
    files_created += 1

    # Create each section
    for section_name, section_def in STRUCTURE.items():
        section_dir = root / section_name
        section_dir.mkdir()
        dirs_created += 1

        # Create subfolders
        for subfolder in section_def["subfolders"]:
            sf_path = section_dir / subfolder
            sf_path.mkdir()
            dirs_created += 1

        # Write section README
        readme_path = section_dir / "README.md"
        if section_name in SECTION_DATA:
            readme_path.write_text(
                generate_section_readme(section_name), encoding="utf-8"
            )
        elif section_name == "00-Engagement":
            readme_path.write_text(generate_engagement_readme(), encoding="utf-8")
        elif section_name == "06-Workpapers":
            readme_path.write_text(generate_workpapers_readme(), encoding="utf-8")
        elif section_name == "07-Reporting":
            readme_path.write_text(generate_reporting_readme(), encoding="utf-8")
        files_created += 1

    return root, dirs_created, files_created


def main():
    if len(sys.argv) > 1:
        output_dir = sys.argv[1]
    else:
        output_dir = os.getcwd()

    print(f"SC-GTRM Evidence Folder Generator")
    print(f"==================================")
    print(f"Output directory: {output_dir}")
    print()

    root, dirs_created, files_created = create_evidence_folders(output_dir)

    print(f"Created: {root}")
    print()
    print(f"Summary:")
    print(f"  Directories created: {dirs_created}")
    print(f"  README files created: {files_created}")
    print()
    print(f"Folder structure:")

    # Print tree
    for section_name, section_def in STRUCTURE.items():
        is_last_section = (section_name == list(STRUCTURE.keys())[-1])
        branch = "└── " if is_last_section else "├── "
        prefix = "    " if is_last_section else "│   "
        print(f"  {branch}{section_name}/")
        print(f"  {prefix}├── README.md")
        subfolders = section_def["subfolders"]
        for i, sf in enumerate(subfolders):
            is_last = (i == len(subfolders) - 1)
            sf_branch = "└── " if is_last else "├── "
            print(f"  {prefix}{sf_branch}{sf}/")

    print()
    print(f"Total controls covered: 35 (10 GRA + 4 CYB + 8 RIM + 7 TPC + 6 DET)")


if __name__ == "__main__":
    main()
