import * as type from "./types";
import { dispatchHelper } from "../../../Utils";

const selectTable = (id) => {
  return dispatchHelper.dispachCustomAction(type.SET_TABLE, id);
};
export { selectTable };
