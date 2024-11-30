import { resendCode } from "../../../api/auth/resend";

export const handleResend = async (email) => {
  try {
    const response = await resendCode(email);
    return response;
  } catch (error) {
    throw error;
  }
};
