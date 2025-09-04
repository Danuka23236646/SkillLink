const API_BASE_URL = 'http://localhost:5041/api';

async function handleResponse(response) {
  const contentType = response.headers.get('content-type') || '';
  const raw = await response.text(); // read once
  let data = null;

  // Try to parse JSON if it looks like JSON
  if (raw) {
    if (contentType.includes('application/json')) {
      try { data = JSON.parse(raw); } catch { /* ignore parse error */ }
    } else {
      data = { message: raw }; // treat plain text as message
    }
  }

  if (!response.ok) {
    const msg =
      (data && (data.message || data.error || data.title)) ||
      `HTTP ${response.status} ${response.statusText}`;
    throw new Error(msg);
  }

  // successful but empty body (e.g., 204)
  return data ?? {};
}

export const authAPI = {
  async login(email, password) {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(res);
  },

  async register(fullName, email, password, role) {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ fullName, email, password, role }),
    });
    return handleResponse(res);
  },
};

// Token management utilities
export const tokenManager = {
  setToken(token) {
    localStorage.setItem('authToken', token);
  },

  getToken() {
    return localStorage.getItem('authToken');
  },

  removeToken() {
    localStorage.removeItem('authToken');
  },

  setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  },

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  removeUser() {
    localStorage.removeItem('user');
  },

  clearAuth() {
    this.removeToken();
    this.removeUser();
  },
};
