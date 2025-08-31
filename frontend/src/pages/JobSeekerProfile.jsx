import React, { useState, useEffect, useRef } from "react";
import { getProfileByUserId, createProfile, updateProfile } from "../api/profiles";
import { tokenManager } from "../api/auth";
import { uploadAvatar } from "../api/files";
import { User, Mail, Phone, MapPin, Edit, Save, X } from "lucide-react";

export function JobSeekerProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState(null);
  const [msg, setMsg] = useState(null); // {type, text}
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const currentUser = tokenManager.getUser();
    setUser(currentUser);

    if (currentUser) {
      loadUserProfile(currentUser.id);
    }
  }, []);

  const loadUserProfile = async (userId) => {
    try {
      const userProfile = await getProfileByUserId(userId);
      setProfile(userProfile);
    } catch (err) {
      console.error("Failed to load profile", err);
      const defaultProfile = {
        fullName: user?.fullName || "",
        jobTitle: "",
        email: user?.email || "",
        phone: "",
        location: "",
        about: "",
        isPublic: true,
        skills: [],
        experience: [],
        education: [],
        files: [],
        userId: userId,
        profileImageUrl: null, // ✅ default
      };
      setProfile(defaultProfile);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!profile || !user) return;

    try {
      const payload = {
        fullName: profile.fullName || user.fullName,
        jobTitle: profile.jobTitle || "",
        email: profile.email || user.email,
        phone: profile.phone || "",
        location: profile.location || "",
        about: profile.about || "",
        isPublic: profile.isPublic ?? true,
        skills: profile.skills || [],
        experience: profile.experience || [],
        education: profile.education || [],
        files: profile.files || [],
        userId: user.id,
        profileImageUrl: profile.profileImageUrl || null, // ✅ include in save
      };

      if (profile.id) {
        await updateProfile(profile.id, payload);
      } else {
        const newProfile = await createProfile(payload);
        setProfile({ ...profile, id: newProfile.id });
      }

      setEditing(false);
      setMsg({ type: "success", text: "Profile saved successfully!" });
    } catch (err) {
      console.error(err);
      setMsg({ type: "error", text: "Failed to save profile" });
    }
  };

  const handleCancel = () => {
    setEditing(false);
    if (user) loadUserProfile(user.id);
  };

  const updateProfileField = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const pickAvatar = () => {
    if (!editing) return; // only allow while editing
    fileInputRef.current?.click();
  };

  const onAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setMsg(null);
    try {
      const { url } = await uploadAvatar(file);
      updateProfileField("profileImageUrl", url); // ✅ show immediately + persist on Save
      setMsg({ type: "success", text: "Profile picture uploaded. Click Save to persist it." });
    } catch (err) {
      const d = err?.data;
      setMsg({ type: "error", text: `Upload failed: ${d?.error || d?.title || err.message}` });
    } finally {
      setUploading(false);
      e.target.value = ""; // allow reselect same file later
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading profile...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800">Please log in to view your profile</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="bg-white rounded-xl shadow-lg p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
          <div className="flex gap-2">
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <Edit className="h-4 w-4" />
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-60"
                  disabled={uploading}
                >
                  <Save className="h-4 w-4" />
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>

        {/* status message */}
        {msg && (
          <div className={`mb-6 px-4 py-2 rounded ${msg.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
            {msg.text}
          </div>
        )}

        {/* Profile Content */}
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="flex items-start space-x-6">
            {/* Avatar */}
            <div className="relative">
              <div
                className={`h-24 w-24 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center ring-2 ${
                  editing ? "ring-blue-500 cursor-pointer" : "ring-gray-200"
                }`}
                onClick={pickAvatar}
                title={editing ? "Click to upload a picture" : undefined}
              >
                {profile?.profileImageUrl ? (
                  <img src={profile.profileImageUrl} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  <User className="h-12 w-12 text-gray-500" />
                )}
              </div>
              {editing && (
                <p className="text-xs text-gray-500 mt-1">{uploading ? "Uploading…" : "Click image to upload"}</p>
              )}
              {/* hidden input */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".png,.jpg,.jpeg,.webp"
                className="hidden"
                onChange={onAvatarChange}
                disabled={!editing || uploading}
              />
            </div>

            {/* Fields */}
            <div className="flex-1 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                {editing ? (
                  <input
                    type="text"
                    value={profile?.fullName || user.fullName || ""}
                    onChange={(e) => updateProfileField("fullName", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your full name"
                  />
                ) : (
                  <p className="text-lg font-semibold text-gray-900">{profile?.fullName || user.fullName || "Not specified"}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                {editing ? (
                  <input
                    type="text"
                    value={profile?.jobTitle || ""}
                    onChange={(e) => updateProfileField("jobTitle", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Senior Frontend Developer"
                  />
                ) : (
                  <p className="text-gray-600">{profile?.jobTitle || "Not specified"}</p>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              {editing ? (
                <input
                  type="email"
                  value={profile?.email || user.email || ""}
                  onChange={(e) => updateProfileField("email", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="your.email@example.com"
                />
              ) : (
                <p className="flex items-center gap-2 text-gray-600">
                  <Mail className="h-4 w-4 text-gray-400" />
                  {profile?.email || user.email || "Not specified"}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              {editing ? (
                <input
                  type="tel"
                  value={profile?.phone || ""}
                  onChange={(e) => updateProfileField("phone", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+1 (555) 123-4567"
                />
              ) : (
                <p className="flex items-center gap-2 text-gray-600">
                  <Phone className="h-4 w-4 text-gray-400" />
                  {profile?.phone || "Not specified"}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              {editing ? (
                <input
                  type="text"
                  value={profile?.location || ""}
                  onChange={(e) => updateProfileField("location", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="San Francisco, CA"
                />
              ) : (
                <p className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  {profile?.location || "Not specified"}
                </p>
              )}
            </div>
          </div>

          {/* About */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">About</label>
            {editing ? (
              <textarea
                value={profile?.about || ""}
                onChange={(e) => updateProfileField("about", e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tell us about yourself, your experience, and what you're looking for..."
              />
            ) : (
              <p className="text-gray-600">{profile?.about || "No description provided"}</p>
            )}
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
            {editing ? (
              <input
                type="text"
                value={profile?.skills?.join(", ") || ""}
                onChange={(e) =>
                  updateProfileField(
                    "skills",
                    e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="React, JavaScript, TypeScript, Node.js"
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {profile?.skills && profile.skills.length > 0 ? (
                  profile.skills.map((skill, i) => (
                    <span key={i} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500">No skills listed</p>
                )}
              </div>
            )}
          </div>

          {/* Public toggle */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isPublic"
              checked={profile?.isPublic || false}
              onChange={(e) => updateProfileField("isPublic", e.target.checked)}
              disabled={!editing}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="isPublic" className="ml-2 text-sm text-gray-700">
              Make my profile public
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
