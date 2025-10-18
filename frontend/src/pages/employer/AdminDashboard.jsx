import React, { useState, useEffect } from 'react'
import {
  Users,
  Briefcase,
  CheckCircle,
  XCircle,
  AlertCircle,
  LineChartIcon,
  BarChart3Icon,
  PieChartIcon,
  ShieldIcon,
  UserIcon,
  BellIcon,
} from 'lucide-react'
export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [users, setUsers] = useState([])
  const [jobs, setJobs] = useState([])
  const [userCount, setUserCount] = useState(0)
  const [jobCount, setJobCount] = useState(0)
  const [showUsers, setShowUsers] = useState(false)
  const [showJobs, setShowJobs] = useState(false)

  const API_BASE = "http://localhost:5041";

  useEffect(() => {
    fetch(`${API_BASE}/api/admin/users/count`).then(r => r.json()).then(setUserCount)
    fetch(`${API_BASE}/api/admin/jobs/count`).then(r => r.json()).then(setJobCount)
  }, [])

  const handleViewAllUsers = () => {
    fetch(`${API_BASE}/api/admin/users`)
      .then(r => r.json())
      .then(setUsers)
    setShowUsers(true)
  }

  const handleViewAllJobs = () => {
    fetch(`${API_BASE}/api/admin/jobs`)
      .then(r => r.json())
      .then(setJobs)
    setShowJobs(true)
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-1 text-gray-500">
          Manage users, verify profiles
        </p>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow-sm rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Users
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {userCount}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <button
                onClick={handleViewAllUsers}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                View all
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow-sm rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Active Jobs
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {jobCount}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <button
                onClick={handleViewAllJobs}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                View all
              </button>
            </div>
          </div>
        </div>
        
       
      </div>
      {/* Users Modal */}
      {showUsers && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">All Users</h2>
            <table className="w-full text-left mb-4">
              <thead>
                <tr>
                  <th className="py-2 px-3 border-b">Email</th>
                  <th className="py-2 px-3 border-b">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, i) => (
                  <tr key={i}>
                    <td className="py-2 px-3 border-b">{u.email}</td>
                    <td className="py-2 px-3 border-b">{u.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="mt-2 px-4 py-2 bg-gray-600 text-white rounded" onClick={() => setShowUsers(false)}>Close</button>
          </div>
        </div>
      )}
      {/* Jobs Modal */}
      {showJobs && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full">
            <h2 className="text-xl font-bold mb-4">All Jobs</h2>
            <table className="w-full text-left mb-4">
              <thead>
                <tr>
                  <th className="py-2 px-3 border-b">Title</th>
                  <th className="py-2 px-3 border-b">Type</th>
                  <th className="py-2 px-3 border-b">Location</th>
                  <th className="py-2 px-3 border-b">Company</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((j, i) => (
                  <tr key={i}>
                    <td className="py-2 px-3 border-b">{j.jobTitle}</td>
                    <td className="py-2 px-3 border-b">{j.jobType}</td>
                    <td className="py-2 px-3 border-b">{j.location}</td>
                    <td className="py-2 px-3 border-b">{j.companyName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="mt-2 px-4 py-2 bg-gray-600 text-white rounded" onClick={() => setShowJobs(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  )
}