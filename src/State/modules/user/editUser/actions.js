import * as type from './types';
import { Service } from './services';
import { dispatchHelper } from '../../../../Utils';

const editUser = (body) => {
  return dispatchHelper.dispachRequest(type, () =>
    Service.editUser(body)
  );
};

export { editUser };
