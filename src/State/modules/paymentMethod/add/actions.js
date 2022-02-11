import * as type from "./types";
import { Service } from "./services";
import { dispatchHelper } from "../../../../Utils";

const addPaymentMethod = (requestBody) => {
  return dispatchHelper.dispachRequest(type, () =>
    Service.addPaymentMethod(requestBody)
  );
};
export { addPaymentMethod };
