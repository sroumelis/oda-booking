import * as type from "./types";
import { Service } from "./services";
import { dispatchHelper } from "../../../Utils";

const submitTakeoutOrder = (requestBody) => {
  return dispatchHelper.dispachRequest(type, () => Service.postOrder(requestBody));
};

export { submitTakeoutOrder };
