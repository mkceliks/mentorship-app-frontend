import { fetchUserInfo } from "../../../api/auth/me";
import { getIdToken } from "../../../utils/config";

export const handleFetchUserInfo = async () => {
  const token = getIdToken();
  if (!token) throw new Error("User is not authenticated.");

  try {
    const userInfo = await fetchUserInfo(token);
    console.log(userInfo)
    return userInfo;
  } catch (error) {
    console.error("Error fetching user info:", error.message);
    throw error;
  }
};
