import * as type from "./types";
import { Service } from "./services";
import { dispatchHelper } from "../../../../Utils";

const removeInvoice = (id) => {
  return dispatchHelper.dispachRequest(type, () =>
    Service.removeInvoice(id)
  );
};
export { removeInvoice };
