import { createType } from '../../../../Utils';

const actionName = 'PAYMENT_METHOD_ADD';

export const REQUEST = createType.request(`${actionName}`);
export const SUCCESS = createType.success(`${actionName}`);
export const FAILURE = createType.failure(`${actionName}`);
