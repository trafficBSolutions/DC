import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../components/headers/homeHeader";
import Footer from "../components/footers/homeFooter";
//import AIMatchingDemo from "../components/AIMatchingDemo";
import { getAllJobListings, getCompanyNames, getCategorizedServiceTypes, getCompaniesByService } from '../data/companyData';
import ServiceProvidersModal from '../components/ServiceProvidersModal';
import '../css/header.css';
import '../css/home.css';
import '../css/footer.css';
import images from "../utils/images";
const Home = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState(null);
  const [serviceResults, setServiceResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [currentService, setCurrentService] = useState('');
  const [serviceProviders, setServiceProviders] = useState([]);

  // Sample data - replace with actual data from your API
  const serviceCategories = getCategorizedServiceTypes();
  const data = {
    'Company List': getCompanyNames(),
    'Job Listings': getAllJobListings().map(job => `${job.title} - ${job.company}`),
    'Service Types': Object.keys(serviceCategories)
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setSearchTerm('');
    setFilteredResults(data[category]);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (activeCategory && term) {
      const filtered = data[activeCategory].filter(item => 
        item.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredResults(filtered);
    } else if (activeCategory) {
      setFilteredResults(data[activeCategory]);
    }
  };

  const handleItemClick = (item) => {
    if (activeCategory === 'Company List') {
      navigate(`/company/${encodeURIComponent(item)}`);
    } else if (activeCategory === 'Service Types') {
      setSelectedService(item);
      const services = serviceCategories[item] || [];
      setServiceResults(services);
    }
  };

  const handleServiceClick = (service) => {
    const companies = getCompaniesByService(service).map(company => ({
      name: company.name,
      location: 'Calhoun, GA', // You can enhance this with actual location data
      phone: 'Contact via profile',
      email: 'Email via profile'
    }));
    setCurrentService(service);
    setServiceProviders(companies);
    setShowServiceModal(true);
    setSelectedService(null);
    setServiceResults([]);
  };

  return (
    <div>
      <Header />
      <div className="home-container">
        <video className="home-video" autoPlay loop muted playsInline>
          <source type="video/mp4" src={images["connection.mp4"]} className="video" autoPlay loop muted />
        </video>
        <div className="logo-container">
          <div className="logo-container-inner">
          <img src={images["connection.svg"]} alt="Direct Connection Logo" className="home-logo" />
          <p className="logo-subtitle">Bridging the Gap Between Talent and Opportunity</p>
          </div>
        </div>
      </div>
      <div className="home-info-section">
        <h2 className="info-headline">Connecting Skilled Professionals with Top Employers</h2>
        <p className="info-paragraph">At Direct Connection, we specialize in linking talented individuals with leading companies across various industries. Our mission is to create meaningful connections that drive career growth and business success. Whether you're a job seeker looking for your next opportunity or an employer seeking top talent, Direct Connection is your trusted partner in the hiring process.</p>
      </div>
      <div className="search-container">
        <div className="category-buttons">
          {Object.keys(data).map(category => (
            <button 
              key={category}
              className={`category-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
        {activeCategory && (
          <div className="search-section">
            <input 
              className="search-input" 
              type="text" 
              placeholder={`Search ${activeCategory.toLowerCase()}...`}
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <div className="results-container">
              {selectedService ? (
                serviceResults.map((service, index) => (
                  <div 
                    key={index} 
                    className="result-item clickable"
                    onClick={() => handleServiceClick(service)}
                  >
                    {service}
                  </div>
                ))
              ) : (
                filteredResults.map((item, index) => (
                  <div 
                    key={index} 
                    className={`result-item ${activeCategory === 'Company List' || activeCategory === 'Service Types' ? 'clickable' : ''}`}
                    onClick={() => handleItemClick(item)}
                  >
                    {item}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
      
      {/*<AIMatchingDemo />
      
      <div className="testimonials-section">
        <h3 className="section-title">Success Stories</h3>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="quote">"Direct Connection found me the perfect role in just 2 weeks. Their AI matching is incredible!"</div>
            <div className="author">- Sarah M., Software Engineer</div>
          </div>
          <div className="testimonial-card">
            <div className="quote">"We've hired 15 top candidates through Direct Connection. Game changer for our recruiting."</div>
            <div className="author">- Mike R., HR Director</div>
          </div>
        </div>
      </div>
      
      <div className="cta-section">
        <h3 className="cta-title">Ready to Connect?</h3>
        <p className="cta-subtitle">Join thousands of professionals finding their perfect match</p>
        <div className="cta-buttons">
          <button className="cta-btn primary">Find Jobs</button>
          <button className="cta-btn secondary">Post a Job</button>
        </div>
      </div>
      
      <div className="stats-section">
        <div className="stat-item">
          <div className="stat-number">500+</div>
          <div className="stat-label">Companies Connected</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">10K+</div>
          <div className="stat-label">Jobs Filled</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">95%</div>
          <div className="stat-label">Success Rate</div>
        </div>
      </div>

      <div className="features-section">
        <h3 className="features-title">Why Choose Direct Connection</h3>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h4>Targeted Matching</h4>
            <p>AI-powered algorithms match candidates with perfect-fit opportunities</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h4>Fast Placement</h4>
            <p>Average placement time of 2 weeks with our streamlined process</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h4>Verified Companies</h4>
            <p>All partner companies are thoroughly vetted and certified</p>
          </div>
        </div>
      </div>
*/}
      {showServiceModal && (
        <ServiceProvidersModal 
          service={currentService}
          companies={serviceProviders}
          onClose={() => setShowServiceModal(false)}
        />
      )}
      
      <Footer />
    </div>
  );
};
export default Home;
