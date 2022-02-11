import { createSelector } from "reselect";

const stores = (state) => state.stores;

const getStores = createSelector(stores, (storesState) => {
  return storesState ? storesState.data : [];
});

const getSelectedStore = createSelector(stores, (storesState) => {
  const store = storesState?.selectedStore;
  if (!store) {
    return {};
  }
  store.profilePicture = undefined;
  store.carouselPictures = [];
  // if the store has pictures then we setup the carousel pictures (pictures with type !== 1)
  //  we also find the picture with type = 1 and use it as a profile picture of the shop
  if (store?.pictures?.length) {
    for (let i = 0; i < store?.pictures?.length; i += 1) {
      if (store?.pictures[i].pictureType !== 1) {
        store.carouselPictures.push(store?.pictures[i]);
      } else {
        store.profilePicture = store?.pictures[i]?.url;
      }
    }
  }

  // parsing the store address so that it can be one string
  // street city postalCode province
  store.parsedAddress =
    (store?.address?.street ? store?.address?.street + " " : "") +
    (store?.address?.city ? store?.address?.city + " " : "") +
    store?.address?.postalCode +
    (store?.address?.province ? ", " + store?.address?.province : "");

  if (store?.socialUrls?.length) {
    const socialMediaArray = store?.socialUrls;
    for (let i = 0; i < socialMediaArray?.length; i += 1) {
      if (socialMediaArray[i]?.socialType === 0) {
        store.otherLink = socialMediaArray[i]?.url;
      } else if (socialMediaArray[i]?.socialType === 1) {
        store.facebookLink = socialMediaArray[i]?.url;
      } else if (socialMediaArray[i]?.socialType === 2) {
        store.instagramLink = socialMediaArray[i]?.url;
      } else if (socialMediaArray[i]?.socialType === 3) {
        store.twitterLink = socialMediaArray[i]?.url;
      } else if (socialMediaArray[i]?.socialType === 4) {
        store.linkedInLink = socialMediaArray[i]?.url;
      } else if (socialMediaArray[i]?.socialType === 5) {
        store.tripAdvisorLink = socialMediaArray[i]?.url;
      }
    }
  }

  return store;
});

const isLoading = createSelector(stores, (storesState) => {
  return storesState?.isLoading;
});

export { stores, getStores, getSelectedStore, isLoading };
