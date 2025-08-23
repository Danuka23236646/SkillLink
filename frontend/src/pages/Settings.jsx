import React, { useState } from 'react'
import {
  User,
  Lock,
  Bell,
  Globe,
  CreditCard,
  Shield,
  Trash2Icon,
  EyeIcon,
  EyeOffIcon,
  CheckIcon,
  AlertCircleIcon,
} from 'lucide-react'
export function Settings() {
  const [activeTab, setActiveTab] = useState('account')
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [notificationSettings, setNotificationSettings] = useState({
    jobAlerts: true,
    applicationUpdates: true,
    messages: true,
    marketing: false,
  })
  const [profileVisibility, setProfileVisibility] = useState({
    public: true,
    showEmail: false,
    showPhone: false,
    allowRecruiters: true,
  })
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }
  const handleNotificationChange = (setting) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting],
    })
  }
  const handleVisibilityChange = (setting) => {
    setProfileVisibility({
      ...profileVisibility,
      [setting]: !profileVisibility[setting],
    })
  }
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-6">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your account preferences and settings
          </p>
        </div>
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px overflow-x-auto">
            <button
              onClick={() => setActiveTab('account')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'account' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              <User className="h-4 w-4 inline mr-2" />
              Account Information
            </button>
            <button
              onClick={() => setActiveTab('password')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'password' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              <Lock className="h-4 w-4 inline mr-2" />
              Password & Security
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'notifications' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              <Bell className="h-4 w-4 inline mr-2" />
              Notifications
            </button>
            <button
              onClick={() => setActiveTab('privacy')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'privacy' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              <Shield className="h-4 w-4 inline mr-2" />
              Privacy
            </button>
            <button
              onClick={() => setActiveTab('billing')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'billing' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              <CreditCard className="h-4 w-4 inline mr-2" />
              Billing
            </button>
          </nav>
        </div>
        <div className="p-6">
          {activeTab === 'account' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Personal Information
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Update your personal details
                </p>
              </div>
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      defaultValue="Alex"
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      defaultValue="Johnson"
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="sm:col-span-6">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      defaultValue="alex.johnson@example.com"
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone number
                  </label>
                  <div className="mt-1">
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      defaultValue="+1 (555) 123-4567"
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
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
                      defaultValue="San Francisco, CA"
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="language"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Preferred Language
                  </label>
                  <div className="mt-1">
                    <select
                      id="language"
                      name="language"
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                      <option>Chinese</option>
                    </select>
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="timezone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Time Zone
                  </label>
                  <div className="mt-1">
                    <select
                      id="timezone"
                      name="timezone"
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      <option>(GMT-08:00) Pacific Time</option>
                      <option>(GMT-07:00) Mountain Time</option>
                      <option>(GMT-06:00) Central Time</option>
                      <option>(GMT-05:00) Eastern Time</option>
                      <option>(GMT+00:00) UTC</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex justify-end pt-5">
                <button
                  type="button"
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}
          {activeTab === 'password' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Password & Security
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Update your password and manage security settings
                </p>
              </div>
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="current-password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Current Password
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type={passwordVisible ? 'text' : 'password'}
                      name="current-password"
                      id="current-password"
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        {passwordVisible ? (
                          <EyeOffIcon className="h-5 w-5" />
                        ) : (
                          <EyeIcon className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="new-password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    New Password
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type={passwordVisible ? 'text' : 'password'}
                      name="new-password"
                      id="new-password"
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm New Password
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type={passwordVisible ? 'text' : 'password'}
                      name="confirm-password"
                      id="confirm-password"
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="rounded-md bg-yellow-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertCircleIcon className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">
                        Password requirements
                      </h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Minimum 8 characters</li>
                          <li>At least one uppercase letter</li>
                          <li>At least one number</li>
                          <li>At least one special character</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">
                    Two-Factor Authentication
                  </h4>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-gray-100 rounded-full p-2">
                        <Shield className="h-5 w-5 text-gray-500" />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                          Two-factor authentication is disabled
                        </div>
                        <div className="text-sm text-gray-500">
                          Add an extra layer of security to your account
                        </div>
                      </div>
                    </div>
                    <button className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      Enable
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex justify-end pt-5">
                <button
                  type="button"
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Update Password
                </button>
              </div>
            </div>
          )}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Notification Preferences
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Choose how and when you want to be notified
                </p>
              </div>
              <div className="space-y-6">
                <fieldset>
                  <legend className="text-sm font-medium text-gray-900">
                    Email Notifications
                  </legend>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="job-alerts"
                          name="job-alerts"
                          type="checkbox"
                          checked={notificationSettings.jobAlerts}
                          onChange={() => handleNotificationChange('jobAlerts')}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="job-alerts"
                          className="font-medium text-gray-700"
                        >
                          Job Alerts
                        </label>
                        <p className="text-gray-500">
                          Get notified when new jobs match your preferences
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="application-updates"
                          name="application-updates"
                          type="checkbox"
                          checked={notificationSettings.applicationUpdates}
                          onChange={() =>
                            handleNotificationChange('applicationUpdates')
                          }
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="application-updates"
                          className="font-medium text-gray-700"
                        >
                          Application Updates
                        </label>
                        <p className="text-gray-500">
                          Receive updates about your job applications
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="messages"
                          name="messages"
                          type="checkbox"
                          checked={notificationSettings.messages}
                          onChange={() => handleNotificationChange('messages')}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="messages"
                          className="font-medium text-gray-700"
                        >
                          Messages
                        </label>
                        <p className="text-gray-500">
                          Get notified when you receive new messages
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="marketing"
                          name="marketing"
                          type="checkbox"
                          checked={notificationSettings.marketing}
                          onChange={() => handleNotificationChange('marketing')}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="marketing"
                          className="font-medium text-gray-700"
                        >
                          Marketing and Updates
                        </label>
                        <p className="text-gray-500">
                          Receive tips, product updates and other marketing
                          communications
                        </p>
                      </div>
                    </div>
                  </div>
                </fieldset>
                <fieldset>
                  <legend className="text-sm font-medium text-gray-900">
                    Notification Frequency
                  </legend>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center">
                      <input
                        id="push-everything"
                        name="push-notifications"
                        type="radio"
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                        defaultChecked
                      />
                      <label
                        htmlFor="push-everything"
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        Real-time
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="push-email"
                        name="push-notifications"
                        type="radio"
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                      />
                      <label
                        htmlFor="push-email"
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        Daily digest
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="push-nothing"
                        name="push-notifications"
                        type="radio"
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                      />
                      <label
                        htmlFor="push-nothing"
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        Weekly digest
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
              <div className="flex justify-end pt-5">
                <button
                  type="button"
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Privacy Settings
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Control who can see your profile and how your data is used
                </p>
              </div>
              <div className="space-y-6">
                <fieldset>
                  <legend className="text-sm font-medium text-gray-900">
                    Profile Visibility
                  </legend>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="public-profile"
                          name="public-profile"
                          type="checkbox"
                          checked={profileVisibility.public}
                          onChange={() => handleVisibilityChange('public')}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="public-profile"
                          className="font-medium text-gray-700"
                        >
                          Public Profile
                        </label>
                        <p className="text-gray-500">
                          Make your profile visible to employers and recruiters
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="show-email"
                          name="show-email"
                          type="checkbox"
                          checked={profileVisibility.showEmail}
                          onChange={() => handleVisibilityChange('showEmail')}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="show-email"
                          className="font-medium text-gray-700"
                        >
                          Show Email Address
                        </label>
                        <p className="text-gray-500">
                          Display your email address on your public profile
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="show-phone"
                          name="show-phone"
                          type="checkbox"
                          checked={profileVisibility.showPhone}
                          onChange={() => handleVisibilityChange('showPhone')}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="show-phone"
                          className="font-medium text-gray-700"
                        >
                          Show Phone Number
                        </label>
                        <p className="text-gray-500">
                          Display your phone number on your public profile
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="allow-recruiters"
                          name="allow-recruiters"
                          type="checkbox"
                          checked={profileVisibility.allowRecruiters}
                          onChange={() =>
                            handleVisibilityChange('allowRecruiters')
                          }
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="allow-recruiters"
                          className="font-medium text-gray-700"
                        >
                          Allow Recruiter Messages
                        </label>
                        <p className="text-gray-500">
                          Let recruiters contact you about job opportunities
                        </p>
                      </div>
                    </div>
                  </div>
                </fieldset>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">
                    Data Usage
                  </h4>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="data-analytics"
                          name="data-analytics"
                          type="checkbox"
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                          defaultChecked
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="data-analytics"
                          className="font-medium text-gray-700"
                        >
                          Analytics and Personalization
                        </label>
                        <p className="text-gray-500">
                          Allow us to use your data to improve our services and
                          personalize your experience
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-red-700">
                        Delete Account
                      </h4>
                      <p className="mt-1 text-sm text-gray-500">
                        Permanently remove your account and all data
                      </p>
                    </div>
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-red-300 shadow-sm text-sm leading-4 font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <Trash2Icon className="h-4 w-4 mr-1" />
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex justify-end pt-5">
                <button
                  type="button"
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}
          {activeTab === 'billing' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Billing Information
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Manage your subscription and payment methods
                </p>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-md p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <CheckIcon className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">
                      Current Plan: Free
                    </h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <p>
                        You are currently on the free plan. Upgrade to access
                        premium features.
                      </p>
                    </div>
                    <div className="mt-4">
                      <div className="-mx-2 -my-1.5 flex">
                        <button
                          type="button"
                          className="bg-blue-600 px-3 py-1.5 rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Upgrade Plan
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">
                  Available Plans
                </h4>
                <div className="mt-4 space-y-4">
                  <div className="border border-gray-200 rounded-md p-4 hover:border-blue-500 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="text-lg font-medium text-gray-900">
                          Basic
                        </h5>
                        <p className="text-gray-500 text-sm mt-1">
                          For job seekers just getting started
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">
                          Free
                        </div>
                        <div className="text-gray-500 text-sm">Forever</div>
                      </div>
                    </div>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-center text-sm text-gray-600">
                        <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                        Create a professional profile
                      </li>
                      <li className="flex items-center text-sm text-gray-600">
                        <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                        Apply to up to 10 jobs per month
                      </li>
                      <li className="flex items-center text-sm text-gray-600">
                        <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                        Basic job alerts
                      </li>
                    </ul>
                  </div>
                  <div className="border-2 border-blue-500 rounded-md p-4 relative">
                    <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-2 py-1 uppercase">
                      Popular
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="text-lg font-medium text-gray-900">
                          Pro
                        </h5>
                        <p className="text-gray-500 text-sm mt-1">
                          For serious job seekers
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">
                          $9.99
                        </div>
                        <div className="text-gray-500 text-sm">per month</div>
                      </div>
                    </div>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-center text-sm text-gray-600">
                        <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                        Everything in Basic
                      </li>
                      <li className="flex items-center text-sm text-gray-600">
                        <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                        Unlimited job applications
                      </li>
                      <li className="flex items-center text-sm text-gray-600">
                        <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                        Featured profile for employers
                      </li>
                      <li className="flex items-center text-sm text-gray-600">
                        <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                        Advanced job alerts
                      </li>
                    </ul>
                    <div className="mt-4">
                      <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                        Upgrade to Pro
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-sm font-medium text-gray-900">
                  Payment Methods
                </h4>
                <p className="mt-1 text-sm text-gray-500">
                  No payment methods added yet
                </p>
                <div className="mt-4">
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Add Payment Method
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
