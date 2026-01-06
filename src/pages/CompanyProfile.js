import React from 'react';
import { useParams } from 'react-router-dom';
import Header from "../components/headers/homeHeader";
import Footer from "../components/footers/homeFooter";
import '../css/header.css';
import '../css/footer.css';
import '../css/companyProfile.css';

const CompanyProfile = () => {
  const { companyName } = useParams();
  
  // Sample company data - replace with API call
  const companyData = {
    'Traffic & Barrier Solutions, LLC': {
      name: 'Traffic & Barrier Solutions, LLC',
      industry: 'Construction & Infrastructure',
      location: 'Atlanta, GA',
      employees: '50-100',
      description: 'Leading provider of traffic control and barrier solutions for construction and infrastructure projects.',
      website: 'www.trafficbarrier.com',
      jobs: ['Traffic Control Specialist', 'Project Manager', 'Safety Coordinator']
    },
    'In-Telecom': {
      name: 'In-Telecom',
      industry: 'Telecommunications',
      location: 'Multiple Locations',
      employees: '200-500',
      description: 'Innovative telecommunications solutions provider specializing in network infrastructure and communication systems.',
      website: 'www.in-telecom.com',
      jobs: ['Network Engineer', 'Telecommunications Technician', 'Systems Administrator']
    },
    'Georgia Power': {
      name: 'Georgia Power',
      industry: 'Energy & Utilities',
      location: 'Atlanta, GA',
      employees: '8,000+',
      description: 'Georgia\'s largest electric utility, providing reliable and affordable energy to millions of customers.',
      website: 'www.georgiapower.com',
      jobs: ['Electrical Engineer', 'Power Plant Operator', 'Customer Service Representative']
    }
  };

  const company = companyData[companyName] || {
    name: companyName,
    industry: 'Not specified',
    location: 'Not specified',
    employees: 'Not specified',
    description: 'Company information not available.',
    website: 'Not available',
    jobs: []
  };

  return (
    <div>
      <Header />
      <div className="company-profile-container">
        <div className="company-header">
          <h1 className="company-name">{company.name}</h1>
          <p className="company-industry">{company.industry}</p>
        </div>
        
        <div className="company-details">
          <div className="detail-item">
            <strong>Location:</strong> {company.location}
          </div>
          <div className="detail-item">
            <strong>Employees:</strong> {company.employees}
          </div>
          <div className="detail-item">
            <strong>Website:</strong> {company.website}
          </div>
        </div>

        <div className="company-description">
          <h3>About {company.name}</h3>
          <p>{company.description}</p>
        </div>

        {company.jobs.length > 0 && (
          <div className="company-jobs">
            <h3>Open Positions</h3>
            <div className="jobs-list">
              {company.jobs.map((job, index) => (
                <div key={index} className="job-item">{job}</div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CompanyProfile;
