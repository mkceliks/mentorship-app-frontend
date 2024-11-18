import { resendCode } from "../../../api/auth/resend";

export const handleResend = async (email) => {
  try {
    const response = await resendCode(email);
    console.log("Resend successful:", response);
    return response;
  } catch (error) {
    console.error("Error during resend:", error.message);
    throw error;
  }
};
