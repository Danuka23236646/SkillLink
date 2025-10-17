import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { MapPin, Mail, Phone, User } from 'lucide-react'

export default function CandidateProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    fetch(`http://localhost:5041/api/profiles/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found')
        return res.json()
      })
      .then((data) => setProfile(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="p-6">Loading...</div>
  if (error) return <div className="p-6 text-red-600">{error}</div>
  if (!profile) return <div className="p-6">No profile</div>

  const mailTo = `mailto:${profile.email ?? profile.Email ?? ''}`
  const tel = (profile.phone || profile.Phone) ? `tel:${profile.phone ?? profile.Phone}` : null
  // normalize skills: try multiple property names and also SkillsCsv
  const skills = profile.skills ?? profile.Skills ?? (profile.SkillsCsv ? profile.SkillsCsv.split(',').map(s => s.trim()).filter(Boolean) : []);

  return (
    <div className="max-w-4xl mx-auto py-8">
      <button onClick={() => navigate(-1)} className="mb-4 text-sm text-blue-600">&larr; Back</button>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-4">
          <div className="h-20 w-20 rounded-full overflow-hidden bg-gray-100">
            {profile.profileImageUrl ? (
              <img src={profile.profileImageUrl} alt={profile.fullName} className="h-full w-full object-cover" />
            ) : (
              <User className="h-12 w-12 text-gray-400 m-4" />
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{profile.fullName}</h1>
            <div className="text-sm text-gray-600">{profile.jobTitle}</div>
            <div className="mt-1 text-sm text-gray-600 flex items-center gap-2"><MapPin className="h-4 w-4" />{profile.location}</div>
          </div>
          <div className="ml-auto flex gap-2">
            
            
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium text-gray-800">About</h3>
            <p className="text-gray-600 mt-2 whitespace-pre-line">{profile.about || 'No description provided'}</p>
            <h3 className="font-medium text-gray-800 mt-4">Skills</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {(profile.skills && profile.skills.length > 0) ? profile.skills.map((s, i) => (
                <span key={i} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">{s}</span>
              )) : <div className="text-gray-500">No skills listed</div>}
            </div>
          </div>
          <div>
            <h3 className="font-medium text-gray-800">Contact</h3>
            <div className="mt-2 text-sm text-gray-600">
              <div>
                <strong>Email:</strong>{' '}
                {profile.email || profile.Email ? (
                  <a href={`mailto:${profile.email ?? profile.Email}`} className="text-blue-600 hover:underline">{profile.email ?? profile.Email}</a>
                ) : (
                  <span className="text-gray-500">Not provided</span>
                )}
              </div>
              <div className="mt-2">
                <strong>Phone:</strong>{' '}
                {profile.phone || profile.Phone ? (
                  <a href={`tel:${profile.phone ?? profile.Phone}`} className="text-blue-600 hover:underline">{profile.phone ?? profile.Phone}</a>
                ) : (
                  <span className="text-gray-500">Not provided</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
