import { createUserManager } from 'redux-oidc';
import { getQueryVariable } from '../Utils/utilities';

const userManagerConfig = {
  client_id: 'oda.online',
  // redirect_uri: `http://localhost:3000/callback?catalogueId=${getQueryVariable(
  //   'catalogueId'
  // )}`,
  // redirect_uri: `http://localhost:3000/callback?catalogueId=123`,
  redirect_uri: process.env.REACT_APP_RELATIVE_PATH
    ? `https://alms.website:8010/${process.env.REACT_APP_RELATIVE_PATH}/callback?catalogueId=123`
    : `http://localhost:3000/callback?catalogueId=123`,
  response_type: 'code',
  scope: 'openid profile offline_access',
  authority: 'https://apis.oda-platforms.com/uat/sts',
  automaticSilentRenew: true,
  filterProtocolClaims: true,
  loadUserInfo: true,
  // post_logout_redirect_uri: `http://localhost:3000/`,
  // post_logout_redirect_uri: `http://localhost:3000?catalogueId=123`,
  post_logout_redirect_uri: process.env.REACT_APP_RELATIVE_PATH
    ? `https://alms.website:8010/${process.env.REACT_APP_RELATIVE_PATH}/?catalogueId=123`
    : `http://localhost:3000/`,
  // post_logout_redirect_uri: `http://localhost:3000?catalogueId=${getQueryVariable(
  //   'catalogueId'
  // )}`,
  //   response_type: 'id_token token',
  // acr_values: `tenant:Payroll`,
  accessTokenExpiringNotificationTime: 4,
  silent_redirect_uri: `${window.location.protocol}//${
    window.location.hostname
  }${window.location.port ? `:${window.location.port}` : ''}/silent_renew`,
};

const userManager = createUserManager(userManagerConfig);

export default userManager;
