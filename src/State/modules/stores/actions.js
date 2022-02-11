import * as type from "./types";
import { Service } from "./services";
import { dispatchHelper } from "../../../Utils";

const fetchStores = () => {
  return dispatchHelper.dispachRequest(type, () => Service.fetchStores());
};

const setSelectedStore = (storeInfo) => {
  return dispatchHelper.dispachCustomAction(type.SET_SELECTED_STORE, {
    storeInfo,
  });
};

export { fetchStores, setSelectedStore };
