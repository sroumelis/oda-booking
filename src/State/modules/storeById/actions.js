import * as type from './types';
import { Service } from './services';
import { dispatchHelper } from '../../../Utils';

const storeById = (id) => {
  return dispatchHelper.dispachRequest(type, () => Service.storeById(id));
};

const setSelectedStore = (storeInfo) => {
  return dispatchHelper.dispachCustomAction(type.SET_SELECTED_STORE, {
    storeInfo,
  });
};

export { storeById, setSelectedStore };
