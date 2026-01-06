import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../components/headers/homeHeader";
import Footer from "../components/footers/homeFooter";
import '../css/header.css';
import '../css/home.css';
import '../css/footer.css';
import images from "../utils/images";
const Home = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  // Sample data - replace with actual data from your API
  const data = {
    'Company List': ['Traffic & Barrier Solutions, LLC', 'In-Telecom', 'Georgia Power', 'Apple', 'Facebook', 'Netflix', 'Tesla', 'Uber'].sort(),
    'Job Listings': ['Software Engineer', 'Data Scientist', 'Product Manager', 'UX Designer', 'Marketing Manager', 'Sales Representative', 'DevOps Engineer', 'Business Analyst'].sort(),
    'Service Types': ['Consulting', 'Development', 'Design', 'Marketing', 'Support', 'Training', 'Analytics', 'Strategy'].sort()
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
    }
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
              {filteredResults.map((item, index) => (
                <div 
                  key={index} 
                  className={`result-item ${activeCategory === 'Company List' ? 'clickable' : ''}`}
                  onClick={() => handleItemClick(item)}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};
export default Home;
