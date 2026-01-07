// AI Matching Algorithm Service
class AIMatchingService {
  
  // Calculate match score between candidate and job (0-100)
  static calculateMatchScore(candidate, job) {
    let totalScore = 0;
    let weights = {
      skills: 0.35,
      experience: 0.25,
      location: 0.15,
      salary: 0.15,
      industry: 0.10
    };

    // Skills matching (keyword overlap)
    const skillsScore = this.calculateSkillsMatch(candidate.skills, job.requiredSkills);
    totalScore += skillsScore * weights.skills;

    // Experience matching
    const experienceScore = this.calculateExperienceMatch(candidate.experience, job.minExperience);
    totalScore += experienceScore * weights.experience;

    // Location matching
    const locationScore = this.calculateLocationMatch(candidate.location, job.location);
    totalScore += locationScore * weights.location;

    // Salary matching
    const salaryScore = this.calculateSalaryMatch(candidate.expectedSalary, job.salaryRange);
    totalScore += salaryScore * weights.salary;

    // Industry matching
    const industryScore = this.calculateIndustryMatch(candidate.industries, job.industry);
    totalScore += industryScore * weights.industry;

    return Math.round(totalScore);
  }

  static calculateSkillsMatch(candidateSkills, requiredSkills) {
    if (!candidateSkills?.length || !requiredSkills?.length) return 0;
    
    const matches = candidateSkills.filter(skill => 
      requiredSkills.some(req => req.toLowerCase().includes(skill.toLowerCase()))
    );
    return (matches.length / requiredSkills.length) * 100;
  }

  static calculateExperienceMatch(candidateExp, minRequired) {
    if (candidateExp >= minRequired) return 100;
    if (candidateExp >= minRequired * 0.8) return 80;
    if (candidateExp >= minRequired * 0.6) return 60;
    return 30;
  }

  static calculateLocationMatch(candidateLocation, jobLocation) {
    if (candidateLocation.toLowerCase() === jobLocation.toLowerCase()) return 100;
    if (candidateLocation.toLowerCase().includes(jobLocation.toLowerCase()) || 
        jobLocation.toLowerCase().includes(candidateLocation.toLowerCase())) return 80;
    return 40; // Remote work consideration
  }

  static calculateSalaryMatch(expectedSalary, salaryRange) {
    if (expectedSalary >= salaryRange.min && expectedSalary <= salaryRange.max) return 100;
    if (expectedSalary <= salaryRange.max * 1.1) return 80;
    if (expectedSalary <= salaryRange.max * 1.2) return 60;
    return 30;
  }

  static calculateIndustryMatch(candidateIndustries, jobIndustry) {
    if (candidateIndustries.includes(jobIndustry)) return 100;
    return 50;
  }

  // Find best matches for a candidate
  static findJobMatches(candidate, jobs, limit = 10) {
    return jobs
      .map(job => ({
        ...job,
        matchScore: this.calculateMatchScore(candidate, job)
      }))
      .filter(job => job.matchScore >= 60) // Minimum threshold
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, limit);
  }

  // Find best candidates for a job
  static findCandidateMatches(job, candidates, limit = 10) {
    return candidates
      .map(candidate => ({
        ...candidate,
        matchScore: this.calculateMatchScore(candidate, job)
      }))
      .filter(candidate => candidate.matchScore >= 60)
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, limit);
  }
}

export default AIMatchingService;
