import { createSelector } from "reselect";

const addressRemove = (state) => state.addressRemove;

const isLoading = createSelector(addressRemove, (addressRemoveState) => {
  return addressRemoveState?.isLoading;
});

export { addressRemove, isLoading };
