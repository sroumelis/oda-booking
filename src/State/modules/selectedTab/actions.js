import * as type from "./types";
import { Service } from "./services";
import { dispatchHelper } from "../../../Utils";

const selectTab = (tabName) => {
  return dispatchHelper.dispachCustomAction(type.SET_TAB, { tabName });
};
export { selectTab };
