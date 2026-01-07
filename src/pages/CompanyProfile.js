import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from "../components/headers/homeHeader";
import Footer from "../components/footers/homeFooter";
import '../css/header.css';
import '../css/footer.css';
import '../css/companyProfile.css';

const CompanyProfile = () => {
  const { companyName } = useParams();
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState('');
  
  // Sample company data - replace with API call
  const companyData = {
    'Traffic & Barrier Solutions, LLC': {
      name: 'Traffic & Barrier Solutions, LLC',
      industry: 'Construction & Infrastructure',
      location: 'Calhoun, GA',
      employees: '50-100',
      description: 'Leading provider of traffic control and barrier solutions for construction and infrastructure projects.',
      website: 'www.trafficbarriersolutions.com',
      jobs: [
        { title: 'Traffic Control Specialist', description: 'Manage traffic flow and safety protocols on construction sites. Requires certification and 2+ years experience.' },
        { title: 'Traffic Control Team Member', description: 'Support traffic control operations and maintain safety equipment. Entry-level position with training provided.' },
        { title: 'Driver', description: 'Transport equipment and materials to job sites. CDL required with clean driving record.' }
      ],
      applicationType: 'form',
      businessSummary: 'Established leader in traffic management solutions serving the Southeast region with comprehensive safety services.',
      certifiedFields: ['Traffic Control', 'Highway Safety', 'Construction Zone Management', 'Emergency Response'],
      licenseContact: {
        license: 'GA Construction License #12345',
        phone: '(706) 263-0175',
        email: 'tbsolutions3@gmail.com'
      },
      services: ['Traffic Control Plans', 'Bollard/Wheel Stop Installation', 'Flagging Services', 'Equipment Rental', 'Safety Training'],
      yearsInBusiness: 6,
      capabilityStatement: 'Certified traffic control company with 15 years of experience managing complex construction projects. Specialized in highway work zones, emergency response, and large-scale infrastructure projects with proven safety record.'
    },
    'In-Telecom': {
      name: 'In-Telecom',
      industry: 'Telecommunications',
      location: 'Multiple Locations',
      employees: '200-500',
      description: 'Innovative telecommunications solutions provider specializing in network infrastructure and communication systems.',
      website: 'www.in-telecom.com',
      jobs: [
        { title: 'Network Engineer', description: 'Design and maintain telecommunications networks. Requires CCNA certification and 3+ years experience.' },
        { title: 'Telecommunications Technician', description: 'Install and repair communication equipment. Technical certification preferred.' },
        { title: 'Systems Administrator', description: 'Manage IT infrastructure and network systems. Bachelor\'s degree in IT required.' }
      ],
      applicationType: 'external',
      businessSummary: 'Premier telecommunications provider delivering cutting-edge network solutions across multiple markets.',
      certifiedFields: ['Network Infrastructure', 'Fiber Optics', 'Wireless Communications', 'VoIP Systems'],
      licenseContact: {
        license: 'FCC License #67890',
        phone: '(404) 555-0456',
        email: 'careers@in-telecom.com'
      },
      services: ['Network Design', 'Fiber Installation', 'Wireless Solutions', 'VoIP Services', 'Technical Support'],
      yearsInBusiness: 22,
      capabilityStatement: 'Leading telecommunications contractor with 22 years of experience in complex network deployments. Expertise in fiber optic installations, wireless networks, and enterprise communication solutions.'
    },
    'Georgia Power': {
      name: 'Georgia Power',
      industry: 'Energy & Utilities',
      location: 'Atlanta, GA',
      employees: '8,000+',
      description: 'Georgia\'s largest electric utility, providing reliable and affordable energy to millions of customers.',
      website: 'www.georgiapower.com',
      jobs: [
        { title: 'Electrical Engineer', description: 'Design and maintain electrical systems. PE license and 5+ years experience required.' },
        { title: 'Power Plant Operator', description: 'Monitor and control power generation equipment. Specialized training and certification required.' },
        { title: 'Customer Service Representative', description: 'Assist customers with billing and service inquiries. Strong communication skills required.' }
      ],
      applicationType: 'external',
      businessSummary: 'Georgia\'s premier electric utility serving 2.6 million customers with reliable, clean energy solutions.',
      certifiedFields: ['Electrical Generation', 'Power Distribution', 'Renewable Energy', 'Grid Management'],
      licenseContact: {
        license: 'GA PSC Certificate #11111',
        phone: '(800) 555-7777',
        email: 'hr@georgiapower.com'
      },
      services: ['Electricity Generation', 'Power Distribution', 'Energy Efficiency', 'Renewable Energy', 'Grid Modernization'],
      yearsInBusiness: 95,
      capabilityStatement: 'Leading electric utility with 95 years of reliable service. Expertise in power generation, transmission, and distribution with commitment to clean energy and grid modernization.'
    },
    'CSTE Inc.': {
      name: 'CSTE Inc.',
      industry: 'Energy & Utilities',
      location: 'Marietta, GA',
      employees: '500+',
      description: 'CSTE Inc. is a utility infrastructure company focused on construction, logistics, hauling & material management needs.',
      website: 'www.csteinc.com',
      jobs: [
        { title: 'Concrete Mixer Operator', description: 'Operate concrete mixers and maintain equipment. PE license and 5+ years experience required.' },
        { title: 'Truck Driver', description: 'Drive trucks for hauling and material management. Specialized training and certification required.' },
        { title: 'Customer Service Representative', description: 'Assist customers with billing and service inquiries. Strong communication skills required.' }
      ],
      applicationType: 'external',
      businessSummary: 'With a commitment to excellence and a reputation for reliability, we specialize in providing a seamless, end-to-end service that ensures the smoothest transportation and construction processes. From logistics planning to on-site execution, CSTE Inc. is your trusted partner in utility infrastructure solutions.',
      certifiedFields: ['Concrete Mixing', 'Material Hauling', 'Logistics Planning', 'Utility Infrastructure'],
      licenseContact: {
        license: 'GA PSC Certificate #11111',
        phone: '(470) 708-0993',
        email: 'Jerry@csteinc.com'
      },
      services: ['Concrete Mixing', 'Material Hauling', 'Logistics Planning', 'Utility Infrastructure'],
      yearsInBusiness: 95,
      capabilityStatement: 'CSTE Inc. is a utility infrastructure company with extensive experience in construction, logistics, hauling, and material management. We pride ourselves on delivering reliable and efficient services to meet the diverse needs of our clients.'
    },
    'Southern Company': {
      name: 'Southern Company',
      industry: 'Energy & Utilities',
      location: 'Marietta, GA',
      employees: '500+',
      description: 'Southern Company is a major utility company focused on electricity generation and distribution.',
      website: 'www.southerncompany.com',
      jobs: [
        { title: 'Gas Plant Operator', description: 'Operate gas plants and maintain equipment. PE license and 5+ years experience required.' },
        { title: 'Gas line Operator', description: 'Operate gas lines and maintain equipment. Specialized training and certification required.' },
        { title: 'Customer Service Representative', description: 'Assist customers with billing and service inquiries. Strong communication skills required.' }
      ],
      applicationType: 'external',
      businessSummary: 'With a commitment to excellence and a reputation for reliability, we specialize in providing a seamless, end-to-end service that ensures the smoothest transportation and construction processes. From logistics planning to on-site execution, CSTE Inc. is your trusted partner in utility infrastructure solutions.',
      certifiedFields: ['Gas Plant Operations', 'Gas Line Operations', 'Power Distribution', 'Renewable Energy', 'Grid Modernization'],
      licenseContact: {
        license: 'GA PSC Certificate #11111',
        phone: '(470) 580-8777',
        email: 'dylasmit@southernco.com'
      },
      services: ['Gas Plant Operations', 'Gas Line Operations', 'Power Distribution', 'Renewable Energy', 'Grid Modernization'],
      yearsInBusiness: 95,
      capabilityStatement: 'Southern Company is a major utility company with extensive experience in electricity generation and distribution. We pride ourselves on delivering reliable and efficient services to meet the diverse needs of our clients.'
    },
    'The Surface Masters': {
      name: 'The Surface Masters',
      industry: 'Construction & Infrastructure',
      location: 'Atlanta, GA',
      employees: '100-200',
      description: 'The Surface Masters is a leading provider of pavement maintenance and repair solutions.',
      website: 'www.thesurfacemasters.com',
      jobs: [
        { title: 'Pavement Maintenance Technician', description: 'Perform pavement maintenance and repair tasks. Requires experience in asphalt and concrete work.' },
        { title: 'Equipment Operator', description: 'Operate heavy machinery for pavement projects. CDL preferred.' },
        { title: 'Project Manager', description: 'Oversee pavement maintenance projects. Strong organizational skills required.' }
      ],
      applicationType: 'form',
      businessSummary: 'The Surface Masters has been providing top-quality pavement maintenance and repair services for over 20 years, serving commercial and municipal clients across the region.',
      certifiedFields: ['Asphalt Repair', 'Concrete Maintenance', 'Sealcoating', 'Pavement Marking'],
      licenseContact: {
        license: 'GA Construction License #54321',
        phone: '(770) 555-1234',
        email: 'KtF9o@example.com'
      },
      services: ['Asphalt Repair', 'Concrete Maintenance', 'Sealcoating', 'Pavement Marking'],
      yearsInBusiness: 20,  
      capabilityStatement: 'Experienced pavement maintenance company specializing in asphalt and concrete repair, sealcoating, and pavement marking. Committed to quality workmanship and customer satisfaction.'
    }
  }
  

  const company = companyData[companyName] || {
    name: companyName,
    industry: 'Not specified',
    location: 'Not specified',
    employees: 'Not specified',
    description: 'Company information not available.',
    website: 'Not available',
    jobs: [],
    applicationType: 'form',
    businessSummary: 'Information not available',
    certifiedFields: [],
    licenseContact: { license: 'N/A', phone: 'N/A', email: 'N/A' },
    services: [],
    yearsInBusiness: 0,
    capabilityStatement: 'Information not available'
  };

  const handleJobClick = (job) => {
    if (company.applicationType === 'form') {
      setSelectedJob(job.title);
      setShowApplicationForm(true);
    } else {
      window.open(`https://${company.website}/careers`, '_blank');
    }
  };

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    // Handle form submission here
    alert('Application submitted successfully!');
    setShowApplicationForm(false);
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
            <strong>Years in Business:</strong> {company.yearsInBusiness}
          </div>
          <div className="detail-item">
            <strong>Website:</strong> {company.website}
          </div>
        </div>

        <div className="company-description">
          <h3>Business Summary</h3>
          <p>{company.businessSummary}</p>
        </div>

        <div className="company-section">
          <h3>Certified Fields</h3>
          <div className="tags-container">
            {company.certifiedFields.map((field, index) => (
              <span key={index} className="tag">{field}</span>
            ))}
          </div>
        </div>

        <div className="company-section">
          <h3>Services</h3>
          <div className="services-grid">
            {company.services.map((service, index) => (
              <div key={index} className="service-item">{service}</div>
            ))}
          </div>
        </div>

        <div className="company-section">
          <h3>License & Contact Information</h3>
          <div className="contact-info">
            <div><strong>License:</strong> {company.licenseContact.license}</div>
            <div><strong>Phone:</strong> {company.licenseContact.phone}</div>
            <div><strong>Email:</strong> {company.licenseContact.email}</div>
          </div>
        </div>

        <div className="company-section">
          <h3>Capability Statement</h3>
          <p>{company.capabilityStatement}</p>
        </div>

        {company.jobs.length > 0 && (
          <div className="company-jobs">
            <h3>Job Listings</h3>
            <div className="jobs-list">
              {company.jobs.map((job, index) => (
                <div key={index} className="job-card">
                  <div className="job-header" onClick={() => handleJobClick(job)}>
                    <h4>{job.title}</h4>
                    <span className="apply-hint">
                      {company.applicationType === 'form' ? 'Click to apply' : 'Apply on website'}
                    </span>
                  </div>
                  <p className="job-description">{job.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {showApplicationForm && (
          <div className="application-modal">
            <div className="modal-content">
              <h3>Apply for {selectedJob}</h3>
              <form onSubmit={handleSubmitApplication}>
                <input type="text" placeholder="Full Name" required />
                <input type="email" placeholder="Email" required />
                <input type="tel" placeholder="Phone" required />
                <textarea placeholder="Cover Letter" rows="4" required></textarea>
                <input type="file" accept=".pdf,.doc,.docx" />
                <div className="form-buttons">
                  <button type="submit">Submit Application</button>
                  <button type="button" onClick={() => setShowApplicationForm(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CompanyProfile;
