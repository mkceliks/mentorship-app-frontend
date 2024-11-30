import API_BASE_URL from "../../utils/config";

export const confirmUser = async (email, code) => {
  const requestBody = {
    email,
    code,
  };


  const response = await fetch(`${API_BASE_URL}/confirm`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to confirm. Status: ${response.status} ${errorText}`);
  }

  return response.json();
};
