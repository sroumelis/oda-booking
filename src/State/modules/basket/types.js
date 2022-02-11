import { createType } from '../../../Utils';

const actionName = 'BASKET';

export const REQUEST = createType.request(`${actionName}`);
export const SUCCESS = createType.success(`${actionName}`);
export const FAILURE = createType.failure(`${actionName}`);
export const SET_BASKET = createType.customAction(`${actionName}`, "SET_BASKET");
