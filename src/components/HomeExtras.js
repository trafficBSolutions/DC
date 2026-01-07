import React, { useState } from 'react';

// Newsletter Signup Component
export const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Subscribed successfully!');
    setEmail('');
  };

  return (
    <div className="newsletter-section">
      <h3 className="section-title">Stay Connected</h3>
      <p>Get the latest job opportunities and industry insights</p>
      <form onSubmit={handleSubmit} className="newsletter-form">
        <input 
          type="email" 
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Subscribe</button>
      </form>
    </div>
  );
};

// Industry Focus Component
export const IndustryFocus = () => {
  const industries = [
    { name: 'Technology', icon: '💻', count: '2.5K+' },
    { name: 'Healthcare', icon: '🏥', count: '1.8K+' },
    { name: 'Finance', icon: '💰', count: '1.2K+' },
    { name: 'Construction', icon: '🏗️', count: '950+' },
    { name: 'Energy', icon: '⚡', count: '750+' },
    { name: 'Education', icon: '🎓', count: '650+' }
  ];

  return (
    <div className="industry-section">
      <h3 className="section-title">Industries We Serve</h3>
      <div className="industry-grid">
        {industries.map((industry, index) => (
          <div key={index} className="industry-card">
            <div className="industry-icon">{industry.icon}</div>
            <h4>{industry.name}</h4>
            <span className="job-count">{industry.count} jobs</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Recent Activity Component
export const RecentActivity = () => {
  const activities = [
    'John D. placed at Tech Corp as Senior Developer',
    'Sarah M. hired by StartupXYZ as Product Manager', 
    'Mike R. joined HealthCare Inc. as Data Analyst',
    'Lisa K. placed at Energy Solutions as Engineer'
  ];

  return (
    <div className="activity-section">
      <h3 className="section-title">Recent Placements</h3>
      <div className="activity-ticker">
        {activities.map((activity, index) => (
          <div key={index} className="activity-item">
            <span className="activity-dot"></span>
            {activity}
          </div>
        ))}
      </div>
    </div>
  );
};
