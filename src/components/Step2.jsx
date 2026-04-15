import React from "react";
import { ReportTypes, FacetOptions, PitchOptions } from "./constants";

export default function DetailsStep({
    claimName,
    setClaimName,
    selectedReports,
    setSelectedReports,
    facets,
    setFacets,
    primaryPitch,
    setPrimaryPitch,
    secondaryPitch,
    setSecondaryPitch,
    expedited,
    setExpedited,
    notes,
    setNotes,
    uploadedFiles,
    handleFileChange,
    removeFile,
    handleAddToCart,
    isAddToCartDisabled
}) {
    return (
        <div className="card shadow-lg mb-5 border-0">
            <div className="card-header text-white" style={{ backgroundColor: '#00aaff' }}>
                <h4 className="mb-0 fw-bold"><i className="bi bi-list-check me-2"></i> Step 2: Project Details & Reports</h4>
            </div>
            <div className="card-body p-4">

                {/* Claim Name */}
                <div className="mb-4">
                    <label className="form-label fw-bold">Claim Name / Job Reference*</label>
                    <input
                        type="text"
                        className="form-control"
                        maxLength="50"
                        value={claimName}
                        onChange={(e) => setClaimName(e.target.value)}
                        required
                    />
                </div>

                {/* Reports Selection (Checkbox Group) */}
                <h6 className="fw-bold mb-3 border-bottom pb-2 text-primary">Select Measurement Reports*</h6>
                <div className="mb-4 p-3 rounded border border-primary-subtle" style={{ backgroundColor: '#e6f7ff' }}>
                    {ReportTypes.map((report) => (
                        <div key={report.id} className={`form-check d-flex justify-content-between align-items-center py-2 ${selectedReports.includes(report.id) ? 'text-dark fw-bold' : ''}`}>
                            <div>
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id={report.id}
                                    checked={selectedReports.includes(report.id)}
                                    onChange={() =>
                                        setSelectedReports((prev) =>
                                            prev.includes(report.id) ? prev.filter((id) => id !== report.id) : [...prev, report.id]
                                        )
                                    }
                                />
                                <label htmlFor={report.id} className="ms-2">{report.name}</label>
                            </div>
                            <span className="fw-bold text-dark">${report.price.toFixed(2)}</span>
                        </div>
                    ))}
                    {/* Visual warning if no reports are selected */}
                    {selectedReports.length === 0 && (
                        <small className="text-danger fw-bold">Please select at least one report.</small>
                    )}
                </div>

                {/* Pitch and Facets (Dropdowns) */}
                <div className="row mb-4">
                    <div className="col-md-4 mb-3">
                        <label className="form-label fw-bold">Primary Pitch*</label>
                        <select
                            className="form-select"
                            value={primaryPitch}
                            onChange={(e) => setPrimaryPitch(e.target.value)}
                            required
                        >
                            <option value="">Choose an option</option>
                            {PitchOptions.map(pitch => (
                                <option key={pitch} value={pitch}>{pitch}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-4 mb-3">
                        <label className="form-label fw-bold">Number of Facets*</label>
                        <select
                            className="form-select"
                            value={facets}
                            onChange={(e) => setFacets(e.target.value)}
                            required
                        >
                            <option value="">Choose an option</option>
                            {FacetOptions.map(range => (
                                <option key={range} value={range}>{range}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-4 mb-3">
                        <label className="form-label fw-bold">Secondary Pitch</label>
                        <select
                            className="form-select"
                            value={secondaryPitch}
                            onChange={(e) => setSecondaryPitch(e.target.value)}
                        >
                            <option value="">Optional</option>
                            {PitchOptions.map(pitch => (
                                <option key={pitch} value={pitch}>{pitch}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <hr className="my-4" />

            

                {/* Expedited and Notes */}
                <div className="form-check mb-4">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="expeditedCheck"
                        checked={expedited}
                        onChange={(e) => setExpedited(e.target.checked)}
                    />
                    <label className="form-check-label fw-bold text-danger" htmlFor="expeditedCheck">
                        <i className="bi bi-lightning-fill me-1"></i> Expedited Processing (+$10.00)
                    </label>
                </div>

                <div className="mb-4">
                    <label className="form-label fw-bold">Special Notes / Instructions</label>
                    <textarea
                        className="form-control"
                        rows="3"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Any specific areas to focus on, property access notes, etc."
                    ></textarea>
                </div>

                <hr className="my-5" />

                {/* ADD TO CART BUTTON */}
                <button
                    className={`btn btn-lg w-100 ${isAddToCartDisabled ? 'btn-secondary' : 'btn-success'}`}
                    onClick={handleAddToCart}
                    disabled={isAddToCartDisabled}
                >
                    <i className="bi bi-cart-plus-fill me-2"></i> Add Order to Cart
                </button>
                {isAddToCartDisabled && (
                    <small className="text-danger d-block mt-2 text-center">
                        Please complete all required fields in Step 1 and Step 2.
                    </small>
                )}

            </div>
        </div>
    );
}
