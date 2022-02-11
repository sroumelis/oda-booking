import { createSelector } from "reselect";

const invoiceRemove = (state) => state.invoiceRemove;

const isLoading = createSelector(invoiceRemove, (invoiceRemoveState) => {
  return invoiceRemoveState?.isLoading;
});

export { invoiceRemove, isLoading };
