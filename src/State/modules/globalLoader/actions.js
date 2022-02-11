import * as type from "./types";
import { Service } from "./services";
import { dispatchHelper } from "../../../Utils";

const setLoader = (isVisible) => {
  return dispatchHelper.dispachCustomAction(type.SET_LOADER, {
    isVisible,
  });
};

export { setLoader };
