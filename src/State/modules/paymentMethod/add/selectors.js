import { createSelector } from "reselect";

const paymentMethodAdd = (state) => state.paymentMethodAdd;

const isLoading = createSelector(paymentMethodAdd, (paymentMethodAddState) => {
  return paymentMethodAddState?.isLoading;
});

export { paymentMethodAdd, isLoading };
