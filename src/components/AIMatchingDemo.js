import React, { useState } from 'react';
import AIMatchingService from '../services/AIMatchingService';

const AIMatchingDemo = () => {
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Sample data
  const sampleCandidate = {
    name: "John Doe",
    skills: ["JavaScript", "React", "Node.js", "Python"],
    experience: 5,
    location: "Atlanta, GA",
    expectedSalary: 85000,
    industries: ["Technology", "Software"]
  };

  const sampleJobs = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "Tech Corp",
      requiredSkills: ["JavaScript", "React", "Node.js"],
      minExperience: 4,
      location: "Atlanta, GA",
      salaryRange: { min: 80000, max: 120000 },
      industry: "Technology"
    },
    {
      id: 2,
      title: "Full Stack Developer",
      company: "StartupXYZ",
      requiredSkills: ["Python", "Django", "React"],
      minExperience: 3,
      location: "Remote",
      salaryRange: { min: 70000, max: 95000 },
      industry: "Software"
    },
    {
      id: 3,
      title: "Frontend Developer",
      company: "Design Studio",
      requiredSkills: ["React", "CSS", "TypeScript"],
      minExperience: 2,
      location: "New York, NY",
      salaryRange: { min: 60000, max: 85000 },
      industry: "Design"
    }
  ];

  const runMatching = () => {
    setIsLoading(true);
    setTimeout(() => {
      const jobMatches = AIMatchingService.findJobMatches(sampleCandidate, sampleJobs);
      setMatches(jobMatches);
      setIsLoading(false);
    }, 1500); // Simulate AI processing time
  };

  const getMatchColor = (score) => {
    if (score >= 90) return '#22c55e';
    if (score >= 80) return '#25d3ff';
    if (score >= 70) return '#7c5cff';
    return '#f59e0b';
  };

  return (
    <div className="ai-matching-demo">
      <div className="demo-header">
        <h3>AI Matching Demo</h3>
        <button onClick={runMatching} disabled={isLoading} className="match-btn">
          {isLoading ? 'Analyzing...' : 'Find Matches'}
        </button>
      </div>
      
      {isLoading && (
        <div className="loading-animation">
          <div className="ai-processing">🤖 AI Processing...</div>
        </div>
      )}

      {matches.length > 0 && (
        <div className="matches-results">
          <h4>Top Matches for {sampleCandidate.name}</h4>
          {matches.map(job => (
            <div key={job.id} className="match-card">
              <div className="match-header">
                <h5>{job.title}</h5>
                <div 
                  className="match-score"
                  style={{ color: getMatchColor(job.matchScore) }}
                >
                  {job.matchScore}% Match
                </div>
              </div>
              <p>{job.company} • {job.location}</p>
              <div className="salary-range">
                ${job.salaryRange.min.toLocaleString()} - ${job.salaryRange.max.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AIMatchingDemo;
