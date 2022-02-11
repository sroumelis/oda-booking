import { createType } from '../../../../Utils';

const actionName = 'INVOICE_ADD';

export const REQUEST = createType.request(`${actionName}`);
export const SUCCESS = createType.success(`${actionName}`);
export const FAILURE = createType.failure(`${actionName}`);
