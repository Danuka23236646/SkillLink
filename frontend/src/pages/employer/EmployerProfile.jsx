import React, { useEffect, useRef, useState } from "react";
import { getEmployerProfileByUserId, createEmployerProfile, updateEmployerProfile } from "../../api/employerProfiles";
import { tokenManager } from "../../api/auth";
import { uploadAvatar } from "../../api/files"; // reuse for a company logo if you like
import { Building2, Globe, MapPin, Edit, Save, X, Tag } from "lucide-react";

export default function EmployerProfile() {
  const [profile, setProfile] = useState(null);
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const u = tokenManager.getUser();
    setUser(u);
    if (u) load(u.id);
  }, []);

  async function load(userId) {
    try {
      const p = await getEmployerProfileByUserId(userId);
      setProfile(p);
    } catch {
      setProfile({
        userId,
        companyName: "",
        websiteUrl: "",
        industry: "",
        location: "",
        aboutCompany: "",
        isPublic: true,
        tags: [],
        files: [],
        // Optional: store a logo URL using the same upload pattern
        logoUrl: null,
      });
    } finally {
      setLoading(false);
    }
  }

  function setField(k, v) {
    setProfile(prev => ({ ...prev, [k]: v }));
  }

  async function onSave() {
    if (!profile || !user) return;
    setMsg(null);
    const payload = {
      userId: user.id,
      companyName: profile.companyName || "",
      websiteUrl: profile.websiteUrl || "",
      industry: profile.industry || "",
      location: profile.location || "",
      aboutCompany: profile.aboutCompany || "",
      isPublic: profile.isPublic ?? true,
      tags: profile.tags || [],
      files: profile.files || [],
    };
    try {
      if (profile.id) await updateEmployerProfile(profile.id, payload);
      else {
        const created = await createEmployerProfile(payload);
        setProfile({ ...profile, id: created.id });
      }
      setEditing(false);
      setMsg({ type: "success", text: "Employer profile saved!" });
    } catch (err) {
      setMsg({ type: "error", text: err.message || "Save failed" });
    }
  }

  const pickLogo = () => {
    if (!editing) return;
    fileInputRef.current?.click();
  };

  async function onLogoChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setMsg(null);
    try {
      const { url } = await uploadAvatar(file); // or a dedicated uploadCompanyLogo
      setField("logoUrl", url);
      setMsg({ type: "success", text: "Logo uploaded. Click Save to persist." });
    } catch (err) {
      setMsg({ type: "error", text: err?.message || "Upload failed" });
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  if (loading) return <div className="p-8">Loading…</div>;
  if (!user) return <div className="p-8">Please log in.</div>;

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Employer Profile</h1>
          <div className="flex gap-2">
            {!editing ? (
              <button onClick={() => setEditing(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2">
                <Edit size={16}/> Edit
              </button>
            ) : (
              <>
                <button onClick={onSave} disabled={uploading} className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2">
                  <Save size={16}/> Save
                </button>
                <button onClick={() => { setEditing(false); load(user.id); }} className="px-4 py-2 bg-gray-600 text-white rounded-lg flex items-center gap-2">
                  <X size={16}/> Cancel
                </button>
              </>
            )}
          </div>
        </div>

        {msg && <div className={`mb-6 px-4 py-2 rounded ${msg.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>{msg.text}</div>}

        <div className="space-y-6">
          {/* Logo + Company name */}
          <div className="flex items-start gap-6">
            <div className={`h-24 w-24 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center ring-2 ${editing ? "ring-blue-500 cursor-pointer" : "ring-gray-200"}`}
                 onClick={pickLogo} title={editing ? "Click to upload a logo" : undefined}>
              {profile?.logoUrl ? <img src={profile.logoUrl} alt="Logo" className="h-full w-full object-cover"/> : <Building2 className="h-12 w-12 text-gray-500" />}
            </div>
            <input ref={fileInputRef} type="file" className="hidden" accept=".png,.jpg,.jpeg,.webp" onChange={onLogoChange} disabled={!editing || uploading}/>
            <div className="flex-1 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                {editing ? (
                  <input className="w-full border rounded px-3 py-2" value={profile.companyName}
                         onChange={e => setField("companyName", e.target.value)} />
                ) : <p className="text-lg font-semibold">{profile.companyName || "Not set"}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                {editing ? (
                  <input className="w-full border rounded px-3 py-2" value={profile.websiteUrl || ""}
                         onChange={e => setField("websiteUrl", e.target.value)} placeholder="https://example.com" />
                ) : (
                  <p className="text-gray-600 flex items-center gap-2"><Globe size={16}/>{profile.websiteUrl || "—"}</p>
                )}
              </div>
            </div>
          </div>

          {/* Industry & Location */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
              {editing ? (
                <input className="w-full border rounded px-3 py-2" value={profile.industry || ""}
                       onChange={e => setField("industry", e.target.value)} />
              ) : <p className="text-gray-600">{profile.industry || "—"}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              {editing ? (
                <input className="w-full border rounded px-3 py-2" value={profile.location || ""}
                       onChange={e => setField("location", e.target.value)} />
              ) : <p className="text-gray-600 flex items-center gap-2"><MapPin size={16}/>{profile.location || "—"}</p>}
            </div>
          </div>

          {/* About company */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">About Company</label>
            {editing ? (
              <textarea className="w-full border rounded px-3 py-2" rows={4}
                        value={profile.aboutCompany || ""}
                        onChange={e => setField("aboutCompany", e.target.value)} />
            ) : <p className="text-gray-600">{profile.aboutCompany || "—"}</p>}
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
            {editing ? (
              <input className="w-full border rounded px-3 py-2"
                     value={(profile.tags || []).join(", ")}
                     onChange={e => setField("tags", e.target.value.split(",").map(x => x.trim()).filter(Boolean))} />
            ) : (
              <div className="flex flex-wrap gap-2">
                {profile.tags?.length ? profile.tags.map((t, i) => (
                  <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm flex items-center gap-1">
                    <Tag size={14}/> {t}
                  </span>
                )) : <span className="text-gray-500">—</span>}
              </div>
            )}
          </div>

          {/* Public toggle */}
          <div className="flex items-center gap-2">
            <input type="checkbox" id="isPublic" checked={profile.isPublic || false}
                   onChange={e => setField("isPublic", e.target.checked)} disabled={!editing}/>
            <label htmlFor="isPublic" className="text-sm">Make company profile public</label>
          </div>
        </div>
      </div>
    </div>
  );
}
