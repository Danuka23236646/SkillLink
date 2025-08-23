import React, { useState } from 'react'
import {
  MapPin,
  Briefcase,
  Clock,
  Trash2Icon,
  ExternalLinkIcon,
  DollarSignIcon,
  AlertCircleIcon,
} from 'lucide-react'
export function SavedJobs({ savedJobs, setSavedJobs }) {
  // Filter states
  const [statusFilter, setStatusFilter] = useState('all')
  // Remove job from saved jobs
  const removeJob = (jobId) => {
    setSavedJobs(savedJobs.filter((job) => job.id !== jobId))
  }
  // Filter jobs based on status
  const filteredJobs =
    statusFilter === 'all'
      ? savedJobs
      : savedJobs.filter((job) => job.status === statusFilter)
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-6">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Saved Jobs</h1>
          <p className="mt-1 text-sm text-gray-500">
            Jobs you've saved for later. Apply before they expire!
          </p>
        </div>
        <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
          <div className="flex space-x-2">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1 text-sm rounded-md ${statusFilter === 'all' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
            >
              All ({savedJobs.length})
            </button>
            <button
              onClick={() => setStatusFilter('active')}
              className={`px-3 py-1 text-sm rounded-md ${statusFilter === 'active' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
            >
              Active (
              {savedJobs.filter((job) => job.status === 'active').length})
            </button>
            <button
              onClick={() => setStatusFilter('expired')}
              className={`px-3 py-1 text-sm rounded-md ${statusFilter === 'expired' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
            >
              Expired (
              {savedJobs.filter((job) => job.status === 'expired').length})
            </button>
          </div>
          <div className="text-sm text-gray-500">
            Saved on: <span className="font-medium">Newest first</span>
          </div>
        </div>
        {filteredJobs.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {filteredJobs.map((job) => (
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
                  <div className="flex items-start space-x-2">
                    {job.status === 'expired' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <AlertCircleIcon className="h-3.5 w-3.5 mr-1" />
                        Expired
                      </span>
                    )}
                    <button
                      onClick={() => removeJob(job.id)}
                      className="text-gray-400 hover:text-red-500"
                      title="Remove from saved jobs"
                    >
                      <Trash2Icon className="h-5 w-5" />
                    </button>
                  </div>
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
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-xs text-gray-500">
                    Saved on {new Date(job.savedDate).toLocaleDateString()}
                  </div>
                  <div className="flex space-x-3">
                    <button className="text-gray-600 hover:text-gray-800 text-sm font-medium flex items-center">
                      <ExternalLinkIcon className="h-4 w-4 mr-1" />
                      View Details
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm font-medium">
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 px-4 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 rounded-full p-3">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No saved jobs found
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              {statusFilter === 'all'
                ? "You haven't saved any jobs yet. Browse jobs and click the bookmark icon to save them for later."
                : `You don't have any ${statusFilter} saved jobs.`}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
