import { createType } from '../../../../Utils';

const actionName = 'USER_INFO';

export const REQUEST = createType.request(`${actionName}`);
export const SUCCESS = createType.success(`${actionName}`);
export const FAILURE = createType.failure(`${actionName}`);
export const SET_PROFILE_PIC = createType.customAction(`${actionName}`, "SET_PROFILE_PIC");
