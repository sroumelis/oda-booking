import * as type from './types';
import { Service } from './services';
import { dispatchHelper } from '../../../../Utils';

const fetchVariations = (requestBody) => {
  return dispatchHelper.dispachRequest(type, () =>
    Service.fetchVariations(requestBody)
  );
};
export { fetchVariations };
