import * as type from "./types";
import { Service } from "./services";
import { dispatchHelper } from "../../../Utils";

const setOrderInfo = (orderInfo) => {
  return dispatchHelper.dispachCustomAction(type.SET_ORDER_INFO, {
    orderInfo,
  });
};

export { setOrderInfo };
