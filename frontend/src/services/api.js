const API_BASE = '/api';

export async function fetchProjects(filters = {}) {
  const params = new URLSearchParams();
  if (filters.state) params.append('state', filters.state);
  if (filters.city) params.append('city', filters.city);
  if (filters.category) params.append('category', filters.category);
  if (filters.risk_level) params.append('risk_level', filters.risk_level);
  if (filters.search) params.append('search', filters.search);
  if (filters.reason) params.append('reason', filters.reason);
  if (filters.sabha) params.append('sabha', filters.sabha);

  const res = await fetch(`${API_BASE}/projects?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
}

export async function fetchProjectDetails(projectId) {
  const res = await fetch(`${API_BASE}/projects/${projectId}`);
  if (!res.ok) throw new Error(`Failed to fetch project details for ${projectId}`);
  return res.json();
}

export async function fetchAnalytics(filters = {}) {
  const params = new URLSearchParams();
  if (filters.state) params.append('state', filters.state);
  if (filters.city) params.append('city', filters.city);
  if (filters.category) params.append('category', filters.category);
  if (filters.risk_level) params.append('risk_level', filters.risk_level);
  if (filters.search) params.append('search', filters.search);
  if (filters.sabha) params.append('sabha', filters.sabha);

  const res = await fetch(`${API_BASE}/analytics?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch analytics');
  return res.json();
}

export async function fetchGeoProjects() {
  const res = await fetch(`${API_BASE}/geo/projects`);
  if (!res.ok) throw new Error('Failed to fetch geo projects');
  return res.json();
}

export async function fetchAlerts() {
  const res = await fetch(`${API_BASE}/alerts`);
  if (!res.ok) throw new Error('Failed to fetch alerts');
  return res.json();
}

export async function uploadVisualVerification(beforeFile, afterFile) {
  const formData = new FormData();
  formData.append('before_file', beforeFile);
  formData.append('after_file', afterFile);

  const res = await fetch(`${API_BASE}/verify-image`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) throw new Error('Failed to upload visual verification files');
  return res.json();
}

export async function generateAuditBrief(projectId) {
  const res = await fetch(`${API_BASE}/generate-report`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ project_id: projectId }),
  });
  if (!res.ok) throw new Error('Failed to generate audit report brief');
  return res.json();
}
