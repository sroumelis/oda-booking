import { createType } from '../../../../Utils';

const actionName = 'ADDRESS_REMOVE';

export const REQUEST = createType.request(`${actionName}`);
export const SUCCESS = createType.success(`${actionName}`);
export const FAILURE = createType.failure(`${actionName}`);
