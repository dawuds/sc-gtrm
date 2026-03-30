#!/usr/bin/env python3
"""
Generate SC-GTRM Audit Work Program (AWP) Excel workbook.

Reads JSON data from awp-data/ and produces a professional AWP workbook
matching the DAC-Cybersecurity-Custody-WorkProgram.xlsx format.

Usage: python3 workprogram/generate-awp.py
Output: workprogram/SC-GTRM-AWP.xlsx
"""

import json
import os
import sys
from pathlib import Path

try:
    from openpyxl import Workbook
    from openpyxl.styles import (
        Font, PatternFill, Alignment, Border, Side, NamedStyle
    )
    from openpyxl.utils import get_column_letter
except ImportError:
    print("openpyxl required: pip install openpyxl")
    sys.exit(1)

# ---------------------------------------------------------------------------
# Paths
# ---------------------------------------------------------------------------
SCRIPT_DIR = Path(__file__).parent
AWP_DATA_DIR = SCRIPT_DIR / "awp-data"
OUTPUT_FILE = SCRIPT_DIR / "SC-GTRM-AWP.xlsx"

# ---------------------------------------------------------------------------
# Style constants
# ---------------------------------------------------------------------------
FONT_SANS = "Calibri"

# Colors
NAVY = "1F3864"
DARK_BLUE = "2B4C7E"
MID_BLUE = "4472C4"
LIGHT_BLUE = "D6E4F0"
PALE_BLUE = "E9EFF7"
WHITE = "FFFFFF"
LIGHT_GREY = "F2F2F2"
DARK_GREY = "404040"
MID_GREY = "808080"
AMBER_BG = "FFF2CC"
AMBER_BORDER = "BF9000"
GREEN_BG = "E2EFDA"
GREEN_TEXT = "375623"
RED_BG = "FCE4EC"
RED_TEXT = "C62828"
ORANGE_BG = "FFF3E0"
ORANGE_TEXT = "E65100"
GREY_BG = "ECEFF1"
GREY_TEXT = "546E7A"

# Borders
THIN_BORDER = Border(
    left=Side(style="thin", color="B4B4B4"),
    right=Side(style="thin", color="B4B4B4"),
    top=Side(style="thin", color="B4B4B4"),
    bottom=Side(style="thin", color="B4B4B4"),
)
BOTTOM_BORDER = Border(bottom=Side(style="thin", color="B4B4B4"))
THICK_BOTTOM = Border(bottom=Side(style="medium", color=NAVY))

# Fills
HEADER_FILL = PatternFill(start_color=NAVY, end_color=NAVY, fill_type="solid")
SECTION_FILL = PatternFill(start_color=DARK_BLUE, end_color=DARK_BLUE, fill_type="solid")
ALT_ROW_FILL = PatternFill(start_color=PALE_BLUE, end_color=PALE_BLUE, fill_type="solid")
LIGHT_FILL = PatternFill(start_color=LIGHT_GREY, end_color=LIGHT_GREY, fill_type="solid")
AMBER_FILL = PatternFill(start_color=AMBER_BG, end_color=AMBER_BG, fill_type="solid")
METHODOLOGY_HEADER_FILL = PatternFill(start_color=DARK_BLUE, end_color=DARK_BLUE, fill_type="solid")

# Fonts
TITLE_FONT = Font(name=FONT_SANS, bold=True, size=14, color=NAVY)
SUBTITLE_FONT = Font(name=FONT_SANS, bold=False, size=11, color=MID_GREY)
SECTION_TITLE_FONT = Font(name=FONT_SANS, bold=True, size=11, color=NAVY)
HEADER_FONT = Font(name=FONT_SANS, bold=True, size=10, color=WHITE)
SECTION_HEADER_FONT = Font(name=FONT_SANS, bold=True, size=10, color=WHITE)
BODY_FONT = Font(name=FONT_SANS, size=10, color=DARK_GREY)
BODY_BOLD = Font(name=FONT_SANS, bold=True, size=10, color=DARK_GREY)
SMALL_FONT = Font(name=FONT_SANS, size=9, color=MID_GREY)
METH_LABEL_FONT = Font(name=FONT_SANS, bold=True, size=10, color=NAVY)
METH_VALUE_FONT = Font(name=FONT_SANS, size=10, color=DARK_GREY)
METH_HEADER_FONT = Font(name=FONT_SANS, bold=True, size=11, color=WHITE)
DISCLAIMER_FONT = Font(name=FONT_SANS, italic=True, size=9, color="92400E")

# Alignments
WRAP = Alignment(wrap_text=True, vertical="top")
WRAP_CENTER = Alignment(wrap_text=True, vertical="top", horizontal="center")
CENTER = Alignment(horizontal="center", vertical="center")
LEFT_TOP = Alignment(vertical="top")

# ---------------------------------------------------------------------------
# Assessment sheet column config
# ---------------------------------------------------------------------------
ASSESSMENT_COLUMNS = [
    ("Ref", 8),
    ("Control", 22),
    ("Sub-Procedure", 24),
    ("Assessment Procedures", 48),
    ("Expected Evidence", 36),
    ("Method", 14),
    ("Procedures Performed", 30),
    ("Evidence Obtained", 24),
    ("Evidence Ref", 12),
    ("Observation / Findings", 30),
    ("Conclusion", 14),
    ("Recommendations", 30),
]


def load_sheet_data():
    """Load all AWP sheet JSON files."""
    sheets = []
    for fname in sorted(AWP_DATA_DIR.glob("sheet*.json")):
        with open(fname) as f:
            sheets.append(json.load(f))
    return sheets


# ---------------------------------------------------------------------------
# Sheet 1: Methodology & Approach
# ---------------------------------------------------------------------------
def build_methodology_sheet(wb):
    ws = wb.active
    ws.title = "Methodology & Approach"
    ws.sheet_properties.tabColor = NAVY

    # Column widths
    ws.column_dimensions["A"].width = 28
    ws.column_dimensions["B"].width = 50
    for col in "CDEFG":
        ws.column_dimensions[col].width = 14

    row = 1

    # --- Title ---
    ws.merge_cells(start_row=row, start_column=1, end_row=row, end_column=7)
    cell = ws.cell(row=row, column=1,
                   value="INDEPENDENT ASSESSMENT \u2014 METHODOLOGY & APPROACH")
    cell.font = Font(name=FONT_SANS, bold=True, size=14, color=WHITE)
    cell.fill = PatternFill(start_color=NAVY, end_color=NAVY, fill_type="solid")
    cell.alignment = Alignment(horizontal="center", vertical="center")
    ws.row_dimensions[row].height = 36
    row += 1

    ws.merge_cells(start_row=row, start_column=1, end_row=row, end_column=7)
    cell = ws.cell(row=row, column=1,
                   value="SC-GL/6-2023 Guidelines on Technology Risk Management \u2014 Capital Market Intermediary")
    cell.font = Font(name=FONT_SANS, size=11, color=WHITE)
    cell.fill = PatternFill(start_color=DARK_BLUE, end_color=DARK_BLUE, fill_type="solid")
    cell.alignment = Alignment(horizontal="center", vertical="center")
    ws.row_dimensions[row].height = 24
    row += 2

    # --- Engagement Details ---
    def section_header(title):
        nonlocal row
        ws.merge_cells(start_row=row, start_column=1, end_row=row, end_column=7)
        cell = ws.cell(row=row, column=1, value=title)
        cell.font = SECTION_TITLE_FONT
        cell.fill = PatternFill(start_color=LIGHT_BLUE, end_color=LIGHT_BLUE, fill_type="solid")
        cell.border = THICK_BOTTOM
        ws.row_dimensions[row].height = 22
        row += 1

    def field_row(label, value):
        nonlocal row
        c1 = ws.cell(row=row, column=1, value=label)
        c1.font = METH_LABEL_FONT
        c1.alignment = LEFT_TOP
        ws.merge_cells(start_row=row, start_column=2, end_row=row, end_column=7)
        c2 = ws.cell(row=row, column=2, value=value)
        c2.font = METH_VALUE_FONT
        c2.alignment = LEFT_TOP
        c2.border = BOTTOM_BORDER
        row += 1

    section_header("ENGAGEMENT DETAILS")
    field_row("Entity Name:", "[Entity Name]")
    field_row("Regulated Activity:", "Capital Market Intermediary (CMSL/CMSRL Holder)")
    field_row("Assessment Date:", "[DD/MM/YYYY]")
    field_row("Assessment Period:", "[Start Date] to [End Date]")
    field_row("Lead Assessor:", "[Name, Qualification]")
    field_row("Engagement Reference:", "[Ref Number]")
    field_row("Report Classification:", "Confidential (Sulit)")
    row += 1

    # --- Scope ---
    section_header("SCOPE OF ASSESSMENT")
    scope_lines = [
        "This assessment is conducted pursuant to SC-GL/6-2023 Guidelines on Technology Risk Management for capital market intermediaries regulated by the Securities Commission Malaysia.",
        "The objective is to ascertain that the entity has established and maintains an effective technology risk management framework covering governance, cybersecurity, resilience, third-party management, data protection, and emerging technology risks.",
        "Assessment covers 35 controls across 10 domains: (1) Governance & Oversight, (2) Technology Risk Assessment, (3) Cybersecurity, (4) Business Continuity, (5) Incident Management, (6) Third-Party Risk, (7) Cloud Services, (8) Data Management, (9) Technology Audit, (10) Emerging Technology.",
        "IMPORTANT: Third-party validation does not guarantee SC approval. Areas assessed reflect the assessor's professional judgement guided by SC-GL/6-2023 and may not cover every SC expectation.",
    ]
    for line in scope_lines:
        ws.merge_cells(start_row=row, start_column=1, end_row=row, end_column=7)
        cell = ws.cell(row=row, column=1, value=line)
        cell.font = BODY_FONT
        cell.alignment = WRAP
        ws.row_dimensions[row].height = 40
        row += 1
    row += 1

    # --- Assessment Methods ---
    section_header("ASSESSMENT METHODS")
    methods = [
        ("Inspection", "Examination of documents, records, policies, configurations, and tangible evidence to verify existence, completeness, and compliance with SC-GL/6-2023 requirements."),
        ("Inquiry", "Interviews with management, process owners, and staff to understand controls and their operating effectiveness within the capital market entity."),
        ("Observation", "Direct observation of processes, systems, and activities being performed."),
        ("Confirmation", "Verification with external or independent parties (e.g., CSP certifications, third-party audit reports)."),
    ]
    for label, desc in methods:
        c1 = ws.cell(row=row, column=1, value=label)
        c1.font = BODY_BOLD
        c1.alignment = LEFT_TOP
        ws.merge_cells(start_row=row, start_column=2, end_row=row, end_column=7)
        c2 = ws.cell(row=row, column=2, value=desc)
        c2.font = BODY_FONT
        c2.alignment = WRAP
        ws.row_dimensions[row].height = 36
        row += 1
    row += 1

    # --- Conclusion Scale ---
    section_header("CONCLUSION SCALE")
    conclusions = [
        ("Compliant", "Control/requirement fully implemented and operating effectively. Evidence supports compliance with SC-GL/6-2023.", GREEN_BG, GREEN_TEXT),
        ("Partially Compliant", "Implemented but with gaps in scope, coverage, documentation, or effectiveness. Specific improvements required.", ORANGE_BG, ORANGE_TEXT),
        ("Non-Compliant", "Absent, fundamentally deficient, or not operating. SC-GL/6-2023 criteria not met.", RED_BG, RED_TEXT),
        ("N/A", "Not applicable to entity's operations. Justification documented.", GREY_BG, GREY_TEXT),
    ]
    for label, desc, bg, fg in conclusions:
        c1 = ws.cell(row=row, column=1, value=label)
        c1.font = Font(name=FONT_SANS, bold=True, size=10, color=fg)
        c1.fill = PatternFill(start_color=bg, end_color=bg, fill_type="solid")
        c1.alignment = LEFT_TOP
        ws.merge_cells(start_row=row, start_column=2, end_row=row, end_column=7)
        c2 = ws.cell(row=row, column=2, value=desc)
        c2.font = BODY_FONT
        c2.alignment = WRAP
        ws.row_dimensions[row].height = 30
        row += 1
    row += 1

    # --- Limitations ---
    section_header("LIMITATIONS")
    limitations = [
        "1. Limited assurance engagement \u2014 conclusions based on procedures performed, not an audit opinion.",
        "2. Point-in-time assessment. Does not guarantee continued compliance.",
        "3. Reliance on management representations and documentation provided.",
        "4. Scope guided by SC-GL/6-2023 Guidelines on Technology Risk Management. SC may update requirements.",
        "5. Does not constitute legal or regulatory advice.",
    ]
    for lim in limitations:
        ws.merge_cells(start_row=row, start_column=1, end_row=row, end_column=7)
        cell = ws.cell(row=row, column=1, value=lim)
        cell.font = BODY_FONT
        cell.alignment = WRAP
        ws.row_dimensions[row].height = 20
        row += 1
    row += 2

    # --- Sign-off ---
    section_header("SIGN-OFF")
    signoffs = [
        ("Lead Assessor:", "________________________", "Date:", "______________"),
        ("Quality Reviewer:", "________________________", "Date:", "______________"),
        ("Entity Representative:", "________________________", "Date:", "______________"),
    ]
    for label, sig, dlabel, dsig in signoffs:
        ws.cell(row=row, column=1, value=label).font = METH_LABEL_FONT
        ws.cell(row=row, column=2, value=sig).font = METH_VALUE_FONT
        ws.cell(row=row, column=2).border = BOTTOM_BORDER
        ws.cell(row=row, column=5, value=dlabel).font = METH_LABEL_FONT
        ws.cell(row=row, column=6, value=dsig).font = METH_VALUE_FONT
        ws.cell(row=row, column=6).border = BOTTOM_BORDER
        ws.row_dimensions[row].height = 24
        row += 1

    # Freeze top rows
    ws.freeze_panes = "A4"
    ws.sheet_view.showGridLines = False


# ---------------------------------------------------------------------------
# Assessment sheets (sheets 2-6)
# ---------------------------------------------------------------------------
def build_assessment_sheet(wb, sheet_data):
    ws = wb.create_sheet(title=sheet_data["sheetName"][:31])  # Excel 31-char limit

    # Tab color by sheet number
    tab_colors = {2: "4472C4", 3: "C0392B", 4: "E67E22", 5: "27AE60", 6: "8E44AD"}
    ws.sheet_properties.tabColor = tab_colors.get(sheet_data["sheetNumber"], MID_BLUE)

    # Column widths
    for idx, (_, width) in enumerate(ASSESSMENT_COLUMNS, 1):
        ws.column_dimensions[get_column_letter(idx)].width = width

    row = 1

    # --- Header row ---
    for col_idx, (col_name, _) in enumerate(ASSESSMENT_COLUMNS, 1):
        cell = ws.cell(row=row, column=col_idx, value=col_name)
        cell.font = HEADER_FONT
        cell.fill = HEADER_FILL
        cell.alignment = WRAP_CENTER
        cell.border = THIN_BORDER
    ws.row_dimensions[row].height = 28
    row += 1

    # --- Data rows ---
    proc_idx = 0
    for section in sheet_data["sections"]:
        # Section header row (merged across all 12 columns)
        ws.merge_cells(start_row=row, start_column=1, end_row=row, end_column=12)
        cell = ws.cell(row=row, column=1, value=section["sectionHeader"])
        cell.font = SECTION_HEADER_FONT
        cell.fill = SECTION_FILL
        cell.alignment = Alignment(vertical="center")
        cell.border = THIN_BORDER
        ws.row_dimensions[row].height = 24
        row += 1

        # Sub-procedures
        for sp in section["subProcedures"]:
            is_alt = proc_idx % 2 == 1
            fill = ALT_ROW_FILL if is_alt else PatternFill(fill_type=None)

            values = [
                section["ref"],
                section["controlName"],
                sp["subProcedure"],
                sp["assessmentProcedures"],
                sp["expectedEvidence"],
                sp["method"],
                "",  # Procedures Performed
                "",  # Evidence Obtained
                "",  # Evidence Ref
                "",  # Observation / Findings
                "",  # Conclusion
                "",  # Recommendations
            ]

            # Calculate row height based on content length
            max_len = max(len(str(v)) for v in values[:6])
            row_height = max(45, min(120, max_len // 2))

            for col_idx, val in enumerate(values, 1):
                cell = ws.cell(row=row, column=col_idx, value=val)
                cell.font = BODY_FONT
                cell.alignment = WRAP
                cell.border = THIN_BORDER
                if is_alt:
                    cell.fill = fill

                # Bold the ref column
                if col_idx == 1:
                    cell.font = BODY_BOLD
                    cell.alignment = WRAP_CENTER

                # Center the method column
                if col_idx == 6:
                    cell.alignment = WRAP_CENTER

                # Light yellow for blank working columns (7-12)
                if col_idx >= 7:
                    cell.fill = PatternFill(
                        start_color="FFFFF5", end_color="FFFFF5", fill_type="solid"
                    )

            ws.row_dimensions[row].height = row_height
            row += 1
            proc_idx += 1

    # --- Disclaimer row ---
    row += 1
    ws.merge_cells(start_row=row, start_column=1, end_row=row, end_column=12)
    cell = ws.cell(
        row=row, column=1,
        value="This work program is constructed for educational purposes. "
              "Customise for your engagement. Not legal or regulatory advice. "
              "AI-generated content \u2014 review and validate before use."
    )
    cell.font = DISCLAIMER_FONT
    cell.fill = AMBER_FILL
    cell.alignment = WRAP
    ws.row_dimensions[row].height = 28

    # Freeze header + panes
    ws.freeze_panes = "A2"
    ws.auto_filter.ref = f"A1:{get_column_letter(12)}1"


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
def main():
    print("Loading AWP data...")
    sheets = load_sheet_data()
    print(f"  Loaded {len(sheets)} assessment sheets")

    total_subs = sum(
        len(sp)
        for s in sheets
        for sec in s["sections"]
        for sp in [sec["subProcedures"]]
    )
    print(f"  Total sub-procedures: {total_subs}")

    print("Building workbook...")
    wb = Workbook()

    # Sheet 1: Methodology
    build_methodology_sheet(wb)
    print("  [1/6] Methodology & Approach")

    # Sheets 2-6: Assessment sheets
    for sheet_data in sheets:
        build_assessment_sheet(wb, sheet_data)
        n = sheet_data["sheetNumber"]
        name = sheet_data["sheetName"]
        subs = sum(len(sec["subProcedures"]) for sec in sheet_data["sections"])
        controls = len(sheet_data["sections"])
        print(f"  [{n}/6] {name} ({controls} controls, {subs} sub-procedures)")

    # Save
    wb.save(str(OUTPUT_FILE))
    print(f"\nSaved: {OUTPUT_FILE}")
    print(f"  Sheets: {len(wb.sheetnames)}")
    print(f"  Sub-procedures: {total_subs}")


if __name__ == "__main__":
    main()
