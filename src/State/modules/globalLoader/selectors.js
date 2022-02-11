import { createSelector } from "reselect";

const globalLoader = (state) => state.globalLoader;

const getIsLoaderVisible = createSelector(globalLoader, (globalLoaderState) => {
  return globalLoaderState?.isVisible;
});

export { getIsLoaderVisible};
