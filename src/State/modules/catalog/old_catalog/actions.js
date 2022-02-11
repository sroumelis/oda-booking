import * as type from './types';
import { Service } from './services';
import { dispatchHelper } from '../../../../Utils';

const fetchCatalog = (requestBody) => {
  return dispatchHelper.dispachRequest(type, () =>
    Service.fetchCatalog(requestBody)
  );
};
export { fetchCatalog };
