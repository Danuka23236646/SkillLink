import React from 'react'
import { Link } from 'react-router-dom'
import {
  User,
  BriefcaseIcon,
  BookmarkIcon,
  FileTextIcon,
  UsersIcon,
  SettingsIcon,
  LayoutDashboardIcon,
  ShieldIcon,
  LineChartIcon,
} from 'lucide-react'
export function Sidebar({ userRole }) {
  // Define menu items based on user role
  const menuItems = {
    jobseeker: [
      {
        name: 'My Profile',
        icon: <User size={18} />,
        link: '/profile',
      },
      {
        name: 'Browse Jobs',
        icon: <BriefcaseIcon size={18} />,
        link: '/jobs',
      },
      {
        name: 'Saved Jobs',
        icon: <BookmarkIcon size={18} />,
        link: '/saved-jobs',
      },
      {
        name: 'Applications',
        icon: <FileTextIcon size={18} />,
        link: '/applications',
      },
      {
        name: 'Settings',
        icon: <SettingsIcon size={18} />,
        link: '/settings',
      },
    ],
    employer: [
      {
        name: 'Dashboard',
        icon: <LayoutDashboardIcon size={18} />,
        link: '/employer-dashboard',
      },
      {
        name: 'Post Job',
        icon: <FileTextIcon size={18} />,
        link: '/post-job',
      },
      {
        name: 'Find Talent',
        icon: <UsersIcon size={18} />,
        link: '/talent',
      },
      {
        name: 'My Jobs',
        icon: <BriefcaseIcon size={18} />,
        link: '/my-jobs',
      },
      {
        name: 'Settings',
        icon: <SettingsIcon size={18} />,
        link: '/settings',
      },
    ],
    admin: [
      {
        name: 'Dashboard',
        icon: <LayoutDashboardIcon size={18} />,
        link: '/admin',
      },
      {
        name: 'User Management',
        icon: <UsersIcon size={18} />,
        link: '/admin/users',
      },
      {
        name: 'Verification Queue',
        icon: <ShieldIcon size={18} />,
        link: '/admin/verification',
      },
      {
        name: 'Analytics',
        icon: <LineChartIcon size={18} />,
        link: '/admin/analytics',
      },
      {
        name: 'Settings',
        icon: <SettingsIcon size={18} />,
        link: '/admin/settings',
      },
    ],
  }
  const items = menuItems[userRole] || []
  return (
    <aside className="hidden md:block w-64 bg-white border-r border-gray-200 p-4">
      <div className="mb-6">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          {userRole === 'jobseeker'
            ? 'Job Seeker'
            : userRole === 'employer'
              ? 'Employer'
              : 'Admin'}{' '}
          Menu
        </h2>
      </div>
      <nav className="space-y-1">
        {items.map((item) => (
          <Link
            key={item.name}
            to={item.link}
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-blue-600"
          >
            <span className="mr-3 text-gray-500">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
