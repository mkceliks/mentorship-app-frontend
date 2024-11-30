import API_BASE_URL from "../../utils/config";

export const updateUserInfo = async (token, userDetails) => {
  const response = await fetch(`${API_BASE_URL}/profile-update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userDetails),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to update user info. Status: ${response.status} ${response.statusText} - ${errorText}`);
  }

  return
};
