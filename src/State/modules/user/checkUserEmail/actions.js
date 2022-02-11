import * as type from './types';
import { Service } from './services';
import { dispatchHelper } from '../../../../Utils';

const checkIfUserExists = (email) => {
  return dispatchHelper.dispachRequest(type, () =>
    Service.checkIfUserExists(email)
  );
};
export { checkIfUserExists };
