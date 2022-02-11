import { createSelector } from "reselect";

const paymentMethodRemove = (state) => state.paymentMethodRemove;

const isLoading = createSelector(paymentMethodRemove, (paymentMethodRemoveState) => {
  return paymentMethodRemoveState?.isLoading;
});

export { paymentMethodRemove, isLoading };
