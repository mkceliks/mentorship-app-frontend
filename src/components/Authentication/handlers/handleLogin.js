import { loginUser } from "../../../api/auth/login";
import { saveTokens } from "../../../utils/config";

export const handleLogin = async (email, password) => {
  try {
    const tokens = await loginUser(email, password);

    saveTokens(tokens);

    return true;
  } catch (error) {
    console.error("Error during login:", error.message);
    throw error;
  }
};
