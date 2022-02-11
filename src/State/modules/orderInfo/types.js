import { createType } from '../../../Utils';

const actionName = 'ORDER_INFO';

export const REQUEST = createType.request(`${actionName}`);
export const SUCCESS = createType.success(`${actionName}`);
export const FAILURE = createType.failure(`${actionName}`);
export const SET_ORDER_INFO = createType.customAction(`${actionName}`, "SET_ORDER_INFO");
