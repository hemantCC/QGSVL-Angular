import {environment } from 'src/environments/environment';

export const baseUrl = environment.production? '' : 'http://localhost:8319/';
export const loginUrl = baseUrl + 'api/Account/login';
export const registerUrl = baseUrl + 'api/Account/register';