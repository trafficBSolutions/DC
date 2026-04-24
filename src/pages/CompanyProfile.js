import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from "../components/headers/homeHeader";
import Footer from "../components/footers/homeFooter";
import ServiceProvidersModal from '../components/ServiceProvidersModal';
import images from '../utils/images';
import '../css/header.css';
import '../css/footer.css';
import '../css/companyProfile.css';

const CompanyProfile = () => {
  const { companyName } = useParams();
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  
  // Sample company data - replace with API call
  const companyData = {
    'Calhoun Truck Repair': {
      name: 'Calhoun Truck Repair',
      industry: 'Automotive & Repair',
      location: 'Calhoun, GA',
      employees: '50-100',
      description: 'Calhoun Truck Repair is a full-service truck repair and maintenance shop serving commercial vehicles.',
      website: 'www.facebook.com/pages/calhoun-truck-repair/134368803279999',
      jobs: [
        { title: 'No Jobs Posted', description: 'Not available' }
      ],
      applicationType: 'form',
      businessSummary: 'Full-service truck repair and maintenance shop serving commercial vehicles.',
      certifiedFields: ['Mechanical Engineering', 'Electrical Engineering', 'Tire Repair'],
      licenseContact: {
        address: '186 White Hill Dr',
        city: 'Calhoun',
        state: 'GA',
        zipCode: '30701',
        phone: '(678) 848-5453',
        email: 'rainesj597@gmail.com'
      },
      services: ['Mechanical Repair', 'Electrical Repair', 'Tire Repair', 'Maintenance'],
      yearsInBusiness: 5,
      capabilityStatement: 'Certified truck repair and maintenance expert with 5 years of experience in commercial vehicle maintenance.'
    },
    'CrossFit Calhoun': {
      name: 'CrossFit Calhoun',
      industry: 'Fitness & Wellness',
      location: 'Calhoun, GA',
      employees: '3',
      description: 'CrossFit affiliate gym focused on functional fitness and community building.',
      website: 'www.crossfitcalhoun.com',
      jobs: [
        { title: 'No Jobs Posted', description: 'Not available' }
      ],
      applicationType: 'form',
      businessSummary: 'Community-focused CrossFit affiliate dedicated to helping members achieve their fitness goals through high-intensity workouts and supportive environment.',
      certifiedFields: ['CrossFit Level 1', 'Personal Training', 'Nutrition Coaching', 'Group Fitness Instruction'],
      licenseContact: {
        address: '450 Elm St',
        city: 'Calhoun',
        state: 'GA',
        zipCode: '30701',
        phone: '(678) 986-6758',
        email: 'No Email'
      },
      services: ['Group Fitness Classes', 'Personal Training', 'Nutrition Coaching', 'Workout Plans', 'Community Events'],
      yearsInBusiness: 14,
      capabilityStatement: 'Certified CrossFit affiliate with over 10 years of experience in functional fitness training. Specialized in creating supportive community environments for all fitness levels.'
    },
    'CrossFit Trackside': {
      name: 'CrossFit Trackside',
      industry: 'Fitness & Wellness',
      location: 'Calhoun, GA',
      employees: '10-50',
      description: 'CrossFit affiliate gym focused on functional fitness and community building.',
      website: 'www.cftrackside.com',
      jobs: [
        { title: 'No Jobs Posted', description: 'Not available' }
      ],
      applicationType: 'form',
      businessSummary: 'Community-focused CrossFit affiliate dedicated to helping members achieve their fitness goals through high-intensity workouts and supportive environment.',
      certifiedFields: ['CrossFit Level 1', 'Personal Training', 'Nutrition Coaching', 'Group Fitness Instruction'],
      licenseContact: {
        address: '120 N King St Unit 4',
        city: 'Calhoun',
        state: 'GA',
        zipCode: '30701',
        phone: '(706) 420-4101',
        email: 'No Email'
      },
      services: ['Group Fitness Classes', 'Personal Training', 'Nutrition Coaching', 'Workout Plans', 'Community Events'],
      yearsInBusiness: 4,
      capabilityStatement: 'Certified CrossFit affiliate with 4 years of experience in functional fitness training. Specialized in creating supportive community environments for all fitness levels.'
    },
    'CR Coatings LLC': {
      name: 'CR Coatings LLC',
      industry: 'Construction & Infrastructure',
      location: 'Calhoun, GA',
      employees: '10',
      description: 'CR Coatings LLC is a leading provider of parking lot striping and pavement marking services for commercial and retail properties.',
      website: 'www.gordoncountychamber.com/list/member/c-r-coatings-llc-10484',
      jobs: [
        { title: 'No Jobs Posted', description: 'Not available' }
      ],
      applicationType: 'external',
      businessSummary: 'With over 5 years of experience, CR Coatings LLC specializes in providing high-quality parking lot striping and pavement marking services for retail centers, office complexes, and commercial properties.',
      certifiedFields: ['Parking Lot Striping', 'Line Painting', 'Pavement Marking', 'Handicap Symbols'],
      licenseContact: {
        address: '1706 Red Bud Rd NE',
        city: 'Calhoun',
        state: 'GA',
        zipCode: '30701',
        phone: '(770) 548-4325',
        email: 'countylinepowdercoat@gmail.com'
      },
      services: ['Parking Lot Striping', 'Line Painting', 'Pavement Marking', 'Handicap Symbols', 'Fire Lane Marking'],
      yearsInBusiness: 7,
      capabilityStatement: 'CR Coatings LLC is a certified provider of parking lot striping and pavement marking services with over 5 years of industry experience. We are committed to delivering high-quality striping solutions that meet ADA compliance and safety standards.'
    },
    'CSTE Inc.': {
      name: 'CSTE Inc.',
      industry: 'Construction & Infrastructure',
      location: 'Marietta, GA',
      employees: '500+',
      description: 'CSTE Inc. is a comprehensive construction and logistics company specializing in construction services, hauling, and material management solutions.',
      website: 'www.csteinc.com',
      jobs: [
        { title: 'No Jobs Posted', description: 'Not available' }
      ],
      applicationType: 'external',
      businessSummary: 'CSTE Inc. brings your construction vision to life with skilled construction teams equipped to handle projects from excavation and site preparation to structural work. Our fleet of state-of-the-art vehicles provides hauling and material management services, while our logistics expertise ensures comprehensive supply chain solutions.',
      certifiedFields: ['Construction Services', 'Excavation', 'Hauling Services', 'Logistics Planning'],
      licenseContact: {
        address: '1337 Canton Rd Suite K',
        city: 'Marietta',
        state: 'GA',
        zipCode: '30066',
        phone: '(470) 708-0993',
        email: 'Jerry@csteinc.com'
      },
      services: ['Construction Services', 'Excavation', 'Site Preparation', 'Hauling Services', 'Material Management', 'Logistics Planning', 'Supply Chain Solutions'],
      yearsInBusiness: 95,
      capabilityStatement: 'CSTE Inc. is a comprehensive construction and logistics company with extensive experience in construction services, hauling, and material management. We excel in delivering high-quality results on time and within budget, with expertise in logistics planning and supply chain solutions.'
    },
    'Fair`s Auto Service': {
      name: 'Fair`s Auto Service',
      industry: 'Automotive & Repair',
      location: 'Calhoun, GA',
      employees: '500+',
      description: 'Fair`s Auto Service is a local automotive repair shop providing comprehensive vehicle maintenance and repair services.',
      website: 'www.gordoncountychamber.com/list/member/fair-s-auto-service-repair-llc-6252',
      jobs: [
        { title: 'No Jobs Posted', description: 'Not available' },
      ],
      applicationType: 'external',
      businessSummary: 'Family-owned automotive repair shop with over 30 years of experience in providing quality vehicle maintenance and repair services to the Calhoun community.',
      certifiedFields: ['Automotive Repair', 'Vehicle Maintenance', 'Brake Services', 'Engine Diagnostics'],
      licenseContact: {
        address: '101 Westwind Industrial Dr',
        city: 'Calhoun',
        state: 'GA',
        zipCode: '30701',
        phone: '(706) 629-9877',
        email: 'fairsautoservice@yahoo.com'
      },
      services: ['Automotive Repair', 'Vehicle Maintenance', 'Brake Services', 'Engine Diagnostics'],
      yearsInBusiness: 30,
      capabilityStatement: 'Fair`s Auto Service is a local automotive repair shop providing comprehensive vehicle maintenance and repair services.'
    },
    'First Baptist Church of Calhoun': {
      name: 'First Baptist Church of Calhoun',
      industry: 'Religious Organization',
      location: 'Calhoun, GA',
      employees: '10-50',
      description: 'First Baptist Church of Calhoun is a local religious organization dedicated to community service and spiritual growth.',
      website: 'www.calhounfbc.org',
      jobs: [
        { title: 'No Jobs Posted', description: 'Not available' }
      ],
      applicationType: 'form',
      businessSummary: 'Local church dedicated to community service and spiritual growth.',
      certifiedFields: ['Religious Organization', 'Community Outreach', 'Volunteer Management', 'Event Planning'],
      licenseContact: {
        address: '411 College St',
        city: 'Calhoun',
        zipCode: '30701',
        phone: '(706) 629-7714',
        email: 'steven.waters@calhounfbc.org'
      },
      services: ['Community Outreach', 'Volunteer Management', 'Event Planning', 'Religious Education'],
      yearsInBusiness: 70,
      capabilityStatement: 'At First Baptist Church of Calhoun, we are committed to loving God, loving people, and making disciples. We strive to create a welcoming environment where everyone can grow in their faith and serve others in the community.'
    },
    'Good Samaritans of Gordon County, Inc.': {
      name: 'Good Samaritans of Gordon County, Inc.',
      industry: 'Non-Profit',
      location: 'Calhoun, GA',
      employees: '10-50',
      description: 'Good Samaritans of Gordon County, Inc. is a non-profit organization dedicated to community service and support.',
      website: 'www.facebook.com/p/Good-Samaritan-of-Gordon-County-Inc-61572794194541/',
      jobs: [
        { title: 'No Jobs Posted', description: 'Not available' }
      ],
      applicationType: 'form',
      businessSummary: 'Good Samaritans of Gordon County, Inc. is a non-profit organization dedicated to community service and support.',
      certifiedFields: ['Non-Profit', 'Community Service', 'Support Programs', 'Volunteer Management'],
      licenseContact: {
        address: '373 Morrow Rd SE',
        city: 'Calhoun',
        state: 'GA',
        zipCode: '30701',
        phone: '(706) 602-2299',
        email: 'No Email'
      },
      services: ['Community Service', 'Support Programs', 'Volunteer Management', 'Event Planning'],
      yearsInBusiness: 25,
      capabilityStatement: 'Good Samaritans of Gordon County, Inc. is a certified non-profit organization with extensive experience in community service and support programs.'
    },
    'Landscape Creations': {
      name: 'Landscape Creations',
      industry: 'Construction & Infrastructure',
      location: 'Calhoun, GA',
      employees: '50-100',
      description: 'Landscape Creations is a leading provider of landscape design and construction services.',
      website: 'www.landscapecreationsga.com',
      jobs: [
        { title: 'No Jobs Posted', description: 'Not available' }
      ],
      applicationType: 'form',
      businessSummary: 'Landscape Creations is a leading provider of landscape design and construction services.',
      certifiedFields: ['Landscape Design', 'Erosion Control', 'Construction', 'Hardscaping', 'Planting & Irrigation'],
      licenseContact: {
        address: '1400 US-41',
        city: 'Calhoun',
        state: 'GA',
        zipCode: '30701',
        phone: '(706) 280-3130',
        email: 'wadavis21@outlook.com'
      },
      services: ['Landscape Design', 'Erosion Control', 'Construction', 'Hardscaping', 'Planting & Irrigation'],
      yearsInBusiness: 20,  
      capabilityStatement: 'Landscape Creations is a leading provider of landscape design and construction services.'
    },
    'Morning Pointe of Calhoun': {
      name: 'Morning Pointe of Calhoun',
      industry: 'Senior Living & Memory Care',
      location: 'Calhoun, GA',
      employees: '25-50',
      description: 'Morning Pointe Senior Living of Calhoun offers assisted living and memory care services in a comfortable, one-story, home-like community.',
      website: 'www.morningpointe.com',
      jobs: [
        { title: 'No Jobs Posted', description: 'Not available' }
      ],
      applicationType: 'form',
      businessSummary: 'At Morning Pointe Senior Living of Calhoun, we offer the ability for loved ones to receive just the right amount of care within a city they have grown to love. We have designed a comfortable, one-story, home-like assisted living and memory care community that gives our residents a better quality of life. Owned and operated by the same two founders for over 25 years.',
      certifiedFields: ['Assisted Living', 'Memory Care', 'Senior Services', 'Healthcare'],
      licenseContact: {
        address: '660 Jolly Rd NW',
        city: 'Calhoun',
        state: 'GA',
        zipCode: '30701',
        phone: '(706) 629-0777',
        email: 'Calhoun-ed@morningpointe.com'
      },
      services: ['Assisted Living', 'Memory Care', 'Senior Healthcare', 'Family Support Services', 'Personalized Care Plans'],
      yearsInBusiness: 25,
      capabilityStatement: 'Morning Pointe of Calhoun has served generations of area families with long-time, tenured staff offering personalized, family-like care. Centrally located near Gordon Health and Rehabilitation, close to Adairsville, Dalton, and Rome, Georgia. We help make life more joyful for residents and their families with comprehensive care plans and everyday activity assistance.'
    },
    'Muse Land Services LLC': {
      name: 'Muse Land Services LLC',
      industry: 'Construction & Infrastructure',
      location: 'Calhoun, GA',
      employees: '50-100',
      description: 'Muse Land Services LLC provides comprehensive land development services including grading, site preparation, drainage, and land clearing for commercial and residential projects.',
      website: 'www.muselandservices.org',
      jobs: [
        { title: 'No Jobs Posted', description: 'Not available' }
      ],
      applicationType: 'external',
      businessSummary: 'Muse Land Services LLC is a trusted provider of land development services, specializing in grading, site preparation, drainage solutions, and land clearing for both commercial and residential projects.',
      certifiedFields: ['Grading and Site Prep', 'Drainage Systems', 'Dump Truck Services', 'Utility Location', 'Land Clearing', 'Erosion Control'],
      licenseContact: {
        address: '203 Holbrook Rd NW',
        city: 'Calhoun',
        state: 'GA',
        zipCode: '30701',
        phone: '(770) 548-5283',
        email: 'museland@att.net'
      },
      services: ['Grading and Site Prep', 'Road and Parking', 'Drainage', 'Dump Truck Services', 'Utility Location', 'Land Clearing', 'Forestry Mulching', 'Erosion Control', 'Pond Construction'],
      yearsInBusiness: 10,
      capabilityStatement: 'Muse Land Services LLC is a certified land development company with extensive experience in commercial and residential site preparation, drainage solutions, and land clearing services. We pride ourselves on delivering reliable and efficient solutions for all your land development needs.'
    },
    'Peel Aesthetics': {
      name: 'Peel Aesthetics',
      industry: 'Health & Wellness',
      location: 'Calhoun, GA',
      employees: '3',
      description: 'Peel Aesthetics is a medical spa offering skincare and injectable treatments to enhance natural beauty.',
      website: 'www.peelaesthetics.com',
      jobs: [
        { title: 'No Jobs Posted', description: 'Not available' }
      ],
      applicationType: 'form',
      businessSummary: 'Peel Aesthetics is a medical spa offering advanced skincare treatments and aesthetic services.',
      certifiedFields: ['Skincare', 'Aesthetics', 'Acne Treatments', 'Injectables'],
      licenseContact: {
        address: '668 Red Bud Rd NE',
        city: 'Calhoun',
        state: 'GA',
        zipCode: '30701',
        phone: '(770) 548-3318',
        email: 'peelaestheticsllc@gmail.com'
      },
      services: ['Acne Bootcamp', 'Hydrafacial', 'SkinPen Microneedling', 'Facials', 'Chemical Peels', 'Injectables'],
      yearsInBusiness: 10,
      capabilityStatement: 'Peel Aesthetics is a certified medical spa with over 10 years of experience in providing advanced skincare treatments and aesthetic services to enhance natural beauty. We offer a wide range of skincare and injectable treatments to address various skin concerns.'
    },
    'Riverview Baptist Church': {
      name: 'Riverview Baptist Church',
      industry: 'Religious Organization',
      location: 'Calhoun, GA',
      employees: '10-50',
      description: 'Riverview Baptist Church is a local religious organization dedicated to community service and spiritual growth.',
      website: 'www.riverviewbaptistcalhoun.com',
      jobs: [
        { title: 'No Jobs Posted', description: 'Not available' }
      ],
      applicationType: 'form',
      businessSummary: 'Local church dedicated to community service and spiritual growth.',
      certifiedFields: ['Religious Organization', 'Community Outreach', 'Volunteer Management', 'Event Planning'],
      licenseContact: {
        address: '141 Liberty Rd SW',
        city: 'Calhoun',
        state: 'GA',
        zipCode: '30701',
        phone: '(706) 624-1811',
        email: 'riverviewbaptistcalhoun@gmail.com'
      },
      services: ['Community Outreach', 'Volunteer Management', 'Event Planning', 'Religious Education'],
      yearsInBusiness: 70,
      capabilityStatement: 'We are a family of believers committed to loving God, loving people, and making disciples. At Riverview Baptist Church, we strive to create a welcoming environment where everyone can grow in their faith and serve others in the community.'
    },
    'Traffic & Barrier Solutions, LLC': {
      name: 'Traffic & Barrier Solutions, LLC',
      industry: 'Construction & Infrastructure',
      location: 'Calhoun, GA',
      employees: '50-100',
      description: 'Leading provider of traffic control and barrier solutions for construction and infrastructure projects.',
      website: 'www.trafficbarriersolutions.com',
      jobs: [
        { title: 'No Jobs Posted', description: 'Not available' }
      ],
      applicationType: 'form',
      businessSummary: 'Established leader in traffic management solutions serving the Southeast region with comprehensive safety services.',
      certifiedFields: ['Traffic Control', 'Highway Safety', 'Construction Zone Management', 'Emergency Response'],
      licenseContact: {
        address: '721 N Wall St',
        city: 'Calhoun',
        state: 'GA',
        zipCode: '30701',
        phone: '(706) 263-0175',
        email: 'tbsolutions1999@gmail.com'
      },
      services: ['Traffic Control Plans', 'Bollard/Wheel Stop Installation', 'Flagging Services', 'Equipment Rental', 'Safety Training'],
      yearsInBusiness: 6,
      capabilityStatement: 'Certified traffic control company with 15 years of experience managing complex construction projects. Specialized in highway work zones, emergency response, and large-scale infrastructure projects with proven safety record.'
    },
    'Trinity Baptist Church': {
      name: 'Trinity Baptist Church',
      industry: 'Religious Organization',
      location: 'Calhoun, GA',
      employees: '10-50',
      description: 'Trinity Baptist Church is a local religious organization dedicated to community service and spiritual growth.',
      website: 'www.trinitycalhoun.com',
      jobs: [
        { title: 'No Jobs Posted', description: 'Not available' }
      ],

      applicationType: 'form',
      businessSummary: 'Local church dedicated to community service and spiritual growth.',
      certifiedFields: ['Religious Organization', 'Community Outreach', 'Volunteer Management', 'Event Planning'],
      licenseContact: {
        address: '1170 Rome Rd SW',
        city: 'Calhoun',
        state: 'GA',
        zipCode: '30701',
        phone: '(706) 625-5683',
        email: 'tiptontate@gmail.com'
      },
      services: ['Community Outreach', 'Volunteer Management', 'Event Planning', 'Religious Education'],
      yearsInBusiness: 5,
      capabilityStatement: 'At Trinity Baptist Church, we are committed to connecting with believers, serve others with the love of God, and share our faith. We are a vibrant community of believers dedicated to making a positive impact in the world.'
    },
    'X4 Fitness Calhoun': {
      name: 'X4 Fitness Calhoun',
      industry: 'Fitness & Wellness',
      location: 'Calhoun, GA',
      employees: '10-50',
      description: 'X4 Fitness Calhoun is a local fitness center offering personalized training and group classes.',
      website: 'www.x4calhoun.com',
      jobs: [
        { title: 'No Jobs Posted', description: 'Not available' }
      ],
      applicationType: 'form',
      businessSummary: 'Local fitness center focused on personalized training and community building.',
      certifiedFields: ['Fitness Instruction', 'Personal Training', 'Group Fitness Coaching'],
      licenseContact: {
        address: '120 N King St Suite 4',
        city: 'Calhoun',
        state: 'GA',
        zipCode: '30701',
        phone: '(706) 797-2091',
        email: 'rrnibjr@gmail.com'
      },
      services: ['Group Fitness Classes', 'Personal Training', 'Nutrition Coaching', 'Workout Plans'],
      yearsInBusiness: 2,
      capabilityStatement: 'Certified fitness center with 2 years of experience in personalized training and community building.'
    },
    'Yellow Jacket Drive-In': {
      name: 'Yellow Jacket Drive-In',
      industry: 'Restaurant & Hospitality',
      location: 'Calhoun, GA',
      employees: '10-50',
      description: 'Yellow Jacket Drive-In is a drive in and true diner experience serving classic historical Calhoun GA Landmark.',
      website: 'www.facebook.com/p/Yellow-Jacket-Drive-In-100063590739596/',
      jobs: [
        { title: 'No Jobs Posted', description: 'Not available' }
      ],
      applicationType: 'form',
      businessSummary: 'Drive in and true diner experience serving classic Calhoun GA Landmark.',
      certifiedFields: ['Drive-In Experience', 'True Diner', 'Entertainment'],
      licenseContact: {
        address: '159 Drive-In Way',
        city: 'Calhoun',
        state: 'GA',
        zipCode: '30701',
        phone: '(706) 629-4347',
        email: 'Prbymissy@gmail.com'
      },
      services: ['Drive-In Experience', 'True Diner', 'Entertainment'],
      yearsInBusiness: 10,
      capabilityStatement: 'Certified drive in and true diner with 10 years of experience serving classic Calhoun GA Landmark.'
    },
    'Statement Marine LLC': {
      name: 'Statement Marine LLC',
      industry: 'Marine & Boating',
      location: 'Largo, FL',
      employees: '50-100',
      description: 'We don\'t just make boats, we make Statements — each of them a singular piece of high performance art that eloquently expresses its owner\'s unique vision.',
      website: 'www.statementmarine.com',
      jobs: [
        { title: 'No Jobs Posted', description: 'Not available' }
      ],
      applicationType: 'form',
      businessSummary: 'We don\'t just make boats, we make Statements — each of them a singular piece of high performance art that eloquently expresses its owner\'s unique vision. But we like to think they also communicate much more than that. We believe every Statement we make says something about what happens when technology, design, and craftsmanship intersect perfectly. Something about the value of individuality, of boldness, of a healthy disrespect for boundaries. Something about prioritizing personal relationships, especially at a time when so much work is going into making them obsolete. Something about always pushing, innovating tirelessly, never resting on your laurels. Something about keeping the throttles down.',
      certifiedFields: ['Custom Boat Building', 'High Performance Boats', 'Marine Design'],
      licenseContact: {
        address: '1979 Wild Acres Road',
        city: 'Largo',
        state: 'Florida',
        zipCode: '33771',
        phone: '(727) 525-5235',
        email: 'statementmarine@gmail.com'
      },
      services: ['Custom Boat Building', 'High Performance Boats', 'Marine Design'],
      yearsInBusiness: 10,
      capabilityStatement: 'What will you say with your Statement? We don\'t just make boats, we make Statements — each of them a singular piece of high performance art that eloquently expresses its owner\'s unique vision.'
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
    licenseContact: { address: 'N/A', city: 'N/A', zipCode: 'N/A', phone: 'N/A', email: 'N/A' },
    services: [],
    yearsInBusiness: 0,
    capabilityStatement: 'Information not available'
  };

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setShowServiceModal(true);
  };


  const handleJobClick = (job) => {
    // Show contact information for job inquiry
    alert(`Contact ${company.name} for more information about the ${job.title} position:\n\nPhone: ${company.licenseContact.phone}\nEmail: ${company.licenseContact.email}`);
  };

  return (
    <div>
      <Header />
      <div className="company-profile-container">
        <div className="company-header">
          <div className="company-logo">
            <img src={images[`${company.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.svg`] || images['default-company.svg']} alt={`${company.name} Logo`} className="company-logo-img" />
          </div>
          <div className="company-info">
            <h1 className="company-name">{company.name}</h1>
            <p className="company-industry">{company.industry}</p>
          </div>
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
              <div 
                key={index} 
                className="service-item clickable"
                onClick={() => handleServiceClick(service)}
              >
                {service}
              </div>
            ))}
          </div>
        </div>

        <div className="company-section">
          <h3>Address & Contact Information</h3>
          <div className="contact-info">
            <div><strong>Address:</strong> {company.licenseContact.address}</div>
            <div><strong>City:</strong> {company.licenseContact.city}</div>
            <div><strong>State:</strong> {company.licenseContact.state}</div>
            <div><strong>Zip Code:</strong> {company.licenseContact.zipCode}</div>
            <div><strong>Phone:</strong> {company.licenseContact.phone}</div>
            <div><strong>Email:</strong> {company.licenseContact.email}</div>
          </div>
        </div>

        <div className="company-section">
          <h3>Capability Statement</h3>
          <p>{company.capabilityStatement}</p>
        </div>

        {company.jobs.length > 0 && company.jobs[0].title !== 'No Jobs Posted' && (
          <div className="company-jobs">
            <h3>Job Listings</h3>
            <div className="jobs-list">
              {company.jobs.map((job, index) => (
                <div key={index} className="job-card">
                  <div className="job-header" onClick={() => handleJobClick(job)}>
                    <h4>{job.title}</h4>
                    <span className="apply-hint">
                      Contact for more info
                    </span>
                  </div>
                  <p className="job-description">{job.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {showServiceModal && (
          <ServiceProvidersModal 
            service={selectedService}
            companies={[{name: company.name, location: company.location, phone: company.licenseContact.phone, email: company.licenseContact.email}]}
            onClose={() => setShowServiceModal(false)}
          />
        )}
      </div>
       <Footer />
    </div>
  );
};

export default CompanyProfile;
