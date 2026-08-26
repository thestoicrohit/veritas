import datetime

def generate_project_audit_brief(project):
    """
    Generates a structured government audit brief in Markdown and HTML formats.
    """
    p_id = project["project_id"]
    title = project["project_title"]
    cat = project["category"]
    mp = project["mp_name"]
    const = project["constituency"]
    district = project["district"]
    state = project["state"]
    sanc = project["sanctioned_amount"]
    spent = project["expenditure_incurred"]
    progress = project["physical_progress_percent"]
    score = project["overall_risk_score"]
    level = project["risk_level"]
    action = project["recommended_action"]
    reasons = project["risk_reasons"]
    
    util_rate = round((spent / sanc) * 100.0, 1) if sanc > 0 else 0.0
    
    report_date = datetime.datetime.now().strftime("%d %B %Y")
    
    # Markdown format
    md_content = f"""# GOVERNMENT OF INDIA
## MINISTRY OF STATISTICS AND PROGRAMME IMPLEMENTATION (MoSPI)
### VERITAS AUDIT INTELLIGENCE DIVISION

---
**REPORT ID:** AR-{p_id}-{datetime.datetime.now().strftime("%Y%m%d")}
**DATE OF GENERATION:** {report_date}
**SUBJECT:** PROJECT RISK INTELLIGENCE BRIEF FOR WORK ID: {p_id}

---

### 1. PROJECT META-DATA
* **Project Name:** {title}
* **Work Category:** {cat}
* **Member of Parliament:** {mp}
* **Constituency:** {const}
* **District / State:** {district}, {state}

### 2. FINANCIAL & PHYSICAL STATUS
* **Sanctioned Amount:** ₹{sanc/100000.0:.2f} Lakhs
* **Cumulative Expenditure Incurred:** ₹{spent/100000.0:.2f} Lakhs
* **Financial Utilization Rate:** {util_rate}%
* **Reported Physical Progress:** {progress}%
* **Progress-Expenditure Gap:** {round(util_rate - progress, 1)}%

### 3. VERITAS RISK ASSESSMENT (AI-ASSISTED)
* **Risk Priority Score:** {score} / 100
* **Evaluation Level:** {level}
* **Flagged Indicators:** {reasons}

#### RISK BREAKDOWN:
* **Financial Anomaly Signal:** {project.get("financial_risk", "N/A")}/100
* **Physical Progress Signal:** {project.get("progress_risk", "N/A")}/100
* **Geospatial Proximity Signal:** {project.get("geo_risk", "N/A")}/100
* **Visual Change Evidence Signal:** {project.get("visual_risk", "N/A")}/100
* **Procurement Pattern Signal:** {project.get("procurement_risk", "N/A")}/100

### 4. RECOMMENDATIONS & FIELD ACTION
**RECOMMENDED ACTION ACTIONABLE:** {action.upper()}

#### DETAILED AUDIT DIRECTIVES:
1. **Financial Verification:** Cross-verify bills, measurement books, and payment schedules against concrete benchmarks.
2. **Geospatial Audit:** Conduct ground verification to check for duplicated physical assets within close coordinates.
3. **Visual Audit:** Ground physical check recommended to corroborate reported physical percentage against site photo evidence.

---
*Disclaimer: AI-generated risk assessment. This report identifies anomalies to optimize audit resource allocation. Ground-truth human verification remains the official and legally binding authority.*
"""
    
    # HTML format for web preview
    html_content = f"""
    <div class="audit-brief-container font-serif p-8 bg-white border border-gray-300 text-gray-900 max-w-4xl mx-auto shadow-sm">
        <div class="text-center mb-6">
            <h1 class="text-xl font-bold uppercase tracking-wider text-navy mb-1">Government of India</h1>
            <h2 class="text-lg font-semibold text-gray-700 uppercase tracking-wide mb-1">Ministry of Statistics & Programme Implementation (MoSPI)</h2>
            <h3 class="text-sm font-semibold tracking-wider text-teal-800 uppercase">VERITAS Audit Intelligence Division</h3>
            <div class="h-0.5 bg-navy mx-auto w-48 mt-2"></div>
        </div>
        
        <div class="border-t border-b border-gray-400 py-3 my-4 grid grid-cols-2 text-xs uppercase tracking-tight text-gray-600">
            <div><strong>Report ID:</strong> AR-{p_id}-{datetime.datetime.now().strftime("%Y%m%d")}</div>
            <div class="text-right"><strong>Generated:</strong> {report_date}</div>
        </div>
        
        <h4 class="text-sm font-bold border-b border-gray-300 pb-1 mb-3 text-navy">SUBJECT: Risk Intelligence Brief for Work ID {p_id}</h4>
        
        <table class="w-full text-xs mb-6 border-collapse">
            <thead>
                <tr class="bg-gray-100"><th colspan="2" class="text-left p-2 border border-gray-300 font-bold uppercase text-navy">1. Project Metadata</th></tr>
            </thead>
            <tbody>
                <tr><td class="p-2 border border-gray-300 w-1/3 font-semibold">Project Title</td><td class="p-2 border border-gray-300">{title}</td></tr>
                <tr><td class="p-2 border border-gray-300 font-semibold">Work Category</td><td class="p-2 border border-gray-300">{cat}</td></tr>
                <tr><td class="p-2 border border-gray-300 font-semibold">Member of Parliament</td><td class="p-2 border border-gray-300">{mp}</td></tr>
                <tr><td class="p-2 border border-gray-300 font-semibold">Constituency</td><td class="p-2 border border-gray-300">{const}</td></tr>
                <tr><td class="p-2 border border-gray-300 font-semibold">District / State</td><td class="p-2 border border-gray-300">{district}, {state}</td></tr>
            </tbody>
        </table>

        <table class="w-full text-xs mb-6 border-collapse">
            <thead>
                <tr class="bg-gray-100"><th colspan="2" class="text-left p-2 border border-gray-300 font-bold uppercase text-navy">2. Financial & Physical Status</th></tr>
            </thead>
            <tbody>
                <tr><td class="p-2 border border-gray-300 w-1/3 font-semibold">Sanctioned Amount</td><td class="p-2 border border-gray-300">₹{(sanc/100000.0):.2f} Lakhs</td></tr>
                <tr><td class="p-2 border border-gray-300 font-semibold">Expenditure Incurred</td><td class="p-2 border border-gray-300">₹{(spent/100000.0):.2f} Lakhs</td></tr>
                <tr><td class="p-2 border border-gray-300 font-semibold">Utilization Ratio</td><td class="p-2 border border-gray-300">{util_rate}%</td></tr>
                <tr><td class="p-2 border border-gray-300 font-semibold">Reported Progress</td><td class="p-2 border border-gray-300">{progress}%</td></tr>
                <tr class="bg-red-50"><td class="p-2 border border-gray-300 font-semibold text-red-900">Progress Gap</td><td class="p-2 border border-gray-300 text-red-950 font-bold">{round(util_rate - progress, 1)}%</td></tr>
            </tbody>
        </table>

        <div class="border border-red-300 rounded p-4 bg-red-50/50 mb-6">
            <h5 class="text-xs font-bold text-red-900 uppercase tracking-wide mb-2">3. Risk Assessment Parameters</h5>
            <div class="grid grid-cols-2 gap-4 text-xs">
                <div><strong>Risk Priority Score:</strong> {score}/100</div>
                <div><strong>Assessment Level:</strong> <span class="font-bold text-red-700">{level}</span></div>
                <div class="col-span-2"><strong>Primary Flag reasons:</strong> {reasons}</div>
            </div>
            
            <div class="mt-3 grid grid-cols-5 gap-2 text-center text-[10px] uppercase font-bold text-gray-700">
                <div class="bg-white border p-1 rounded">Fin: {project.get("financial_risk", "N/A")}</div>
                <div class="bg-white border p-1 rounded">Prog: {project.get("progress_risk", "N/A")}</div>
                <div class="bg-white border p-1 rounded">Geo: {project.get("geo_risk", "N/A")}</div>
                <div class="bg-white border p-1 rounded">Vis: {project.get("visual_risk", "N/A")}</div>
                <div class="bg-white border p-1 rounded">Proc: {project.get("procurement_risk", "N/A")}</div>
            </div>
        </div>

        <div class="border border-navy p-4 bg-gray-50 mb-6">
            <h5 class="text-xs font-bold text-navy uppercase tracking-wide mb-2">4. Action Plan Directives</h5>
            <p class="text-xs font-bold text-teal-850 mb-2 uppercase">RECOMMENDED: {action}</p>
            <ul class="list-decimal pl-4 text-xs space-y-1 text-gray-800">
                <li>Audit standard procurement and bills of quantity.</li>
                <li>Conduct spatial overlaps checks using verified surveyor coordinates.</li>
                <li>Assign field auditor for site photography and physical measurement reporting.</li>
            </ul>
        </div>
        
        <div class="text-[10px] text-gray-500 italic text-center border-t pt-4">
            AI-assisted evaluation. Final verification and authoritative determinations rest solely with human auditing officials.
        </div>
    </div>
    """
    
    return {
        "markdown": md_content,
        "html": html_content
    }
