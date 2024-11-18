import API_BASE_URL from "../../utils/config";

export const resendCode = async (email) => {
  const requestBody = {
    email,
  };

  console.log("Request Body for Resend:", JSON.stringify(requestBody, null, 2));

  const response = await fetch(`${API_BASE_URL}/resend`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to resend code. Status: ${response.status} ${errorText}`);
  }

  return response.json();
};
