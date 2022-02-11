import userManager from "../Utils/userManager";

const authHeader = async () => {
  // return authorization header with jwt token
  const user = await userManager.getUser();
  // return {};
  if (user?.access_token) {
    return {
      Authorization: `${user?.token_type} ${user?.access_token}`,
      "Content-Type": "application/json",
    };
  } else {
    return {"Content-Type": "application/json"};
  }
};

export default authHeader;
