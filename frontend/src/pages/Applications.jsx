import React, { useState } from 'react'
import {
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  FileTextIcon,
  MessageCircleIcon,
  CalendarIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ExternalLinkIcon,
} from 'lucide-react'
export function Applications() {
  // Mock applications data
  const [applications, setApplications] = useState([
    {
      id: 1,
      jobTitle: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      appliedDate: '2023-11-01',
      status: 'interview',
      logo: 'https://images.unsplash.com/photo-1549924231-f129b911e442?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&h=50&q=80',
      interviews: [
        {
          type: 'Technical Interview',
          date: '2023-11-10',
          time: '10:00 AM',
          interviewer: 'Sarah Johnson',
          location: 'Zoom Meeting',
        },
      ],
      expanded: false,
    },
    {
      id: 2,
      jobTitle: 'UX/UI Designer',
      company: 'Design Studio',
      location: 'Remote',
      appliedDate: '2023-11-03',
      status: 'submitted',
      logo: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&h=50&q=80',
      expanded: false,
    },
    {
      id: 3,
      jobTitle: 'Product Manager',
      company: 'ProductLabs',
      location: 'Austin, TX',
      appliedDate: '2023-10-25',
      status: 'rejected',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&h=50&q=80',
      rejectionReason:
        "We, ve, decided, to, move, forward, with: candidates, who, have, more, experience, the, healthcare, industry, : ., ',: expanded, false:",
    },
    {
      id: 4,
      jobTitle: 'DevOps Engineer',
      company: 'CloudOps',
      location: 'Remote',
      appliedDate: '2023-10-28',
      status: 'offered',
      logo: 'https://images.unsplash.com/photo-1553835973-dec43bfddbeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&h=50&q=80',
      offer: {
        salary: '$135,000',
        benefits: 'Full health insurance, 401k matching, unlimited PTO',
        startDate: '2023-12-01',
        deadline: '2023-11-15',
      },
      expanded: false,
    },
  ])
  // Filter states
  const [statusFilter, setStatusFilter] = useState('all')
  // Toggle application details
  const toggleApplicationDetails = (applicationId) => {
    setApplications(
      applications.map((app) =>
        app.id === applicationId
          ? {
              ...app,
              expanded: !app.expanded,
            }
          : app,
      ),
    )
  }
  // Filter applications based on status
  const filteredApplications =
    statusFilter === 'all'
      ? applications
      : applications.filter((app) => app.status === statusFilter)
  // Status badge renderer
  const renderStatusBadge = (status) => {
    switch (status) {
      case 'submitted':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <ClockIcon className="h-3.5 w-3.5 mr-1" />
            Application Submitted
          </span>
        )
      case 'interview':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <CalendarIcon className="h-3.5 w-3.5 mr-1" />
            Interview Scheduled
          </span>
        )
      case 'offered':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircleIcon className="h-3.5 w-3.5 mr-1" />
            Offer Received
          </span>
        )
      case 'rejected':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircleIcon className="h-3.5 w-3.5 mr-1" />
            Not Selected
          </span>
        )
      default:
        return null
    }
  }
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-6">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">My Applications</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track the status of your job applications
          </p>
        </div>
        <div className="px-4 py-3 border-b border-gray-200 flex flex-wrap gap-2">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1 text-sm rounded-md ${statusFilter === 'all' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
          >
            All ({applications.length})
          </button>
          <button
            onClick={() => setStatusFilter('submitted')}
            className={`px-3 py-1 text-sm rounded-md ${statusFilter === 'submitted' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
          >
            Submitted (
            {applications.filter((app) => app.status === 'submitted').length})
          </button>
          <button
            onClick={() => setStatusFilter('interview')}
            className={`px-3 py-1 text-sm rounded-md ${statusFilter === 'interview' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
          >
            Interviews (
            {applications.filter((app) => app.status === 'interview').length})
          </button>
          <button
            onClick={() => setStatusFilter('offered')}
            className={`px-3 py-1 text-sm rounded-md ${statusFilter === 'offered' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
          >
            Offers (
            {applications.filter((app) => app.status === 'offered').length})
          </button>
          <button
            onClick={() => setStatusFilter('rejected')}
            className={`px-3 py-1 text-sm rounded-md ${statusFilter === 'rejected' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
          >
            Rejected (
            {applications.filter((app) => app.status === 'rejected').length})
          </button>
        </div>
        {filteredApplications.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {filteredApplications.map((application) => (
              <div key={application.id} className="hover:bg-gray-50">
                <div className="p-6">
                  <div className="flex justify-between">
                    <div className="flex">
                      <div className="h-12 w-12 rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src={application.logo}
                          alt={`${application.company} logo`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">
                          {application.jobTitle}
                        </h3>
                        <div className="mt-1 flex items-center text-sm text-gray-500">
                          <span>{application.company}</span>
                          <span className="mx-1.5">&middot;</span>
                          <span>{application.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      {renderStatusBadge(application.status)}
                      <span className="text-xs text-gray-500">
                        Applied on{' '}
                        {new Date(application.appliedDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex space-x-3">
                      <button className="text-gray-600 hover:text-gray-800 text-sm font-medium flex items-center">
                        <FileTextIcon className="h-4 w-4 mr-1" />
                        View Job
                      </button>
                      <button className="text-gray-600 hover:text-gray-800 text-sm font-medium flex items-center">
                        <MessageCircleIcon className="h-4 w-4 mr-1" />
                        Contact Recruiter
                      </button>
                    </div>
                    <button
                      onClick={() => toggleApplicationDetails(application.id)}
                      className="text-gray-500 hover:text-gray-700 flex items-center text-sm"
                    >
                      {application.expanded ? (
                        <>
                          Hide Details
                          <ChevronUpIcon className="h-4 w-4 ml-1" />
                        </>
                      ) : (
                        <>
                          View Details
                          <ChevronDownIcon className="h-4 w-4 ml-1" />
                        </>
                      )}
                    </button>
                  </div>
                  {application.expanded && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      {application.status === 'interview' &&
                        application.interviews && (
                          <div className="mb-4">
                            <h4 className="text-sm font-medium text-gray-900 mb-2">
                              Upcoming Interviews
                            </h4>
                            {application.interviews.map((interview, idx) => (
                              <div
                                key={idx}
                                className="bg-yellow-50 border border-yellow-100 rounded-md p-3 text-sm"
                              >
                                <div className="font-medium text-gray-900">
                                  {interview.type}
                                </div>
                                <div className="mt-1 text-gray-700">
                                  <div className="flex items-center">
                                    <CalendarIcon className="h-4 w-4 mr-1 text-gray-500" />
                                    {new Date(
                                      interview.date,
                                    ).toLocaleDateString()}{' '}
                                    at {interview.time}
                                  </div>
                                  <div className="mt-1">
                                    With: {interview.interviewer}
                                  </div>
                                  <div className="mt-1">
                                    Location: {interview.location}
                                  </div>
                                </div>
                                <div className="mt-3 flex justify-end">
                                  <button className="bg-white border border-gray-300 text-gray-700 px-3 py-1 rounded-md text-sm hover:bg-gray-50">
                                    Reschedule
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      {application.status === 'offered' &&
                        application.offer && (
                          <div className="mb-4">
                            <h4 className="text-sm font-medium text-gray-900 mb-2">
                              Job Offer Details
                            </h4>
                            <div className="bg-green-50 border border-green-100 rounded-md p-3 text-sm">
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <span className="text-gray-500">Salary:</span>
                                  <span className="ml-1 text-gray-900 font-medium">
                                    {application.offer.salary}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-gray-500">
                                    Start Date:
                                  </span>
                                  <span className="ml-1 text-gray-900">
                                    {application.offer.startDate}
                                  </span>
                                </div>
                                <div className="col-span-2">
                                  <span className="text-gray-500">
                                    Benefits:
                                  </span>
                                  <span className="ml-1 text-gray-900">
                                    {application.offer.benefits}
                                  </span>
                                </div>
                                <div className="col-span-2 mt-2">
                                  <span className="text-red-600 font-medium">
                                    Respond by {application.offer.deadline}
                                  </span>
                                </div>
                              </div>
                              <div className="mt-3 flex justify-end space-x-3">
                                <button className="bg-white border border-gray-300 text-gray-700 px-3 py-1 rounded-md text-sm hover:bg-gray-50">
                                  Negotiate
                                </button>
                                <button className="bg-green-600 text-white px-3 py-1 rounded-md text-sm hover:bg-green-700">
                                  Accept Offer
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      {application.status === 'rejected' &&
                        application.rejectionReason && (
                          <div className="mb-4">
                            <h4 className="text-sm font-medium text-gray-900 mb-2">
                              Feedback
                            </h4>
                            <div className="bg-gray-50 border border-gray-200 rounded-md p-3 text-sm text-gray-700">
                              {application.rejectionReason}
                            </div>
                          </div>
                        )}
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">
                          Application Timeline
                        </h4>
                        <div className="relative pl-8 border-l-2 border-gray-200 space-y-6 py-2">
                          <div className="relative">
                            <div className="absolute -left-[25px] mt-1.5 h-4 w-4 rounded-full border-2 border-white bg-blue-500"></div>
                            <div className="text-xs text-gray-500">
                              {new Date(
                                application.appliedDate,
                              ).toLocaleDateString()}
                            </div>
                            <div className="text-sm font-medium text-gray-900">
                              Application Submitted
                            </div>
                          </div>
                          {application.status === 'interview' && (
                            <div className="relative">
                              <div className="absolute -left-[25px] mt-1.5 h-4 w-4 rounded-full border-2 border-white bg-yellow-500"></div>
                              <div className="text-xs text-gray-500">
                                {new Date().toLocaleDateString()}
                              </div>
                              <div className="text-sm font-medium text-gray-900">
                                Interview Scheduled
                              </div>
                            </div>
                          )}
                          {application.status === 'offered' && (
                            <>
                              <div className="relative">
                                <div className="absolute -left-[25px] mt-1.5 h-4 w-4 rounded-full border-2 border-white bg-yellow-500"></div>
                                <div className="text-xs text-gray-500">
                                  {new Date(
                                    new Date(
                                      application.appliedDate,
                                    ).getTime() +
                                      5 * 24 * 60 * 60 * 1000,
                                  ).toLocaleDateString()}
                                </div>
                                <div className="text-sm font-medium text-gray-900">
                                  Interview Completed
                                </div>
                              </div>
                              <div className="relative">
                                <div className="absolute -left-[25px] mt-1.5 h-4 w-4 rounded-full border-2 border-white bg-green-500"></div>
                                <div className="text-xs text-gray-500">
                                  {new Date(
                                    new Date(
                                      application.appliedDate,
                                    ).getTime() +
                                      10 * 24 * 60 * 60 * 1000,
                                  ).toLocaleDateString()}
                                </div>
                                <div className="text-sm font-medium text-gray-900">
                                  Offer Extended
                                </div>
                              </div>
                            </>
                          )}
                          {application.status === 'rejected' && (
                            <div className="relative">
                              <div className="absolute -left-[25px] mt-1.5 h-4 w-4 rounded-full border-2 border-white bg-red-500"></div>
                              <div className="text-xs text-gray-500">
                                {new Date(
                                  new Date(application.appliedDate).getTime() +
                                    7 * 24 * 60 * 60 * 1000,
                                ).toLocaleDateString()}
                              </div>
                              <div className="text-sm font-medium text-gray-900">
                                Application Rejected
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 px-4 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 rounded-full p-3">
                <FileTextIcon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No applications found
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              {statusFilter === 'all'
                ? "You haven't applied to any jobs yet. Start by browsing job listings and submitting applications."
                : `You don't have any applications with status "${statusFilter}".`}
            </p>
            <div className="mt-6">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                <ExternalLinkIcon className="h-4 w-4 mr-1" />
                Browse Jobs
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
