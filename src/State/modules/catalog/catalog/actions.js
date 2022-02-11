import * as type from './types';
import { Service } from './services';
import { dispatchHelper } from '../../../../Utils';

const fetchCatalog = (storeId, hash) => {
  return dispatchHelper.dispachRequest(type, () =>
    Service.fetchCatalog(storeId, hash)
  );
};
export { fetchCatalog };
