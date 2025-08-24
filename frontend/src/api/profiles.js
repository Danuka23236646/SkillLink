const API_URL = "http://localhost:5041/api/profiles";

// GET all profiles
export async function getProfiles() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch profiles");
  return res.json();
}

// GET one profile by id
export async function getProfileById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch profile with id ${id}`);
  return res.json();
}

// POST create new profile
export async function createProfile(profile) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profile),
  });
  if (!res.ok) throw new Error("Failed to create profile");
  return res.json();
}

// PUT update profile
export async function updateProfile(id, profile) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profile),
  });
  if (!res.ok) throw new Error(`Failed to update profile with id ${id}`);
  return res.json();
}

// DELETE profile
export async function deleteProfile(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`Failed to delete profile with id ${id}`);
  return true;
}
