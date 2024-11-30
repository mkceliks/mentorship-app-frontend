import { updateUserInfo } from "../../../api/user-details/updateUserInfo";
import { getIdToken } from "../../../utils/config";
import { setCachedUserInfo } from "../../Authentication/handlers/userInfoCache";

export const handleUpdateUserInfo = async (userDetails) => {
  const token = getIdToken();
  if (!token) throw new Error("User is not authenticated.");

  try {
    await updateUserInfo(token, userDetails);

    setCachedUserInfo(null);

    return;
  } catch (error) {
    console.error("Error updating user info:", error.message);
    throw error;
  }
};
