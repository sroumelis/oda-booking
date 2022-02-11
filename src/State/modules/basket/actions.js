import * as type from "./types";
import { Service } from "./services";
import { dispatchHelper } from "../../../Utils";

const setBasket = (basket) => {
  return dispatchHelper.dispachCustomAction(type.SET_BASKET, {
    basket,
  });
};

export { setBasket };
