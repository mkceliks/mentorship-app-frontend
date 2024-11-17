import { fetchUserInfo } from "../../../api/auth/me";
import { getAccessToken } from "../../../utils/config";

export const handleFetchUserInfo = async () => {
  const token = getAccessToken();
  if (!token) throw new Error("User is not authenticated.");

  try {
    const userInfo = await fetchUserInfo(token);
    return userInfo;
  } catch (error) {
    console.error("Error fetching user info:", error.message);
    throw error;
  }
};
