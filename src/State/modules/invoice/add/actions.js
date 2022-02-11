import * as type from "./types";
import { Service } from "./services";
import { dispatchHelper } from "../../../../Utils";

const addInvoice = (requestBody) => {
  return dispatchHelper.dispachRequest(type, () =>
    Service.addInvoice(requestBody)
  );
};
export { addInvoice };
