import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPublicEmployerProfile } from "../api/employerProfiles";

export function CompanyProfile() {
  const { companyId } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    getPublicEmployerProfile(companyId)
      .then(setCompany)
      .catch(() => setCompany(null));
  }, [companyId]);

  if (!company) return <div>Loading or not found...</div>;

  return (
    <div>
      <h1>{company.CompanyName}</h1>
      <p>{company.AboutCompany}</p>
      {/* Add more fields as needed */}
    </div>
  );
}