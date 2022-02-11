import { createSelector } from "reselect";

const orderStatus = (state) => state.orderStatus;

const getOrderStatus = createSelector(orderStatus, (orderStatusState) => {
  return orderStatusState ? orderStatusState.data : [];
});

const isLoading = createSelector(orderStatus, (orderStatusState) => {
  return orderStatusState?.isLoading;
});

export { orderStatus, getOrderStatus, isLoading };
