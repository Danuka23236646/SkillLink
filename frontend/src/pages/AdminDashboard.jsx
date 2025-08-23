import React, { useState } from 'react'
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
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-1 text-gray-500">
          Manage users, verify profiles, and monitor platform activity
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
                      2,453
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                View all
              </a>
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
                    <div className="text-lg font-medium text-gray-900">567</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                View all
              </a>
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow-sm rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                <AlertCircle className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Pending Verification
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">23</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                View all
              </a>
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow-sm rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-red-500 rounded-md p-3">
                <XCircle className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Reported Content
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">7</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                View all
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <div className="bg-white shadow-sm rounded-lg">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'overview' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'users' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                User Management
              </button>
              <button
                onClick={() => setActiveTab('verification')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'verification' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Verification Queue
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'analytics' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Analytics
              </button>
            </nav>
          </div>
          <div className="p-6">
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Platform Overview
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500 mb-3">
                      User Activity (Last 30 days)
                    </h3>
                    <div className="h-64 flex items-center justify-center bg-white rounded border border-gray-200">
                      <LineChartIcon className="h-24 w-24 text-gray-300" />
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500 mb-3">
                      Job Postings by Category
                    </h3>
                    <div className="h-64 flex items-center justify-center bg-white rounded border border-gray-200">
                      <PieChartIcon className="h-24 w-24 text-gray-300" />
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500 mb-3">
                      New Registrations
                    </h3>
                    <div className="h-64 flex items-center justify-center bg-white rounded border border-gray-200">
                      <BarChart3Icon className="h-24 w-24 text-gray-300" />
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500 mb-3">
                      Recent Activity
                    </h3>
                    <div className="bg-white rounded border border-gray-200 divide-y divide-gray-200">
                      <div className="p-3 flex items-center">
                        <UserIcon className="h-5 w-5 text-blue-500 mr-3" />
                        <div className="text-sm">
                          <span className="font-medium text-gray-900">
                            New user registered:
                          </span>
                          <span className="text-gray-500"> John Smith</span>
                          <div className="text-xs text-gray-500">
                            2 hours ago
                          </div>
                        </div>
                      </div>
                      <div className="p-3 flex items-center">
                        <Briefcase className="h-5 w-5 text-green-500 mr-3" />
                        <div className="text-sm">
                          <span className="font-medium text-gray-900">
                            New job posted:
                          </span>
                          <span className="text-gray-500">
                            {' '}
                            Senior Developer at TechCorp
                          </span>
                          <div className="text-xs text-gray-500">
                            5 hours ago
                          </div>
                        </div>
                      </div>
                      <div className="p-3 flex items-center">
                        <ShieldIcon className="h-5 w-5 text-yellow-500 mr-3" />
                        <div className="text-sm">
                          <span className="font-medium text-gray-900">
                            Profile verified:
                          </span>
                          <span className="text-gray-500"> Sarah Williams</span>
                          <div className="text-xs text-gray-500">1 day ago</div>
                        </div>
                      </div>
                      <div className="p-3 flex items-center">
                        <BellIcon className="h-5 w-5 text-red-500 mr-3" />
                        <div className="text-sm">
                          <span className="font-medium text-gray-900">
                            Content reported:
                          </span>
                          <span className="text-gray-500">
                            {' '}
                            Job posting #1234
                          </span>
                          <div className="text-xs text-gray-500">1 day ago</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'users' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-900">
                    User Management
                  </h2>
                  <div className="flex">
                    <div className="relative mr-2">
                      <input
                        type="text"
                        placeholder="Search users..."
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <select className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md">
                      <option>All Types</option>
                      <option>Job Seekers</option>
                      <option>Employers</option>
                      <option>Admins</option>
                    </select>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          User
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Type
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Joined
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full"
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                Alex Johnson
                              </div>
                              <div className="text-sm text-gray-500">
                                alex.johnson@example.com
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            Job Seeker
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Active
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Jan 10, 2023
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <a
                            href="#"
                            className="text-blue-600 hover:text-blue-900 mr-3"
                          >
                            Edit
                          </a>
                          <a
                            href="#"
                            className="text-red-600 hover:text-red-900"
                          >
                            Suspend
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full"
                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                Sarah Williams
                              </div>
                              <div className="text-sm text-gray-500">
                                sarah.williams@example.com
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">Employer</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Active
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Feb 15, 2023
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <a
                            href="#"
                            className="text-blue-600 hover:text-blue-900 mr-3"
                          >
                            Edit
                          </a>
                          <a
                            href="#"
                            className="text-red-600 hover:text-red-900"
                          >
                            Suspend
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full"
                                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                Michael Chen
                              </div>
                              <div className="text-sm text-gray-500">
                                michael.chen@example.com
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            Job Seeker
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Pending
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Mar 5, 2023
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <a
                            href="#"
                            className="text-blue-600 hover:text-blue-900 mr-3"
                          >
                            Edit
                          </a>
                          <a
                            href="#"
                            className="text-red-600 hover:text-red-900"
                          >
                            Suspend
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full"
                                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                Jessica Rodriguez
                              </div>
                              <div className="text-sm text-gray-500">
                                jessica.rodriguez@example.com
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">Employer</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Suspended
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Jan 25, 2023
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <a
                            href="#"
                            className="text-blue-600 hover:text-blue-900 mr-3"
                          >
                            Edit
                          </a>
                          <a
                            href="#"
                            className="text-green-600 hover:text-green-900"
                          >
                            Reactivate
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to{' '}
                    <span className="font-medium">4</span> of{' '}
                    <span className="font-medium">100</span> users
                  </div>
                  <div>
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
            )}
            {activeTab === 'verification' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Verification Queue
                </h2>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-md font-medium text-gray-900">
                      Pending Profile Verifications
                    </h3>
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      15 Pending
                    </span>
                  </div>
                  <div className="bg-white overflow-hidden shadow-sm rounded-md">
                    <ul className="divide-y divide-gray-200">
                      <li>
                        <div className="px-4 py-4 flex items-center justify-between sm:px-6">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full"
                                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                Michael Chen
                              </div>
                              <div className="text-sm text-gray-500">
                                Job Seeker • Submitted 2 days ago
                              </div>
                            </div>
                          </div>
                          <div className="flex">
                            <button className="bg-green-100 text-green-800 hover:bg-green-200 mr-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </button>
                            <button className="bg-red-100 text-red-800 hover:bg-red-200 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded">
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </button>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="px-4 py-4 flex items-center justify-between sm:px-6">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full"
                                src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                David Kim
                              </div>
                              <div className="text-sm text-gray-500">
                                Job Seeker • Submitted 3 days ago
                              </div>
                            </div>
                          </div>
                          <div className="flex">
                            <button className="bg-green-100 text-green-800 hover:bg-green-200 mr-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </button>
                            <button className="bg-red-100 text-red-800 hover:bg-red-200 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded">
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </button>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="px-4 py-4 flex items-center justify-between sm:px-6">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full"
                                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                Emily Davis
                              </div>
                              <div className="text-sm text-gray-500">
                                Job Seeker • Submitted 1 day ago
                              </div>
                            </div>
                          </div>
                          <div className="flex">
                            <button className="bg-green-100 text-green-800 hover:bg-green-200 mr-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </button>
                            <button className="bg-red-100 text-red-800 hover:bg-red-200 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded">
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </button>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                      <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
                        View all profile verifications
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-md font-medium text-gray-900">
                      Pending Job Verifications
                    </h3>
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      8 Pending
                    </span>
                  </div>
                  <div className="bg-white overflow-hidden shadow-sm rounded-md">
                    <ul className="divide-y divide-gray-200">
                      <li>
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <div className="text-sm font-medium text-blue-600 truncate">
                              Senior Frontend Developer
                            </div>
                            <div className="ml-2 flex-shrink-0 flex">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                Pending
                              </span>
                            </div>
                          </div>
                          <div className="mt-2 flex justify-between">
                            <div>
                              <div className="sm:flex">
                                <div className="mr-6 flex items-center text-sm text-gray-500">
                                  <Briefcase className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                  TechCorp Inc.
                                </div>
                                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                  <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                  San Francisco, CA
                                </div>
                              </div>
                              <div className="mt-2 text-sm text-gray-500">
                                Posted 2 days ago by Sarah Williams
                              </div>
                            </div>
                            <div className="flex">
                              <button className="bg-green-100 text-green-800 hover:bg-green-200 mr-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded">
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Approve
                              </button>
                              <button className="bg-red-100 text-red-800 hover:bg-red-200 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded">
                                <XCircle className="h-4 w-4 mr-1" />
                                Reject
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <div className="text-sm font-medium text-blue-600 truncate">
                              UX/UI Designer
                            </div>
                            <div className="ml-2 flex-shrink-0 flex">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                Pending
                              </span>
                            </div>
                          </div>
                          <div className="mt-2 flex justify-between">
                            <div>
                              <div className="sm:flex">
                                <div className="mr-6 flex items-center text-sm text-gray-500">
                                  <Briefcase className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                  Design Studio
                                </div>
                                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                  <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                  Remote
                                </div>
                              </div>
                              <div className="mt-2 text-sm text-gray-500">
                                Posted 1 day ago by Jessica Rodriguez
                              </div>
                            </div>
                            <div className="flex">
                              <button className="bg-green-100 text-green-800 hover:bg-green-200 mr-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded">
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Approve
                              </button>
                              <button className="bg-red-100 text-red-800 hover:bg-red-200 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded">
                                <XCircle className="h-4 w-4 mr-1" />
                                Reject
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                      <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
                        View all job verifications
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'analytics' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Platform Analytics
                </h2>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-6">
                  <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                          <Users className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              User Growth
                            </dt>
                            <dd>
                              <div className="text-lg font-medium text-gray-900">
                                +12.5%
                              </div>
                              <div className="text-sm text-green-500">
                                +2.5% from last month
                              </div>
                            </dd>
                          </dl>
                        </div>
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
                              Job Postings
                            </dt>
                            <dd>
                              <div className="text-lg font-medium text-gray-900">
                                +8.3%
                              </div>
                              <div className="text-sm text-green-500">
                                +1.2% from last month
                              </div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                          <CheckCircle className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              Successful Matches
                            </dt>
                            <dd>
                              <div className="text-lg font-medium text-gray-900">
                                +15.7%
                              </div>
                              <div className="text-sm text-green-500">
                                +3.2% from last month
                              </div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <div className="bg-white shadow-sm rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      User Activity
                    </h3>
                    <div className="h-80 flex items-center justify-center bg-gray-50 rounded">
                      <LineChartIcon className="h-24 w-24 text-gray-300" />
                    </div>
                  </div>
                  <div className="bg-white shadow-sm rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Job Categories Distribution
                    </h3>
                    <div className="h-80 flex items-center justify-center bg-gray-50 rounded">
                      <PieChartIcon className="h-24 w-24 text-gray-300" />
                    </div>
                  </div>
                  <div className="bg-white shadow-sm rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Monthly Job Applications
                    </h3>
                    <div className="h-80 flex items-center justify-center bg-gray-50 rounded">
                      <BarChart3Icon className="h-24 w-24 text-gray-300" />
                    </div>
                  </div>
                  <div className="bg-white shadow-sm rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      User Demographics
                    </h3>
                    <div className="h-80 flex items-center justify-center bg-gray-50 rounded">
                      <PieChartIcon className="h-24 w-24 text-gray-300" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
