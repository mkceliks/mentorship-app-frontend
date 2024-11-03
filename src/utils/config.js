const API_BASE_URL = process.env.REACT_APP_STAGE === "staging"
    ? process.env.REACT_APP_STAGING_API_URL
    : process.env.REACT_APP_PROD_API_URL;

export default API_BASE_URL;

export const saveTokens = (tokens) => {
    localStorage.setItem("access_token", tokens.access_token);
    localStorage.setItem("id_token", tokens.id_token);
    localStorage.setItem("refresh_token", tokens.refresh_token);
};

export const getAccessToken = () => localStorage.getItem("access_token");

export const clearTokens = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("refresh_token");
};

export const isAuthenticated = () => Boolean(localStorage.getItem("access_token"));
