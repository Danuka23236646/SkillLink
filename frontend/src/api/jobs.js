const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:5041";

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

export async function uploadLogo(file) {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch(`${API_BASE}/api/files/logo`, { method: "POST", body: fd });
  if (!res.ok) {
    let data; try { data = await res.json(); } catch { data = { error: await res.text() }; }
    const err = new Error("Upload failed"); err.status = res.status; err.data = data; throw err;
  }
  return res.json(); // { url, fileName, size }
}
