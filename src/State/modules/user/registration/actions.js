import * as type from './types';
import { Service } from './services';
import { dispatchHelper } from '../../../../Utils';

const registerUser = (requestBody) => {
  return dispatchHelper.dispachRequest(type, () =>
    Service.registerUser(requestBody)
  );
};
export { registerUser };
