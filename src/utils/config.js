const API_BASE_URL = process.env.REACT_APP_STAGE === "staging"
    ? process.env.REACT_APP_STAGING_API_URL
    : process.env.REACT_APP_PROD_API_URL;

export default API_BASE_URL;