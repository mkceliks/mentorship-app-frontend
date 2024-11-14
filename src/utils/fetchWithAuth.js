import API_BASE_URL, { getAccessToken, getRefreshToken, saveTokens, clearTokens } from "./config";

const fetchWithAuth = async (endpoint, options = {}) => {
    let token = getAccessToken();

    const headers = {
        ...(options.headers || {}),
        "Content-Type": "application/json",
        ...(token && { "Authorization": `Bearer ${token}` }),
    };

    let response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (response.status === 401) {
        const newTokens = await refreshAuthToken();
        if (newTokens) {
            saveTokens(newTokens);
            token = newTokens.access_token;
            const retryHeaders = {
                ...(options.headers || {}),
                "Content-Type": "application/json",
                ...(token && { "Authorization": `Bearer ${token}` }),
            };
            response = await fetch(`${API_BASE_URL}${endpoint}`, {
                ...options,
                headers: retryHeaders,
            });
        } else {
            clearTokens();
            throw new Error("Session expired. Please log in again.");
        }
    }

    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    return response.json();
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
