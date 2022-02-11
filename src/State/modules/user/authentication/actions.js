import * as type from './types';
import { Service } from './services';
import { dispatchHelper } from '../../../../Utils';

const isAuthenticated = (requestBody) => {
  return dispatchHelper.dispachCustomAction(type.IS_AUTHENTICATED, {});
};

const isNotAuthenticated = (requestBody) => {
  return dispatchHelper.dispachCustomAction(type.IS_NOT_AUTHENTICATED, {});
};

export { isAuthenticated, isNotAuthenticated };
