// src/constants.js

export const ReportTypes = [
    { id: "R_STD_ESX", name: "Residential Standard Roof Sketch (ESX Only)", price: 12.00 },
    { id: "R_CPLX_ESX", name: "Residential Complex Roof Sketch (ESX Only)", price: 18.00 },
    { id: "R_STD_PDF", name: "Residential Standard Roof Sketch (ESX + PDF)", price: 18.00 },
    { id: "C_STD_ESX", name: "Commercial Roof Sketch (ESX Only)", price: 20.00 },
    { id: "C_STD_PDF", name: "Commercial Roof Sketch (ESX + PDF Only)", price: 25.00 },
    { id: "WALL_ADDON", name: "Wall Report ESX only <3000sf ", price: 20.00, isAddon: true },
];

export const FacetOptions = [
    '1-20','20+'
];

export const PitchOptions = [
    '2/12','4/12','6/12','8/12','10/12','12/12','16/12'
];