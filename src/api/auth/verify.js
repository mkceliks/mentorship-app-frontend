import API_BASE_URL from "../../utils/config";

export const resendVerificationEmail = async (email) => {
  const response = await fetch(`${API_BASE_URL}/resend-verification`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to resend verification email: ${response.status} ${errorText}`);
  }

  return response.json();
};
