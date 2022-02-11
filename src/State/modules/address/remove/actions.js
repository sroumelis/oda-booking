import * as type from "./types";
import { Service } from "./services";
import { dispatchHelper } from "../../../../Utils";

const removeAddress = (id) => {
  return dispatchHelper.dispachRequest(type, () =>
    Service.removeAddress(id)
  );
};
export { removeAddress };
