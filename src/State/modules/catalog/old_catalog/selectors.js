import { createSelector } from "reselect";

const catalog = (state) => state.catalog;

const getCatalog = createSelector(catalog, (catalogState) => {
  return catalogState ? catalogState.data : [];
});

const getCatalogProducts = createSelector(catalog, (catalogState) => {
  return catalogState?.data?.ProductGroups || [];
});

const getCatalogueItems = createSelector(catalog, (catalogState) => {
  const rawData = catalogState?.data?.ProductGroups;
  const items = {};
  // The items is a JSON that has the saves the items of the menu by the first letter of their name.
  // supposedly this makes searches quicker because instead of X items we'd have to look at much less
  for (let i = 0; i < rawData?.length || 0; i += 1) {
    for (let j = 0; j < rawData[i]?.Products?.length; j += 1) {
      const lowCaseName = rawData[i]?.Products[j]?.Name?.toLowerCase() || "";
      if (!items[lowCaseName[0] || ""]) {
        items[lowCaseName[0] || ""] = [];
      }
      rawData[i].Products[j].GroupId = rawData[i]?.Id;
      items[lowCaseName[0] || ""].push(rawData[i]?.Products[j]);
    }
  }
  return items;
});

const isLoading = createSelector(catalog, (catalogState) => {
  return catalogState?.isLoading;
});

const getError = createSelector(catalog, (catalogState) => {
  return catalogState?.error;
});

export {
  catalog,
  getCatalog,
  getCatalogProducts,
  getCatalogueItems,
  isLoading,
  getError,
};
