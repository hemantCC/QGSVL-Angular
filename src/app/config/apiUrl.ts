import {environment } from 'src/environments/environment';

// export const baseUrl = environment.production? '' : 'http://localhost:8319/';
export const baseUrl = environment.production? '' : 'https://localhost:44388/';
export const loginUrl = baseUrl + 'api/Account/login';
export const registerUrl = baseUrl + 'api/Account/register';
export const directDebitUrl = baseUrl + 'api/Step/DirectDebit';
export const documentsUrl = baseUrl + 'api/Step/Documents';
export const creditCheckValuesUrl = baseUrl + 'api/Step/CreditCheckValues';
export const creditCheckUrl = baseUrl + 'api/Step/CreditCheck';
export const submitDocumentsUrl = baseUrl + 'api/Step/SubmitDocuments';
export const getAllQuoteStatusUrl = baseUrl + 'api/Administrator/GetAllQuoteStatus';
export const getAllQuotesUrl = baseUrl + 'api/Administrator/GetAllQuotes';
export const editQuoteStatusUrl = baseUrl + 'api/Administrator/EditQuoteStatus';
export const getVehicleFiltersUrl = baseUrl + 'api/Vehicle/GetVehicleFilters';
export const getVehiclesUrl = baseUrl + 'api/Vehicle/GetVehicles';
export const getVehicleUrl = baseUrl + 'api/Vehicle/GetVehicle';
export const getUserQuotesUrl = baseUrl + 'api/Quote/GetUserQuotes';
export const generateQuoteUrl = baseUrl + 'api/Quote/GenerateQuote';