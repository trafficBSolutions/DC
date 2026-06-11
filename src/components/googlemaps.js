import { useRef, useEffect, useCallback } from 'react';
import { GOOGLE_MAPS_API_KEY } from '../constants/constant';
import { useNavigate } from 'react-router-dom';
import images from '../utils/images';
const companies = [
    { name: 'Calhoun Truck Repair', address: '186 White Hill Dr, Calhoun, GA 30701', lat: 34.5110747, lng: -85.0268185, type: 'business' },
    { name: 'CrossFit Calhoun', address: '450 Elm St, Calhoun, GA 30701', lat: 34.4935451, lng: -84.9513341, type: 'business' },
    { name: 'CrossFit Trackside', address: '120 N King St Unit 4, Calhoun, GA 30701', lat: 34.5035796, lng: -84.9542247, type: 'business' },
    { name: 'CR Coatings LLC', address: '1706 Red Bud Rd NE, Calhoun, GA 30701', lat: 34.5118638, lng: -84.9134653, type: 'business' },
    { name: 'Fair`s Auto Service', address: '101 Westwind Industrial Dr, Calhoun, GA 30701', lat: 34.4822262, lng: -84.9720310, type: 'business' },
    { name: 'First Baptist Church of Calhoun', address: '411 College St, Calhoun, GA 30701', lat: 34.5067400, lng: -84.9485381, type: 'business' },
    { name: 'Good Samaritans of Gordon County, Inc.', address: '373 Morrow Rd SE, Calhoun, GA 30701', lat: 34.4562202, lng: -84.9073770, type: 'business' },
    { name: 'Landscape Creations', address: '1400 US-41, Calhoun, GA 30701', lat: 34.4705703, lng: -84.9340650, type: 'business' },
    { name: 'Morning Pointe of Calhoun', address: '660 Jolly Rd NW, Calhoun, GA 30701', lat: 34.5336510, lng: -84.9393737, type: 'business' },
    { name: 'Muse Land Services LLC', address: '203 Holbrook Rd NW, Calhoun, GA 30701', lat: 34.4903198, lng: -85.0294600, type: 'business' },
    { name: 'Peel Aesthetics', address: '668 Red Bud Rd NE, Calhoun, GA 30701', lat: 34.5139624, lng: -84.9335125, type: 'business' },
    { name: 'Riverview Baptist Church', address: '141 Liberty Rd SW, Calhoun, GA 30701', lat: 34.4583470, lng: -84.9499763, type: 'business' },
    { name: 'Traffic & Barrier Solutions, LLC', address: '721 N Wall St, Calhoun, GA 30701', lat: 34.5116333, lng: -84.9481199, type: 'business' },
    { name: 'Trinity Baptist Church', address: '1170 Rome Rd SW, Calhoun, GA 30701', lat: 34.4668436, lng: -84.9757552, type: 'business' },
    { name: 'X4 Fitness Calhoun', address: '120 N King St Suite 4, Calhoun, GA 30701', lat: 34.5035778, lng: -84.9544540, type: 'business' },
    { name: 'Yellow Jacket Drive-In', address: '159 Drive-In Way, Calhoun, GA 30701', lat: 34.4977651, lng: -84.9633772, type: 'business' },
    { name: 'Statement Marine LLC', address: '1979 Wild Acres Road, Largo, FL 33771', lat: 27.9053, lng: -82.7717, type: 'business' },
    // Churches of Gordon County
    { name: 'Agape Baptist Church', address: '11300 U.S 41, Calhoun, GA 30701', lat: 34.5980, lng: -84.9350, type: 'church', pastor: 'Mitchell McDougle', phone: '(706) 629-5389' },
    { name: 'Antioch Baptist Church', address: '2666 Dews Pond Rd SE, Calhoun, GA 30701', lat: 34.4650, lng: -84.9100, type: 'church', pastor: 'Derron Brown', phone: '(706) 625-3866' },
    { name: 'Belmont Baptist Church', address: '275 W Belmont Dr, Calhoun, GA 30701', lat: 34.5050, lng: -84.9600, type: 'church', pastor: 'Luke Brown', phone: '(706) 629-2466' },
    { name: 'Bethesda Baptist Church', address: '146 Bethesda Church Rd NE, Calhoun, GA 30701', lat: 34.5200, lng: -84.9300, type: 'church', pastor: 'Wesley Hunt', phone: '(770) 548-2466' },
    { name: 'Bethlehem Baptist Church', address: '210 Bethlehem Church Rd SE, Calhoun, GA 30701', lat: 34.4750, lng: -84.9200, type: 'church', pastor: 'Ronnie Wells', phone: '' },
    { name: 'Blackwood Baptist Church', address: '4921 Fairmount Hwy SE, Calhoun, GA 30701', lat: 34.4300, lng: -84.8800, type: 'church', pastor: 'Bryon Reeves', phone: '(706) 629-4493' },
    { name: 'Calhoun First Baptist Church', address: '411 College St, Calhoun, GA 30701', lat: 34.5067, lng: -84.9485, type: 'church', pastor: 'John Barber', phone: '(706) 629-7714' },
    { name: 'Mount Calvary Baptist Church', address: '596 Pleasant Valley Rd SE, Fairmount, GA 30139', lat: 34.4400, lng: -84.8900, type: 'church', pastor: 'Larry Peace', phone: '(770) 561-9392' },
    { name: 'Corinth Baptist Church', address: '778 Corinth Rd NE, Resaca, GA 30735', lat: 34.5700, lng: -84.9100, type: 'church', pastor: 'Dino Bishop', phone: '' },
    { name: 'Damascus Baptist Church', address: '152 Damascus Rd NE, Calhoun, GA 30701', lat: 34.5250, lng: -84.9250, type: 'church', pastor: 'Terry Trivette', phone: '(706) 629-9146' },
    { name: 'Eastgate Baptist Church', address: '1001 Curtis Pkwy SE, Calhoun, GA 30701', lat: 34.4900, lng: -84.9350, type: 'church', pastor: 'Kenny Rogers', phone: '(706) 629-3458' },
    { name: 'Echota Baptist Church', address: '35 College Cir, Calhoun, GA 30701', lat: 34.5060, lng: -84.9500, type: 'church', pastor: '', phone: '(706) 629-2028' },
    { name: 'Fairmount First Baptist Church', address: '176 Peachtree St, Fairmount, GA 30139', lat: 34.4380, lng: -84.7040, type: 'church', pastor: 'Mark Owens', phone: '(678) 879-3563' },
    { name: 'Fellowship Baptist Church', address: '796 Plainville Rd SW, Plainville, GA 30733', lat: 34.4100, lng: -84.9800, type: 'church', pastor: 'Barry Adcock', phone: '(706) 802-0202' },
    { name: 'Heritage Baptist Church', address: '345 Curtis Pkwy SE, Calhoun, GA 30701', lat: 34.4980, lng: -84.9420, type: 'church', pastor: 'Shane Parrott', phone: '(706) 629-0060' },
    { name: 'Hill City Baptist Church', address: '1411 Hill City Rd, Resaca, GA 30735', lat: 34.5600, lng: -84.9400, type: 'church', pastor: 'Barry Brock', phone: '(706) 625-2770' },
    { name: 'Maranatha Baptist Church', address: '535 Chatsworth Hwy 225 NE, Calhoun, GA 30701', lat: 34.5300, lng: -84.9150, type: 'church', pastor: 'Richard Webster', phone: '(706) 602-8766' },
    { name: 'Meadowdale Baptist Church', address: '1811 Rome Rd SW, Calhoun, GA 30701', lat: 34.4550, lng: -84.9900, type: 'church', pastor: 'Adam Ganong', phone: '(706) 629-9997' },
    { name: 'Mount Olive Baptist Church', address: '881 Covington Bridge Rd SE, Fairmount, GA 30139', lat: 34.4200, lng: -84.8700, type: 'church', pastor: 'John Leatherwood', phone: '(770) 324-6384' },
    { name: 'New Town Baptist Church', address: '897 Newtown Church Rd SE, Calhoun, GA 30701', lat: 34.4600, lng: -84.9050, type: 'church', pastor: 'Brandon Bishop', phone: '(706) 629-4641' },
    { name: 'New Zion Baptist Church', address: '568 Roland Hayes Pkwy SW, Calhoun, GA 30701', lat: 34.4850, lng: -84.9650, type: 'church', pastor: 'Gary Hibberts', phone: '(770) 324-2992' },
    { name: 'Oakman Baptist Church', address: '2706 US Hwy 411 NE, Oakman, GA 30734', lat: 34.5500, lng: -84.8600, type: 'church', pastor: 'Wayne Neal', phone: '(706) 334-2606' },
    { name: 'Oostanaula Baptist Church', address: '157 Old Rome Dalton Rd NW, Calhoun, GA 30701', lat: 34.5150, lng: -84.9700, type: 'church', pastor: 'Clint Jones', phone: '(706) 629-9222' },
    { name: 'Plainville Unity Baptist Church', address: '165 River Bend Rd SW, Plainville, GA 30733', lat: 34.4050, lng: -84.9750, type: 'church', pastor: 'Clark Bunch', phone: '(706) 232-1290' },
    { name: 'Pleasant Hill Baptist Church', address: '574 Pleasant Hill Rd NE, Ranger, GA 30734', lat: 34.5450, lng: -84.8700, type: 'church', pastor: 'David Peeler', phone: '(706) 602-8894' },
    { name: 'Pleasant Valley Baptist Church', address: '3882 Red Bud Rd NE, Calhoun, GA 30701', lat: 34.5400, lng: -84.8950, type: 'church', pastor: '', phone: '(706) 624-0198' },
    { name: 'Reeves Baptist Church', address: '951 Reeves Station Rd SW, Calhoun, GA 30701', lat: 34.4500, lng: -84.9950, type: 'church', pastor: 'Jim Burns', phone: '' },
    { name: 'Resaca First Baptist Church', address: '3180 Battlefield Pkwy NE, Resaca, GA 30735', lat: 34.5750, lng: -84.9350, type: 'church', pastor: 'Harold Blackstock', phone: '(706) 629-0847' },
    { name: 'Riverview Baptist Church (Gordon County)', address: '141 Liberty Rd SW, Calhoun, GA 30701', lat: 34.4585, lng: -84.9502, type: 'church', pastor: 'Josh Pilgrim', phone: '(706) 624-1811' },
    { name: 'Sonoraville Baptist Church', address: '262 Old Fairmount Rd SE, Calhoun, GA 30701', lat: 34.4700, lng: -84.9100, type: 'church', pastor: 'Jamey Hunt', phone: '(706) 629-0840' },
    { name: 'South Calhoun Baptist Church', address: '500 Pine St, Calhoun, GA 30701', lat: 34.4950, lng: -84.9500, type: 'church', pastor: 'Jason Pace', phone: '(706) 629-5220' },
    { name: 'Sugar Valley Baptist Church', address: '3742 Sugar Valley Rd NW, Sugar Valley, GA 30746', lat: 34.5350, lng: -85.0200, type: 'church', pastor: 'Mitch Phillips', phone: '(706) 629-0893' },
    { name: 'Trinity Baptist Church (Gordon County)', address: '1170 Rome Rd SW, Calhoun, GA 30701', lat: 34.4670, lng: -84.9760, type: 'church', pastor: 'Jerry Adair', phone: '(706) 625-5683' },
    { name: 'True North Baptist Church', address: '225 W Line St, Calhoun, GA 30701', lat: 34.5020, lng: -84.9550, type: 'church', pastor: 'Steven Hare', phone: '(706) 879-1955' },
    { name: 'West Union Baptist Church', address: '1560 Everette Springs Rd NE, Calhoun, GA 30701', lat: 34.5500, lng: -84.9000, type: 'church', pastor: '', phone: '(706) 629-8623' }
  ];
const MapComponent = () => {
    const navigate = useNavigate();
    const mapContainerRef = useRef(null);
  
  // Initialize the Google Map

  const addCompanyMarkers = useCallback((map) => {
    companies.forEach(company => {
      const isChurch = company.type === 'church';
      const markerColor = isChurch ? '#4a90d9' : '#e53e3e';

      const marker = new window.google.maps.Marker({
        position: { lat: company.lat, lng: company.lng },
        map: map,
        title: company.name,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
              <circle cx="15" cy="15" r="12" fill="${markerColor}" stroke="#ffffff" stroke-width="2"/>
              ${isChurch ? '<text x="15" y="20" text-anchor="middle" fill="white" font-size="14" font-weight="bold">✝</text>' : '<circle cx="15" cy="15" r="6" fill="#ffffff"/>'}
            </svg>
          `),
          scaledSize: new window.google.maps.Size(30, 30),
          anchor: new window.google.maps.Point(15, 15)
        }
      });

      let infoContent = '';
      if (isChurch) {
        infoContent = `
          <div style="padding: 15px; font-family: Arial, sans-serif; text-align: center; max-width: 250px;">
            <h3 style="margin: 0 0 8px 0; color: #1a1a2e; font-size: 16px;">${company.name}</h3>
            ${company.pastor ? `<p style="margin: 0 0 4px 0; color: #444; font-size: 13px;"><strong>Pastor:</strong> ${company.pastor}</p>` : ''}
            <p style="margin: 0 0 4px 0; color: #666; font-size: 13px;">${company.address}</p>
            ${company.phone ? `<p style="margin: 0 0 8px 0; color: #666; font-size: 13px;"><strong>Phone:</strong> ${company.phone}</p>` : ''}
          </div>
        `;
      } else {
        infoContent = `
          <div style="padding: 15px; font-family: Arial, sans-serif; text-align: center; max-width: 250px;">
            <img src="${images[`${company.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.svg`] || ''}" 
                 style="max-height: 60px; max-width: 100%; margin-bottom: 10px; object-fit: contain;" 
                 onerror="this.style.display='none'" />
            <h3 style="margin: 0 0 8px 0; color: #1a1a2e; font-size: 16px;">${company.name}</h3>
            <p style="margin: 0 0 8px 0; color: #666; font-size: 14px;">${company.address}</p>
            <button onclick="window.navigateToCompany('${company.name}')" 
                    style="background: #e53e3e; color: white; border: none; padding: 8px 16px; 
                           border-radius: 4px; cursor: pointer; font-size: 14px;">
              View Profile
            </button>
          </div>
        `;
      }

      const infoWindow = new window.google.maps.InfoWindow({ content: infoContent });

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
          <span>Business Locations</span>
        </div>
        <div className="legend-item">
          <div className="legend-marker church"></div>
          <span>Churches</span>
        </div>
        <div className="legend-note">
          Click markers to view details
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
