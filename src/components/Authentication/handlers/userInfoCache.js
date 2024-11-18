let cachedUserInfo = null;

export const getCachedUserInfo = () => cachedUserInfo;

export const setCachedUserInfo = (userInfo) => {
  cachedUserInfo = userInfo;
};