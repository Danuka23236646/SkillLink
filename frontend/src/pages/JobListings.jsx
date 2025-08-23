import React, { useState } from 'react'
import {
  Search,
  MapPin,
  Briefcase,
  Clock,
  Filter,
  ChevronDown,
  BookmarkIcon,
  DollarSignIcon,
} from 'lucide-react'
export function JobListings({ savedJobs, setSavedJobs }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [location, setLocation] = useState('')
  const [filtersOpen, setFiltersOpen] = useState(false)
  // Filter states
  const [jobType, setJobType] = useState('')
  const [experienceLevel, setExperienceLevel] = useState('')
  const [salary, setSalary] = useState('')
  const [datePosted, setDatePosted] = useState('')
  // Mock job data
  const jobs = [
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
    },
    {
      id: 3,
      title: 'Backend Developer',
      company: 'ServerSide Solutions',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$130,000 - $160,000',
      posted: '3 days ago',
      description:
        'Looking for a talented backend developer to maintain and improve our server infrastructure.',
      logo: 'https://images.unsplash.com/photo-1568952433726-3896e3881c65?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&h=50&q=80',
    },
    {
      id: 4,
      title: 'Product Manager',
      company: 'ProductLabs',
      location: 'Austin, TX',
      type: 'Full-time',
      salary: '$110,000 - $140,000',
      posted: '5 days ago',
      description:
        'Lead our product team to build innovative solutions that solve real user problems.',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&h=50&q=80',
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
    },
    {
      id: 6,
      title: 'Mobile Developer (iOS)',
      company: 'AppFactory',
      location: 'Seattle, WA',
      type: 'Full-time',
      salary: '$115,000 - $145,000',
      posted: '3 days ago',
      description:
        'Develop cutting-edge iOS applications for our clients in various industries.',
      logo: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&h=50&q=80',
    },
  ]
  const toggleSaveJob = (jobId) => {
    if (savedJobs.includes(jobId)) {
      // If job is already saved, remove it
      setSavedJobs((prevSavedJobs) =>
        prevSavedJobs.filter((job) => job.id !== jobId),
      )
    } else {
      // If job is not saved, add it
      const jobToSave = jobs.find((job) => job.id === jobId)
      if (jobToSave) {
        const newSavedJob = {
          ...jobToSave,
          savedDate: new Date().toISOString().split('T')[0],
          status: 'active',
        }
        setSavedJobs((prevSavedJobs) => [...prevSavedJobs, newSavedJob])
      }
    }
  }
  const toggleFilters = () => {
    setFiltersOpen(!filtersOpen)
  }
  const resetFilters = () => {
    setJobType('')
    setExperienceLevel('')
    setSalary('')
    setDatePosted('')
  }
  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-6">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Find Your Dream Job
          </h1>
          <p className="text-gray-500 mb-6">
            Search through thousands of job listings to find your perfect match
          </p>
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
        {/* Filters */}
        <div className="w-full md:w-64 bg-white shadow-sm rounded-lg overflow-hidden h-fit">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center md:hidden">
            <h2 className="text-lg font-medium text-gray-900">Filters</h2>
            <button
              onClick={toggleFilters}
              className="text-gray-500 hover:text-gray-700"
            >
              <Filter className="h-5 w-5" />
            </button>
          </div>
          <div
            className={`p-4 space-y-6 ${filtersOpen ? 'block' : 'hidden md:block'}`}
          >
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Job Type
              </h3>
              <div className="space-y-2">
                {[
                  'Full-time',
                  'Part-time',
                  'Contract',
                  'Internship',
                  'Remote',
                ].map((type) => (
                  <div key={type} className="flex items-center">
                    <input
                      id={`job-type-${type}`}
                      name="job-type"
                      type="radio"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      checked={jobType === type}
                      onChange={() => setJobType(type)}
                    />
                    <label
                      htmlFor={`job-type-${type}`}
                      className="ml-3 text-sm text-gray-700"
                    >
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Experience Level
              </h3>
              <div className="space-y-2">
                {[
                  'Entry Level',
                  'Mid Level',
                  'Senior Level',
                  'Director',
                  'Executive',
                ].map((level) => (
                  <div key={level} className="flex items-center">
                    <input
                      id={`experience-${level}`}
                      name="experience"
                      type="radio"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      checked={experienceLevel === level}
                      onChange={() => setExperienceLevel(level)}
                    />
                    <label
                      htmlFor={`experience-${level}`}
                      className="ml-3 text-sm text-gray-700"
                    >
                      {level}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Salary Range
              </h3>
              <div className="space-y-2">
                {[
                  '$0 - $50,000',
                  '$50,000 - $100,000',
                  '$100,000 - $150,000',
                  '$150,000+',
                ].map((range) => (
                  <div key={range} className="flex items-center">
                    <input
                      id={`salary-${range}`}
                      name="salary"
                      type="radio"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      checked={salary === range}
                      onChange={() => setSalary(range)}
                    />
                    <label
                      htmlFor={`salary-${range}`}
                      className="ml-3 text-sm text-gray-700"
                    >
                      {range}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Date Posted
              </h3>
              <div className="space-y-2">
                {[
                  'Last 24 hours',
                  'Last 3 days',
                  'Last 7 days',
                  'Last 14 days',
                  'Last 30 days',
                ].map((date) => (
                  <div key={date} className="flex items-center">
                    <input
                      id={`date-${date}`}
                      name="date"
                      type="radio"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      checked={datePosted === date}
                      onChange={() => setDatePosted(date)}
                    />
                    <label
                      htmlFor={`date-${date}`}
                      className="ml-3 text-sm text-gray-700"
                    >
                      {date}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={resetFilters}
              className="w-full py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Reset Filters
            </button>
          </div>
        </div>
        {/* Job listings */}
        <div className="flex-1">
          <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-6">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">
                {jobs.length} Jobs Available
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
            <div className="divide-y divide-gray-200">
              {jobs.map((job) => (
                <div key={job.id} className="p-6 hover:bg-gray-50">
                  <div className="flex justify-between">
                    <div className="flex">
                      <div className="h-12 w-12 rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src={job.logo}
                          alt={`${job.company} logo`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">
                          {job.title}
                        </h3>
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
                      className={`h-8 w-8 flex items-center justify-center rounded-full ${savedJobs.includes(job.id) ? 'text-blue-600 bg-blue-50' : 'text-gray-400 hover:text-gray-500 bg-white'}`}
                    >
                      <BookmarkIcon
                        className="h-5 w-5"
                        fill={
                          savedJobs.includes(job.id) ? 'currentColor' : 'none'
                        }
                      />
                    </button>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {job.description}
                    </p>
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
            </div>
            <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing <span className="font-medium">1</span> to{' '}
                <span className="font-medium">{jobs.length}</span> of{' '}
                <span className="font-medium">100</span> results
              </div>
              <div className="flex-1 flex justify-end">
                <nav
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <a
                    href="#"
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Previous</span>
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a
                    href="#"
                    aria-current="page"
                    className="z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  >
                    1
                  </a>
                  <a
                    href="#"
                    className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  >
                    2
                  </a>
                  <a
                    href="#"
                    className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
                  >
                    3
                  </a>
                  <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                    ...
                  </span>
                  <a
                    href="#"
                    className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  >
                    10
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Next</span>
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
