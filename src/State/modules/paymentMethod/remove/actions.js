import * as type from "./types";
import { Service } from "./services";
import { dispatchHelper } from "../../../../Utils";

const removePaymentMethod = (id) => {
  return dispatchHelper.dispachRequest(type, () =>
    Service.removePaymentMethod(id)
  );
};
export { removePaymentMethod };
