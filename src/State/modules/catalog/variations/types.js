import { createType } from '../../../../Utils';

const actionName = 'FETCH_VARIATIONS';

export const REQUEST = createType.request(`${actionName}`);
export const SUCCESS = createType.success(`${actionName}`);
export const FAILURE = createType.failure(`${actionName}`);
