import React, { useState } from 'react'
// The App component's contents are currently a placeholder — please update this file first for a new design / component!
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { Navbar } from './components/Layout/Navbar'
import { Footer } from './components/Layout/Footer'
import { JobSeekerProfile } from './pages/JobSeekerProfile'
import { JobListings } from './pages/JobListings'
import { JobPosting } from './pages/JobPosting'
import { TalentSearch } from './pages/TalentSearch'
import { AdminDashboard } from './pages/AdminDashboard'
import { Login } from './pages/Auth/Login'
import { Signup } from './pages/Auth/Signup'
import { Sidebar } from './components/Layout/Sidebar'
import { SavedJobs } from './pages/SavedJobs'
import { Applications } from './pages/Applications'
import { Settings } from './pages/Settings'
export default function App(){
  // Mock authentication state - in a real app, this would come from Firebase
  const [user, setUser] = useState({
    isAuthenticated: true,
    role: 'jobseeker', // Options: jobseeker, employer, admin
  })
  // Shared savedJobs state that will be used across components
  const [savedJobs, setSavedJobs] = useState([
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120,000 - $150,000',
      posted: '2 days ago',
      description:
        'We are looking for an experienced Frontend Developer to join our team and help build amazing user experiences.',
      logo: 'https://images.unsplash.com/photo-1549924231-f129b911e442?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&h=50&q=80',
      savedDate: '2023-11-01',
      status: 'active',
    },
    {
      id: 2,
      title: 'UX/UI Designer',
      company: 'Design Studio',
      location: 'Remote',
      type: 'Contract',
      salary: '$80,000 - $100,000',
      posted: '1 day ago',
      description:
        'Join our creative team to design intuitive and beautiful interfaces for our clients.',
      logo: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&h=50&q=80',
      savedDate: '2023-11-03',
      status: 'active',
    },
    {
      id: 5,
      title: 'DevOps Engineer',
      company: 'CloudOps',
      location: 'Remote',
      type: 'Full-time',
      salary: '$125,000 - $155,000',
      posted: '1 week ago',
      description:
        'Join our team to build and maintain our cloud infrastructure and CI/CD pipelines.',
      logo: 'https://images.unsplash.com/photo-1553835973-dec43bfddbeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&h=50&q=80',
      savedDate: '2023-10-28',
      status: 'expired',
    },
  ])
  // Mock login function
  const handleLogin = (role) => {
    setUser({
      isAuthenticated: true,
      role: role,
    })
  }
  // Mock logout function
  const handleLogout = () => {
    setUser({
      isAuthenticated: false,
      role: null,
    })
  }
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar user={user} onLogout={handleLogout} />
      <div className="flex flex-1">
        {user.isAuthenticated && <Sidebar userRole={user.role} />}
        <main className="flex-1 p-4">
          <Routes>
            <Route
              path="/"
              element={
                <JobListings
                  savedJobs={savedJobs.map((job) => job.id)}
                  setSavedJobs={setSavedJobs}
                />
              }
            />
            <Route
              path="/profile"
              element={
                user.isAuthenticated ? (
                  <JobSeekerProfile />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/jobs"
              element={
                <JobListings
                  savedJobs={savedJobs.map((job) => job.id)}
                  setSavedJobs={setSavedJobs}
                />
              }
            />
            <Route
              path="/post-job"
              element={
                user.isAuthenticated &&
                (user.role === 'employer' || user.role === 'admin') ? (
                  <JobPosting />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/talent"
              element={
                user.isAuthenticated &&
                (user.role === 'employer' || user.role === 'admin') ? (
                  <TalentSearch />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/admin"
              element={
                user.isAuthenticated && user.role === 'admin' ? (
                  <AdminDashboard />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/saved-jobs"
              element={
                user.isAuthenticated ? (
                  <SavedJobs
                    savedJobs={savedJobs}
                    setSavedJobs={setSavedJobs}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/applications"
              element={
                user.isAuthenticated ? (
                  <Applications />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/settings"
              element={
                user.isAuthenticated ? <Settings /> : <Navigate to="/login" />
              }
            />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  )
}
