// EmployerApplications.jsx
import React, { useEffect, useState } from 'react';
import { MapPin, Clock, User2 } from 'lucide-react';
import { Link } from 'react-router-dom';

import {
  getMyEmployerApplications,
  getApplicationById as fetchApplicationById,
} from '../api/jobs';

export default function EmployerApplications({ companyName, jobId }) {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openId, setOpenId] = useState(null);
  const [detail, setDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  // DEV: replace with a real id or pull from your auth/user store
  const employerUserId = 1;

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await getMyEmployerApplications(employerUserId);
        setApps(Array.isArray(data) ? data : (data.items || []));
      } catch (e) {
        setError(e.message || 'Failed to load applications');
      } finally {
        setLoading(false);
      }
    })();
  }, [employerUserId]); // optionally add companyName/jobId if you want a refresh on those

  async function openDetails(id) {
    setOpenId(id);
    setDetail(null);
    setDetailLoading(true);
    try {
      const full = await fetchApplicationById(id);
      setDetail(full);
    } catch (e) {
      setDetail({ __error: e.message || 'Failed to load application' });
    } finally {
      setDetailLoading(false);
    }
  }

  const fmtDate = (d) => {
    try { return new Date(d).toLocaleDateString(); } catch { return '—'; }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Applications</h2>

      {loading && <div>Loading…</div>}
      {error && <div className="text-red-600">{error}</div>}

      {!loading && !error && apps.length === 0 && (
        <div className="text-gray-500">No applications yet.</div>
      )}

      {!loading && !error && apps.length > 0 && (
        <div className="divide-y divide-gray-200">
          {apps.map(a => {
            const applied = a.appliedDate ?? a.appliedDateUtc;
            return (
              <div key={a.id} className="py-4 flex items-center justify-between">
                <div className="min-w-0">
                  <div className="font-medium text-gray-900">{a.jobTitle}</div>
                  <div className="text-sm text-gray-600">
                    <span className="inline-flex items-center mr-3">
                      <User2 className="h-4 w-4 mr-1" />{a.applicantName}
                    </span>
                    <span className="inline-flex items-center mr-3">
                      <MapPin className="h-4 w-4 mr-1" />{a.location}
                    </span>
                    <span className="inline-flex items-center">
                      <Clock className="h-4 w-4 mr-1" />{fmtDate(applied)}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {a.applicantEmail} · {a.applicantPhone}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    to={`/view-job/${a.jobId}`}
                    className="px-3 py-1.5 text-sm rounded-md border border-gray-300 hover:bg-gray-50"
                  >
                    View Job
                  </Link>
                  <button
                    onClick={() => openDetails(a.id)}
                    className="px-3 py-1.5 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700"
                  >
                    View
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {openId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpenId(null)} />
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Application Details</h3>
              <button onClick={() => setOpenId(null)} className="text-gray-500 hover:text-gray-800">✕</button>
            </div>

            {detailLoading && <div>Loading…</div>}
            {!detailLoading && detail?.__error && <div className="text-red-600">{detail.__error}</div>}

            {!detailLoading && detail && !detail.__error && (
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500">Job</div>
                  <div className="font-medium">
                    {detail.job?.jobTitle ?? ''} — {detail.job?.companyName ?? ''}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="Full name" value={detail.fullName} />
                  <Field label="Email" value={detail.email} />
                  <Field label="Phone" value={detail.phone} />
                  <Field label="Applied on" value={new Date(detail.appliedDateUtc).toLocaleString()} />
                  <Field label="Address" value={detail.address} className="md:col-span-2" />
                </div>

                {detail.coverLetter && (
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Cover letter</div>
                    <div className="whitespace-pre-wrap text-gray-800 border rounded-md p-3 bg-gray-50">
                      {detail.coverLetter}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button onClick={() => setOpenId(null)} className="px-4 py-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, value, className = '' }) {
  return (
    <div className={className}>
      <div className="text-sm text-gray-500">{label}</div>
      <div className="font-medium text-gray-900 break-words">{value || '—'}</div>
    </div>
  );
}
