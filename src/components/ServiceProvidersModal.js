import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getServiceDetails } from '../data/companyData';

const ServiceProvidersModal = ({ service, companies, onClose }) => {
  const navigate = useNavigate();
  
  const serviceDetails = getServiceDetails()[service] || {
    description: 'Professional service tailored to your needs.',
    requestType: 'Service Request',
    requestPrompt: 'Describe your requirements and preferred timeline'
  };

  const handleCompanyClick = (companyName) => {
    navigate(`/company/${encodeURIComponent(companyName)}`);
    onClose();
  };

  return (
    <div className="service-modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3>{service}</h3>
          <button onClick={onClose} className="close-btn">×</button>
        </div>
        
        <div className="service-description">
          <p>{serviceDetails.description}</p>
        </div>

        <div className="service-providers">
          <h4>Companies Offering This Service:</h4>
          <div className="providers-grid">
            {companies.map((company, index) => (
              <div 
                key={index} 
                className="provider-card"
                onClick={() => handleCompanyClick(company.name)}
              >
                <h5>{company.name}</h5>
                <div className="provider-info">
                  <span className="provider-location">📍 {company.location || 'Location not specified'}</span>
                  <span className="provider-phone">📞 {company.phone || 'Contact via profile'}</span>
                  <span className="provider-email">✉️ {company.email || 'Email via profile'}</span>
                </div>
                <div className="view-profile-hint">Click to view full profile →</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceProvidersModal;
