import os
from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import Optional, List

from backend.data.mock_database import (
    get_all_projects,
    get_project_by_id,
    get_kpis,
    get_risk_distribution,
    PROJECTS
)
from backend.services.risk_engine import compute_overall_risk, haversine_distance
from backend.services.report_generator import generate_project_audit_brief
from cv.change_detection import analyze_visual_change

# Initialize FastAPI
app = FastAPI(
    title="VERITAS Backend API",
    description="Risk intelligence and monitoring services for MPLADS works",
    version="1.0.0"
)

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount the static files directory to serve sample images
os.makedirs("d:/0.1sih26/sih/cv/sample_images", exist_ok=True)
app.mount("/cv/sample_images", StaticFiles(directory="d:/0.1sih26/sih/cv/sample_images"), name="sample_images")

# Pydantic schemas
class ReportRequest(BaseModel):
    project_id: str

# Endpoints
@app.get("/")
def read_root():
    return {"name": "VERITAS API", "status": "operational", "disclaimer": "DEMO MODE • SYNTHETIC DATA"}

@app.get("/api/projects")
def list_projects(
    state: Optional[str] = None,
    city: Optional[str] = None,
    category: Optional[str] = None,
    risk_level: Optional[str] = None,
    search: Optional[str] = None,
    reason: Optional[str] = None,
    sabha: Optional[str] = None
):
    filters = {}
    if state: filters["state"] = state
    if city: filters["city"] = city
    if category: filters["category"] = category
    if risk_level: filters["risk_level"] = risk_level
    if search: filters["search"] = search
    if reason: filters["reason"] = reason
    if sabha: filters["sabha"] = sabha

    filtered = get_all_projects(filters)
    return filtered

@app.get("/api/projects/{project_id}")
def project_details(project_id: str):
    p = get_project_by_id(project_id)
    if not p:
        raise HTTPException(status_code=404, detail="Project not found")
    return p

@app.get("/api/analytics")
def get_analytics(
    state: Optional[str] = None,
    city: Optional[str] = None,
    category: Optional[str] = None,
    risk_level: Optional[str] = None,
    search: Optional[str] = None,
    sabha: Optional[str] = None
):
    filters = {}
    if state: filters["state"] = state
    if city: filters["city"] = city
    if category: filters["category"] = category
    if risk_level: filters["risk_level"] = risk_level
    if search: filters["search"] = search
    if sabha: filters["sabha"] = sabha

    filtered = get_all_projects(filters)
    kpis = get_kpis(filtered)
    risk_dist = get_risk_distribution(filtered)
    
    # Scatter plot data format: Expenditure Utilization % vs Physical Progress %
    scatter_data = []
    for p in filtered:
        sanc = p["sanctioned_amount"]
        spent = p["expenditure_incurred"]
        progress = p["physical_progress_percent"]
        util_ratio = round((spent / sanc) * 100.0, 1) if sanc > 0 else 0.0
        
        scatter_data.append({
            "project_id": p["project_id"],
            "title": p["project_title"],
            "category": p["category"],
            "city": p["city"],
            "expenditure_utilization": util_ratio,
            "physical_progress": progress,
            "risk_score": p["overall_risk_score"],
            "risk_level": p["risk_level"]
        })
        
    return {
        "kpis": kpis,
        "risk_distribution": risk_dist,
        "scatter_plot": scatter_data
    }

@app.get("/api/geo/projects")
def get_geo_projects():
    """
    Returns simplified markers for Leaflet GIS.
    """
    markers = []
    for p in PROJECTS:
        markers.append({
            "project_id": p["project_id"],
            "project_title": p["project_title"],
            "category": p["category"],
            "city": p["city"],
            "latitude": p["latitude"],
            "longitude": p["longitude"],
            "risk_score": p["overall_risk_score"],
            "risk_level": p["risk_level"],
            "risk_reasons": p["risk_reasons"]
        })
    return markers

@app.get("/api/alerts")
def get_alerts():
    """
    Simulates high-priority real-time alerts.
    """
    alerts = [
        {
            "id": "ALT-001",
            "type": "VERY HIGH",
            "project_id": "VR-JBP-044",
            "message": "Cost deviation + fund-progress mismatch flagged for road construction",
            "timestamp": "12 min ago",
            "color": "red"
        },
        {
            "id": "ALT-002",
            "type": "VERY HIGH",
            "project_id": "VR-HYD-032",
            "message": "Physical progress (18%) materially below expenditure utilization (92%)",
            "timestamp": "25 min ago",
            "color": "red"
        },
        {
            "id": "ALT-003",
            "type": "HIGH",
            "project_id": "VR-VNS-047",
            "message": "Potential spatial duplicate: VR-VNS-047 is within 43m of VR-VNS-048",
            "timestamp": "34 min ago",
            "color": "orange"
        },
        {
            "id": "ALT-004",
            "type": "HIGH",
            "project_id": "VR-LKO-068",
            "message": "Potential procurement splitting warning: 3 similar works for Demo Contractor A in Lucknow",
            "timestamp": "52 min ago",
            "color": "orange"
        },
        {
            "id": "ALT-005",
            "type": "MEDIUM",
            "project_id": "VR-MUM-014",
            "message": "Moderate regional cost deviation for road improvement",
            "timestamp": "1 hr ago",
            "color": "amber"
        },
        {
            "id": "ALT-006",
            "type": "LOW",
            "project_id": "VR-PUN-061",
            "message": "Minor expenditure variance, standard monitor active",
            "timestamp": "3 hrs ago",
            "color": "teal"
        },
        {
            "id": "ALT-007",
            "type": "GOOD",
            "project_id": "VR-DEL-001",
            "message": "Project VR-DEL-001 has resolved anomaly signals, status verified",
            "timestamp": "5 hrs ago",
            "color": "green"
        }
    ]
    return alerts

@app.post("/api/verify-image")
async def verify_image(
    before_file: UploadFile = File(...),
    after_file: UploadFile = File(...)
):
    """
    Compares uploaded before/after photos and returns the difference metrics.
    """
    before_temp = "d:/0.1sih26/sih/cv/sample_images/temp_before.png"
    after_temp = "d:/0.1sih26/sih/cv/sample_images/temp_after.png"
    
    try:
        # Save files temporarily
        with open(before_temp, "wb") as f:
            f.write(await before_file.read())
        with open(after_temp, "wb") as f:
            f.write(await after_file.read())
            
        score, status = analyze_visual_change(before_temp, after_temp)
        
        return {
            "change_score": score,
            "status": status,
            "success": True
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Image verification error: {str(e)}")

@app.post("/api/generate-report")
def generate_report(req: ReportRequest):
    p = get_project_by_id(req.project_id)
    if not p:
        raise HTTPException(status_code=404, detail="Project not found")
        
    brief = generate_project_audit_brief(p)
    return brief
