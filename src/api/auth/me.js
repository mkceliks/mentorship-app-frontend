import API_BASE_URL from "../../utils/config";

export const fetchUserInfo = async (token) => {
  const response = await fetch(`${API_BASE_URL}/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch user info. Status: ${response.status} ${response.statusText} - ${errorText}`);
  }

  return response.json();
};
