import datetime

# Mock database module to serve projects with strict counts:
# GOOD: 13, LOW RISK: 18, MEDIUM RISK: 9, HIGH RISK: 6, VERY HIGH RISK: 4
# Total: 50 projects

PROJECTS = []

# Hardcoded core projects to ensure exact compliance with specifications
core_projects = [
    # --- VERY HIGH RISK (4 projects) ---
    {
        "project_id": "VR-JBP-044",
        "project_title": "Road Construction Work",
        "category": "Road",
        "mp_name": "Shri Rakesh Singh (Synthetic)",
        "constituency": "Jabalpur",
        "district": "Jabalpur",
        "state": "Madhya Pradesh",
        "city": "Jabalpur",
        "sanctioned_amount": 3500000.0, # ₹35.0 L
        "revised_amount": 3500000.0,
        "amount_released": 3200000.0,
        "expenditure_incurred": 3150000.0, # 90% utilization
        "physical_progress_percent": 12.0, # 12% progress
        "latitude": 23.1686,
        "longitude": 79.9338,
        "sanction_date": "2025-04-10",
        "expected_completion_date": "2026-05-15",
        "actual_completion_date": None,
        "status": "Ongoing",
        "contractor_id": "CON-JBP-881",
        "contractor_name": "Central Roadways Ltd (Synthetic)",
        "tender_id": "TND-JBP-2025-014",
        "work_order_id": "WO-JBP-2025-88",
        "image_before": "/cv/sample_images/school_before.png",
        "image_after": "/cv/sample_images/school_before.png", # Low visual change
        "financial_risk": 94,
        "geo_risk": 38,
        "progress_risk": 96,
        "visual_risk": 82, # High risk because visual change is low (82/100 risk score)
        "procurement_risk": 15,
        "overall_risk_score": 94,
        "risk_level": "VERY HIGH RISK",
        "risk_reasons": "Material cost deviation from prototype regional baseline + physical progress mismatch",
        "recommended_action": "Priority field verification recommended",
        "details_why_flagged": {
            "financial": "₹35.0L project cost is 3.5× the prototype regional benchmark baseline of ₹10.0L for road works.",
            "progress": "90% of funds utilized (₹31.5L spent) but only 12% reported physical progress.",
            "geo": "No nearby duplicate works detected within close range.",
            "evidence": "Satellite verification shows low physical change (Change Score: 18/100). Ground verification remains authoritative."
        }
    },
    {
        "project_id": "VR-HYD-032",
        "project_title": "Water Supply Distribution Work",
        "category": "Water",
        "mp_name": "Shri Asaduddin Owaisi (Synthetic)",
        "constituency": "Hyderabad",
        "district": "Hyderabad",
        "state": "Telangana",
        "city": "Hyderabad",
        "sanctioned_amount": 1400000.0, # ₹14.0 L
        "revised_amount": 1400000.0,
        "amount_released": 1300000.0,
        "expenditure_incurred": 1290000.0, # 92.1% utilization
        "physical_progress_percent": 18.0, # 18% progress
        "latitude": 17.3850,
        "longitude": 78.4867,
        "sanction_date": "2025-06-01",
        "expected_completion_date": "2026-11-15",
        "actual_completion_date": None,
        "status": "Ongoing",
        "contractor_id": "CON-HYD-992",
        "contractor_name": "Pearl Utilities Corp (Synthetic)",
        "tender_id": "TND-HYD-2025-901",
        "work_order_id": "WO-HYD-2025-032",
        "image_before": "/cv/sample_images/school_before.png",
        "image_after": "/cv/sample_images/school_before.png",
        "financial_risk": 82,
        "geo_risk": 76,
        "progress_risk": 94,
        "visual_risk": 45,
        "procurement_risk": 30,
        "overall_risk_score": 88,
        "risk_level": "VERY HIGH RISK",
        "risk_reasons": "Fund-progress mismatch + nearby similar water supply work within 48 meters",
        "recommended_action": "Priority field verification recommended",
        "details_why_flagged": {
            "financial": "92.1% expenditure utilization (₹12.9L spent) vs 18% reported physical progress.",
            "progress": "Reported progress is 18%. Mismatch gap between financial spend and physical status is 74.1%.",
            "geo": "Another water piping project (VR-HYD-033) is registered just 48m away, showing potential spatial overlap.",
            "evidence": "Ground verification required to assert whether infrastructure is duplicated."
        }
    },
    {
        "project_id": "VR-VNS-047",
        "project_title": "Community Hall Building",
        "category": "Building",
        "mp_name": "Shri Narendra Modi (Synthetic)",
        "constituency": "Varanasi",
        "district": "Varanasi",
        "state": "Uttar Pradesh",
        "city": "Varanasi",
        "sanctioned_amount": 2000000.0, # ₹20.0 L
        "revised_amount": 2000000.0,
        "amount_released": 1900000.0,
        "expenditure_incurred": 1840000.0, # 92% spent
        "physical_progress_percent": 24.0,
        "latitude": 25.3176,
        "longitude": 82.9739,
        "sanction_date": "2025-01-20",
        "expected_completion_date": "2026-04-10",
        "actual_completion_date": None,
        "status": "Ongoing",
        "contractor_id": "CON-VNS-104",
        "contractor_name": "Kashi Developers (Synthetic)",
        "tender_id": "TND-VNS-2025-03",
        "work_order_id": "WO-VNS-2025-47",
        "image_before": "/cv/sample_images/school_before.png",
        "image_after": "/cv/sample_images/school_before.png",
        "financial_risk": 75,
        "geo_risk": 98, # Critical geo duplicate risk
        "progress_risk": 91,
        "visual_risk": 20,
        "procurement_risk": 85,
        "overall_risk_score": 91,
        "risk_level": "VERY HIGH RISK",
        "risk_reasons": "Potential duplicate (43m from VR-VNS-048) + progress mismatch",
        "recommended_action": "Priority field verification recommended",
        "details_why_flagged": {
            "financial": "₹18.4L expenditure (92% utilization) vs 24% reported physical progress.",
            "progress": "Severe gap between funds spent and physical structures built.",
            "geo": "POTENTIAL DUPLICATE DETECTED. Project VR-VNS-048 (Community Hall Renovation, ₹18.0L) is located just 43 meters away.",
            "evidence": "High spatial similarity in same category (Building) within 43m suggests potential double-billing or overlap."
        }
    },
    {
        "project_id": "VR-VNS-048",
        "project_title": "Community Hall Renovation",
        "category": "Building",
        "mp_name": "Shri Narendra Modi (Synthetic)",
        "constituency": "Varanasi",
        "district": "Varanasi",
        "state": "Uttar Pradesh",
        "city": "Varanasi",
        "sanctioned_amount": 1800000.0, # ₹18.0 L
        "revised_amount": 1800000.0,
        "amount_released": 1700000.0,
        "expenditure_incurred": 1620000.0, # 90% spent
        "physical_progress_percent": 26.0,
        "latitude": 25.3178, # 43 meters from VR-VNS-047
        "longitude": 82.9742,
        "sanction_date": "2025-02-05",
        "expected_completion_date": "2026-05-01",
        "actual_completion_date": None,
        "status": "Ongoing",
        "contractor_id": "CON-VNS-104",
        "contractor_name": "Kashi Developers (Synthetic)",
        "tender_id": "TND-VNS-2025-04",
        "work_order_id": "WO-VNS-2025-48",
        "image_before": "/cv/sample_images/school_before.png",
        "image_after": "/cv/sample_images/school_before.png",
        "financial_risk": 72,
        "geo_risk": 98,
        "progress_risk": 88,
        "visual_risk": 20,
        "procurement_risk": 85,
        "overall_risk_score": 89,
        "risk_level": "VERY HIGH RISK",
        "risk_reasons": "Potential duplicate (43m from VR-VNS-047) + progress mismatch",
        "recommended_action": "Priority field verification recommended",
        "details_why_flagged": {
            "financial": "₹16.2L expenditure (90% utilization) vs 26% reported physical progress.",
            "progress": "Unusual fund utilization rate given the early construction phase.",
            "geo": "POTENTIAL DUPLICATE DETECTED. Project VR-VNS-047 (Community Hall Building, ₹20.0L) is located just 43 meters away.",
            "evidence": "Both works contracted to the same vendor (Kashi Developers) at almost identical locations."
        }
    },

    # --- HIGH RISK (6 projects) ---
    {
        "project_id": "VR-BLR-021",
        "project_title": "Community Hall Construction",
        "category": "Building",
        "mp_name": "Shri Tejasvi Surya (Synthetic)",
        "constituency": "Bengaluru South",
        "district": "Bengaluru",
        "state": "Karnataka",
        "city": "Bengaluru",
        "sanctioned_amount": 1000000.0, # ₹10.0 L
        "revised_amount": 1000000.0,
        "amount_released": 950000.0,
        "expenditure_incurred": 910000.0, # 91% spent
        "physical_progress_percent": 21.0,
        "latitude": 12.9716,
        "longitude": 77.5946,
        "sanction_date": "2025-05-12",
        "expected_completion_date": "2026-08-20",
        "actual_completion_date": None,
        "status": "Ongoing",
        "contractor_id": "CON-BLR-544",
        "contractor_name": "Deccan Construction Ltd (Synthetic)",
        "tender_id": "TND-BLR-2025-102",
        "work_order_id": "WO-BLR-2025-21",
        "image_before": "/cv/sample_images/school_before.png",
        "image_after": "/cv/sample_images/school_after.png", # Has change, but progress is reported low, or vice versa
        "financial_risk": 68,
        "geo_risk": 20,
        "progress_risk": 90,
        "visual_risk": 82, # Change Detection Score 18/100 -> High visual risk
        "procurement_risk": 25,
        "overall_risk_score": 73,
        "risk_level": "HIGH RISK",
        "risk_reasons": "Fund-progress mismatch + low visual change detected",
        "recommended_action": "Field verification recommended",
        "details_why_flagged": {
            "financial": "91% funds spent but only 21% progress reported.",
            "progress": "Large progress-utilization gap of 70%.",
            "geo": "No nearby duplicate works detected within close range.",
            "evidence": "Visual verification detects change detection score of 18/100 (Low visual change). Inconsistency requires human audit."
        }
    },
    {
        "project_id": "VR-LKO-068",
        "project_title": "Rainwater Water Harvesting Works",
        "category": "Water",
        "mp_name": "Shri Rajnath Singh (Synthetic)",
        "constituency": "Lucknow",
        "district": "Lucknow",
        "state": "Uttar Pradesh",
        "city": "Lucknow",
        "sanctioned_amount": 980000.0, # ₹9.8 L
        "revised_amount": 980000.0,
        "amount_released": 900000.0,
        "expenditure_incurred": 840000.0, # 85.7% spent
        "physical_progress_percent": 31.0,
        "latitude": 26.8467,
        "longitude": 80.9462,
        "sanction_date": "2025-03-01",
        "expected_completion_date": "2026-03-15",
        "actual_completion_date": None,
        "status": "Ongoing",
        "contractor_id": "CON-LKO-AAA",
        "contractor_name": "Demo Contractor A (Synthetic)",
        "tender_id": "TND-LKO-2025-01",
        "work_order_id": "WO-LKO-2025-68",
        "image_before": "/cv/sample_images/school_before.png",
        "image_after": "/cv/sample_images/school_before.png",
        "financial_risk": 55,
        "geo_risk": 60,
        "progress_risk": 75,
        "visual_risk": 30,
        "procurement_risk": 90, # High procurement risk
        "overall_risk_score": 67,
        "risk_level": "HIGH RISK",
        "risk_reasons": "Progress mismatch + potential split procurement pattern under Contractor A",
        "recommended_action": "Field verification recommended",
        "details_why_flagged": {
            "financial": "₹8.4L spent out of ₹9.8L sanctioned (85% utilization). Progress reported at 31%.",
            "progress": "Progress lag of 54% relative to funds spent.",
            "geo": "Close spatial relationship with other contracts by the same contractor.",
            "evidence": "PROCUREMENT SPLITTING WARNING: 3 projects (VR-LKO-068 at ₹9.8L, VR-LKO-069 at ₹9.7L, VR-LKO-070 at ₹9.9L) sanctioned within the same month to Demo Contractor A, potentially bypassing higher-level tender approvals."
        }
    },
    {
        "project_id": "VR-LKO-069",
        "project_title": "Water Supply Tube-well Work",
        "category": "Water",
        "mp_name": "Shri Rajnath Singh (Synthetic)",
        "constituency": "Lucknow",
        "district": "Lucknow",
        "state": "Uttar Pradesh",
        "city": "Lucknow",
        "sanctioned_amount": 970000.0, # ₹9.7 L
        "revised_amount": 970000.0,
        "amount_released": 890000.0,
        "expenditure_incurred": 880000.0, # 90.7% spent
        "physical_progress_percent": 35.0,
        "latitude": 26.8480, # Proximity to VR-LKO-068
        "longitude": 80.9475,
        "sanction_date": "2025-03-05",
        "expected_completion_date": "2026-03-20",
        "actual_completion_date": None,
        "status": "Ongoing",
        "contractor_id": "CON-LKO-AAA",
        "contractor_name": "Demo Contractor A (Synthetic)",
        "tender_id": "TND-LKO-2025-02",
        "work_order_id": "WO-LKO-2025-69",
        "image_before": "/cv/sample_images/school_before.png",
        "image_after": "/cv/sample_images/school_before.png",
        "financial_risk": 52,
        "geo_risk": 58,
        "progress_risk": 70,
        "visual_risk": 30,
        "procurement_risk": 90,
        "overall_risk_score": 65,
        "risk_level": "HIGH RISK",
        "risk_reasons": "Progress mismatch + potential split procurement pattern under Contractor A",
        "recommended_action": "Field verification recommended",
        "details_why_flagged": {
            "financial": "₹8.8L spent out of ₹9.7L sanctioned. 90.7% expenditure vs 35% physical progress.",
            "progress": "Gap of 55% between financial and physical progress.",
            "geo": "Within same general ward/constituency in Lucknow as VR-LKO-068.",
            "evidence": "Associated with potential contract splitting under Contractor A. Three projects under the ₹10.0L threshold."
        }
    },
    {
        "project_id": "VR-LKO-070",
        "project_title": "Rainwater Harvesting Tank Install",
        "category": "Water",
        "mp_name": "Shri Rajnath Singh (Synthetic)",
        "constituency": "Lucknow",
        "district": "Lucknow",
        "state": "Uttar Pradesh",
        "city": "Lucknow",
        "sanctioned_amount": 990000.0, # ₹9.9 L
        "revised_amount": 990000.0,
        "amount_released": 910000.0,
        "expenditure_incurred": 900000.0, # 90.9% spent
        "physical_progress_percent": 33.0,
        "latitude": 26.8490,
        "longitude": 80.9490,
        "sanction_date": "2025-03-08",
        "expected_completion_date": "2026-03-30",
        "actual_completion_date": None,
        "status": "Ongoing",
        "contractor_id": "CON-LKO-AAA",
        "contractor_name": "Demo Contractor A (Synthetic)",
        "tender_id": "TND-LKO-2025-03",
        "work_order_id": "WO-LKO-2025-70",
        "image_before": "/cv/sample_images/school_before.png",
        "image_after": "/cv/sample_images/school_before.png",
        "financial_risk": 54,
        "geo_risk": 55,
        "progress_risk": 72,
        "visual_risk": 30,
        "procurement_risk": 90,
        "overall_risk_score": 66,
        "risk_level": "HIGH RISK",
        "risk_reasons": "Progress mismatch + potential split procurement pattern under Contractor A",
        "recommended_action": "Field verification recommended",
        "details_why_flagged": {
            "financial": "₹9.0L spent out of ₹9.9L sanctioned. 90.9% utilization vs 33% progress.",
            "progress": "Gap of 57% between financial and physical progress.",
            "geo": "Within same general ward/constituency in Lucknow as VR-LKO-068 and VR-LKO-069.",
            "evidence": "Part of Lucknow water project cluster awarded to Demo Contractor A in March 2025."
        }
    },
    {
        "project_id": "VR-CHE-081",
        "project_title": "Storm Water Drainage Project",
        "category": "Water",
        "mp_name": "Dr. Kalanidhi Veeraswamy (Synthetic)",
        "constituency": "Chennai North",
        "district": "Chennai",
        "state": "Tamil Nadu",
        "city": "Chennai",
        "sanctioned_amount": 1500000.0, # ₹15.0 L
        "revised_amount": 1500000.0,
        "amount_released": 1400000.0,
        "expenditure_incurred": 1380000.0, # 92% spent
        "physical_progress_percent": 22.0,
        "latitude": 13.0827,
        "longitude": 80.2707,
        "sanction_date": "2025-05-15",
        "expected_completion_date": "2026-06-30",
        "actual_completion_date": None,
        "status": "Ongoing",
        "contractor_id": "CON-CHE-112",
        "contractor_name": "Madras Drainage Co (Synthetic)",
        "tender_id": "TND-CHE-2025-88",
        "work_order_id": "WO-CHE-2025-81",
        "image_before": "/cv/sample_images/school_before.png",
        "image_after": "/cv/sample_images/school_before.png",
        "financial_risk": 70,
        "geo_risk": 20,
        "progress_risk": 91,
        "visual_risk": 50,
        "procurement_risk": 40,
        "overall_risk_score": 71,
        "risk_level": "HIGH RISK",
        "risk_reasons": "Fund-progress mismatch in storm water network",
        "recommended_action": "Field verification recommended",
        "details_why_flagged": {
            "financial": "92% budget consumed (₹13.8L spent) with only 22% reported physical progress.",
            "progress": "Major progress-utilization gap of 70%. High correlation with fund-progress anomaly.",
            "geo": "Standard isolated project structure.",
            "evidence": "High drainage expenditure before monsoon, structure verification pending."
        }
    },
    {
        "project_id": "VR-DEL-082",
        "project_title": "School Infrastructure Upgrade",
        "category": "Building",
        "mp_name": "Shri Manoj Tiwari (Synthetic)",
        "constituency": "Delhi North East",
        "district": "Delhi",
        "state": "Delhi",
        "city": "Delhi NCR",
        "sanctioned_amount": 2500000.0, # ₹25.0 L
        "revised_amount": 2500000.0,
        "amount_released": 2300000.0,
        "expenditure_incurred": 2250000.0, # 90% spent
        "physical_progress_percent": 30.0,
        "latitude": 28.6250,
        "longitude": 77.2250,
        "sanction_date": "2025-04-18",
        "expected_completion_date": "2026-07-20",
        "actual_completion_date": None,
        "status": "Ongoing",
        "contractor_id": "CON-DEL-333",
        "contractor_name": "Capital Civils Ltd (Synthetic)",
        "tender_id": "TND-DEL-2025-442",
        "work_order_id": "WO-DEL-2025-82",
        "image_before": "/cv/sample_images/school_before.png",
        "image_after": "/cv/sample_images/school_before.png",
        "financial_risk": 64,
        "geo_risk": 15,
        "progress_risk": 85,
        "visual_risk": 45,
        "procurement_risk": 75, # High procurement repeat contractor
        "overall_risk_score": 68,
        "risk_level": "HIGH RISK",
        "risk_reasons": "Progress mismatch + contractor repeated work patterns in district",
        "recommended_action": "Field verification recommended",
        "details_why_flagged": {
            "financial": "90% funds spent (₹22.5L) vs 30% progress.",
            "progress": "Progress gap is 60%.",
            "geo": "No nearby duplicate works detected.",
            "evidence": "Contractor Capital Civils Ltd has won 75% of similar school infrastructure building works in the outer Delhi district within 6 months, flagged for repeated procurement patterns."
        }
    },

    # --- MEDIUM RISK (9 projects) ---
    {
        "project_id": "VR-MUM-014",
        "project_title": "Road Improvement Work",
        "category": "Road",
        "mp_name": "Shri Arvind Sawant (Synthetic)",
        "constituency": "Mumbai South",
        "district": "Mumbai",
        "state": "Maharashtra",
        "city": "Mumbai",
        "sanctioned_amount": 1200000.0, # ₹12.0 L
        "revised_amount": 1200000.0,
        "amount_released": 1150000.0,
        "expenditure_incurred": 1120000.0, # 93.3% utilization
        "physical_progress_percent": 68.0,
        "latitude": 19.0760,
        "longitude": 72.8777,
        "sanction_date": "2025-03-10",
        "expected_completion_date": "2026-02-15",
        "actual_completion_date": None,
        "status": "Ongoing",
        "contractor_id": "CON-MUM-09",
        "contractor_name": "Maharashtra Infra Corp (Synthetic)",
        "tender_id": "TND-MUM-2025-41",
        "work_order_id": "WO-MUM-2025-14",
        "image_before": "/cv/sample_images/school_before.png",
        "image_after": "/cv/sample_images/school_after.png",
        "financial_risk": 55,
        "geo_risk": 20,
        "progress_risk": 48,
        "visual_risk": 35,
        "procurement_risk": 30,
        "overall_risk_score": 46,
        "risk_level": "MEDIUM RISK",
        "risk_reasons": "Moderate cost deviation from typical road work benchmarks",
        "recommended_action": "Review required",
        "details_why_flagged": {
            "financial": "Cost is 25% higher than the baseline average for simple road repair works in Mumbai (₹12L vs ₹9.6L standard).",
            "progress": "Expenditure is 93.3% while physical progress is 68%. This represents a moderate gap (25.3%).",
            "geo": "No close duplicates.",
            "evidence": "Progress is ongoing. Image comparison confirms substantial work done (Change Score: 65/100)."
        }
    },
    {
        "project_id": "VR-JAI-052",
        "project_title": "School Boundary Work",
        "category": "Building",
        "mp_name": "Shri Ramcharan Bohra (Synthetic)",
        "constituency": "Jaipur",
        "district": "Jaipur",
        "state": "Rajasthan",
        "city": "Jaipur",
        "sanctioned_amount": 800000.0, # ₹8.0 L
        "revised_amount": 800000.0,
        "amount_released": 700000.0,
        "expenditure_incurred": 680000.0, # 85% spent
        "physical_progress_percent": 57.0,
        "latitude": 26.9124,
        "longitude": 75.7873,
        "sanction_date": "2025-05-10",
        "expected_completion_date": "2026-01-30",
        "actual_completion_date": None,
        "status": "Ongoing",
        "contractor_id": "CON-JAI-041",
        "contractor_name": "Rajputana Builders (Synthetic)",
        "tender_id": "TND-JAI-2025-11",
        "work_order_id": "WO-JAI-2025-52",
        "image_before": "/cv/sample_images/school_before.png",
        "image_after": "/cv/sample_images/school_after.png",
        "financial_risk": 58,
        "geo_risk": 15,
        "progress_risk": 50,
        "visual_risk": 38,
        "procurement_risk": 40,
        "overall_risk_score": 54,
        "risk_level": "MEDIUM RISK",
        "risk_reasons": "Moderate cost deviation from average boundary wall baselines",
        "recommended_action": "Review required",
        "details_why_flagged": {
            "financial": "Project cost ₹8.0L vs typical boundary work baseline of ₹5.5L for comparable length.",
            "progress": "85% expenditure vs 57% progress. Gap of 28% requires monitoring.",
            "geo": "No duplicates.",
            "evidence": "Boundary wall is half built as shown by imagery (Change Score: 52/100)."
        }
    },

    # --- LOW RISK (18 projects) ---
    {
        "project_id": "VR-PUN-061",
        "project_title": "Public Library Building",
        "category": "Building",
        "mp_name": "Shri Girish Bapat (Synthetic)",
        "constituency": "Pune",
        "district": "Pune",
        "state": "Maharashtra",
        "city": "Pune",
        "sanctioned_amount": 1600000.0, # ₹16.0 L
        "revised_amount": 1600000.0,
        "amount_released": 1400000.0,
        "expenditure_incurred": 1350000.0, # 84.3% spent
        "physical_progress_percent": 76.0,
        "latitude": 18.5204,
        "longitude": 73.8567,
        "sanction_date": "2025-02-18",
        "expected_completion_date": "2026-02-28",
        "actual_completion_date": None,
        "status": "Ongoing",
        "contractor_id": "CON-PUN-022",
        "contractor_name": "Pune Vidya Corp (Synthetic)",
        "tender_id": "TND-PUN-2025-109",
        "work_order_id": "WO-PUN-2025-61",
        "image_before": "/cv/sample_images/school_before.png",
        "image_after": "/cv/sample_images/school_after.png",
        "financial_risk": 32,
        "geo_risk": 10,
        "progress_risk": 36,
        "visual_risk": 20,
        "procurement_risk": 25,
        "overall_risk_score": 35,
        "risk_level": "LOW RISK",
        "risk_reasons": "Minor expenditure variance, project within acceptable bounds",
        "recommended_action": "Monitor",
        "details_why_flagged": {
            "financial": "Expenditure is 84% vs 76% physical progress. Gap of 8% is well within normal tolerance (10%).",
            "progress": "Normal progression speed.",
            "geo": "No duplicates.",
            "evidence": "Significant building progress (Change Score: 78/100). Normal operations."
        }
    },

    # --- GOOD (13 projects) ---
    {
        "project_id": "VR-DEL-001",
        "project_title": "Community Health Centre",
        "category": "Building",
        "mp_name": "Shri Harsh Vardhan (Synthetic)",
        "constituency": "Chandni Chowk",
        "district": "Delhi",
        "state": "Delhi NCR",
        "city": "Delhi NCR",
        "sanctioned_amount": 1800000.0, # ₹18.0 L
        "revised_amount": 1800000.0,
        "amount_released": 1600000.0,
        "expenditure_incurred": 1570000.0, # 87.2% spent
        "physical_progress_percent": 82.0, # let's make it 82% to justify score 18 (GOOD)
        "latitude": 28.6139,
        "longitude": 77.2090,
        "sanction_date": "2025-01-15",
        "expected_completion_date": "2026-03-30",
        "actual_completion_date": None,
        "status": "Ongoing",
        "contractor_id": "CON-DEL-089",
        "contractor_name": "Delhi Builders Pvt Ltd (Synthetic)",
        "tender_id": "TND-DEL-2025-001",
        "work_order_id": "WO-DEL-2025-01",
        "image_before": "/cv/sample_images/school_before.png",
        "image_after": "/cv/sample_images/school_after.png",
        "financial_risk": 15,
        "geo_risk": 10,
        "progress_risk": 18,
        "visual_risk": 15,
        "procurement_risk": 20,
        "overall_risk_score": 18,
        "risk_level": "GOOD",
        "risk_reasons": "Normal variance, highly aligned financial and physical reports",
        "recommended_action": "Normal monitoring",
        "details_why_flagged": {
            "financial": "87.2% spent vs 82% progress. Gap of 5.2% is highly efficient.",
            "progress": "On schedule.",
            "geo": "Normal.",
            "evidence": "Verification imagery shows near completion of structure (Change Score: 85/100)."
        }
    },
    {
        "project_id": "VR-KOL-041",
        "project_title": "Solar Street Lighting Installations",
        "category": "Solar",
        "mp_name": "Shri Sudip Bandyopadhyay (Synthetic)",
        "constituency": "Kolkata Uttar",
        "district": "Kolkata",
        "state": "West Bengal",
        "city": "Kolkata",
        "sanctioned_amount": 750000.0, # ₹7.5 L
        "revised_amount": 750000.0,
        "amount_released": 720000.0,
        "expenditure_incurred": 700000.0, # 93.3% spent
        "physical_progress_percent": 94.0,
        "latitude": 22.5726,
        "longitude": 88.3639,
        "sanction_date": "2025-02-10",
        "expected_completion_date": "2025-12-15",
        "actual_completion_date": None,
        "status": "Ongoing",
        "contractor_id": "CON-KOL-003",
        "contractor_name": "Bengal Solar Utilities (Synthetic)",
        "tender_id": "TND-KOL-2025-12",
        "work_order_id": "WO-KOL-2025-41",
        "image_before": "/cv/sample_images/school_before.png",
        "image_after": "/cv/sample_images/school_after.png",
        "financial_risk": 12,
        "geo_risk": 8,
        "progress_risk": 14,
        "visual_risk": 12,
        "procurement_risk": 18,
        "overall_risk_score": 15,
        "risk_level": "GOOD",
        "risk_reasons": "Normal progression, high visual change confirming light installations",
        "recommended_action": "Normal monitoring",
        "details_why_flagged": {
            "financial": "Normal variance.",
            "progress": "Project is 94% complete on physical milestones.",
            "geo": "Normal.",
            "evidence": "Change detection confirms complete installation of panels (Change Score: 92/100)."
        }
    },
    {
        "project_id": "VR-SGR-002",
        "project_title": "Public Library & Digital Resource Centre",
        "category": "Building",
        "mp_name": "Dr. Farooq Abdullah (Synthetic)",
        "constituency": "Srinagar Constituency",
        "district": "Srinagar",
        "state": "Jammu and Kashmir",
        "city": "Srinagar",
        "sanctioned_amount": 1800000.0,
        "revised_amount": 1800000.0,
        "amount_released": 1600000.0,
        "expenditure_incurred": 1480000.0,
        "physical_progress_percent": 85.0,
        "latitude": 34.0837,
        "longitude": 74.7973,
        "sanction_date": "2025-01-10",
        "expected_completion_date": "2025-11-20",
        "actual_completion_date": None,
        "status": "Ongoing",
        "contractor_id": "CON-SGR-041",
        "contractor_name": "Chinar Construction Pvt Ltd (Synthetic)",
        "tender_id": "TND-SGR-2025-09",
        "work_order_id": "WO-SGR-2025-41",
        "image_before": "/cv/sample_images/school_before.png",
        "image_after": "/cv/sample_images/school_after.png",
        "financial_risk": 10,
        "geo_risk": 8,
        "progress_risk": 11,
        "visual_risk": 10,
        "procurement_risk": 15,
        "overall_risk_score": 12,
        "risk_level": "GOOD",
        "risk_reasons": "Normal variance, physical milestones highly aligned with financial claims",
        "recommended_action": "Normal monitoring",
        "details_why_flagged": {
            "financial": "82.2% expenditure utilization (₹14.8L spent) matches the advanced physical stage.",
            "progress": "85.0% reported physical progress is verified.",
            "geo": "Normal.",
            "evidence": "Visual verification detects change detection score of 88/100 (Significant visual change)."
        }
    },
    {
        "project_id": "VR-LEH-003",
        "project_title": "Solar Water Heating System at SNM Hospital",
        "category": "Solar",
        "mp_name": "Shri Jamyang Tsering Namgyal (Synthetic)",
        "constituency": "Ladakh Constituency",
        "district": "Leh",
        "state": "Ladakh",
        "city": "Leh",
        "sanctioned_amount": 1250000.0,
        "revised_amount": 1250000.0,
        "amount_released": 1100000.0,
        "expenditure_incurred": 1020000.0,
        "physical_progress_percent": 74.0,
        "latitude": 34.1526,
        "longitude": 77.5771,
        "sanction_date": "2025-02-14",
        "expected_completion_date": "2025-10-30",
        "actual_completion_date": None,
        "status": "Ongoing",
        "contractor_id": "CON-LEH-099",
        "contractor_name": "Himalayan Green Power (Synthetic)",
        "tender_id": "TND-LEH-2025-04",
        "work_order_id": "WO-LEH-2025-11",
        "image_before": "/cv/sample_images/school_before.png",
        "image_after": "/cv/sample_images/school_after.png",
        "financial_risk": 25,
        "geo_risk": 15,
        "progress_risk": 28,
        "visual_risk": 20,
        "procurement_risk": 20,
        "overall_risk_score": 28,
        "risk_level": "LOW RISK",
        "risk_reasons": "Minor expenditure variance, minor schedule adjustment",
        "recommended_action": "Monitor",
        "details_why_flagged": {
            "financial": "81.6% expenditure vs 74.0% progress. Minor deviation within normal parameters.",
            "progress": "74% complete on physical milestones.",
            "geo": "Normal.",
            "evidence": "Verification imagery shows near completion of installations."
        }
    },
    {
        "project_id": "VR-KOC-004",
        "project_title": "Public Drinking Water Tank Construction",
        "category": "Water",
        "mp_name": "Shri Hibi Eden (Synthetic)",
        "constituency": "Ernakulam Constituency",
        "district": "Ernakulam",
        "state": "Kerala",
        "city": "Kochi",
        "sanctioned_amount": 850000.0,
        "revised_amount": 850000.0,
        "amount_released": 750000.0,
        "expenditure_incurred": 710000.0,
        "physical_progress_percent": 88.0,
        "latitude": 9.9312,
        "longitude": 76.2673,
        "sanction_date": "2025-03-01",
        "expected_completion_date": "2025-11-15",
        "actual_completion_date": None,
        "status": "Ongoing",
        "contractor_id": "CON-KOC-114",
        "contractor_name": "Cochin Plumbing & Build (Synthetic)",
        "tender_id": "TND-KOC-2025-18",
        "work_order_id": "WO-KOC-2025-88",
        "image_before": "/cv/sample_images/school_before.png",
        "image_after": "/cv/sample_images/school_after.png",
        "financial_risk": 13,
        "geo_risk": 10,
        "progress_risk": 12,
        "visual_risk": 15,
        "procurement_risk": 15,
        "overall_risk_score": 15,
        "risk_level": "GOOD",
        "risk_reasons": "Normal progression, high visual change confirming tank construction",
        "recommended_action": "Normal monitoring",
        "details_why_flagged": {
            "financial": "83.5% spent vs 88.0% progress. Excellent cost efficiency.",
            "progress": "Project is 88.0% complete.",
            "geo": "Normal.",
            "evidence": "Verification imagery shows near completion of concrete tank structure."
        }
    },
    {
        "project_id": "VR-KKM-005",
        "project_title": "Solar Street Lighting for Coastal Wards",
        "category": "Solar",
        "mp_name": "Shri Vijay Vasanth (Synthetic)",
        "constituency": "Kanyakumari Constituency",
        "district": "Kanyakumari",
        "state": "Tamil Nadu",
        "city": "Kanyakumari",
        "sanctioned_amount": 1500000.0,
        "revised_amount": 1500000.0,
        "amount_released": 1400000.0,
        "expenditure_incurred": 1380000.0,
        "physical_progress_percent": 61.0,
        "latitude": 8.0883,
        "longitude": 77.5385,
        "sanction_date": "2025-04-18",
        "expected_completion_date": "2026-01-15",
        "actual_completion_date": None,
        "status": "Ongoing",
        "contractor_id": "CON-KKM-229",
        "contractor_name": "Southern Solar Systems (Synthetic)",
        "tender_id": "TND-KKM-2025-41",
        "work_order_id": "WO-KKM-2025-102",
        "image_before": "/cv/sample_images/school_before.png",
        "image_after": "/cv/sample_images/school_after.png",
        "financial_risk": 52,
        "geo_risk": 15,
        "progress_risk": 48,
        "visual_risk": 40,
        "procurement_risk": 30,
        "overall_risk_score": 48,
        "risk_level": "MEDIUM RISK",
        "risk_reasons": "Moderate cost deviation, high expenditure relative to progress",
        "recommended_action": "Review required",
        "details_why_flagged": {
            "financial": "92.0% spent vs 61.0% progress. Mismatch gap is 31.0% which triggers a caution signal.",
            "progress": "Project is 61% complete, but funds are nearly fully utilized.",
            "geo": "Normal.",
            "evidence": "Verification imagery shows partial street lighting installed."
        }
    },
    {
        "project_id": "VR-GAU-006",
        "project_title": "Community Hall Construction",
        "category": "Building",
        "mp_name": "Smt. Queen Oja (Synthetic)",
        "constituency": "Gauhati Constituency",
        "district": "Kamrup Metropolitan",
        "state": "Assam",
        "city": "Guwahati",
        "sanctioned_amount": 2200000.0,
        "revised_amount": 2200000.0,
        "amount_released": 2000000.0,
        "expenditure_incurred": 1810000.0,
        "physical_progress_percent": 79.0,
        "latitude": 26.1445,
        "longitude": 91.7362,
        "sanction_date": "2025-02-18",
        "expected_completion_date": "2025-12-30",
        "actual_completion_date": None,
        "status": "Ongoing",
        "contractor_id": "CON-GAU-772",
        "contractor_name": "Brahmaputra Builders (Synthetic)",
        "tender_id": "TND-GAU-2025-03",
        "work_order_id": "WO-GAU-2025-14",
        "image_before": "/cv/sample_images/school_before.png",
        "image_after": "/cv/sample_images/school_after.png",
        "financial_risk": 28,
        "geo_risk": 20,
        "progress_risk": 32,
        "visual_risk": 25,
        "procurement_risk": 20,
        "overall_risk_score": 32,
        "risk_level": "LOW RISK",
        "risk_reasons": "Minor expenditure variance, project within acceptable bounds",
        "recommended_action": "Monitor",
        "details_why_flagged": {
            "financial": "82.2% spent vs 79.0% progress. Gap of 3.2% is within standard tolerances.",
            "progress": "Normal progression speed.",
            "geo": "Normal.",
            "evidence": "Verification imagery shows substantial progress on building structure."
        }
    },
    {
        "project_id": "VR-ITA-007",
        "project_title": "Primary Health Sub-centre Boundary Wall",
        "category": "Building",
        "mp_name": "Shri Kiren Rijiju (Synthetic)",
        "constituency": "Arunachal West Constituency",
        "district": "Papum Pare",
        "state": "Arunachal Pradesh",
        "city": "Itanagar",
        "sanctioned_amount": 950000.0,
        "revised_amount": 950000.0,
        "amount_released": 900000.0,
        "expenditure_incurred": 880000.0,
        "physical_progress_percent": 24.0,
        "latitude": 27.0844,
        "longitude": 93.6053,
        "sanction_date": "2025-05-12",
        "expected_completion_date": "2026-03-10",
        "actual_completion_date": None,
        "status": "Ongoing",
        "contractor_id": "CON-ITA-502",
        "contractor_name": "Eastern Hills Construction (Synthetic)",
        "tender_id": "TND-ITA-2025-19",
        "work_order_id": "WO-ITA-2025-108",
        "image_before": "/cv/sample_images/school_before.png",
        "image_after": "/cv/sample_images/school_before.png",
        "financial_risk": 68,
        "geo_risk": 20,
        "progress_risk": 91,
        "visual_risk": 82,
        "procurement_risk": 25,
        "overall_risk_score": 71,
        "risk_level": "HIGH RISK",
        "risk_reasons": "Fund-progress mismatch + low visual change detected",
        "recommended_action": "Field verification recommended",
        "details_why_flagged": {
            "financial": "92.6% funds spent (₹8.8L) with only 24% progress reported.",
            "progress": "Major progress-utilization gap of 68.6%.",
            "geo": "Normal.",
            "evidence": "Verification imagery shows very little physical progress (Change Score: 15/100). Ground check recommended."
        }
    },
    {
        "project_id": "VR-BHU-008",
        "project_title": "Rainwater Harvesting Tank for Community Centre",
        "category": "Water",
        "mp_name": "Shri Vinod Lakhamashi Chavda (Synthetic)",
        "constituency": "Kachchh Constituency",
        "district": "Kutch",
        "state": "Gujarat",
        "city": "Bhuj",
        "sanctioned_amount": 1100000.0,
        "revised_amount": 1100000.0,
        "amount_released": 1000000.0,
        "expenditure_incurred": 920000.0,
        "physical_progress_percent": 91.0,
        "latitude": 23.2420,
        "longitude": 69.6669,
        "sanction_date": "2025-01-20",
        "expected_completion_date": "2025-12-15",
        "actual_completion_date": None,
        "status": "Ongoing",
        "contractor_id": "CON-BHU-033",
        "contractor_name": "Desert Water Corp (Synthetic)",
        "tender_id": "TND-BHU-2025-01",
        "work_order_id": "WO-BHU-2025-47",
        "image_before": "/cv/sample_images/school_before.png",
        "image_after": "/cv/sample_images/school_after.png",
        "financial_risk": 14,
        "geo_risk": 10,
        "progress_risk": 12,
        "visual_risk": 15,
        "procurement_risk": 20,
        "overall_risk_score": 16,
        "risk_level": "GOOD",
        "risk_reasons": "Normal variance, highly aligned financial and physical reports",
        "recommended_action": "Normal monitoring",
        "details_why_flagged": {
            "financial": "83.6% spent vs 91.0% progress. Efficient budget utilization.",
            "progress": "91% complete on physical milestones.",
            "geo": "Normal.",
            "evidence": "Verification imagery shows completed tank structure."
        }
    },
    {
        "project_id": "VR-JSL-009",
        "project_title": "Border Village Solar Micro-Grid",
        "category": "Solar",
        "mp_name": "Shri Kailash Choudhary (Synthetic)",
        "constituency": "Barmer Constituency",
        "district": "Jaisalmer",
        "state": "Rajasthan",
        "city": "Jaisalmer",
        "sanctioned_amount": 4200000.0,
        "revised_amount": 4200000.0,
        "amount_released": 3900000.0,
        "expenditure_incurred": 3860000.0,
        "physical_progress_percent": 15.0,
        "latitude": 26.9157,
        "longitude": 70.9083,
        "sanction_date": "2025-03-15",
        "expected_completion_date": "2026-04-10",
        "actual_completion_date": None,
        "status": "Ongoing",
        "contractor_id": "CON-JSL-192",
        "contractor_name": "Thar Solar Energy Ltd (Synthetic)",
        "tender_id": "TND-JSL-2025-88",
        "work_order_id": "WO-JSL-2025-19",
        "image_before": "/cv/sample_images/school_before.png",
        "image_after": "/cv/sample_images/school_before.png",
        "financial_risk": 84,
        "geo_risk": 20,
        "progress_risk": 95,
        "visual_risk": 82,
        "procurement_risk": 30,
        "overall_risk_score": 86,
        "risk_level": "VERY HIGH RISK",
        "risk_reasons": "Material cost deviation + severe progress mismatch + low visual change",
        "recommended_action": "Priority field verification recommended",
        "details_why_flagged": {
            "financial": "₹42.0L project cost is 3.2× the typical baseline average of ₹13.0L for remote microgrids.",
            "progress": "91.9% funds spent (₹38.6L) vs 15.0% progress.",
            "geo": "Normal.",
            "evidence": "Verification imagery shows empty site (Change Score: 12/100). Ground check critical."
        }
    }
]

# Cities and geographical centers
cities_coords = {
    "Delhi NCR": (28.6139, 77.2090),
    "Mumbai": (19.0760, 72.8777),
    "Bengaluru": (12.9716, 77.5946),
    "Chennai": (13.0827, 80.2707),
    "Hyderabad": (17.3850, 78.4867),
    "Kolkata": (22.5726, 88.3639),
    "Jabalpur": (23.1686, 79.9338),
    "Varanasi": (25.3176, 82.9739),
    "Jaipur": (26.9124, 75.7873),
    "Pune": (18.5204, 73.8567),
    "Lucknow": (26.8467, 80.9462),
    "Srinagar": (34.0837, 74.7973),
    "Leh": (34.1526, 77.5771),
    "Kochi": (9.9312, 76.2673),
    "Kanyakumari": (8.0883, 77.5385),
    "Guwahati": (26.1445, 91.7362),
    "Itanagar": (27.0844, 93.6053),
    "Bhuj": (23.2420, 69.6669),
    "Jaisalmer": (26.9157, 70.9083)
}

city_states = {
    "Delhi NCR": ("Delhi NCR", "Delhi"),
    "Mumbai": ("Maharashtra", "Mumbai"),
    "Bengaluru": ("Karnataka", "Bengaluru"),
    "Chennai": ("Tamil Nadu", "Chennai"),
    "Hyderabad": ("Telangana", "Hyderabad"),
    "Kolkata": ("West Bengal", "Kolkata"),
    "Jabalpur": ("Madhya Pradesh", "Jabalpur"),
    "Varanasi": ("Uttar Pradesh", "Varanasi"),
    "Jaipur": ("Rajasthan", "Jaipur"),
    "Pune": ("Maharashtra", "Pune"),
    "Lucknow": ("Uttar Pradesh", "Lucknow"),
    "Srinagar": ("Jammu and Kashmir", "Srinagar"),
    "Leh": ("Ladakh", "Leh"),
    "Kochi": ("Kerala", "Ernakulam"),
    "Kanyakumari": ("Tamil Nadu", "Kanyakumari"),
    "Guwahati": ("Assam", "Kamrup Metropolitan"),
    "Itanagar": ("Arunachal Pradesh", "Papum Pare"),
    "Bhuj": ("Gujarat", "Kutch"),
    "Jaisalmer": ("Rajasthan", "Jaisalmer")
}

categories = ["Building", "Road", "Water", "Solar"]

# Initialize all projects using base core projects first
PROJECTS.extend(core_projects)
for p in PROJECTS:
    if "sabha" not in p:
        p["sabha"] = "Lok Sabha"

# Count current risk level allocations
def get_risk_counts():
    counts = {"GOOD": 0, "LOW RISK": 0, "MEDIUM RISK": 0, "HIGH RISK": 0, "VERY HIGH RISK": 0}
    for p in PROJECTS:
        counts[p["risk_level"]] += 1
    return counts

# Target counts
target = {
    "GOOD": 16,
    "LOW RISK": 20,
    "MEDIUM RISK": 10,
    "HIGH RISK": 7,
    "VERY HIGH RISK": 5
}

# Fill up to 50 projects programmatically while keeping target numbers exact
def populate_database():
    import random
    random.seed(42) # Deterministic generation
    
    current_counts = get_risk_counts()
    
    # We will generate remaining items per category
    cities_list = list(cities_coords.keys())
    
    id_counter = 100
    
    for r_level, target_count in target.items():
        needed = target_count - current_counts[r_level]
        for _ in range(needed):
            city = random.choice(cities_list)
            state, district = city_states[city]
            lat_center, lng_center = cities_coords[city]
            # Offset slightly to avoid exact overlays on the map
            lat = lat_center + random.uniform(-0.015, 0.015)
            lng = lng_center + random.uniform(-0.015, 0.015)
            
            category = random.choice(categories)
            project_id = f"VR-{city[:3].upper()}-{id_counter:03d}"
            id_counter += 1
            
            # Setup specific values depending on the target risk level
            if r_level == "GOOD":
                score = random.randint(5, 20)
                progress = random.uniform(70.0, 95.0)
                expenditure_ratio = progress / 100.0 + random.uniform(-0.05, 0.05)
                sanctioned = random.randint(5, 20) * 100000.0 # ₹5L - ₹20L
                expenditure = sanctioned * min(0.98, max(0.1, expenditure_ratio))
                reasons = "Normal variance"
                action = "Normal monitoring"
                status = "Ongoing" if progress < 90 else "Completed"
            elif r_level == "LOW RISK":
                score = random.randint(21, 40)
                progress = random.uniform(50.0, 85.0)
                expenditure_ratio = progress / 100.0 + random.uniform(0.06, 0.12)
                sanctioned = random.randint(5, 25) * 100000.0
                expenditure = sanctioned * min(0.98, max(0.1, expenditure_ratio))
                reasons = "Minor expenditure deviation"
                action = "Monitor"
                status = "Ongoing"
            elif r_level == "MEDIUM RISK":
                score = random.randint(41, 60)
                progress = random.uniform(40.0, 75.0)
                expenditure_ratio = progress / 100.0 + random.uniform(0.15, 0.25)
                sanctioned = random.randint(8, 30) * 100000.0
                expenditure = sanctioned * min(0.98, max(0.1, expenditure_ratio))
                reasons = "Cost deviation" if random.choice([True, False]) else "Moderate expenditure pattern"
                action = "Review"
                status = "Ongoing"
            elif r_level == "HIGH RISK":
                score = random.randint(61, 80)
                progress = random.uniform(20.0, 45.0)
                expenditure_ratio = progress / 100.0 + random.uniform(0.35, 0.50)
                sanctioned = random.randint(10, 30) * 100000.0
                expenditure = sanctioned * min(0.98, max(0.1, expenditure_ratio))
                reasons = "Fund-progress mismatch"
                action = "Verify"
                status = "Ongoing"
            else: # VERY HIGH RISK (should already be full, but just in case)
                score = random.randint(81, 100)
                progress = random.uniform(10.0, 25.0)
                expenditure_ratio = progress / 100.0 + random.uniform(0.55, 0.70)
                sanctioned = random.randint(10, 40) * 100000.0
                expenditure = sanctioned * min(0.98, max(0.1, expenditure_ratio))
                reasons = "Significant cost deviation + progress mismatch"
                action = "Priority verification"
                status = "Ongoing"

            # Create realistic title
            titles = {
                "Building": ["Public Library Extension", "Community Hall Toilet Block", "Gram Panchayat Office", "School Classrooms Addition"],
                "Road": ["Village Link Road", "Basti Road Paving", "Internal Ward Road Upgrade", "Drainage Cover Paving"],
                "Water": ["Public Drinking Water Taps", "Tube-well Bore installation", "Overhead Tank Repair", "Water Main Pipeline Extension"],
                "Solar": ["Solar Streetlights Installation", "Panchayat Solar Rooftop", "High-Mast Solar Lighting", "Primary School Solar Plant"]
            }
            title = f"{random.choice(titles[category])} (Synthetic)"
            
            # Sabha type (80% Lok Sabha, 20% Rajya Sabha)
            sabha = "Rajya Sabha" if random.random() < 0.20 else "Lok Sabha"
            
            p_rec = {
                "project_id": project_id,
                "project_title": title,
                "category": category,
                "sabha": sabha,
                "mp_name": f"Shri MP {city[:3]} (Synthetic)" if sabha == "Lok Sabha" else f"Shri Rajya Sabha MP ({state} - Synthetic)",
                "constituency": f"{city} Constituency" if sabha == "Lok Sabha" else f"{state} (Rajya Sabha)",
                "district": district,
                "state": state,
                "city": city,
                "sanctioned_amount": round(sanctioned, 2),
                "revised_amount": round(sanctioned, 2),
                "amount_released": round(sanctioned * 0.9, 2),
                "expenditure_incurred": round(expenditure, 2),
                "physical_progress_percent": round(progress, 1),
                "latitude": round(lat, 5),
                "longitude": round(lng, 5),
                "sanction_date": "2025-03-10",
                "expected_completion_date": "2026-06-30",
                "actual_completion_date": None,
                "status": status,
                "contractor_id": f"CON-{city[:3].upper()}-{random.randint(100, 999)}",
                "contractor_name": f"Demo Contractor {city[:3]} (Synthetic)",
                "tender_id": f"TND-{city[:3].upper()}-2025-{random.randint(100, 999)}",
                "work_order_id": f"WO-{city[:3].upper()}-2025-{random.randint(100, 999)}",
                "image_before": "/cv/sample_images/school_before.png",
                "image_after": "/cv/sample_images/school_after.png",
                "financial_risk": score - random.randint(0, 10),
                "geo_risk": score - random.randint(5, 15) if score > 30 else random.randint(5, 20),
                "progress_risk": score - random.randint(0, 8),
                "visual_risk": random.randint(10, 60),
                "procurement_risk": random.randint(10, 50),
                "overall_risk_score": score,
                "risk_level": r_level,
                "risk_reasons": reasons,
                "recommended_action": action,
                "details_why_flagged": {
                    "financial": f"Expenditure ratio is {round(expenditure / sanctioned * 100, 1)}% vs reported physical progress {round(progress, 1)}%.",
                    "progress": f"Reported physical progress stands at {round(progress, 1)}%.",
                    "geo": "Standard spatial mapping. No suspicious overlapping duplicates flagged in proximity.",
                    "evidence": f"Change detection score is {random.randint(40, 85)}/100. Routine monitoring recommended."
                }
            }
            PROJECTS.append(p_rec)

populate_database()

def get_all_projects(filters=None):
    # Apply filters dynamically if provided
    result = PROJECTS.copy()
    if not filters:
        return result
        
    if "state" in filters and filters["state"]:
        result = [p for p in result if p["state"].lower() == filters["state"].lower()]
    if "city" in filters and filters["city"]:
        result = [p for p in result if p["city"].lower() == filters["city"].lower()]
    if "category" in filters and filters["category"]:
        result = [p for p in result if p["category"].lower() == filters["category"].lower()]
    if "risk_level" in filters and filters["risk_level"]:
        result = [p for p in result if p["risk_level"].upper() == filters["risk_level"].upper()]
    if "search" in filters and filters["search"]:
        q = filters["search"].lower()
        result = [p for p in result if q in p["project_title"].lower() or q in p["project_id"].lower() or q in p["district"].lower() or q in p["mp_name"].lower()]
    if "reason" in filters and filters["reason"]:
        q = filters["reason"].lower()
        result = [p for p in result if q in p["risk_reasons"].lower()]
    if "sabha" in filters and filters["sabha"]:
        result = [p for p in result if p["sabha"].lower() == filters["sabha"].lower()]
        
    return result

def get_project_by_id(project_id):
    for p in PROJECTS:
        if p["project_id"] == project_id:
            return p
    return None

def get_kpis(filtered_projects):
    total = len(filtered_projects)
    very_high = sum(1 for p in filtered_projects if p["risk_level"] == "VERY HIGH RISK")
    high = sum(1 for p in filtered_projects if p["risk_level"] == "HIGH RISK")
    medium = sum(1 for p in filtered_projects if p["risk_level"] == "MEDIUM RISK")
    low = sum(1 for p in filtered_projects if p["risk_level"] == "LOW RISK")
    good = sum(1 for p in filtered_projects if p["risk_level"] == "GOOD")
    
    # Calculate Funds Under Review associated with flagged demo records (Medium + High + Very High risk levels)
    funds_under_review = sum(p["sanctioned_amount"] for p in filtered_projects if p["risk_level"] in ["MEDIUM RISK", "HIGH RISK", "VERY HIGH RISK"])
    
    # Official e-SAKSHI indicators (in Crores)
    works_recommended_cr = sum(p["sanctioned_amount"] for p in filtered_projects) / 10000000.0
    works_sanctioned_cr = sum(p["revised_amount"] for p in filtered_projects if p["physical_progress_percent"] > 0) / 10000000.0
    works_completed_cr = sum(p["sanctioned_amount"] for p in filtered_projects if p["status"] == "Completed" or p["physical_progress_percent"] >= 95.0) / 10000000.0
    total_expenditure_cr = sum(p["expenditure_incurred"] for p in filtered_projects) / 10000000.0
    total_released_cr = sum(p["amount_released"] for p in filtered_projects) / 10000000.0
    total_sanctioned_works = sum(1 for p in filtered_projects if p["physical_progress_percent"] > 0)

    return {
        "total_projects": total,
        "very_high_risk": very_high,
        "high_risk": high,
        "medium_risk": medium,
        "low_risk": low,
        "good": good,
        "funds_under_review_cr": round(funds_under_review / 10000000.0, 2),
        "works_recommended_cr": round(works_recommended_cr, 2),
        "works_sanctioned_cr": round(works_sanctioned_cr, 2),
        "works_completed_cr": round(works_completed_cr, 2),
        "total_expenditure_cr": round(total_expenditure_cr, 2),
        "total_released_cr": round(total_released_cr, 2),
        "total_sanctioned_works": total_sanctioned_works
    }

def get_risk_distribution(filtered_projects):
    return [
        {"name": "GOOD", "value": sum(1 for p in filtered_projects if p["risk_level"] == "GOOD"), "color": "#35875A"},
        {"name": "LOW RISK", "value": sum(1 for p in filtered_projects if p["risk_level"] == "LOW RISK"), "color": "#0F8E84"},
        {"name": "MEDIUM RISK", "value": sum(1 for p in filtered_projects if p["risk_level"] == "MEDIUM RISK"), "color": "#D99024"},
        {"name": "HIGH RISK", "value": sum(1 for p in filtered_projects if p["risk_level"] == "HIGH RISK"), "color": "#EB8425"},
        {"name": "VERY HIGH RISK", "value": sum(1 for p in filtered_projects if p["risk_level"] == "VERY HIGH RISK"), "color": "#C23A34"}
    ]
