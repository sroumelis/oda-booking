import { combineReducers } from "redux";

import catalog from "./catalog/catalog";
import variations from "./catalog/variations";
import selectedTab from "./selectedTab";
import authentication from "./user/authentication";
import userInfo from "./user/userInfo";
import registration from "./user/registration";
import checkUserEmail from "./user/checkUserEmail";
import editUser from "./user/editUser";
import paymentMethodAdd from "./paymentMethod/add";
import paymentMethodRemove from "./paymentMethod/remove";
import addressAdd from "./address/add";
import addressRemove from "./address/remove";
import orderInfo from "./orderInfo";
import invoiceAdd from "./invoice/add";
import invoiceRemove from "./invoice/remove";
import globalLoader from "./globalLoader";
import confirmationModal from "./confirmationModal";
import stores from "./stores";
import storeById from "./storeById";
import orderStatus from "./orderStatus";
import delivery from "./delivery";
import basket from "./basket";
import takeout from "./takeout";
import enrollCustomer from "./enrollCustomer";

const rootReducer = combineReducers({
  catalog,
  globalLoader,
  confirmationModal,
  variations,
  orderStatus,
  delivery,
  basket,
  enrollCustomer,
  userInfo,
  addressRemove,
  takeout,
  selectedTab,
  invoiceAdd,
  invoiceRemove,
  addressAdd,
  paymentMethodAdd,
  checkUserEmail,
  paymentMethodRemove,
  orderInfo,
  editUser,
  authentication,
  registration,
  stores,
  storeById,
});

export { rootReducer };
