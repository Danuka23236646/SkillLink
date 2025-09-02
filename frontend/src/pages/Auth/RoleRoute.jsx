// src/auth/RoleRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { tokenManager } from "../../api/auth";

export default function RoleRoute({ allow = [] }) {
  const me = tokenManager.getUser();
  const role = (me?.role || "").toLowerCase();

  if (!me?.isAuthenticated) return <Navigate to="/login" replace />;

  const ok = allow.map(r => r.toLowerCase()).includes(role);
  return ok ? <Outlet /> : <Navigate to="/forbidden" replace />;
}
