import { createSelector } from "reselect";

const takeout = (state) => state.takeout;

const getTakeout = createSelector(takeout, (takeoutState) => {
  return takeoutState ? takeoutState.data : [];
});

const isLoading = createSelector(takeout, (takeoutState) => {
  return takeoutState?.isLoading;
});

export { takeout, getTakeout, isLoading };
