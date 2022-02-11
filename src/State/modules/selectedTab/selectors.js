import { createSelector } from 'reselect';

const selectedTab = (state) => state.selectedTab;

const getSelectedTab = createSelector(selectedTab, (selectedTabState) => {
  return selectedTabState.data;
});

export { selectedTab, getSelectedTab };
