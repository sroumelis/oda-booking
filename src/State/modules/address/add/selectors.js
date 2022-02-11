import { createSelector } from "reselect";

const addressAdd = (state) => state.addressAdd;

const isLoading = createSelector(addressAdd, (addressAddState) => {
  return addressAddState?.isLoading;
});

export { addressAdd, isLoading };
