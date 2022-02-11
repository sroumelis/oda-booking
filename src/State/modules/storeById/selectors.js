import { createSelector } from "reselect";

const storeById = (state) => state.storeById;

const getStore = createSelector(storeById, (storesState) => {
  const store = {...storesState?.data};

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
      if (socialMediaArray[i]?.socialType === 1) {
        store.facebookLink = socialMediaArray[i]?.url;
      } else if (socialMediaArray[i]?.socialType === 2) {
        store.instagramLink = socialMediaArray[i]?.url;
      }
    }
  }

  return store;
});

const getStoreInfo = createSelector(storeById, (storesState) => {
  const store = storesState?.data;
  if (!store || Object.keys(store).length === 0) {
    return {};
  }
  let logo = '';
  for(let i=0;i<store?.pictures?.length;i+=1) {
    if(store?.pictures[i].pictureType === 1) {
      logo=store.pictures[i].url
      break;
    }
  }
  return {
    name: store?.name,
    minOrder: store?.minOrder, // DEBUG
    deliveryTime: store?.deliveryTime, // DEBUG
    foodCategory: store?.category, // DEBUG
    logo: logo
  };
});

const isLoading = createSelector(storeById, (storesState) => {
  return storesState?.isLoading;
});

export { storeById, getStoreInfo, getStore, isLoading };
