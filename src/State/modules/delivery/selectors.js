import { createSelector } from "reselect";

const delivery = (state) => state.delivery;

const getDelivery = createSelector(delivery, (deliveryState) => {
  return deliveryState ? deliveryState.data : [];
});

const isLoading = createSelector(delivery, (deliveryState) => {
  return deliveryState?.isLoading;
});

export { delivery, getDelivery, isLoading };
