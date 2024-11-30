import { jwtDecode } from "jwt-decode";

const API_BASE_URL =
  process.env.REACT_APP_API_URL?.trim() || "https://3tr7zaks42.execute-api.us-east-1.amazonaws.com/staging";

export default API_BASE_URL;

export const saveTokens = (tokens) => {
  localStorage.setItem("access_token", tokens.access_token);
  localStorage.setItem("id_token", tokens.id_token);
  localStorage.setItem("refresh_token", tokens.refresh_token);
};

export const getAccessToken = () => localStorage.getItem("access_token");

export const isTokenExpired = (token) => {
  try {
    const { exp } = jwtDecode(token);
    return Date.now() >= exp * 1000; 
  } catch (e) {
    return true;
  }
};

export const getIdToken = () => {
  const token = localStorage.getItem("id_token");
  if (!token || isTokenExpired(token)) {
    clearTokens();
    return null;
  }
  return token;
};

export const getRefreshToken = () => localStorage.getItem("refresh_token");

export const clearTokens = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("id_token");
  localStorage.removeItem("refresh_token");
};

export const isAuthenticated = () => Boolean(localStorage.getItem("access_token"));

export const fetchAndSetUserInfo = async () => {
  const idToken = getIdToken();
  if (!idToken) {
    clearTokens();
    return null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user info");
    }

    const userInfo = await response.json();
    localStorage.setItem("user_info", JSON.stringify(userInfo));
    return userInfo;
  } catch (error) {
    clearTokens();
    console.error("Error fetching user info:", error);
    return null;
  }
};

export const getUserInfo = () => {
  const userInfo = localStorage.getItem("user_info");
  return userInfo ? JSON.parse(userInfo) : null;
};
