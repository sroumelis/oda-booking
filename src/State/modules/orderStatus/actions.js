import * as type from "./types";
import { Service } from "./services";
import { dispatchHelper } from "../../../Utils";

const fetchOrderStatus = (storeId, orderId) => {
  return dispatchHelper.dispachRequest(type, () =>
    Service.fetchOrderStatus(storeId, orderId)
  );
};

export { fetchOrderStatus };
