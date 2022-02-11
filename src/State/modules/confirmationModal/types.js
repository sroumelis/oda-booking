import { createType } from '../../../Utils';

const actionName = 'MODAL';

export const REQUEST = createType.request(`${actionName}`);
export const SUCCESS = createType.success(`${actionName}`);
export const FAILURE = createType.failure(`${actionName}`);
export const SET_MODAL = createType.customAction(`${actionName}`, "SET_MODAL");
export const CLOSE_MODAL = createType.customAction(`${actionName}`, "CLOSE_MODAL");
