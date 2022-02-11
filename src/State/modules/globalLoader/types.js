import { createType } from '../../../Utils';

const actionName = 'LOADER';

export const REQUEST = createType.request(`${actionName}`);
export const SUCCESS = createType.success(`${actionName}`);
export const FAILURE = createType.failure(`${actionName}`);
export const SET_LOADER = createType.customAction(`${actionName}`, "SET_LOADER");
