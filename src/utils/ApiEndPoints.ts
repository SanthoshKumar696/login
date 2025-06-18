// apiEndpoints.ts
const baseURL =import.meta.env.VITE_LOGIN_DOMAIN;

if (!baseURL) {
  console.error("Missing environment variable: REACT_APP_LOGIN_DOMAIN");
  throw new Error("REACT_APP_LOGIN_DOMAIN is not defined in .env file");
}

console.log("REACT_APP_LOGIN_DOMAIN:", baseURL);

const API_ENDPOINTS = {
  LOGIN_ENDPOINT: `${baseURL}/api/User/Login`,
  USERPROFILE_ENDPOINT: `${baseURL}/api/User/profile`,
  USERS_ENDPOINT: `${baseURL}/api/User/GetAllUsers`,
  ROLES_ENDPOINT: `${baseURL}/api/Role`,
  ROLES_PAGES: `${baseURL}/api/Pages`,
  CHANGE_PASSWORD: `${baseURL}/api/User/change-password`,
  RESET_PASSWORD: `${baseURL}/api/User/reset-password`,
  ROLES_ACTIONS: `${baseURL}/api/Actions`,
  PERMISSIONS_ENDPOINT: `${baseURL}/api/Permissions/GetPermission`,
  ADD_PERMISSIONS_ENDPOINT: `${baseURL}/api/Permissions/AddPermission`,
  ADD_USER: `${baseURL}/api/User/AddUser`,
} as const;

export default API_ENDPOINTS;
