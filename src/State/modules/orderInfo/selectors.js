import { createSelector } from "reselect";

const orderInfo = (state) => state.orderInfo;

const getOrderInfo = createSelector(orderInfo, (globalOrderInfo) => {
  return globalOrderInfo?.data;
});

const getAddressComments = createSelector(orderInfo, (globalOrderInfo) => {
  return globalOrderInfo?.data?.addressComments || "";
});

const isOrderInfoInitialized = createSelector(orderInfo, (globalOrderInfo) => {
  return globalOrderInfo?.isInitialized;
});

export { getOrderInfo, getAddressComments, isOrderInfoInitialized };
