import * as type from "./types";
import { Service } from "./services";
import { dispatchHelper } from "../../../../Utils";

const addAddress = (requestBody) => {
  return dispatchHelper.dispachRequest(type, () =>
    Service.addAddress(requestBody)
  );
};
export { addAddress };
