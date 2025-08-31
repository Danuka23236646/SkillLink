// frontend/src/api/files.js
const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:5041";

export async function uploadAvatar(file) {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch(`${API_BASE}/api/files/avatar`, {
    method: "POST",
    body: fd,
  });
  if (!res.ok) {
    let data; try { data = await res.json(); } catch { data = { error: await res.text() }; }
    const err = new Error("Avatar upload failed");
    err.status = res.status; err.data = data;
    throw err;
  }
  return res.json(); // { url, fileName, size }
}
