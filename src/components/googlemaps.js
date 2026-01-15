import React, { useState, useRef, useEffect } from 'react';
import { GOOGLE_MAPS_API_KEY } from '../constants/constant';

const MapComponent = ({ onPlanMarkerAdd }) => {
  const [planmap, setPlanMap] = useState(null);
  const [planmarker, setPlanMarker] = useState(null);
  const mapPlanContainerRef = useRef(null);
  
  useEffect(() => {
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=geometry`;
      script.async = true;

      script.onload = initPlanMap;

      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    } else {
      initPlanMap();
    }
  }, []);


  const initPlanMap = () => {
    const googleMap = new window.google.maps.Map(mapPlanContainerRef.current, {
      center: { lat: 34.5116, lng: -84.9479 },
      zoom: 8,
      styles: [
        {
          featureType: 'landscape',
          elementType: 'geometry',
          stylers: [{ color: '#EFDEB0' }],
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{ color: '#83CCCE' }],
        },
      ],
    });
    setPlanMap(googleMap);
  };



  const handlePlanMarkerDrag = (newPlanMarker) => {
    // You can handle marker drag here if needed
  };

  const handlePlanAddMarkerButtonClick = () => {
    // No need to toggle isSubmitting here
    if (!planmarker && planmap) {
      const center = planmap.getCenter();
      const newPlanMarker = new window.google.maps.Marker({
        position: center,
        map: planmap,
        draggable: true,
        title: "Job Site"
      });

      newPlanMarker.addListener('dragend', () => {
        handlePlanMarkerDrag(newPlanMarker);
      });

      // Notify parent component about marker position
      onPlanMarkerAdd(center.lat(), center.lng());
      setPlanMarker(newPlanMarker);
    }
  };

  return (
    <div>
      <div className="map-plan-container" ref={mapPlanContainerRef}></div>
      <div className="map-plan-button">
        <button 
          type="reset"
          className="btn btn-full add-plan-marker"
          onClick={handlePlanAddMarkerButtonClick}
        >
          Add Marker 
        </button>
      </div>
    </div>
  );
};

export default MapComponent;
