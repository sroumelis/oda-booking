import * as type from './types';
import { Service } from './services';
import { dispatchHelper } from '../../../../Utils';

const fetchUserInfo = (preventOrderInfoUpdate) => {
  return dispatchHelper.dispachRequest(type, () =>
    Service.registerUser(preventOrderInfoUpdate)
  );
};

const setProfilePicture = (profilePicture) => {
  return dispatchHelper.dispachCustomAction(type.SET_PROFILE_PIC, {
    profilePicture,
  });
};
export { fetchUserInfo, setProfilePicture };
