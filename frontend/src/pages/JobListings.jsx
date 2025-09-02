import React, { useEffect, useMemo, useState } from 'react'
import { getJobs } from '../api/jobs'
import {
  Search, MapPin, Briefcase, Clock, Filter, ChevronDown,
  BookmarkIcon, DollarSignIcon,
} from 'lucide-react'

export function JobListings({ savedJobs, setSavedJobs }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [location, setLocation] = useState('')
  const [filtersOpen, setFiltersOpen] = useState(false)

  // Filter states
  const [jobType, setJobType] = useState('')
  const [experienceLevel, setExperienceLevel] = useState('') // (not used yet)
  const [salary, setSalary] = useState('')                   // (not used yet)
  const [datePosted, setDatePosted] = useState('')           // (not used yet)

  // NEW: jobs from backend
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        setError(null)
        const { items } = await getJobs()        // ⬅️ read items from paginated response
        const mapped = (items || []).map(toUiJob)
        setJobs(mapped)
      } catch (e) {
        setError(e.message || 'Failed to load jobs')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  function toUiJob(j) {
    // Backend (from your JobPosting payload) fields we expect:
    // j.id, j.jobTitle, j.jobType, j.location, j.description,
    // j.companyName, j.companyLogoUrl, j.minSalary, j.maxSalary, j.hideSalary, j.createdUtc
    return {
      id: j.id,
      title: j.jobTitle,
      company: j.companyName,
      logo: j.companyLogoUrl || null,
      location: j.location || 'Remote',
      type: humanizeType(j.jobType),
      salary: j.hideSalary ? 'Not disclosed' : formatSalary(j.minSalary, j.maxSalary),
      posted: timeAgo(j.createdUtc || j.updatedUtc),
      description: j.description,
    }
  }

  function humanizeType(t) {
    if (!t) return '—'
    // e.g. "full-time" → "Full-time"
    return t.slice(0,1).toUpperCase() + t.slice(1)
  }

  function formatSalary(min, max) {
    const n = (v) => typeof v === 'number' && !Number.isNaN(v)
    if (n(min) && n(max)) return `$${min.toLocaleString()} - $${max.toLocaleString()}`
    if (n(min)) return `From $${min.toLocaleString()}`
    if (n(max)) return `Up to $${max.toLocaleString()}`
    return '—'
  }

  function timeAgo(iso) {
    if (!iso) return 'Just now'
    const then = new Date(iso)
    const now = new Date()
    const s = Math.max(0, Math.floor((now - then) / 1000))
    if (s < 60) return 'Just now'
    const m = Math.floor(s/60); if (m < 60) return `${m} min${m>1?'s':''} ago`
    const h = Math.floor(m/60); if (h < 24) return `${h} hour${h>1?'s':''} ago`
    const d = Math.floor(h/24); if (d < 7) return `${d} day${d>1?'s':''} ago`
    return then.toLocaleDateString()
  }

  // Client-side filtering (simple, extend later or switch to server-side)
  const filteredJobs = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    const loc = location.trim().toLowerCase()
    const type = jobType.trim().toLowerCase() // "Full-time" etc. normalized below

    return jobs.filter(j => {
      const matchTerm =
        !term ||
        j.title.toLowerCase().includes(term) ||
        j.company.toLowerCase().includes(term) ||
        j.description.toLowerCase().includes(term)

      const matchLoc = !loc || j.location.toLowerCase().includes(loc)

      const matchType = !type || j.type.toLowerCase() === type

      return matchTerm && matchLoc && matchType
    })
  }, [jobs, searchTerm, location, jobType])

  // Saved jobs behavior (unchanged API for parent)
  const toggleSaveJob = (jobId) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(prev => prev.filter(j => j.id !== jobId)) // remove object from parent store
    } else {
      const jobToSave = jobs.find(j => j.id === jobId)
      if (jobToSave) {
        const newSavedJob = {
          ...jobToSave,
          savedDate: new Date().toISOString().split('T')[0],
          status: 'active',
        }
        setSavedJobs(prev => [...prev, newSavedJob]) // add object to parent store
      }
    }
  }

  const toggleFilters = () => setFiltersOpen(o => !o)
  const resetFilters = () => { setJobType(''); setExperienceLevel(''); setSalary(''); setDatePosted('') }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-6">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Find Your Dream Job</h1>
          <p className="text-gray-500 mb-6">Search through thousands of job listings to find your perfect match</p>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Job title, keywords, or company"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="City, state, or remote"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-md shadow-sm text-sm font-medium flex items-center justify-center">
              Search Jobs
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters (unchanged UI) */}
        <div className="w-full md:w-64 bg-white shadow-sm rounded-lg overflow-hidden h-fit">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center md:hidden">
            <h2 className="text-lg font-medium text-gray-900">Filters</h2>
            <button onClick={toggleFilters} className="text-gray-500 hover:text-gray-700">
              <Filter className="h-5 w-5" />
            </button>
          </div>
          <div className={`p-4 space-y-6 ${filtersOpen ? 'block' : 'hidden md:block'}`}>
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Job Type</h3>
              <div className="space-y-2">
                {['Full-time', 'Part-time', 'Contract', 'Internship', 'Temporary', 'Remote'].map((type) => (
                  <div key={type} className="flex items-center">
                    <input
                      id={`job-type-${type}`} name="job-type" type="radio"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      checked={jobType === type}
                      onChange={() => setJobType(type)}
                    />
                    <label htmlFor={`job-type-${type}`} className="ml-3 text-sm text-gray-700">{type}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* (Experience/Salary/Date placeholders kept) */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Experience Level</h3>
              {/* … your existing options … */}
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Salary Range</h3>
              {/* … your existing options … */}
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Date Posted</h3>
              {/* … your existing options … */}
            </div>

            <button onClick={resetFilters} className="w-full py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Reset Filters
            </button>
          </div>
        </div>

        {/* Job listings */}
        <div className="flex-1">
          <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-6">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">
                {loading ? 'Loading…' : `${filteredJobs.length} Jobs Available`}
              </h2>
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-2">Sort by:</span>
                <select className="text-sm border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                  <option>Most Relevant</option>
                  <option>Newest</option>
                  <option>Highest Salary</option>
                </select>
              </div>
            </div>

            {error && (
              <div className="p-6 text-red-600">{error}</div>
            )}

            {!loading && !error && (
              <div className="divide-y divide-gray-200">
                {filteredJobs.map((job) => (
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

                      <button
                        onClick={() => toggleSaveJob(job.id)}
                        className={`h-8 w-8 flex items-center justify-center rounded-full ${
                          savedJobs.includes(job.id) ? 'text-blue-600 bg-blue-50' : 'text-gray-400 hover:text-gray-500 bg-white'
                        }`}
                      >
                        <BookmarkIcon className="h-5 w-5" fill={savedJobs.includes(job.id) ? 'currentColor' : 'none'} />
                      </button>
                    </div>

                    <div className="mt-4">
                      <p className="text-sm text-gray-500 line-clamp-2">{job.description}</p>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <div className="flex items-center text-xs text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full">
                        <Briefcase className="h-3.5 w-3.5 mr-1" />
                        {job.type}
                      </div>
                      <div className="flex items-center text-xs text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full">
                        <DollarSignIcon className="h-3.5 w-3.5 mr-1" />
                        {job.salary}
                      </div>
                      <div className="flex items-center text-xs text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        {job.posted}
                      </div>
                    </div>

                    <div className="mt-4">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}

                {!filteredJobs.length && (
                  <div className="p-6 text-sm text-gray-500">No jobs match your filters.</div>
                )}
              </div>
            )}

            {!loading && !error && (
              <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Showing <span className="font-medium">{Math.min(filteredJobs.length, 1)}</span> to{' '}
                  <span className="font-medium">{filteredJobs.length}</span> of{' '}
                  <span className="font-medium">{filteredJobs.length}</span> results
                </div>
                <div className="flex-1 flex justify-end">
                  {/* (Pagination UI static as before) */}
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <span className="sr-only">Previous</span>
                      {/* … icon … */}
                    </a>
                    <a href="#" aria-current="page" className="z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">1</a>
                    <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">2</a>
                    <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <span className="sr-only">Next</span>
                      {/* … icon … */}
                    </a>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
