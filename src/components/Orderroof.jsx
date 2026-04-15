    // src/components/RoofingOrderForm.js
    import React, { useState, useCallback } from "react";
    import CartPage from "./Cartpage";
    import AddressStep from "./Step1";
    import DetailsStep from "./Step2";
    import { ReportTypes } from "./constants"; 
    import SampleRpdf from "../assets/Sample Roof Report.pdf"
    import SampleWpdf from "../assets/Sample-Wall Report.pdf"

    export default function RoofingOrderForm() {
        // --- State Management (All state remains in the parent) ---

        // State for Step 1: Address and Map
        const [address, setAddress] = useState("");
        const [latitude, setLatitude] = useState("");
        const [longitude, setLongitude] = useState("");
        const [isConfirmed, setIsConfirmed] = useState(false);
        const [mapViewMode, setMapViewMode] = useState("satellite");
        const [zoomLevel, setZoomLevel] = useState(1);
        const [locationError, setLocationError] = useState("");

        // State for Step 2: Details and Report Selection
        const [claimName, setClaimName] = useState("");
        const [selectedReports, setSelectedReports] = useState([]);
        const [facets, setFacets] = useState("");
        const [primaryPitch, setPrimaryPitch] = useState("");
        const [secondaryPitch, setSecondaryPitch] = useState("");
        const [expedited, setExpedited] = useState(false);
        const [notes, setNotes] = useState("");
        const [quantity] = useState(1);
        const [uploadedFiles, setUploadedFiles] = useState([]);

        // State for Cart Summary
        const [cartDetails, setCartDetails] = useState(null);

        // --- Geolocation and Map Handlers (Passed to AddressStep) ---

        const updateCoordinatesAndConfirmation = useCallback((lat, lon, newAddress = null) => {
            const parsedLat = parseFloat(lat);
            const parsedLon = parseFloat(lon);

            if (isNaN(parsedLat) || isNaN(parsedLon)) {
                setIsConfirmed(false);
                setLocationError("Latitude and Longitude must be valid numbers.");
                return;
            }

            setLatitude(parsedLat.toFixed(6));
            setLongitude(parsedLon.toFixed(6));
            if (newAddress) setAddress(newAddress);
            setIsConfirmed(true);
            setZoomLevel(17);
            setMapViewMode("satellite");
            setLocationError("Coordinates successfully confirmed! ✅");
        }, []);

        const handleAddressConfirm = async () => {
            if (!address.trim()) {
                alert("Please enter an address.");
                return;
            }

            if (latitude && longitude && isConfirmed && address.includes("Manually")) {
                setLocationError("Using manually confirmed coordinates. Click Reset if you need to look up a new address.");
                return;
            }

            try {
                setLocationError("Fetching coordinates...");
                setIsConfirmed(false);

                const response = await fetch(
                    // Nominatim Geocoding (Address-to-Coordinates)
                    `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(address)}`,
                    { headers: { 'User-Agent': 'RoofingOrderApp/1.0' } }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                if (data.length > 0) {
                    const { lat, lon, display_name } = data[0];
                    updateCoordinatesAndConfirmation(lat, lon, display_name);
                } else {
                    setLocationError("Unable to find this location. Please check the address.");
                    setIsConfirmed(false);
                }
            } catch (err) {
                console.error("Geocoding Error:", err);
                setLocationError("Error fetching location. Try again.");
                setIsConfirmed(false);
            }
        };

        // The entire handleCurrentLocation function is REMOVED as requested.

        const handleLatChange = (e) => {
            setLatitude(e.target.value);
            setIsConfirmed(false);
            setLocationError("Coordinates changed. Click 'Confirm' to load the new map position.");
        };

        const handleLonChange = (e) => {
            setLongitude(e.target.value);
            setIsConfirmed(false);
            setLocationError("Coordinates changed. Click 'Confirm' to load the new map position.");
        };

        const handleCoordinateConfirm = () => {
            updateCoordinatesAndConfirmation(latitude, longitude, "Manually Entered Coordinates");
        };

        const handleResetLocation = () => {
            setAddress("");
            setLatitude("");
            setLongitude("");
            setIsConfirmed(false);
            setLocationError("");
            setZoomLevel(1);
        }

        const getMapEmbedUrl = () => {
            if (!latitude || !longitude) return "";
            const mapType = mapViewMode === "satellite" ? "h" : "m";
            // Keeping the original non-functional-by-default URL structure 
            return `https://maps.google.com/maps?q=${latitude},${longitude}&hl=en&t=${mapType}&z=${zoomLevel}&ie=UTF8&iwloc=B&output=embed`;
        };

        const handleMapModeChange = (mode) => setMapViewMode(mode);
        const handleZoom = (direction) => {
            setZoomLevel(prev => Math.min(20, Math.max(12, prev + direction)));
        };

        // --- File Upload Handlers (Passed to DetailsStep) ---

        const handleFileChange = (e) => {
            const files = Array.from(e.target.files);
            const newFiles = files.map(file => ({
                name: file.name,
                size: file.size,
                type: file.type,
            }));

            if (uploadedFiles.length + newFiles.length > 5) {
                alert("You can upload a maximum of 5 files.");
                return;
            }

            setUploadedFiles(prev => [...prev, ...newFiles]);
        };

        const removeFile = (fileName) => {
            setUploadedFiles(prev => prev.filter(file => file.name !== fileName));
        };

        // --- Order Submission Handler ---

        const isAddToCartDisabled = (
            !isConfirmed ||
            !claimName.trim() ||
            selectedReports.length === 0 ||
            !facets ||
            !primaryPitch.trim()
        );

        const handleAddToCart = () => {
            // Validate required fields
            if (!isConfirmed) {
                alert("Step 1: Please confirm a valid property address and coordinates before adding to cart.");
                return;
            }

            if (!claimName.trim() || selectedReports.length === 0 || !facets || !primaryPitch) {
                alert("Step 2: Please complete all required fields (Claim Name, Select Reports, Number of Facets, Primary Pitch) before adding to cart.");
                return;
            }

            const baseReports = ReportTypes.filter((r) => selectedReports.includes(r.id));
            const subtotal = baseReports.reduce((sum, r) => sum + r.price, 0);
            const expeditedFee = expedited ? 10.0 : 0.0;
            const totalPrice = (subtotal + expeditedFee) * quantity;

            const orderDetails = {
                claimName,
                address,
                latitude,
                longitude,
                expedited,
                notes,
                facets,
                primaryPitch,
                secondaryPitch,
                reports: baseReports,
                uploadedFiles,
                subtotal: subtotal.toFixed(2),
                expeditedFee: expeditedFee.toFixed(2),
                totalPrice: totalPrice.toFixed(2),
                quantity,
            };

            setCartDetails(orderDetails);
            window.scrollTo({ top: 0, behavior: "smooth" });
        };

        // Render OrderSummary component if cartDetails are set
        if (cartDetails) {
            return <CartPage cartDetails={cartDetails} setCartDetails={setCartDetails} />;
        }

        /* --- RENDER FORM --- */
        return (
            <>
                {/* FIXED HEADER SECTION (Only the Main Title) */}
                <div
                    className="border-bottom shadow-lg py-3 mb-3 w-100"
                    style={{
                        backgroundColor: '#ffffff', 
                        position: 'fixed',
                        top: 60, // Adjust this based on your actual Navbar height
                        zIndex: 1020, 
                    }} 
                >
                    <div className="container text-center">
                        <h1 className="fw-bolder text-uppercase" style={{ fontSize: '2rem', margin: 20 }}>
                            <i className="bi bi-house-door-fill me-2"></i> Order Roof Measurement Reports
                        </h1>
                    </div>
                </div>

                {/* MAIN CONTENT SECTION */}
                <section
                    id="roofing-order"
                    className="container"
                    // Add padding-top to compensate for the fixed header height (Navbar + new fixed header)
                    style={{ paddingTop: '260px' }}
                >
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            {/* Sample Reports Section (NOW SCROLLABLE) */}
                            <div className="text-center mb-4" style={{ lineHeight: '1.2' }}>
                                <small className=" d-block mb-1 fw-bold">VIEW SAMPLES (.pdf):</small>
                                   <a 
                                              // USE THE IMPORTED VARIABLE HERE
                                                   href={SampleRpdf} 
                                                   className="text-decoration-none me-3 brand-text fw-bold "
                                                   target="_blank" // Recommended: Opens PDF in new tab
                                                   rel="noopener noreferrer"
                                                 >
                                                   ESX Sample Roof Report (PDF)
                                                 </a>
                                                  <a 
                                                   // USE THE IMPORTED VARIABLE HERE
                                                   href={SampleWpdf} 
                                                   className="text-decoration-none me-3 brand-text fw-bold "
                                                   target="_blank" // Recommended: Opens PDF in new tab
                                                   rel="noopener noreferrer"
                                                 >ESX Sample Wall Report (PDF)</a>
                                <span className="text-white text-opacity-50 text-dark">|</span>
                            </div>
                            
                            <hr className="my-5" />

                            {/* --- STEP 1: Address and Map Verification --- */}
                            <AddressStep
                                address={address}
                                setAddress={setAddress}
                                latitude={latitude}
                                longitude={longitude}
                                handleLatChange={handleLatChange}
                                handleLonChange={handleLonChange}
                                handleCoordinateConfirm={handleCoordinateConfirm}
                                handleAddressConfirm={handleAddressConfirm}
                                // handleCurrentLocation is REMOVED from props
                                handleResetLocation={handleResetLocation}
                                isConfirmed={isConfirmed}
                                locationError={locationError}
                                mapViewMode={mapViewMode}
                                handleMapModeChange={handleMapModeChange}
                                zoomLevel={zoomLevel}
                                handleZoom={handleZoom}
                                getMapEmbedUrl={getMapEmbedUrl}
                                // Pass a null or function to a placeholder prop if AddressStep expects handleCurrentLocation
                                // If AddressStep is a controlled component you may need to update it too.
                            />

                            <hr className="my-5" />

                            {/* --- STEP 2: Order Details and Report Selection (Enhanced) --- */}
                            <DetailsStep
                                claimName={claimName}
                                setClaimName={setClaimName}
                                selectedReports={selectedReports}
                                setSelectedReports={setSelectedReports}
                                facets={facets}
                                setFacets={setFacets}
                                primaryPitch={primaryPitch}
                                setPrimaryPitch={setPrimaryPitch}
                                secondaryPitch={secondaryPitch}
                                setSecondaryPitch={setSecondaryPitch}
                                expedited={expedited}
                                setExpedited={setExpedited}
                                notes={notes}
                                setNotes={setNotes}
                                uploadedFiles={uploadedFiles}
                                handleFileChange={handleFileChange}
                                removeFile={removeFile}
                                handleAddToCart={handleAddToCart}
                                isAddToCartDisabled={isAddToCartDisabled}
                            />

                        </div>
                    </div>
                </section>
            </>
        );
    }