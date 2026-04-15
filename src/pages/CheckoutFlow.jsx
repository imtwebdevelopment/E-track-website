// // src/PropertyForm.js
// import React, { useState, useCallback } from 'react';
// import AddressStep from '../components/Step1';

// export default function PropertyForm() {
//     const [address, setAddress] = useState('');
//     const [latitude, setLatitude] = useState('');
//     const [longitude, setLongitude] = useState('');
//     const [isConfirmed, setIsConfirmed] = useState(false);
//     const [locationError, setLocationError] = useState('');
//     const [mapViewMode, setMapViewMode] = useState('roadmap');
//     const [zoomLevel, setZoomLevel] = useState(16);

//     // Helper functions (Simplified for this example)
//     const handleLatChange = (e) => { setLatitude(e.target.value); setIsConfirmed(false); };
//     const handleLonChange = (e) => { setLongitude(e.target.value); setIsConfirmed(false); };
//     const handleAddressConfirm = () => { setLocationError("Lookup feature not implemented yet."); };
//     const handleCoordinateConfirm = () => { 
//         if (latitude && longitude) {
//             setAddress(`Manually Confirmed Coordinates: ${latitude}, ${longitude}`);
//             setIsConfirmed(true);
//             setLocationError("Coordinates manually confirmed.");
//         }
//     };
//     const handleMapModeChange = (mode) => setMapViewMode(mode);
//     const handleZoom = (delta) => setZoomLevel(prev => Math.max(12, Math.min(20, prev + delta)));

//     const handleResetLocation = () => {
//         setAddress('');
//         setLatitude('');
//         setLongitude('');
//         setIsConfirmed(false);
//         setLocationError('');
//         setZoomLevel(16);
//         setMapViewMode('roadmap');
//     };

//     // --- KEY LOGIC: Use Current Location with OpenStreetMap's Nominatim ---
//     const handleCurrentLocation = () => {
//         if (!('geolocation' in navigator)) {
//             setLocationError("Geolocation is not supported by your browser.");
//             return;
//         }

//         setLocationError("Fetching current location...");
//         setIsConfirmed(false); 

//         navigator.geolocation.getCurrentPosition(
//             async (position) => {
//                 const lat = position.coords.latitude;
//                 const lon = position.coords.longitude;

//                 // 1. Set Coordinates (Crucial for Map display)
//                 setLatitude(lat.toFixed(6));
//                 setLongitude(lon.toFixed(6));
//                 setIsConfirmed(true);
//                 setLocationError("Current location coordinates confirmed.");

//                 // 2. Perform Reverse Geocoding Lookup using Nominatim (Free, No Key)
//                 try {
//                     // Nominatim URL for reverse geocoding
//                     const geoUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;
                    
//                     const response = await fetch(geoUrl);

//                     if (!response.ok) {
//                          throw new Error('Nominatim service failed to respond.');
//                     }
                    
//                     const data = await response.json();
                    
//                     let foundAddress = `Live Location: ${lat.toFixed(4)}, ${lon.toFixed(4)}`; 
                    
//                     if (data.display_name) {
//                         // Success: Use the formatted address from OpenStreetMap
//                         foundAddress = data.display_name; 
//                         setLocationError("Current location confirmed and address retrieved via OpenStreetMap.");
//                     } else {
//                         setLocationError("Coordinates found, but OpenStreetMap failed to find a precise address name.");
//                     }

//                     // 3. Update the 'address' state with the address name
//                     setAddress(foundAddress); 

//                 } catch (error) {
//                     console.error("Nominatim Reverse Geocoding error:", error);
//                     // Fallback display if the network request fails
//                     setAddress(`Address Lookup Failed: ${lat.toFixed(4)}, ${lon.toFixed(4)}`); 
//                     setLocationError(`Address lookup failed. Coordinates confirmed.`);
//                 }
//             },
//             (error) => {
//                 // Standard Geolocation Error Handling
//                 let errorMsg;
//                 switch (error.code) {
//                     case error.PERMISSION_DENIED:
//                         errorMsg = "Geolocation DENIED. Please allow location access in your browser settings.";
//                         break;
//                     case error.POSITION_UNAVAILABLE:
//                         errorMsg = "Location information is unavailable.";
//                         break;
//                     case error.TIMEOUT:
//                         errorMsg = "The request to get user location timed out.";
//                         break;
//                     default:
//                         errorMsg = `An unknown Error occurred: ${error.message}`;
//                 }
//                 setLocationError(errorMsg);
//                 setIsConfirmed(false);
//             }
//         );
//     };
    
//     // Function to generate the Map Embed URL (using Google Maps Embed for simplicity)
//     const getMapEmbedUrl = useCallback(() => {
//         if (!latitude || !longitude) return '';

//         const center = `${latitude},${longitude}`;
//         const marker = `markers=color:red%7Clabel:P%7C${latitude},${longitude}`;
        
//         // This uses the public Google Maps Embed URL (free, but may show a watermark)
//         return `http://googleusercontent.com/maps.google.com/8&center=${center}&z=${zoomLevel}&t=${mapViewMode}&output=embed&${marker}`;
//     }, [latitude, longitude, zoomLevel, mapViewMode]);


//     return (
//         <div className="container pb-5">
//             <AddressStep
//                 address={address}
//                 setAddress={setAddress}
//                 latitude={latitude}
//                 longitude={longitude}
//                 handleLatChange={handleLatChange}
//                 handleLonChange={handleLonChange}
//                 handleCoordinateConfirm={handleCoordinateConfirm}
//                 handleAddressConfirm={handleAddressConfirm}
//                 handleCurrentLocation={handleCurrentLocation}
//                 handleResetLocation={handleResetLocation}
//                 isConfirmed={isConfirmed}
//                 locationError={locationError}
//                 mapViewMode={mapViewMode}
//                 handleMapModeChange={handleMapModeChange}
//                 zoomLevel={zoomLevel}
//                 handleZoom={handleZoom}
//                 getMapEmbedUrl={getMapEmbedUrl}
//             />
//         </div>
//     );
// }