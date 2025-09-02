import { tokenManager } from "./auth";

const API_URL = "http://localhost:5041/api/auth/change-password";

async function handle(res) {
  if (res.ok) return true;
  const text = await res.text();
  throw new Error(text || `HTTP ${res.status}`);
}

export async function changePassword(currentPassword, newPassword) {
  const token = tokenManager.getUser()?.token || tokenManager.getToken?.();
  return handle(
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    })
  );
}
