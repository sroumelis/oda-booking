import { createSelector } from "reselect";

const enrollCustomer = (state) => state.enrollCustomer;

const getEnrollCustomer = createSelector(enrollCustomer, (enrollCustomerState) => {
  return enrollCustomerState ? enrollCustomerState.data : [];
});

const isLoading = createSelector(enrollCustomer, (enrollCustomerState) => {
  return enrollCustomerState?.isLoading;
});

export { enrollCustomer, getEnrollCustomer, isLoading };
