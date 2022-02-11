import { createType } from '../../../Utils';

const actionName = 'STORE_BY_ID';

export const REQUEST = createType.request(`${actionName}`);
export const SUCCESS = createType.success(`${actionName}`);
export const FAILURE = createType.failure(`${actionName}`);
export const SET_SELECTED_STORE = createType.customAction(
  `${actionName}`,
  'SET_SELECTED_STORE'
);
