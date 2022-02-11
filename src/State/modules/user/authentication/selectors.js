import { createSelector } from 'reselect';

const authentication = (state) => state.authentication;

const getAuthentication = createSelector(
  authentication,
  (authenticationState) => {
    return authenticationState?.isAuthenticated || false;
  }
);

export { getAuthentication };
