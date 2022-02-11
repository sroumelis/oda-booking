import * as type from "./types";
import { Service } from "./services";
import { dispatchHelper } from "../../../Utils";

const submitDeliveryOrder = (requestBody) => {
  return dispatchHelper.dispachRequest(type, () => Service.postOrder(requestBody));
};

export { submitDeliveryOrder };
