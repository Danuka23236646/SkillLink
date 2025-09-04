import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileTextIcon, MapPin, Clock } from 'lucide-react';
import { getMyApplications } from '../api/jobs';

export function Applications() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        // If your API needs an email or flag, pass it here, e.g. { mine: 'true' } or { email: 'user@example.com' }
        const data = await getMyApplications();
        setApps(Array.isArray(data) ? data : (data.items || []));
      } catch (e) {
        setError(e.message || 'Failed to load applications');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Applications</h1>

      {loading && <div>Loading…</div>}
      {error && <div className="text-red-600">{error}</div>}

      {!loading && !error && (!apps || apps.length === 0) && (
        <div className="py-12 text-center text-gray-500">
          <div className="flex justify-center mb-3">
            <div className="bg-blue-100 rounded-full p-3">
              <FileTextIcon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          No applications yet.
        </div>
      )}

      {!loading && !error && apps?.length > 0 && (
        <div className="space-y-4">
          {apps.map(a => (
            <div key={a.id} className="bg-white rounded-lg shadow-sm p-4 flex justify-between items-center">
              <div>
                <div className="font-medium text-gray-900">{a.jobTitle}</div>
                <div className="text-sm text-gray-600">
                  {a.company} · <span className="inline-flex items-center"><MapPin className="h-4 w-4 mr-1" />{a.location}</span>
                </div>
                <div className="text-xs text-gray-500 inline-flex items-center mt-1">
                  <Clock className="h-3.5 w-3.5 mr-1" />Applied {new Date(a.appliedDate || a.appliedDateUtc || Date.now()).toLocaleDateString()}
                </div>
              </div>
              <Link to={`/view-job/${a.jobId}`} className="text-blue-600 hover:text-blue-800 text-sm">
                View Job
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
