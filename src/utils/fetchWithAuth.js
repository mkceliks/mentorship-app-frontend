import API_BASE_URL, { getRefreshToken, saveTokens, clearTokens, getIdToken } from "./config";

const fetchWithAuth = async (endpoint, options = {}) => {
    let token = getIdToken();
  
    const headers = {
      ...(options.headers || {}),
      ...(token && { "Authorization": `Bearer ${token}` }),
    };
  
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });
  
    if (response.status === 401) {
      const newTokens = await refreshAuthToken();
      if (newTokens) {
        saveTokens(newTokens);
        token = newTokens.id_token;
        const retryHeaders = {
          ...(options.headers || {}),
          ...(token && { "Authorization": `Bearer ${token}` }),
        };
        return await fetch(`${API_BASE_URL}${endpoint}`, {
          ...options,
          headers: retryHeaders,
        });
      } else {
        clearTokens();
        throw new Error("Session expired. Please log in again.");
      }
    }
  
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
  
    const contentType = response.headers.get("Content-Type");
    if (options.responseType === "text" || contentType?.includes("text")) {
      return response.text(); 
    } else if (options.responseType === "json" || contentType?.includes("application/json")) {
      return response.json(); 
    } else {
      return response.text();
    }
  };
  

const refreshAuthToken = async () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) return null;

    const response = await fetch(`${API_BASE_URL}/refresh`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (response.ok) return response.json();
    return null;
};

export default fetchWithAuth;
