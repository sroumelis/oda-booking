import * as type from "./types";
import { Service } from "./services";
import { dispatchHelper } from "../../../Utils";

const setModal = (data) => {
  return dispatchHelper.dispachCustomAction(type.SET_MODAL, {
    data,
  });
};

const closeModal = () => {
  return dispatchHelper.dispachCustomAction(type.CLOSE_MODAL, {});
};

export { setModal, closeModal };
