import React, { useState } from 'react';
import { getServiceDetails } from '../data/companyData';

const ServiceRequestModal = ({ service, companies, onClose }) => {
  const [selectedCompany, setSelectedCompany] = useState('');
  const [requestDetails, setRequestDetails] = useState('');
  const [contactInfo, setContactInfo] = useState({ name: '', email: '', phone: '' });

  const serviceDetails = getServiceDetails()[service] || {
    description: 'Professional service tailored to your needs.',
    requestType: 'Service Request',
    requestPrompt: 'Describe your requirements and preferred timeline'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`${serviceDetails.requestType} submitted successfully! We'll contact you soon.`);
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
          <h4>Available Providers:</h4>
          <div className="providers-list">
            {companies.map((company, index) => (
              <span key={index} className="provider-tag">{company.name}</span>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="request-form">
          <h4>Submit {serviceDetails.requestType}</h4>
          
          <select 
            value={selectedCompany} 
            onChange={(e) => setSelectedCompany(e.target.value)}
            required
          >
            <option value="">Select a provider</option>
            {companies.map((company, index) => (
              <option key={index} value={company.name}>{company.name}</option>
            ))}
          </select>

          <input 
            type="text" 
            placeholder="Full Name"
            value={contactInfo.name}
            onChange={(e) => setContactInfo({...contactInfo, name: e.target.value})}
            required 
          />
          
          <input 
            type="email" 
            placeholder="Email"
            value={contactInfo.email}
            onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
            required 
          />
          
          <input 
            type="tel" 
            placeholder="Phone"
            value={contactInfo.phone}
            onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
            required 
          />

          <textarea 
            placeholder={serviceDetails.requestPrompt}
            value={requestDetails}
            onChange={(e) => setRequestDetails(e.target.value)}
            rows="4"
            required
          />

          <div className="form-buttons">
            <button type="submit">Submit {serviceDetails.requestType}</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceRequestModal;
