import { useRef, useEffect, useCallback } from 'react';
import { GOOGLE_MAPS_API_KEY } from '../constants/constant';
import { useNavigate } from 'react-router-dom';
import images from '../utils/images';
const companies = [
    { name: 'Calhoun Truck Repair', address: '186 White Hill Dr, Calhoun, GA 30701', lat: 34.5110747, lng: -85.0268185 },
    { name: 'CrossFit Calhoun', address: '450 Elm St, Calhoun, GA 30701', lat: 34.4935451, lng: -84.9513341 },
    { name: 'CrossFit Trackside', address: '120 N King St Unit 4, Calhoun, GA 30701', lat: 34.5035796, lng: -84.9542247 },
    { name: 'CR Coatings LLC', address: '1706 Red Bud Rd NE, Calhoun, GA 30701', lat: 34.5118638, lng: -84.9134653 },
    { name: 'Fair`s Auto Service', address: '101 Westwind Industrial Dr, Calhoun, GA 30701', lat: 34.4822262, lng: -84.9720310 },
    { name: 'First Baptist Church of Calhoun', address: '411 College St, Calhoun, GA 30701', lat: 34.5067400, lng: -84.9485381 },
    { name: 'Good Samaritans of Gordon County, Inc.', address: '373 Morrow Rd SE, Calhoun, GA 30701', lat: 34.4562202, lng: -84.9073770 },
    { name: 'Landscape Creations', address: '1400 US-41, Calhoun, GA 30701', lat: 34.4705703, lng: -84.9340650 },
    { name: 'Morning Pointe of Calhoun', address: '660 Jolly Rd NW, Calhoun, GA 30701', lat: 34.5336510, lng: -84.9393737 },
    { name: 'Muse Land Services LLC', address: '203 Holbrook Rd NW, Calhoun, GA 30701', lat: 34.4903198, lng: -85.0294600 },
    { name: 'Peel Aesthetics', address: '668 Red Bud Rd NE, Calhoun, GA 30701', lat: 34.5139624, lng: -84.9335125 },
    { name: 'Riverview Baptist Church', address: '141 Liberty Rd SW, Calhoun, GA 30701', lat: 34.4583470, lng: -84.9499763 },
    { name: 'Traffic & Barrier Solutions, LLC', address: '721 N Wall St, Calhoun, GA 30701', lat: 34.5116333, lng: -84.9481199 },
    { name: 'Trinity Baptist Church', address: '1170 Rome Rd SW, Calhoun, GA 30701', lat: 34.4668436, lng: -84.9757552 },
    { name: 'X4 Fitness Calhoun', address: '120 N King St Suite 4, Calhoun, GA 30701', lat: 34.5035778, lng: -84.9544540 },
    { name: 'Yellow Jacket Drive-In', address: '159 Drive-In Way, Calhoun, GA 30701', lat: 34.4977651, lng: -84.9633772 }
  ];
const MapComponent = () => {
    const navigate = useNavigate();
    const mapContainerRef = useRef(null);
  
  // Initialize the Google Map

  const addCompanyMarkers = useCallback((map) => {
    companies.forEach(company => {
      const marker = new window.google.maps.Marker({
        position: { lat: company.lat, lng: company.lng },
        map: map,
        title: company.name,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
              <circle cx="15" cy="15" r="12" fill="#e53e3e" stroke="#ffffff" stroke-width="2"/>
              <circle cx="15" cy="15" r="6" fill="#ffffff"/>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(30, 30),
          anchor: new window.google.maps.Point(15, 15)
        }
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 15px; font-family: Arial, sans-serif; text-align: center;">
            <img src="${images[`${company.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.svg`] || ''}" 
                 style="height: 60px; margin-bottom: 10px; object-fit: contain;" 
                 onerror="this.style.display='none'" />
            <h3 style="margin: 0 0 8px 0; color: #1a1a2e; font-size: 16px;">${company.name}</h3>
            <p style="margin: 0 0 8px 0; color: #666; font-size: 14px;">${company.address}</p>
            <button onclick="window.navigateToCompany('${company.name}')" 
                    style="background: #e53e3e; color: white; border: none; padding: 8px 16px; 
                           border-radius: 4px; cursor: pointer; font-size: 14px;">
              View Profile
            </button>
          </div>
        `
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });
    });

    window.navigateToCompany = (companyName) => {
      navigate(`/company/${encodeURIComponent(companyName)}`);
    };
  }, [navigate]);
const initMap = useCallback(() => {
    const googleMap = new window.google.maps.Map(mapContainerRef.current, {
      center: { lat: 34.5028, lng: -84.9508 },
      zoom: 11.85,
      styles: [
        {
          featureType: 'all',
          elementType: 'geometry',
          stylers: [{ color: '#1a1a2e' }]
        },
        {
          featureType: 'all',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#ffffff' }]
        },
        {
          featureType: 'all',
          elementType: 'labels.text.stroke',
          stylers: [{ color: '#1a1a2e' }]
        },
        {
          featureType: 'administrative',
          elementType: 'geometry',
          stylers: [{ color: '#16213e' }]
        },
        {
          featureType: 'landscape',
          elementType: 'geometry',
          stylers: [{ color: '#0f3460' }]
        },
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        },
        {
          featureType: 'poi.business',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        },
        {
          featureType: 'poi',
          elementType: 'geometry',
          stylers: [{ color: '#16213e' }]
        },
        {
          featureType: 'road',
          elementType: 'geometry.fill',
          stylers: [{ color: '#e53e3e' }]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{ color: '#c53030' }]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.fill',
          stylers: [{ color: '#e53e3e' }]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{ color: '#c53030' }]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{ color: '#2d3748' }]
        }
      ]
    });
    addCompanyMarkers(googleMap);
  }, [addCompanyMarkers]);
  useEffect(() => {
    if (!window.google || !window.google.maps) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY }&libraries=geometry,places`;
      script.async = true;
      script.onload = initMap;
      document.body.appendChild(script);
    } else {
      initMap();
    }
  }, [initMap]);
  
  return (
    <div className="dc-map-container">
      <div className="map-plan-container" ref={mapContainerRef}></div>
      <div className="map-legend">
        <div className="legend-item">
          <div className="legend-marker"></div>
          <span>Company Locations</span>
        </div>
        <div className="legend-note">
          Click markers to view company details
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
