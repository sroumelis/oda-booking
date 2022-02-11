import * as type from "./types";
import { Service } from "./services";
import { dispatchHelper } from "../../../Utils";

const enrollCustomer = (brandId, storeId) => {
  return dispatchHelper.dispachRequest(type, () =>
    Service.enrollCustomer(brandId, storeId)
  );
};

export { enrollCustomer };
