// Extract all job listings from companies
export const getAllJobListings = () => {
  const allJobs = [
    /*
    { title: 'Mechanic', company: 'Calhoun Truck Repair', location: 'Calhoun, GA', industry: 'Automotive & Repair' },
    { title: 'Electrical Technician', company: 'Calhoun Truck Repair', location: 'Calhoun, GA', industry: 'Automotive & Repair' },
    { title: 'Tire Specialist', company: 'Calhoun Truck Repair', location: 'Calhoun, GA', industry: 'Automotive & Repair' },
    { title: 'CrossFit Instructor', company: 'CrossFit Calhoun', location: 'Calhoun, GA', industry: 'Fitness & Wellness' },
    { title: 'Fitness Coach', company: 'CrossFit Calhoun', location: 'Calhoun, GA', industry: 'Fitness & Wellness' },
    { title: 'Front Desk Staff', company: 'CrossFit Calhoun', location: 'Calhoun, GA', industry: 'Fitness & Wellness' },
    { title: 'CrossFit Instructor', company: 'CrossFit Trackside', location: 'Calhoun, GA', industry: 'Fitness & Wellness' },
    { title: 'Fitness Coach', company: 'CrossFit Trackside', location: 'Calhoun, GA', industry: 'Fitness & Wellness' },
    { title: 'Front Desk Staff', company: 'CrossFit Trackside', location: 'Calhoun, GA', industry: 'Fitness & Wellness' },
    { title: 'Coating Applicator', company: 'CR Coatings LLC', location: 'Calhoun, GA', industry: 'Construction & Infrastructure' },
    { title: 'Project Supervisor', company: 'CR Coatings LLC', location: 'Calhoun, GA', industry: 'Construction & Infrastructure' },
    { title: 'Quality Control Inspector', company: 'CR Coatings LLC', location: 'Calhoun, GA', industry: 'Construction & Infrastructure' },
    { title: 'Concrete Mixer Operator', company: 'CSTE Inc.', location: 'Marietta, GA', industry: 'Energy & Utilities' },
    { title: 'Truck Driver', company: 'CSTE Inc.', location: 'Marietta, GA', industry: 'Energy & Utilities' },
    { title: 'Customer Service Representative', company: 'CSTE Inc.', location: 'Marietta, GA', industry: 'Energy & Utilities' },
    { title: 'Right-of-Way Agent', company: 'Muse Land Services LLC', location: 'Calhoun, GA', industry: 'Energy & Utilities' },
    { title: 'Land Surveyor', company: 'Muse Land Services LLC', location: 'Calhoun, GA', industry: 'Energy & Utilities' },
    { title: 'Project Coordinator', company: 'Muse Land Services LLC', location: 'Calhoun, GA', industry: 'Energy & Utilities' },
    { title: 'Traffic Control Specialist', company: 'Traffic & Barrier Solutions, LLC', location: 'Calhoun, GA', industry: 'Construction & Infrastructure' },
    { title: 'Traffic Control Team Member', company: 'Traffic & Barrier Solutions, LLC', location: 'Calhoun, GA', industry: 'Construction & Infrastructure' },
    { title: 'Driver', company: 'Traffic & Barrier Solutions, LLC', location: 'Calhoun, GA', industry: 'Construction & Infrastructure' },
    { title: 'Community Outreach Coordinator', company: 'Trinity Baptist Church', location: 'Calhoun, GA', industry: 'Religious Organization' },
    { title: 'Volunteer Coordinator', company: 'Trinity Baptist Church', location: 'Calhoun, GA', industry: 'Religious Organization' },
    { title: 'Event Coordinator', company: 'Trinity Baptist Church', location: 'Calhoun, GA', industry: 'Religious Organization' },
    { title: 'Fitness Instructor', company: 'X4 Fitness Calhoun', location: 'Calhoun, GA', industry: 'Fitness & Wellness' },
    { title: 'Personal Trainer', company: 'X4 Fitness Calhoun', location: 'Calhoun, GA', industry: 'Fitness & Wellness' },
    { title: 'Front Desk Staff', company: 'X4 Fitness Calhoun', location: 'Calhoun, GA', industry: 'Fitness & Wellness' }
     */
  ];
  return allJobs.sort((a, b) => a.title.localeCompare(b.title));
};

// Extract all service types categorized by industry
export const getCategorizedServiceTypes = () => {
  return {
    'Auto Services': ['Mechanical Repair', 'Electrical Repair', 'Tire Repair', 'Maintenance', 'Automotive Repair', 'Vehicle Maintenance', 'Brake Services', 'Engine Diagnostics'],
    'Fitness & Wellness': ['Group Fitness Classes', 'Personal Training', 'Nutrition Coaching', 'Workout Plans', 'Community Events', 'Skincare', 'Aesthetics', 'Medical Spa', 'Wellness Services'],
    'Construction & Infrastructure': ['Construction Services', 'Excavation', 'Site Preparation', 'Hauling Services', 'Material Management', 'Logistics Planning', 'Supply Chain Solutions', 'Parking Lot Striping', 'Line Painting', 'Pavement Marking', 'Handicap Symbols', 'Fire Lane Marking', 'Grading and Site Prep', 'Road and Parking', 'Drainage', 'Dump Truck Services', 'Utility Location', 'Land Clearing', 'Forestry Mulching', 'Erosion Control', 'Pond Construction', 'Landscape Design', 'Construction', 'Hardscaping', 'Planting & Irrigation', 'Traffic Control Plans', 'Bollard/Wheel Stop Installation', 'Flagging Services', 'Equipment Rental', 'Safety Training'],
    'Utility Work': ['Concrete Mixing', 'Erosion Control', 'Material Hauling', 'Logistics Planning', 'Utility Infrastructure', 'Right-of-Way Acquisition', 'Land Surveying', 'Project Coordination', 'Energy Sector Services'],
    'Religious Organization': ['Community Outreach', 'Volunteer Management', 'Event Planning', 'Religious Education', 'Community Service', 'Support Programs'],
    'Senior Care': ['Assisted Living', 'Memory Care', 'Senior Healthcare', 'Family Support Services', 'Personalized Care Plans'],
    'Skincare & Aesthetics': ['Facials', 'Chemical Peels', 'Injectables', 'Acne Treatments', 'Hydrafacial', 'SkinPen Microneedling', 'Acne Bootcamp'],
    'Meal Services': ['Drive-In Experience', 'True Diner', 'Entertainment'],
    'Marine & Boating': ['Custom Boat Building', 'High Performance Boats', 'Marine Design']
  };
};

// Find companies that offer a specific service
export const getCompaniesByService = (serviceName) => {
  const companies = [
    { name: 'Calhoun Truck Repair', services: ['Mechanical Repair', 'Electrical Repair', 'Tire Repair', 'Maintenance'] },
    { name: 'CrossFit Calhoun', services: ['Group Fitness Classes', 'Personal Training', 'Nutrition Coaching', 'Workout Plans', 'Community Events'] },
    { name: 'CrossFit Trackside', services: ['Group Fitness Classes', 'Personal Training', 'Nutrition Coaching', 'Workout Plans', 'Community Events'] },
    { name: 'CR Coatings LLC', services: ['Parking Lot Striping', 'Line Painting', 'Pavement Marking', 'Handicap Symbols', 'Fire Lane Marking'] },
    { name: 'CSTE Inc.', services: ['Construction Services', 'Excavation', 'Site Preparation', 'Hauling Services', 'Material Management', 'Logistics Planning', 'Supply Chain Solutions'] },
    { name: 'Fair`s Auto Service', services: ['Automotive Repair', 'Tire Repair', 'Mechanical Repair', 'Electrical Repair', 'Vehicle Maintenance', 'Brake Services', 'Engine Diagnostics'] },
    { name: 'First Baptist Church of Calhoun', services: ['Community Outreach', 'Volunteer Management', 'Event Planning', 'Religious Education'] },
    { name: 'Good Samaritans of Gordon County, Inc.', services: ['Community Service', 'Support Programs', 'Volunteer Management', 'Event Planning'] },
    { name: 'Landscape Creations', services: ['Landscape Design', 'Erosion Control', 'Construction', 'Hardscaping', 'Planting & Irrigation'] },
    { name: 'Muse Land Services LLC', services: ['Grading and Site Prep', 'Erosion Control', 'Road and Parking', 'Drainage', 'Dump Truck Services', 'Utility Location', 'Land Clearing', 'Forestry Mulching', 'Erosion Control', 'Pond Construction'] },
    { name: 'Morning Pointe of Calhoun', services: ['Assisted Living', 'Memory Care', 'Senior Healthcare', 'Family Support Services', 'Personalized Care Plans'] },
    { name: 'Peel Aesthetics', services: ['Facials', 'Chemical Peels', 'Injectables', 'Acne Treatments', 'Hydrafacial', 'SkinPen Microneedling', 'Acne Bootcamp'] },
    { name: 'Riverview Baptist Church', services: ['Community Outreach', 'Volunteer Management', 'Event Planning', 'Religious Education'] },
    { name: 'Traffic & Barrier Solutions, LLC', services: ['Traffic Control Plans', 'Bollard/Wheel Stop Installation', 'Flagging Services', 'Equipment Rental', 'Safety Training'] },
    { name: 'Trinity Baptist Church', services: ['Community Outreach', 'Volunteer Management', 'Event Planning', 'Religious Education'] },
    { name: 'X4 Fitness Calhoun', services: ['Group Fitness Classes', 'Personal Training', 'Nutrition Coaching', 'Workout Plans'] },
    { name: 'Yellow Jacket Drive-In', services: ['Drive-In Experience', 'True Diner', 'Entertainment'] },
    { name: 'Statement Marine LLC', services: ['Custom Boat Building', 'High Performance Boats', 'Marine Design'] }
  ];
  
  return companies.filter(company => 
    company.services.some(service => 
      service.toLowerCase().includes(serviceName.toLowerCase())
    )
  );
};

// Service descriptions and request types
export const getServiceDetails = () => {
  return {
    'Mechanical Repair': {
      description: 'Professional vehicle mechanical repair services including engine diagnostics, transmission work, and general maintenance.',
      requestType: 'Service Request',
      requestPrompt: 'Describe your vehicle issue and preferred service date'
    },
    'Electrical Repair': {
      description: 'Expert electrical system repair for vehicles including wiring, alternators, starters, and battery services.',
      requestType: 'Service Request', 
      requestPrompt: 'Describe your electrical issue and vehicle details'
    },
    'Personal Training': {
      description: 'One-on-one fitness coaching tailored to your goals with personalized workout plans and nutrition guidance.',
      requestType: 'Consultation Request',
      requestPrompt: 'Tell us about your fitness goals and availability'
    },
    'Group Fitness Classes': {
      description: 'High-energy group workout sessions including CrossFit, strength training, and cardio classes.',
      requestType: 'Class Inquiry',
      requestPrompt: 'Which classes interest you and your preferred schedule'
    },
    'Traffic Control Plans': {
      description: 'Professional traffic management and safety planning for construction sites and special events.',
      requestType: 'Project Quote',
      requestPrompt: 'Describe your project location, duration, and traffic control needs'
    },
    'Landscape Design': {
      description: 'Custom landscape design and installation services including hardscaping, planting, and irrigation systems.',
      requestType: 'Design Consultation',
      requestPrompt: 'Describe your property and landscaping vision'
    },
    'Community Outreach': {
      description: 'Community engagement programs, volunteer coordination, and local support initiatives.',
      requestType: 'Program Inquiry',
      requestPrompt: 'Tell us how you\'d like to get involved or what support you need'
    },
    'Drive-In Experience': {
      description: 'Classic drive-in dining experience with home-style cooking and nostalgic atmosphere.',
      requestType: 'Catering Request',
      requestPrompt: 'Tell us about your event, guest count, and menu preferences'
    },
    'True Diner': {
      description: 'Authentic diner experience serving comfort food, daily specials, and home-cooked meals.',
      requestType: 'Reservation Request',
      requestPrompt: 'Let us know your party size, date, and any special dietary needs'
    },
    'Assisted Living': {
      description: 'Comfortable, home-like assisted living services providing personalized care and support for daily activities in a safe environment.',
      requestType: 'Care Consultation',
      requestPrompt: 'Tell us about your loved one\'s care needs and preferred move-in timeline'
    },
    'Memory Care': {
      description: 'Specialized memory care services for individuals with Alzheimer\'s, dementia, and other memory-related conditions.',
      requestType: 'Care Assessment',
      requestPrompt: 'Describe your loved one\'s current condition and specific care requirements'
    },
    'Concrete Mixing': {
      description: 'Professional concrete mixing and delivery services for construction and infrastructure projects.',
      requestType: 'Project Quote',
      requestPrompt: 'Provide project details, concrete specifications, and delivery requirements'
    },
  };
};
export const getCompanyNames = () => {
  return [
    'Calhoun Truck Repair',
    'CrossFit Calhoun', 
    'CrossFit Trackside',
    'CR Coatings LLC',
    'CSTE Inc.',
    'Fair`s Auto Service',
    'First Baptist Church of Calhoun',
    'Good Samaritans of Gordon County, Inc.',
    'Landscape Creations',
    'Morning Pointe of Calhoun',
    'Muse Land Services LLC',
    'Peel Aesthetics',
    'Riverview Baptist Church',
    'Traffic & Barrier Solutions, LLC',
    'Trinity Baptist Church',
    'X4 Fitness Calhoun',
    'Yellow Jacket Drive-In',
    'Statement Marine LLC'
  ].sort();
};
