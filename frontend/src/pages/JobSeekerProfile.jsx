import React, { useState, useEffect } from "react";
import { getProfiles, createProfile, updateProfile, deleteProfile } from "../api/profiles";
import { User, Mail, Phone, MapPin, Briefcase } from "lucide-react";

export function JobSeekerProfile() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load profiles on mount
  useEffect(() => {
    getProfiles()
      .then(setProfiles)
      .catch((err) => console.error("Failed to fetch profiles", err))
      .finally(() => setLoading(false));
  }, []);

  // Save a sample profile
  const handleSave = async () => {
    const payload = {
      fullName: "Alex Johnson",
      jobTitle: "Senior Frontend Developer",
      email: "alex.johnson@example.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      about: "Passionate frontend developer...",
      isPublic: true,
      skills: ["React", "JavaScript", "TypeScript"],
      experience: [],
      education: [],
      files: [],
    };

    try {
      await createProfile(payload);
      const updated = await getProfiles();
      setProfiles(updated);
      alert("Profile saved!");
    } catch (err) {
      console.error(err);
      alert("Save failed");
    }
  };

  if (loading) {
    return <p className="p-6 text-gray-500">Loading profiles...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Profiles</h1>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          Save Sample Profile
        </button>
      </div>

      {profiles.length === 0 ? (
        <p className="text-gray-500">No profiles found. Click Save to add one!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-xl shadow p-6 border border-gray-200 hover:shadow-lg transition"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                  <User className="h-6 w-6 text-gray-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {p.fullName}
                  </h3>
                  <p className="text-sm text-gray-500">{p.jobTitle}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" /> {p.email}
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400" /> {p.phone}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" /> {p.location}
                </p>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700">Skills:</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {p.skillsCsv?.split(",").map((s, i) => (
                    <span
                      key={i}
                      className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <button className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1">
                  <Briefcase className="h-4 w-4" /> View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
