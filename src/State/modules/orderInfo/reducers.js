import { createReducer } from "../../../Utils";
import * as type from "./types";

const initialState = {
  data: {
    deliveryAddress: null,
    deliverInStore: false,
    paymentMethod: null,
    cashOnDelivery: true,
    tip: 'no-tip',
    contactless: false,
    isInvoice: false,
    selectedInvoice: false,
    deliveryUpdates: false,
    orderComments: '',
    addressComments: '',
  },
  isInitialized: false,
};

export default createReducer(initialState, {
  [type.SET_ORDER_INFO](state, action) {
    return {
      ...state,
      data: action.payload.orderInfo,
      isInitialized: true,
    };
  },
  // All other action types result in state being returned
});
