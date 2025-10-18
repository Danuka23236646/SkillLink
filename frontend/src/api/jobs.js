// src/api/jobs.js
const API_BASE = "http://localhost:5041";
const API_URL  = `${API_BASE}/api/jobs`;

// ─────────────────────────────────────────────────────────────────────────────
// DEV: spoof an authenticated employer id while you don't have real auth wired.
// In production, REMOVE this header and rely on server-side auth claims.
// ─────────────────────────────────────────────────────────────────────────────
const DEV_DEBUG_USER_ID = "1"; // ← set to a real users.id from your DB

// Helper to build JSON headers with the dev header when needed
function jsonHeaders(includeDebugHeader = false) {
  const h = { "Content-Type": "application/json" };
  if (includeDebugHeader && DEV_DEBUG_USER_ID) {
    h["X-Debug-UserId"] = DEV_DEBUG_USER_ID;
  }
  return h;
}

// ─────────────────────────────────────────────────────────────────────────────
// CREATE: POST /api/jobs
// Sends X-Debug-UserId so backend can set EmployerUserId during development.
// ─────────────────────────────────────────────────────────────────────────────
export async function createJob(payload) {
  // Get the logged-in user's ID
  const user = JSON.parse(localStorage.getItem('user'));
  const employerUserId = user?.id;
  const headers = { "Content-Type": "application/json" };
  if (employerUserId) headers["X-Debug-UserId"] = employerUserId;
  const res = await fetch(`${API_BASE}/api/jobs`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const clone = res.clone();
    let data;
    try {
      data = await res.json();
    } catch {
      try {
        data = { error: await clone.text() };
      } catch {
        data = { error: `HTTP ${res.status}` };
      }
    }
    const err = new Error("Job create failed");
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return res.json();
}

// ─────────────────────────────────────────────────────────────────────────────
// LOGO UPLOAD
// ─────────────────────────────────────────────────────────────────────────────
export async function uploadLogo(file) {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch(`${API_BASE}/api/files/logo`, { method: "POST", body: fd });
  if (!res.ok) {
    let data; try { data = await res.json(); } catch { data = { error: await res.text() }; }
    const err = new Error("Upload failed"); err.status = res.status; err.data = data; throw err;
  }

  const data = await res.json(); // expected { url, ... }
  const u = data?.url;
  if (u && !/^https?:\/\//i.test(u)) {
    data.url = `${API_BASE}${u.startsWith('/') ? '' : '/'}${u}`;
  }
  return data;
}

// ─────────────────────────────────────────────────────────────────────────────
// LIST: GET /api/jobs
// ─────────────────────────────────────────────────────────────────────────────
export async function getJobs({ page = 1, pageSize = 20 } = {}) {
  const qs = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
  const res = await fetch(`${API_URL}?${qs}`);
  if (!res.ok) throw new Error((await res.text()) || "Failed to fetch jobs");

  const data = await res.json();

  if (Array.isArray(data)) {
    return { items: data, total: data.length, page: 1, pageSize: data.length };
  }
  return {
    items: data.items ?? [],
    total: data.total ?? (data.items?.length ?? 0),
    page: data.page ?? 1,
    pageSize: data.pageSize ?? (data.items?.length ?? 0),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// UPDATE / DELETE
// ─────────────────────────────────────────────────────────────────────────────
export async function updateJob(id, payload) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: jsonHeaders(), // no dev header needed for update
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const clone = res.clone();
    let data;
    try { data = await res.json(); } catch { try { data = { error: await clone.text() }; } catch { data = { error: `HTTP ${res.status}` }; } }
    const err = new Error("Job update failed");
    err.status = res.status;
    err.data = data;
    throw err;
  }

  if (res.status === 204) return true;
  try { return await res.json(); } catch { return true; }
}

export async function deleteJob(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const clone = res.clone();
    let data;
    try { data = await res.json(); } catch { try { data = { error: await clone.text() }; } catch { data = { error: `HTTP ${res.status}` }; } }
    const err = new Error("Job delete failed"); err.status = res.status; err.data = data; throw err;
  }
  return true;
}

// ─────────────────────────────────────────────────────────────────────────────
// DETAILS: GET /api/jobs/:id
// ─────────────────────────────────────────────────────────────────────────────
export async function getJobById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) {
    const clone = res.clone();
    let data;
    try { data = await res.json(); } catch { try { data = { error: await clone.text() }; } catch { data = { error: `HTTP ${res.status}` }; } }
    const err = new Error("Job fetch failed");
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return res.json();
}

// ─────────────────────────────────────────────────────────────────────────────
// APPLICATIONS
// ─────────────────────────────────────────────────────────────────────────────
export async function applyToJob(jobId, payload) {
  const res = await fetch(`${API_BASE}/api/applications`, {
    method: "POST",
    headers: jsonHeaders(),
    body: JSON.stringify({ jobId, ...payload }),
  });

  if (!res.ok) {
    const text = await res.text(); // read ONCE
    let data; try { data = JSON.parse(text); } catch { data = { error: text } }
    const err = new Error(data.message || "Application submit failed");
    err.status = res.status; err.data = data; throw err;
  }

  if (res.status === 204) return true;
  const text = await res.text();
  return text ? JSON.parse(text) : true;
}

export async function getMyApplications(params = {}) {
  // DEV: add userEmail param if not present, for backend fallback
  let userEmail = params.userEmail;
  let token = null;
  if (!userEmail) {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      userEmail = user?.email;
      token = user?.token;
    } catch {}
  }
  const allParams = { ...params };
  if (userEmail) allParams.userEmail = userEmail;
  const qs = new URLSearchParams(allParams).toString();
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}/api/applications${qs ? `?${qs}` : ""}`, { headers });
  if (!res.ok) {
    const text = await res.text();
    const err = new Error("Failed to fetch applications");
    err.status = res.status; err.data = text; throw err;
  }
  return res.json();
}

export async function getEmployerApplications({ companyName, jobId } = {}) {
  const params = new URLSearchParams();
  if (companyName) params.set('companyName', companyName);
  if (jobId != null) params.set('jobId', String(jobId));
  const qs = params.toString();
  const res = await fetch(`${API_BASE}/api/applications${qs ? `?${qs}` : ''}`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function getApplicationById(id) {
  const res = await fetch(`${API_BASE}/api/applications/${id}`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// Employer "mine" list — your backend supports claims/query/header fallback.
// We pass a query in dev to be explicit.
export async function getMyEmployerApplications(employerUserId) {
  const qs = employerUserId ? `?employerUserId=${encodeURIComponent(employerUserId)}` : '';
  const res = await fetch(`${API_BASE}/api/applications/mine${qs}`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function getMyJobs({ employerUserId, page = 1, pageSize = 20 } = {}) {
  // Always use the logged-in user's ID
  const user = JSON.parse(localStorage.getItem('user'));
  const id = employerUserId || user?.id;
  const token = user?.token;
  const params = new URLSearchParams();
  if (id) params.set('employerUserId', id);
  params.set('page', page);
  params.set('pageSize', pageSize);
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${API_URL}/mine?${params.toString()}`, { headers });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
