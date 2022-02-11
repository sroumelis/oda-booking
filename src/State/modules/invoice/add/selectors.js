import { createSelector } from "reselect";

const invoiceAdd = (state) => state.invoiceAdd;

const isLoading = createSelector(invoiceAdd, (invoiceAddState) => {
  return invoiceAddState?.isLoading;
});

export { invoiceAdd, isLoading };
