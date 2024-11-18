import { fetchUserInfo } from "../../../api/auth/me";
import { getIdToken } from "../../../utils/config";
import { getCachedUserInfo, setCachedUserInfo } from "./userInfoCache";

export const handleFetchUserInfo = async () => {
  const cachedUser = getCachedUserInfo();
  if (cachedUser) return cachedUser;

  const token = getIdToken();
  if (!token) throw new Error("User is not authenticated.");

  try {
    const userInfo = await fetchUserInfo(token);
    setCachedUserInfo(userInfo);
    return userInfo;
  } catch (error) {
    console.error("Error fetching user info:", error.message);
    throw error;
  }
};