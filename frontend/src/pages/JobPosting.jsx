import React from 'react'
import { PlusIcon, MinusIcon, HelpCircleIcon } from 'lucide-react'
export function JobPosting() {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">Post a New Job</h1>
        <p className="mt-1 text-sm text-gray-500">
          Fill out the form below to create a new job listing
        </p>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <form className="space-y-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Job Details</h2>
              <p className="mt-1 text-sm text-gray-500">
                Basic information about the position
              </p>
            </div>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="job-title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Job Title *
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="job-title"
                    id="job-title"
                    placeholder="e.g. Senior Frontend Developer"
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="job-type"
                  className="block text-sm font-medium text-gray-700"
                >
                  Job Type *
                </label>
                <div className="mt-1">
                  <select
                    id="job-type"
                    name="job-type"
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  >
                    <option value="">Select job type</option>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                    <option value="temporary">Temporary</option>
                  </select>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700"
                >
                  Location
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="location"
                    id="location"
                    placeholder="e.g. San Francisco, CA or Remote"
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="department"
                  className="block text-sm font-medium text-gray-700"
                >
                  Department
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="department"
                    id="department"
                    placeholder="e.g. Engineering, Design, Marketing"
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="min-salary"
                  className="block text-sm font-medium text-gray-700"
                >
                  Minimum Salary
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="text"
                    name="min-salary"
                    id="min-salary"
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 sm:text-sm border-gray-300 rounded-md"
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="max-salary"
                  className="block text-sm font-medium text-gray-700"
                >
                  Maximum Salary
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="text"
                    name="max-salary"
                    id="max-salary"
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 sm:text-sm border-gray-300 rounded-md"
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div className="sm:col-span-6">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="hide-salary"
                      name="hide-salary"
                      type="checkbox"
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="hide-salary"
                      className="font-medium text-gray-700"
                    >
                      Hide salary from job listing
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                Job Description
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Provide details about the job responsibilities and requirements
              </p>
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Job Description *
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  rows={6}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Describe the role, responsibilities, and company culture..."
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Required Skills
              </label>
              <div className="mt-1">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="text"
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="e.g. React.js"
                    />
                    <button
                      type="button"
                      className="ml-2 inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <PlusIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Add the key skills required for this position
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                Company Information
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Information about your company that will be displayed with the
                job listing
              </p>
            </div>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label
                  htmlFor="company-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Company Name *
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="company-name"
                    id="company-name"
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div className="sm:col-span-6">
                <label
                  htmlFor="company-website"
                  className="block text-sm font-medium text-gray-700"
                >
                  Company Website
                </label>
                <div className="mt-1">
                  <input
                    type="url"
                    name="company-website"
                    id="company-website"
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="https://"
                  />
                </div>
              </div>
              <div className="sm:col-span-6">
                <label
                  htmlFor="company-logo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Company Logo
                </label>
                <div className="mt-1 flex items-center">
                  <span className="h-12 w-12 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                    <svg
                      className="h-6 w-6 text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </span>
                  <button
                    type="button"
                    className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Upload
                  </button>
                </div>
              </div>
              <div className="sm:col-span-6">
                <label
                  htmlFor="company-description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Company Description
                </label>
                <div className="mt-1">
                  <textarea
                    id="company-description"
                    name="company-description"
                    rows={3}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Brief description of your company..."
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                Application Settings
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Configure how candidates can apply for this job
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="apply-website"
                    name="apply-method"
                    type="radio"
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                    defaultChecked
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="apply-website"
                    className="font-medium text-gray-700"
                  >
                    Apply through your website
                  </label>
                  <div className="mt-1">
                    <input
                      type="url"
                      name="application-url"
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="https://your-company.com/careers/apply"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="apply-email"
                    name="apply-method"
                    type="radio"
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="apply-email"
                    className="font-medium text-gray-700"
                  >
                    Receive applications by email
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      name="application-email"
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="careers@your-company.com"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="apply-platform"
                    name="apply-method"
                    type="radio"
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="apply-platform"
                    className="font-medium text-gray-700"
                  >
                    Apply through our platform
                  </label>
                  <p className="text-gray-500">
                    Candidates will apply directly on JobConnect and you'll
                    receive notifications
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
        <button
          type="button"
          className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-3"
        >
          Save as Draft
        </button>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Post Job
        </button>
      </div>
    </div>
  )
}
