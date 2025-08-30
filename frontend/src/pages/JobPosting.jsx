import React, { useRef, useState } from 'react'
import { PlusIcon } from 'lucide-react'
import { createJob, uploadLogo } from '../api/jobs'

export function JobPosting() {
  const [submitting, setSubmitting] = useState(false)
  const [uploadingLogo, setUploadingLogo] = useState(false)
  const [msg, setMsg] = useState(null)           // { type, text }
  const [logoUrl, setLogoUrl] = useState(null)   // returned from backend
  const fileInputRef = useRef(null)

  function buildPayload(formEl) {
    const fd = new FormData(formEl)
    const min = fd.get('min-salary')
    const max = fd.get('max-salary')
    return {
      jobTitle: fd.get('job-title')?.toString().trim(),
      jobType: fd.get('job-type')?.toString().trim(),
      location: fd.get('location')?.toString().trim() || null,
      department: fd.get('department')?.toString().trim() || null,
      minSalary: min ? Number(min) : null,
      maxSalary: max ? Number(max) : null,
      hideSalary: fd.get('hide-salary') === 'on',
      description: fd.get('description')?.toString().trim(),
      companyName: fd.get('company-name')?.toString().trim(),
      companyWebsite: fd.get('company-website')?.toString().trim() || null,
      companyLogoUrl: logoUrl || null, // ✅ include uploaded URL
      companyDescription: fd.get('company-description')?.toString().trim() || null,
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const formEl = e.currentTarget
    setMsg(null)
    setSubmitting(true)
    try {
      const payload = buildPayload(formEl)
      if (!payload.jobTitle || !payload.jobType || !payload.description || !payload.companyName) {
        setMsg({ type: 'error', text: 'Please fill all required fields (*)' }); return
      }
      if (payload.minSalary != null && payload.maxSalary != null && payload.minSalary > payload.maxSalary) {
        setMsg({ type: 'error', text: 'Max salary must be >= Min salary' }); return
      }
      const created = await createJob(payload)
      setMsg({ type: 'success', text: `Job posted (ID: ${created.id}).` })
      setLogoUrl(null)
      formEl.reset()
    } catch (err) {
      const s = err?.data
      const detail = (s?.title || s?.error || (s?.errors && JSON.stringify(s.errors))) ?? err.message ?? 'Unknown error'
      setMsg({ type: 'error', text: `Failed to post job: ${detail}` })
    } finally {
      setSubmitting(false)
    }
  }

  function triggerFilePicker() {
    fileInputRef.current?.click()
  }

  async function onFileChange(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setMsg(null)
    setUploadingLogo(true)
    try {
      const { url } = await uploadLogo(file)
      setLogoUrl(url)
      setMsg({ type: 'success', text: 'Logo uploaded.' })
    } catch (err) {
      const s = err?.data
      const detail = (s?.error || s?.title || err.message) ?? 'Upload failed'
      setMsg({ type: 'error', text: `Logo upload failed: ${detail}` })
      setLogoUrl(null)
    } finally {
      setUploadingLogo(false)
      // allow selecting the same file again later
      e.target.value = ''
    }
  }

  function handleSaveDraft(e) {
    const form = e.currentTarget.closest('form')
    if (!form) return
    const payload = buildPayload(form)
    localStorage.setItem('jobPostDraft', JSON.stringify(payload))
    setMsg({ type: 'success', text: 'Draft saved locally.' })
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">Post a New Job</h1>
        <p className="mt-1 text-sm text-gray-500">Fill out the form below to create a new job listing</p>
      </div>

      {msg && (
        <div className={`mx-4 mt-4 px-4 py-2 rounded ${msg.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {msg.text}
        </div>
      )}

      <div className="px-4 py-5 sm:p-6">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Job Details</h2>
              <p className="mt-1 text-sm text-gray-500">Basic information about the position</p>
            </div>

            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="job-title" className="block text-sm font-medium text-gray-700">Job Title *</label>
                <div className="mt-1">
                  <input required type="text" name="job-title" id="job-title" placeholder="e.g. Senior Frontend Developer"
                         className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="job-type" className="block text-sm font-medium text-gray-700">Job Type *</label>
                <div className="mt-1">
                  <select required id="job-type" name="job-type"
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md">
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
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                <div className="mt-1">
                  <input type="text" name="location" id="location" placeholder="e.g. Colombo or Remote"
                         className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
                <div className="mt-1">
                  <input type="text" name="department" id="department" placeholder="e.g. Engineering"
                         className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="min-salary" className="block text-sm font-medium text-gray-700">Minimum Salary</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input type="number" step="0.01" name="min-salary" id="min-salary"
                         className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 sm:text-sm border-gray-300 rounded-md"
                         placeholder="0.00" />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="max-salary" className="block text-sm font-medium text-gray-700">Maximum Salary</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input type="number" step="0.01" name="max-salary" id="max-salary"
                         className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 sm:text-sm border-gray-300 rounded-md"
                         placeholder="0.00" />
                </div>
              </div>

              <div className="sm:col-span-6">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="hide-salary" name="hide-salary" type="checkbox"
                           className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="hide-salary" className="font-medium text-gray-700">Hide salary from job listing</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Job Description</h2>
              <p className="mt-1 text-sm text-gray-500">Provide details about the job responsibilities and requirements</p>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Job Description *</label>
              <div className="mt-1">
                <textarea required id="description" name="description" rows={6}
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="Describe the role, responsibilities, and company culture..." />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Required Skills</label>
              <div className="mt-1">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="text" className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                           placeholder="e.g. React.js" />
                    <button type="button"
                            className="ml-2 inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            onClick={() => setMsg({ type: 'success', text: 'Skills UI not implemented yet.' })}>
                      <PlusIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-500">Add the key skills required for this position</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Company Information</h2>
              <p className="mt-1 text-sm text-gray-500">Information about your company that will be displayed with the job listing</p>
            </div>

            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label htmlFor="company-name" className="block text-sm font-medium text-gray-700">Company Name *</label>
                <div className="mt-1">
                  <input required type="text" name="company-name" id="company-name"
                         className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">Company Website</label>
                <div className="mt-1">
                  <input type="url" name="company-website" id="company-website"
                         className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                         placeholder="https://" />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label className="block text-sm font-medium text-gray-700">Company Logo</label>

                {/* hidden real input */}
                <input ref={fileInputRef} type="file" accept=".png,.jpg,.jpeg,.webp" className="hidden" onChange={onFileChange} />

                <div className="mt-1 flex items-center">
                  <span className="h-12 w-12 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                    {logoUrl ? (
                      <img src={logoUrl} alt="Logo" className="h-12 w-12 object-cover" />
                    ) : (
                      <svg className="h-6 w-6 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    )}
                  </span>
                  <button type="button"
                          className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          onClick={triggerFilePicker}
                          disabled={uploadingLogo || submitting}>
                    {uploadingLogo ? 'Uploading…' : logoUrl ? 'Replace Logo' : 'Upload'}
                  </button>
                </div>

                {logoUrl && (
                  <p className="mt-2 text-sm text-gray-500 break-all">Using: {logoUrl}</p>
                )}
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="company-description" className="block text-sm font-medium text-gray-700">Company Description</label>
                <div className="mt-1">
                  <textarea id="company-description" name="company-description" rows={3}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            placeholder="Brief description of your company..." />
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 -mx-4 -mb-5 sm:mx-0 sm:mb-0 rounded-b-lg">
            <button type="button" onClick={handleSaveDraft}
                    className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-3"
                    disabled={submitting || uploadingLogo}>
              Save as Draft
            </button>
            <button type="submit"
                    className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                      submitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                    disabled={submitting || uploadingLogo}>
              {submitting ? 'Posting…' : 'Post Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
