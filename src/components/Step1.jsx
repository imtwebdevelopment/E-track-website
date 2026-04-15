import React from "react";

export default function AddressStep({
    address,
    setAddress,
    latitude,
    longitude,
    handleLatChange,
    handleLonChange,
    handleCoordinateConfirm,
    handleAddressConfirm,
    // handleCurrentLocation has been removed
    handleResetLocation,
    isConfirmed,
    locationError,
    mapViewMode,
    handleMapModeChange,
    zoomLevel,
    handleZoom,
    getMapEmbedUrl,
}) {
    // Top margin to account for a fixed header
    const cardStyle = { 
        // Removed unnecessary marginTop here as padding is used in the main container of the parent component
    };

    return (
        <div className="card shadow-lg mt-3 mt-md-5 border-0" style={cardStyle}>
            <div className="card-header text-white" style={{ backgroundColor: '#18a1e6ff' }}>
                <h5 className="mb-0 fw-bold"><i className="bi bi-geo-alt-fill me-2"></i> Step 1: Property Address Confirmation</h5>
            </div>
            <div className="card-body p-3 p-md-4">
                {/* Address Input */}
                <div className="mb-4">
                    <label htmlFor="address" className="form-label fw-bold">1. Enter Partial Address Here*</label>
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        id="address"
                        placeholder="Enter full address here (e.g., 1600 Amphitheatre Parkway)"
                        value={address}
                        onChange={(e) => {
                            setAddress(e.target.value);
                            // Reset confirmation on address change
                        }}
                        required
                    />
                </div>

                {/* CONFIRM AND RESET BUTTONS (Current Location button removed) */}
                <div className="d-flex flex-column flex-md-row mb-4 gap-2">
                    <button
                        className={`btn flex-grow-1 ${isConfirmed && !address.includes("Live") && !address.includes("Manually") ? 'btn-success' : 'btn-primary'}`}
                        onClick={handleAddressConfirm}
                        type="button"
                        disabled={address.trim().length === 0 && !latitude}
                    >
                        <i className="bi bi-search me-1"></i> {isConfirmed && !address.includes("Live") ? 'Address Confirmed (Review Map)' : 'Lookup & Load Map'}
                    </button>

                    <button
                        className="btn btn-outline-danger"
                        onClick={handleResetLocation}
                        type="button"
                    >
                        <i className="bi bi-x-lg"></i> Reset
                    </button>
                </div>

                {/* Latitude and Longitude Inputs */}
                <div className="row mb-3 align-items-end">
                    <div className="col-12 col-md-5 mb-2">
                        <label className="form-label fw-bold small">Latitude (Decimal)*</label>
                        <input
                            type="text"
                            className={`form-control ${isConfirmed ? 'is-valid' : ''}`}
                            placeholder="e.g., 34.052234"
                            value={latitude}
                            onChange={handleLatChange}
                        />
                    </div>
                    <div className="col-12 col-md-5 mb-2">
                        <label className="form-label fw-bold small">Longitude (Decimal)*</label>
                        <input
                            type="text"
                            className={`form-control ${isConfirmed ? 'is-valid' : ''}`}
                            placeholder="e.g., -118.243685"
                            value={longitude}
                            onChange={handleLonChange}
                        />
                    </div>
                    {/* Confirm Button for Coordinates */}
                    <div className="col-12 col-md-2 mb-2">
                        <button
                            className={`btn btn-sm w-100 ${isConfirmed ? 'btn-success' : 'btn-secondary'}`}
                            onClick={handleCoordinateConfirm}
                            type="button"
                            disabled={!latitude.trim() || !longitude.trim() || isConfirmed}
                        >
                            Confirm
                        </button>
                    </div>
                </div>

                {/* Geolocation Status */}
                {locationError && (
                    <div className={`alert ${locationError.includes("DENIED") || locationError.includes("Error") || locationError.includes("Unable to find") ? 'alert-danger' : 'alert-success'} mb-3 p-2 small`}>
                        {locationError}
                    </div>
                )}

                {/* Map Container */}
                <div className="position-relative border rounded overflow-hidden" style={{ height: "400px" }}>
                    {isConfirmed && latitude && longitude ? (
                        <>
                            {/* Map Controls Overlay */}
                            <div className="position-absolute d-flex p-1 p-md-2 bg-white rounded-bottom shadow-sm" style={{ zIndex: 10, left: '5px', top: '0' }}>
                                <div className="btn-group me-1 me-md-2" role="group">
                                    <button className={`btn btn-xs btn-sm ${mapViewMode === 'satellite' ? 'btn-dark' : 'btn-outline-dark'}`} onClick={() => handleMapModeChange('satellite')}>Satellite</button>
                                    <button className={`btn btn-xs btn-sm ${mapViewMode === 'roadmap' ? 'btn-dark' : 'btn-outline-dark'}`} onClick={() => handleMapModeChange('roadmap')}>Map</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-xs btn-sm btn-light border" onClick={() => handleZoom(1)} disabled={zoomLevel >= 20}><i className="bi bi-plus"></i></button>
                                    <button type="button" className="btn btn-xs btn-sm btn-light border text-muted" disabled>{zoomLevel}</button>
                                    <button type="button" className="btn btn-xs btn-sm btn-light border" onClick={() => handleZoom(-1)} disabled={zoomLevel <= 12}><i className="bi bi-dash"></i></button>
                                </div>
                            </div>

                            {/* Map iFrame */}
                            <iframe
                                title="Property Location Map"
                                src={getMapEmbedUrl()}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                            ></iframe>
                        </>
                    ) : (
                        <div className="d-flex flex-column justify-content-center align-items-center bg-light h-100 p-3">
                            <i className="bi bi-map display-5 display-md-3 text-muted mb-3"></i>
                            <p className="text-muted mb-0 text-center">Map preview will load once coordinates are confirmed.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
