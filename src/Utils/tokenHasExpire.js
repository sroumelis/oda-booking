const tokenHasExpire = () => {
  // return authorization header with jwt token
  // const tokens = Cookies.get('tokens');
  // if (!tokens) {
  //   return false;
  // }
  // const lastTimestamp = JSON.parse(tokens).expires_In;
  // const currentTimestamp = new Date().getTime();
  // return currentTimestamp > lastTimestamp;
};

export default tokenHasExpire;
