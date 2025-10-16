// frontend/src/api/files.js
const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:5041";

export async function uploadAvatar(file) {
  const fd = new FormData();
  fd.append("file", file);
  const uploadUrl = `${API_BASE}/api/files/avatar`;
  
  // Debug logging
  console.log("API_BASE:", API_BASE);
  console.log("Upload URL:", uploadUrl);
  console.log("VITE_API_BASE env var:", import.meta.env.VITE_API_BASE);
  
  const res = await fetch(uploadUrl, {
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
