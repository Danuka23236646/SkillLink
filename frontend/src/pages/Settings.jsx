import React, { useState } from 'react'


import {
  User, Lock, Bell, Globe, CreditCard, Shield, Trash2Icon,
  EyeIcon, EyeOffIcon, CheckIcon, AlertCircleIcon,
} from 'lucide-react'
import { changePassword } from '../api/account' // 👈 add

export function Settings() {
  const [activeTab, setActiveTab] = useState('account')
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [notificationSettings, setNotificationSettings] = useState({
    jobAlerts: true, applicationUpdates: true, messages: true, marketing: false,
  })
  const [profileVisibility, setProfileVisibility] = useState({
    public: true, showEmail: false, showPhone: false, allowRecruiters: true,
  })

  // 👇 new local state for password tab
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [pwMsg, setPwMsg] = useState(null) // {type: 'ok'|'err', text: string}
  const [savingPw, setSavingPw] = useState(false)

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible)
  const handleNotificationChange = (k) => setNotificationSettings(s => ({ ...s, [k]: !s[k] }))
  const handleVisibilityChange = (k) => setProfileVisibility(s => ({ ...s, [k]: !s[k] }))

  // 👇 client validator mirroring backend rule
  const isStrong = (pwd) =>
    pwd.length >= 8 &&
    /[A-Z]/.test(pwd) &&
    /\d/.test(pwd) &&
    /[^A-Za-z0-9]/.test(pwd)

  // 👇 submit handler
  const onUpdatePassword = async (e) => {
    e.preventDefault()
    setPwMsg(null)

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPwMsg({ type: 'err', text: 'Please fill in all password fields.' })
      return
    }
    if (newPassword !== confirmPassword) {
      setPwMsg({ type: 'err', text: 'New password and confirmation do not match.' })
      return
    }
    if (!isStrong(newPassword)) {
      setPwMsg({ type: 'err', text: 'Password must be 8+ chars and include uppercase, number, and special character.' })
      return
    }

    try {
      setSavingPw(true)
      await changePassword(currentPassword, newPassword)
      setPwMsg({ type: 'ok', text: 'Password updated successfully.' })
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (err) {
      setPwMsg({ type: 'err', text: err.message || 'Failed to update password.' })
    } finally {
      setSavingPw(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-6">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your account preferences and settings</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px overflow-x-auto">
            <button onClick={() => setActiveTab('account')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'account' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              <User className="h-4 w-4 inline mr-2" /> Account Information
            </button>
            <button onClick={() => setActiveTab('password')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'password' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              <Lock className="h-4 w-4 inline mr-2" /> Password & Security
            </button>
            <button onClick={() => setActiveTab('notifications')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'notifications' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              <Bell className="h-4 w-4 inline mr-2" /> Notifications
            </button>
            <button onClick={() => setActiveTab('privacy')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'privacy' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              <Shield className="h-4 w-4 inline mr-2" /> Privacy
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* --- Account tab (unchanged) --- */}
          {activeTab === 'account' && ( /* ... unchanged ... */ <div>{/* your existing content */}</div> )}

          {/* --- Password tab (wired) --- */}
          {activeTab === 'password' && (
            <form className="space-y-6" onSubmit={onUpdatePassword}>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Password & Security</h3>
                <p className="mt-1 text-sm text-gray-500">Update your password and manage security settings</p>
              </div>

              {/* status message */}
              {pwMsg && (
                <div className={`rounded-md p-3 ${pwMsg.type === 'ok' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                  {pwMsg.text}
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
                    Current Password
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type={passwordVisible ? 'text' : 'password'}
                      id="current-password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button type="button" onClick={togglePasswordVisibility} className="text-gray-400 hover:text-gray-500">
                        {passwordVisible ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type={passwordVisible ? 'text' : 'password'}
                      id="new-password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                    Confirm New Password
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type={passwordVisible ? 'text' : 'password'}
                      id="confirm-password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
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
                      <h3 className="text-sm font-medium text-yellow-800">Password requirements</h3>
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

              </div>

              <div className="flex justify-end pt-5">
                <button type="button" className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingPw}
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {savingPw ? 'Updating…' : 'Update Password'}
                </button>
              </div>
            </form>
          )}

          {/* --- Notifications / Privacy / Billing tabs unchanged --- */}
          {activeTab === 'notifications' && ( /* ... unchanged ... */ <div>{/* existing content */}</div> )}
          {activeTab === 'privacy' && ( /* ... unchanged ... */ <div>{/* existing content */}</div> )}
          {activeTab === 'billing' && ( /* ... unchanged ... */ <div>{/* existing content */}</div> )}
        </div>
      </div>
    </div>
  )
}
