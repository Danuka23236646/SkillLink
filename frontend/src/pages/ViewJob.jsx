import React, { useEffect, useMemo, useState } from 'react'
import { useLocation, useParams, Link, useNavigate } from 'react-router-dom'
import { getJobById, applyToJob } from '../api/jobs'
import { MapPin, Briefcase, DollarSignIcon, Clock, ArrowLeft } from 'lucide-react'

export function ViewJob() {
  const { id } = useParams()
  const nav = useNavigate()
  const { state } = useLocation()
  const preload = state?.preload ?? null

  const [job, setJob] = useState(preload)
  const [loading, setLoading] = useState(!preload)
  const [error, setError] = useState(null)
  const [applyOpen, setApplyOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    let ignore = false
    if (preload) return // already have something to show; still fetch fresh below
    ;(async () => {
      try {
        setLoading(true)
        const data = await getJobById(id)
        if (!ignore) setJob(mapToUi(data))
      } catch (e) {
        if (!ignore) setError(e.message || 'Could not load job')
      } finally {
        if (!ignore) setLoading(false)
      }
    })()
    return () => { ignore = true }
  }, [id])

  // also refetch to refresh the preloaded job
  useEffect(() => {
    let ignore = false
    ;(async () => {
      try {
        const data = await getJobById(id)
        if (!ignore) setJob(mapToUi(data))
      } catch {}
    })()
    return () => { ignore = true }
  }, [id])

  function mapToUi(j) {
    // align with your backend fields
    return {
      id: j.id,
      title: j.jobTitle,
      description: j.description,
      requirements: j.requirements || '',
      responsibilities: j.responsibilities || '',
      location: j.location || 'Remote',
      type: j.jobType ? j.jobType[0].toUpperCase() + j.jobType.slice(1) : '—',
      minSalary: j.minSalary,
      maxSalary: j.maxSalary,
      hideSalary: !!j.hideSalary,
      companyName: j.companyName,
      companyId: j.companyId, // make sure backend returns this
      companyLogoUrl: j.companyLogoUrl || null,
      createdUtc: j.createdUtc || j.updatedUtc,
    }
  }

  const salary = useMemo(() => {
    if (!job) return '—'
    if (job.hideSalary) return 'Not disclosed'
    const n = v => typeof v === 'number' && !Number.isNaN(v)
    if (n(job.minSalary) && n(job.maxSalary)) return `$${job.minSalary.toLocaleString()} - $${job.maxSalary.toLocaleString()}`
    if (n(job.minSalary)) return `From $${job.minSalary.toLocaleString()}`
    if (n(job.maxSalary)) return `Up to $${job.maxSalary.toLocaleString()}`
    return '—'
  }, [job])

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

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <button onClick={() => nav(-1)} className="mb-4 inline-flex items-center text-gray-600 hover:text-gray-900">
        <ArrowLeft className="h-4 w-4 mr-1" /> Back
      </button>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">
            {loading ? 'Loading…' : error ? 'Error' : job?.title}
          </h1>
          {!loading && !error && (
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-600">
              <span className="flex items-center"><Briefcase className="h-4 w-4 mr-1" />{job.type}</span>
              <span className="flex items-center"><MapPin className="h-4 w-4 mr-1" />{job.location}</span>
              <span className="flex items-center"><DollarSignIcon className="h-4 w-4 mr-1" />{salary}</span>
              <span className="flex items-center"><Clock className="h-4 w-4 mr-1" />{timeAgo(job.createdUtc)}</span>
            </div>
          )}
        </div>

        {error && <div className="p-6 text-red-600">{error}</div>}

        {!loading && !error && (
          <>
            <div className="p-6 grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <section>
                  <h2 className="font-semibold text-gray-900 mb-2">Job Description</h2>
                  <p className="text-gray-700 whitespace-pre-line">{job.description || '—'}</p>
                </section>

                {job.responsibilities && (
                  <section>
                    <h2 className="font-semibold text-gray-900 mb-2">Responsibilities</h2>
                    <p className="text-gray-700 whitespace-pre-line">{job.responsibilities}</p>
                  </section>
                )}

                {job.requirements && (
                  <section>
                    <h2 className="font-semibold text-gray-900 mb-2">Requirements</h2>
                    <p className="text-gray-700 whitespace-pre-line">{job.requirements}</p>
                  </section>
                )}
              </div>

              <aside className="md:col-span-1">
                <div className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                      {job.companyLogoUrl
                        ? <img src={job.companyLogoUrl} alt={`${job.companyName} logo`} className="h-full w-full object-cover" />
                        : <span className="text-xs text-gray-400 px-1">No Logo</span>}
                    </div>
                    <div className="ml-3">
                      <div className="font-medium text-gray-900">{job.companyName}</div>
                      {/* “View Company” goes to your existing company route */}
                      <Link
                        to={`/company/${job.companyId || job.companyName}`}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        View Company
                      </Link>
                    </div>
                  </div>

                  <button
                    onClick={() => setApplyOpen(true)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-md text-sm font-medium"
                  >
                    Apply Job
                  </button>

                  {msg && <div className="text-green-600 text-sm">{msg}</div>}
                </div>
              </aside>
            </div>
          </>
        )}
      </div>

      {/* Apply Job Modal */}
      {applyOpen && (
        <ApplyJobModal
          onClose={() => setApplyOpen(false)}
          onSubmit={async (values) => {
            try {
              setSubmitting(true)
              setMsg('')
              await applyToJob(job.id, values)
              setMsg('Application submitted successfully!')
              nav('/applications'); // <-- send them to the Applications page
              setApplyOpen(false)
            } catch (e) {
              setMsg(e.message || 'Failed to submit application')
            } finally {
              setSubmitting(false)
            }
          }}
          submitting={submitting}
        />
      )}
    </div>
  )
}

/** Simple modal component in the same file for brevity */
function ApplyJobModal({ onClose, onSubmit, submitting }) {
  const [form, setForm] = useState({
    fullName: '',
    address: '',
    phone: '',
    email: '',
    coverLetter: '',
  })
  const [errors, setErrors] = useState({})

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  function validate() {
    const e = {}
    if (!form.fullName.trim()) e.fullName = 'Required'
    if (!form.address.trim()) e.address = 'Required'
    if (!/^\+?\d[\d\s\-]{6,}$/.test(form.phone)) e.phone = 'Enter a valid phone'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    setErrors(e)
    return !Object.keys(e).length
  }

  async function submit(e) {
    e.preventDefault()
    if (!validate()) return
    await onSubmit(form)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Apply for this job</h3>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full name</label>
            <input className="mt-1 w-full border rounded-md px-3 py-2"
                   value={form.fullName} onChange={update('fullName')} />
            {errors.fullName && <p className="text-red-600 text-sm">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input className="mt-1 w-full border rounded-md px-3 py-2"
                   value={form.address} onChange={update('address')} />
            {errors.address && <p className="text-red-600 text-sm">{errors.address}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input className="mt-1 w-full border rounded-md px-3 py-2"
                     value={form.phone} onChange={update('phone')} />
              {errors.phone && <p className="text-red-600 text-sm">{errors.phone}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input className="mt-1 w-full border rounded-md px-3 py-2"
                     value={form.email} onChange={update('email')} />
              {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Cover letter (optional)</label>
            <textarea className="mt-1 w-full border rounded-md px-3 py-2" rows="4"
                      value={form.coverLetter} onChange={update('coverLetter')} />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button type="button" onClick={onClose}
                    className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" disabled={submitting}
                    className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60">
              {submitting ? 'Submitting…' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
