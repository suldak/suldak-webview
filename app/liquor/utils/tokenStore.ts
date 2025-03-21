let userToken: string | null = null;

export const setToken = (token: string) => {
  userToken = token;
  //console.log("Token set:", token);
};

export const getToken = () => {
  return userToken;
};
