import { createSelector } from "reselect";

const variations = (state) => state.variations;

const getVariations = createSelector(variations, (variationsState) => {
  return variationsState?.data || [];
});
const getError = createSelector(variations, (variationsState) => {
  return variationsState?.error;
});

export { variations, getVariations, getError };
