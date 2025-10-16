// EmployerDashboard.jsx
import EmployerApplications from './EmployerApplications';

export function EmployerDashboard() {
  // Pull the company name from the logged-in employer’s profile
  // (temporarily hard-code to test)
  const companyName = 'Acme Inc';

  return (
    <div className="max-w-6xl mx-auto">
      {/* other cards */}
      <EmployerApplications companyName={companyName} />
    </div>
  );
}
