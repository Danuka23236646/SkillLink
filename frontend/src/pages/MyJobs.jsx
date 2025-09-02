import React, { useEffect, useRef, useState } from "react";
import { getJobs, updateJob, deleteJob, uploadLogo } from "../api/jobs";
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign as DollarSignIcon,
  Pencil,
  Trash2,
  X,
  Save,
} from "lucide-react";

export default function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState(null); // {type, text}
  const [editing, setEditing] = useState(null); // form state for the job being edited
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null); // id currently deleting
  const [logoUploading, setLogoUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => { load(); }, []);

  async function load() {
    try {
      setLoading(true);
      setError(null);
      const data = await getJobs();
      const items = Array.isArray(data?.items) ? data.items : Array.isArray(data) ? data : [];
      setJobs(items.map(toUiJob));
    } catch (e) {
      setError(e.message || "Failed to load jobs");
    } finally {
      setLoading(false);
    }
  }

function toUiJob(j) {
  // pick whatever the backend actually uses
  const rawLogo =
    j.companyLogoUrl ?? j.companyLogo ?? j.logoUrl ?? j.logo ?? null;

  // make absolute if it isn't already
  const logo =
    rawLogo && !/^https?:\/\//i.test(rawLogo)
      ? `http://localhost:5041${rawLogo.startsWith('/') ? '' : '/'}${rawLogo}`
      : rawLogo;

  return {
    id: j.id,
    title: j.jobTitle,
    company: j.companyName,
    logo, // ⬅️ use the normalized logo
    location: j.location || "Remote",
    type: humanizeType(j.jobType),
    salary: j.hideSalary ? "Not disclosed" : formatSalary(j.minSalary, j.maxSalary),
    posted: timeAgo(j.createdUtc || j.updatedUtc),
    description: j.description,
    raw: j,
  };
}

  function humanizeType(t) { return t ? t[0].toUpperCase() + t.slice(1) : "—"; }
  function formatSalary(min, max) {
    const n = (v) => typeof v === "number" && !Number.isNaN(v);
    if (n(min) && n(max)) return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
    if (n(min)) return `From $${min.toLocaleString()}`;
    if (n(max)) return `Up to $${max.toLocaleString()}`;
    return "—";
  }
  function timeAgo(iso) {
    if (!iso) return "Just now";
    const then = new Date(iso), now = new Date();
    const s = Math.max(0, Math.floor((now - then) / 1000));
    if (s < 60) return "Just now";
    const m = Math.floor(s / 60); if (m < 60) return `${m} min${m > 1 ? "s" : ""} ago`;
    const h = Math.floor(m / 60); if (h < 24) return `${h} hour${h > 1 ? "s" : ""} ago`;
    const d = Math.floor(h / 24); if (d < 7) return `${d} day${d > 1 ? "s" : ""} ago`;
    return then.toLocaleDateString();
  }

  // Open Edit using raw backend job & null-safe defaults
  function openEdit(job) {
    setMsg(null);
    setSaving(false);

    const r = job?.raw ?? job;

    setEditing({
      id: r.id,
      jobTitle: r.jobTitle ?? "",
      jobType: r.jobType ?? "",
      location: r.location ?? "",
      department: r.department ?? "",
      minSalary: r.minSalary ?? "",
      maxSalary: r.maxSalary ?? "",
      hideSalary: !!r.hideSalary,
      description: r.description ?? "",
      companyName: r.companyName ?? "",
      companyWebsite: r.companyWebsite ?? "",
      companyLogoUrl: r.companyLogoUrl ?? "",
      companyDescription: r.companyDescription ?? "",
    });
  }

  async function onDelete(id) {
    if (!window.confirm("Delete this job? This cannot be undone.")) return;
    setDeleting(id);
    setMsg(null);
    try {
      await deleteJob(id);
      setJobs((prev) => prev.filter((j) => j.id !== id));
      setMsg({ type: "success", text: "Job deleted." });
    } catch (e) {
      const d = e?.data;
      setMsg({
        type: "error",
        text: (d?.title || d?.error || (d?.errors && JSON.stringify(d.errors))) || e.message || "Delete failed",
      });
    } finally {
      setDeleting(null);
    }
  }

  async function saveEdit() {
    if (!editing) return;
    setSaving(true);
    setMsg(null);
    try {
      const payload = {
        jobTitle: editing.jobTitle.trim(),
        jobType: editing.jobType.trim(),
        location: editing.location.trim() || null,
        department: editing.department.trim() || null,
        minSalary: editing.minSalary === "" ? null : Number(editing.minSalary),
        maxSalary: editing.maxSalary === "" ? null : Number(editing.maxSalary),
        hideSalary: !!editing.hideSalary,
        description: editing.description.trim(),
        companyName: editing.companyName.trim(),
        companyWebsite: editing.companyWebsite.trim() || null,
        companyLogoUrl: editing.companyLogoUrl.trim() || null,
        companyDescription: editing.companyDescription.trim() || null,
      };

      if (!payload.jobTitle || !payload.jobType) {
        setMsg({ type: "error", text: "Job Title and Job Type are required." });
        setSaving(false);
        return;
      }
      if (
        payload.minSalary != null &&
        payload.maxSalary != null &&
        payload.minSalary > payload.maxSalary
      ) {
        setMsg({ type: "error", text: "Max salary must be >= Min salary" });
        setSaving(false);
        return;
      }

      await updateJob(editing.id, payload);

      await load();
      setEditing(null); // close modal
      setMsg({ type: "success", text: "Job updated." });
    } catch (e) {
      const d = e?.data;
      setMsg({
        type: "error",
        text: (d?.title || d?.error || (d?.errors && JSON.stringify(d.errors))) || e.message || "Update failed",
      });
    } finally {
      setSaving(false);
    }
  }

  // Logo upload (edit mode)
  function triggerLogoPicker() {
    fileInputRef.current?.click();
  }
  async function onLogoChange(e) {
    const file = e.target.files?.[0];
    if (!file || !editing) return;
    setLogoUploading(true);
    setMsg(null);
    try {
      const { url } = await uploadLogo(file); // { url }
      setEditing(prev => ({ ...prev, companyLogoUrl: url || "" }));
      setMsg({ type: "success", text: "Logo uploaded. Don’t forget to Save." });
    } catch (err) {
      const s = err?.data;
      const detail = (s?.error || s?.title || err.message) ?? "Upload failed";
      setMsg({ type: "error", text: `Logo upload failed: ${detail}` });
    } finally {
      setLogoUploading(false);
      e.target.value = "";
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-6">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">My Jobs</h1>
          <p className="text-gray-500">All job ads you’ve added will appear here.</p>
        </div>
      </div>

      {msg && (
        <div className={`mb-4 px-4 py-2 rounded ${msg.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
          {msg.text}
        </div>
      )}

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">
            {loading ? "Loading…" : `${jobs.length} Job${jobs.length === 1 ? "" : "s"}`}
          </h2>
        </div>

        {error && <div className="p-6 text-red-600">{error}</div>}

        {!loading && !error && (
          <>
            {jobs.length === 0 ? (
              <div className="p-6 text-sm text-gray-500">No jobs yet. Post your first job from “Post Job”.</div>
            ) : (
              <div className="divide-y divide-gray-200">
                {jobs.map((job) => (
                  <div key={job.id} className="p-6 hover:bg-gray-50">
                    <div className="flex justify-between">
                      <div className="flex">
                        <div className="h-12 w-12 rounded-md overflow-hidden flex-shrink-0 bg-gray-100 flex items-center justify-center">
                          {job.logo ? (
                            <img src={job.logo} alt={`${job.company} logo`} className="h-full w-full object-cover" />
                          ) : (
                            <span className="text-xs text-gray-400 px-1">No Logo</span>
                          )}
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
                          <div className="mt-1 flex items-center text-sm text-gray-500">
                            <span>{job.company}</span>
                            <span className="mx-1.5">&middot;</span>
                            <span className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {job.location}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <button
                          onClick={() => openEdit(job)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-md border bg-white hover:bg-gray-50"
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4" /> Edit
                        </button>
                        <button
                          onClick={() => onDelete(job.id)}
                          disabled={deleting === job.id}
                          className={`inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-md border ${
                            deleting === job.id ? "bg-gray-100 text-gray-400" : "bg-white hover:bg-red-50 text-red-600"
                          }`}
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                          {deleting === job.id ? "Deleting…" : "Delete"}
                        </button>
                      </div>
                    </div>

                    <div className="mt-3 text-sm text-gray-500 line-clamp-2">{job.description}</div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <div className="flex items-center text-xs text-gray-600 bg-gray-100 px-2.5 py-0.5 rounded-full">
                        <Briefcase className="h-3.5 w-3.5 mr-1" />
                        {job.type}
                      </div>
                      <div className="flex items-center text-xs text-gray-600 bg-gray-100 px-2.5 py-0.5 rounded-full">
                        <DollarSignIcon className="h-3.5 w-3.5 mr-1" />
                        {job.salary}
                      </div>
                      <div className="flex items-center text-xs text-gray-600 bg-gray-100 px-2.5 py-0.5 rounded-full">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        {job.posted}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* overlay */}
          <div className="absolute inset-0 bg-black/40" onClick={() => setEditing(null)} />
          {/* modal */}
          <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-xl max-h-[85vh] flex flex-col">
            {/* header */}
            <div className="px-6 py-4 border-b flex items-center justify-between sticky top-0 bg-white rounded-t-xl">
              <h3 className="text-lg font-semibold">Edit Job</h3>
              <button onClick={() => setEditing(null)} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* body (scrolls) */}
            <div className="p-6 space-y-4 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Job Title *">
                  <input
                    className="w-full border rounded px-3 py-2"
                    value={editing.jobTitle ?? ""}
                    onChange={(e) => setEditing({ ...editing, jobTitle: e.target.value })}
                  />
                </Field>
                <Field label="Job Type *">
                  <select
                    className="w-full border rounded px-3 py-2"
                    value={editing.jobType ?? ""}
                    onChange={(e) => setEditing({ ...editing, jobType: e.target.value })}
                  >
                    <option value="">Select</option>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                    <option value="temporary">Temporary</option>
                  </select>
                </Field>
                <Field label="Location">
                  <input
                    className="w-full border rounded px-3 py-2"
                    value={editing.location ?? ""}
                    onChange={(e) => setEditing({ ...editing, location: e.target.value })}
                  />
                </Field>
                <Field label="Department">
                  <input
                    className="w-full border rounded px-3 py-2"
                    value={editing.department ?? ""}
                    onChange={(e) => setEditing({ ...editing, department: e.target.value })}
                  />
                </Field>

                <Field label="Min Salary">
                  <input
                    type="number"
                    step="any"
                    className="w-full border rounded px-3 py-2"
                    value={editing.minSalary ?? ""}
                    onChange={(e) => setEditing({ ...editing, minSalary: e.target.value })}
                  />
                </Field>
                <Field label="Max Salary">
                  <input
                    type="number"
                    step="any"
                    className="w-full border rounded px-3 py-2"
                    value={editing.maxSalary ?? ""}
                    onChange={(e) => setEditing({ ...editing, maxSalary: e.target.value })}
                  />
                </Field>
              </div>

              <label className="inline-flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={!!editing.hideSalary}
                  onChange={(e) => setEditing({ ...editing, hideSalary: e.target.checked })}
                />
                Hide salary from listing
              </label>

              <Field label="Description *">
                <textarea
                  rows={4}
                  className="w-full border rounded px-3 py-2"
                  value={editing.description ?? ""}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                />
              </Field>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Company Name *">
                  <input
                    className="w-full border rounded px-3 py-2"
                    value={editing.companyName ?? ""}
                    onChange={(e) => setEditing({ ...editing, companyName: e.target.value })}
                  />
                </Field>
                <Field label="Company Website">
                  <input
                    className="w-full border rounded px-3 py-2"
                    value={editing.companyWebsite ?? ""}
                    onChange={(e) => setEditing({ ...editing, companyWebsite: e.target.value })}
                    placeholder="https://"
                  />
                </Field>

                {/* Logo with upload */}
                <Field label="Company Logo">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                      {editing.companyLogoUrl ? (
                        <img
                          src={editing.companyLogoUrl}
                          alt="Logo"
                          className="h-12 w-12 object-cover"
                        />
                      ) : (
                        <span className="text-xs text-gray-400 px-1">No Logo</span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={triggerLogoPicker}
                      className="px-3 py-2 rounded-md border bg-white hover:bg-gray-50 text-sm"
                      disabled={logoUploading}
                    >
                      {logoUploading ? "Uploading…" : (editing.companyLogoUrl ? "Replace Logo" : "Upload Logo")}
                    </button>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".png,.jpg,.jpeg,.webp"
                    className="hidden"
                    onChange={onLogoChange}
                  />
                  <input
                    className="w-full border rounded px-3 py-2 mt-3"
                    value={editing.companyLogoUrl ?? ""}
                    onChange={(e) => setEditing({ ...editing, companyLogoUrl: e.target.value })}
                    placeholder="https://…"
                  />
                </Field>

                <Field label="Company Description">
                  <input
                    className="w-full border rounded px-3 py-2"
                    value={editing.companyDescription ?? ""}
                    onChange={(e) => setEditing({ ...editing, companyDescription: e.target.value })}
                  />
                </Field>
              </div>
            </div>

            {/* footer */}
            <div className="px-6 py-4 bg-gray-50 rounded-b-xl flex justify-end gap-2 sticky bottom-0">
              <button onClick={() => setEditing(null)} className="px-4 py-2 rounded border bg-white hover:bg-gray-50">
                Cancel
              </button>
              <button
                onClick={saveEdit}
                disabled={saving || logoUploading}
                className={`px-4 py-2 rounded text-white inline-flex items-center gap-2 ${
                  (saving || logoUploading) ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                <Save className="h-4 w-4" />
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {children}
    </div>
  );
}
