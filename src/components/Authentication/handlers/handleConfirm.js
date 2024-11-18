import { confirmUser } from "../../../api/auth/confirm";

export const handleConfirm = async (email, code) => {
  try {
    const response = await confirmUser(email, code);
    console.log("Confirmation successful:", response);
    return response;
  } catch (error) {
    console.error("Error during confirmation:", error.message);
    throw error;
  }
};
