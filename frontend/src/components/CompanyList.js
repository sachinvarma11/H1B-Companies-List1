import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/companies')
      .then(response => {
        setCompanies(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching companies:', error);
        setError('Error fetching companies. Please try again later.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="company-list">
      <h2>H1B Sponsoring Companies</h2>
      <table>
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Fiscal Year</th>
            <th>Initial Approvals</th>
            <th>Initial Denials</th>
            <th>Continuing Approvals</th>
            <th>Continuing Denials</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company, index) => (
            <tr key={index}>
              <td>{company.name}</td>
              <td>{company.fiscalYear}</td>
              <td>{company.initialApprovals}</td>
              <td>{company.initialDenials}</td>
              <td>{company.continuingApprovals}</td>
              <td>{company.continuingDenials}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CompanyList;
