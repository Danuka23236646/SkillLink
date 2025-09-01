import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, User, BriefcaseIcon, LogOut, Search } from 'lucide-react'

export function Navbar({ user, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)

  // detect current route
  const location = useLocation()
  const path = location.pathname.toLowerCase()

  // routes considered part of the employer/admin area
  const employerPrefixes = ['/post-job', '/talent', '/my-jobs', '/settings', '/employer', '/admin']
  const isEmployerRoute = employerPrefixes.some(p => path.startsWith(p))

  // hide Find Jobs on employer/admin pages for employer OR admin users
  const hideFindJobs =
    user?.isAuthenticated &&
    (user?.role === 'employer' || user?.role === 'admin') &&
    isEmployerRoute

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-blue-600">
                JobConnect
              </Link>
            </div>

            {/* Desktop links */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {!hideFindJobs && (
                <Link
                  to="/jobs"
                  className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Find Jobs
                </Link>
              )}

              {user?.isAuthenticated && user?.role === 'jobseeker' && (
                <Link
                  to="/profile"
                  className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  My Profile
                </Link>
              )}

              {user?.isAuthenticated && (user?.role === 'employer' || user?.role === 'admin') && (
                <>
                  <Link
                    to="/post-job"
                    className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Post Job
                  </Link>
                  <Link
                    to="/talent"
                    className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Find Talent
                  </Link>
                </>
              )}

              {user?.isAuthenticated && user?.role === 'admin' && (
                <Link
                  to="/admin"
                  className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Admin Dashboard
                </Link>
              )}
            </div>
          </div>

          {/* Right side actions (desktop) */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {user?.isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="text-gray-500 hover:text-gray-700">
                  <User size={20} />
                </Link>
                <button onClick={onLogout} className="text-gray-500 hover:text-gray-700">
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {!hideFindJobs && (
              <Link
                to="/jobs"
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                onClick={toggleMobileMenu}
              >
                Find Jobs
              </Link>
            )}

            {user?.isAuthenticated && user?.role === 'jobseeker' && (
              <Link
                to="/profile"
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                onClick={toggleMobileMenu}
              >
                My Profile
              </Link>
            )}

            {user?.isAuthenticated && (user?.role === 'employer' || user?.role === 'admin') && (
              <>
                <Link
                  to="/post-job"
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                  onClick={toggleMobileMenu}
                >
                  Post Job
                </Link>
                <Link
                  to="/talent"
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                  onClick={toggleMobileMenu}
                >
                  Find Talent
                </Link>
              </>
            )}

            {user?.isAuthenticated && user?.role === 'admin' && (
              <Link
                to="/admin"
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                onClick={toggleMobileMenu}
              >
                Admin Dashboard
              </Link>
            )}
          </div>

          <div className="pt-4 pb-3 border-t border-gray-200">
            {user?.isAuthenticated ? (
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <User className="h-10 w-10 rounded-full bg-gray-200 p-2" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">User Name</div>
                  <div className="text-sm font-medium text-gray-500">user@example.com</div>
                </div>
                <button
                  onClick={onLogout}
                  className="ml-auto bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <div className="mt-3 space-y-1">
                <Link
                  to="/login"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  onClick={toggleMobileMenu}
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  onClick={toggleMobileMenu}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
