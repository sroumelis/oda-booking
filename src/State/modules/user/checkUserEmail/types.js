import { createType } from '../../../../Utils';

const actionName = 'CHECK_USER_EMAIL';

export const REQUEST = createType.request(`${actionName}`);
export const SUCCESS = createType.success(`${actionName}`);
export const FAILURE = createType.failure(`${actionName}`);
