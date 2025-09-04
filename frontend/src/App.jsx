import React, { useState, useEffect } from 'react'
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
import { tokenManager } from './api/auth.js'
import EmployerProfile from './pages/employer/EmployerProfile.jsx';
import RoleRoute from "./pages/Auth/RoleRoute.jsx";
import Forbidden from "./pages/Forbidden.jsx"; // if you added it
import MyJobs from './pages/MyJobs.jsx'
import { ViewJob } from './pages/ViewJob'
import {EmployerDashboard} from './pages/EmployerDashboard.jsx'


export default function App(){
  // Initialize authentication state from localStorage
  const [user, setUser] = useState(() => {
    const savedUser = tokenManager.getUser();
    return savedUser || {
      isAuthenticated: false,
      role: null,
    };
  });

  // Shared savedJobs state that will be used across components
  const [savedJobs, setSavedJobs] = useState([

  ])

  // Login function
  const handleLogin = (userData) => {
    setUser(userData);
  }

  // Logout function
  const handleLogout = () => {
    tokenManager.clearAuth();
    setUser({
      isAuthenticated: false,
      role: null,
    });
  }

  // Check if user is authenticated on app load
  useEffect(() => {
    const savedUser = tokenManager.getUser();
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

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
              path="/profile"element={user.isAuthenticated ? (<JobSeekerProfile />) : (<Navigate to="/login" />)}/>
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

            <Route path="/employer" element={<EmployerProfile />} />

            <Route
          path="/my-jobs"
          element={
            user.isAuthenticated && (user.role === 'employer' || user.role === 'admin')
      ? <MyJobs />
      : <Navigate to="/login" />
  }
/>
        
       
             {/* (Optional) forbidden page */}
            <Route path="/forbidden" element={<Forbidden />} />

          <Route path="/jobs" element={<JobListings />} />
        <Route path="/view-job/:id" element={<ViewJob />} />   {/* NEW */}

       
  {/* other routes */}
      <Route path="/EmployerDashboard" element={<EmployerDashboard />} />
 
            
            
          </Routes>
        </main>
      </div>
      <Footer />
    </div>

    
  )
  
}
