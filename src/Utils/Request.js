/* eslint-disable no-use-before-define */
// eslint-disable-next-line import/no-unresolved
import authHeader from "./authHeader";
import getRefreshToken from "./getRefreshToken";
import tokenHasExpire from "./tokenHasExpire";
import { oidc_logout } from "./utilities";

// const _apiHost = process.env.REACT_APP_API_URL;
const logSuccessfullCalls = true;

const logCall = async (request, url) => {
  console.log("logging the request call");
  if (logSuccessfullCalls && request && Object.keys(request)) {
    let requestsList = JSON.parse(localStorage.getItem("requestsLogs"));
    if (!requestsList) {
      requestsList = {};
    }
    requestsList[url] = request;

    localStorage.setItem("requestsLogs", JSON.stringify(requestsList));
  }
};

const parseJwt = (token) => {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

const getUserId = () => {
  // const tokens = Cookies.get('tokens');
  // if (!tokens) return '';
  // const id_Token = parseJwt(JSON.parse(tokens).id_Token);
  // return id_Token.sub;
};

const objectToQueryString = (obj) => {
  return Object.keys(obj)
    .map((key) => key + "=" + obj[key])
    .join("&");
};

// eslint-disable-next-line no-unused-vars
const dologout = async () => {
  // const results = await logout();
  // Cookies.clear('tokens');
  // if (global.window) {
  //   global.window.location.href = results.uri;
  // }
};

const generateErrorResponse = (error) => {
  return error.text().then((text) => {
    const exception = JSON.parse(text)?.ExceptionMessage;
    if (exception?.length) {
      return {
        status: "error",
        code: JSON.parse(exception).status,
        message: JSON.parse(exception).message,
      };
    }
    return {
      status: "error",
      code: JSON.parse(text).StatusCode,
      message: JSON.parse(text).Message,
      exceptionMessage: JSON.parse(text)?.ExceptionMessage,
      rawText: text,
      // exception: JSON?.parse(text)?.ExceptionMessage,
    };
  });
};

const handleResponse = async (response, url) => {
  if (!response.ok) {
    if (response.status === 401) {
      // auto logout if 401 response returned from api
      global.window.location.href = window.location.hostname;
      // when unauthorized the user is logged out.
      // localStorage.setItem("cached-profile-picture", "");
      // oidc_logout();
    } else if (response.status === 500 && global.window) {
      // clear cookie;
      // global.window.location.href = window.location.hostname;
    }
    const error = response;
    return generateErrorResponse(error);
  }
  return response.text().then((text) => {
    // logCall(text, url);
    return text && JSON.parse(text);
  });
};

const request = async (url, params, method = "GET") => {
  const options = {
    method,
    headers: await authHeader(),
  };

  if (params) {
    if (params.header) {
      options.headers = params.header;
      delete params.header;
    }
    if (method === "GET") {
      url += "?" + objectToQueryString(params);
    } else {
      options.body = JSON.stringify(params.body);
    }
  }

  const response = await fetch(url, options);
  return handleResponse(response, url);
};

const requestRedirectUri = async (url, params, method = "POST") => {
  const options = {
    method,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  };

  options.body = params.body;

  const response = await fetch(url, options);

  return handleResponse(response);
};

const requestLogin = async (url, params, method = "POST") => {
  const options = {
    method,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  };

  options.body = params.body;

  const response = await fetch(url, options);

  return handleResponse(response);
};

const login = (url, params) => {
  return requestLogin(url, params);
};

const logout = async () => {
  // const cookiesData = Cookies.get('tokens');
  // const tokenId = JSON.parse(cookiesData).id_Token;
  // const options = {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: {
  //     data: {
  //       idToken: tokenId,
  //       postLogoutRedirectUri: process.env.REACT_APP_CALLBACK_URL,
  //     },
  //   },
  // };
  // const url = '/oauth2/logout';
  // // localStorage.removeItem('user');
  // localStorage.removeItem('lastRoute');
  // if (typeof options.body !== 'string' || !(options.body instanceof String)) {
  //   options.body = JSON.stringify(options.body);
  // }
  // const response = await fetch( url, options);
  // // eslint-disable-next-line no-restricted-globals
  // // if (response) location.reload(true);
  // return handleResponse(response);
};

const refreshToken = async () => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: "RefreshToken=" + getRefreshToken() + "&Channel=Web",
  };

  const url = "/oauth2/refreshtoken";

  const response = await fetch(url, options);
  const results = await handleResponse(response);
  const date = new Date();
  const timestamp = date.getTime();
  results.expires_In = timestamp + (results.expires_In - 120000);
  // Cookies.set('tokens', JSON.stringify(results));
};

const get = async (url, params) => {
  if (tokenHasExpire()) {
    await refreshToken();
  }

  return request(url, params);
};

const post = async (url, params) => {
  if (tokenHasExpire()) {
    await refreshToken();
  }
  return request(url, params, "POST");
};

const put = async (url, params) => {
  return request(url, params, "PUT");
};

const remove = async (url, params) => {
  if (tokenHasExpire()) {
    await refreshToken();
  }
  return request(url, params, "DELETE");
};

export default {
  requestRedirectUri,
  login,
  logout,
  get,
  post,
  put,
  remove,
  getUserId,
};
