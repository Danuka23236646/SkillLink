const API_BASE = "http://localhost:5041";
const API_URL  = `${API_BASE}/api/jobs`;

export async function createJob(payload) {
  const res = await fetch(`${API_BASE}/api/jobs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    let data; try { data = await res.json(); } catch { data = { error: await res.text() }; }
    const err = new Error("Job create failed"); err.status = res.status; err.data = data; throw err;
  }
  return res.json();
}

// src/api/jobs.js
export async function uploadLogo(file) {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch(`${API_BASE}/api/files/logo`, { method: "POST", body: fd });
  if (!res.ok) {
    let data; try { data = await res.json(); } catch { data = { error: await res.text() }; }
    const err = new Error("Upload failed"); err.status = res.status; err.data = data; throw err;
  }

  // ⬇️ normalize url to absolute (http://localhost:5041/...)
  const data = await res.json(); // expected { url, ... }
  const u = data?.url;
  if (u && !/^https?:\/\//i.test(u)) {
    data.url = `${API_BASE}${u.startsWith('/') ? '' : '/'}${u}`;
  }
  return data;
}



// replace this function
export async function getJobs({ page = 1, pageSize = 20 } = {}) {
  const qs = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
  const res = await fetch(`${API_URL}?${qs}`);
  if (!res.ok) throw new Error(await res.text() || "Failed to fetch jobs");

  const data = await res.json();

  // Support both shapes: array OR { items, total, ... }
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



// ... keep your existing code above

export async function updateJob(id, payload) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let data;
    try { data = await res.json(); } catch { data = { error: await res.text() }; }
    const err = new Error("Job update failed");
    err.status = res.status;
    err.data = data;
    throw err;
  }

  // Many APIs return 204 No Content for PUT
  if (res.status === 204) return true;

  // If the API returns a body, return it; otherwise just return true
  try { return await res.json(); } catch { return true; }
}

export async function deleteJob(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) {
    let data; try { data = await res.json(); } catch { data = { error: await res.text() }; }
    const err = new Error("Job delete failed"); err.status = res.status; err.data = data; throw err;
  }
  return true;
}
