const API_URL = "http://localhost:5041/api/employerprofiles";

export async function getEmployerProfileByUserId(userId) {
  const res = await fetch(`${API_URL}/user/${userId}`);
  if (!res.ok) throw new Error(`Failed to fetch employer profile for user ${userId}`);
  return res.json();
}

export async function createEmployerProfile(payload) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create employer profile");
  return res.json();
}

export async function updateEmployerProfile(id, payload) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Failed to update employer profile ${id}`);
  return res.json();
}
