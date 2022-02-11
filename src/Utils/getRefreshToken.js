const getRefreshToken = () => {
  let tokens = '';
  // let tokens = Cookies.get('tokens');
  // tokens = tokens && JSON.parse(Cookies.get('tokens'));

  return tokens.refresh_Token;
};

export default getRefreshToken;
