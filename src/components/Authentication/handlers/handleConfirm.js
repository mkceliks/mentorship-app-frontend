import { confirmUser } from "../../../api/auth/confirm";

export const handleConfirm = async (email, code) => {
  try {
    const response = await confirmUser(email, code);
    return response;
  } catch (error) {
    throw error;
  }
};
