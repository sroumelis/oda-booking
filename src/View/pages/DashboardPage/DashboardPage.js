import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from 'react-router-dom';
import { navigate, useLocation, Router, globalHistory } from "@reach/router";
import userManager from "../../../Utils/userManager";
import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Navigation";
import {
  CarouselComponent,
  Header,
  InitialMenu,
  Tabs,
  SearchBar,
  CatalogueShortcuts,
  Footer,
  Catalogue,
  ScrollToTop,
  OpenBasket,
  OrderInfo,
} from "./components";
import { Button, TextButton } from "../../common/components";
import { Preferences } from "../Preferences";
import { UserSettings } from "../UserSettings";
import { StoreInfo } from "../StoreInfo";
import { SideBar } from "../../layout/components/SideBar";
import {
  selectedTabActions,
  selectedTabSelectors,
} from "../../../State/modules/selectedTab";
import { enrollCustomer } from "../../../State/modules/enrollCustomer/actions";
import {
  orderInfoActions,
  orderInfoSelectors,
} from "../../../State/modules/orderInfo";
import { basketSelectors, basketActions } from "../../../State/modules/basket";
import { setLoader } from "../../../State/modules/globalLoader/actions";
import {
  storeByIdActions,
  storeByIdSelectors,
} from "../../../State/modules/storeById";
import { storesActions } from "../../../State/modules/stores";
import {
  fetchUserInfo,
  setProfilePicture,
} from "../../../State/modules/user/userInfo/actions";
import { setModal } from "../../../State/modules/confirmationModal/actions";
import {
  getUserInfo,
  getUserInvoices,
  getUserAddresses,
  getUserCards,
  isLoading,
} from "../../../State/modules/user/userInfo/selectors";
import { StyleSheet, css } from "aphrodite";
import { parseAddressObject, parseJwt } from "../../../Utils/utilities";
import { catalogSelectors } from "../../../State/modules/catalog/catalog";
import styles from "./styles";

const DashboardPage = (props) => {
  const location = useLocation();
  const isComingFromBasket = location?.state?.comesFromBasketMobile || false;
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const selectedTab = useSelector(selectedTabSelectors.getSelectedTab);
  const selectedStore = useSelector(storeByIdSelectors.getStore);
  const selectedStoreInfo = useSelector(storeByIdSelectors.getStoreInfo);
  const isStoreInfoLoading = useSelector(storeByIdSelectors.isLoading);
  const areCatalogGroupsLoading = useSelector(catalogSelectors.isLoading);
  const userInfo = useSelector(getUserInfo);
  const userAddresses = useSelector(getUserAddresses);
  const userCards = useSelector(getUserCards);
  const userInvoices = useSelector(getUserInvoices);
  const isUserInfoLoading = useSelector(isLoading);
  const orderInfo = useSelector(orderInfoSelectors.getOrderInfo);
  const basket = useSelector(basketSelectors.getBasket);

  const setBasket = (basket) => {
    dispatch(basketActions.setBasket(basket));
  };
  // const isOrderInfoInitialized = useSelector(
  // orderInfoSelectors.isOrderInfoInitialized
  // );
  // const [basket, setBasket] = useState([]);

  // let history = useHistory();

  const _setOrderInfo = (data) => {
    dispatch(orderInfoActions.setOrderInfo({ ...data }));
  };

  const setSelectedTab = (tabName) => {
    dispatch(selectedTabActions.selectTab(tabName));
  };

  const [catalogueState, setCatalogueState] = React.useState([]);

  const initializeOrderInfo = () => {
    let defaultAddress = null;
    let defaultPaymentMethod = null;
    let defaultInvoice = null;
    let defaultAddressComment = null;
    if (userAddresses) {
      const preferedMethod = JSON.parse(
        localStorage.getItem("prefered-address")
      );
      for (let i = 0; i < userAddresses.length; i += 1) {
        if (preferedMethod?.parsedAddress === userAddresses[i].parsedAddress) {
          defaultAddress = userAddresses[i];
          defaultAddressComment = userAddresses[i]?.comment;
          break;
        }
      }
      if (userInvoices && !defaultAddress) {
        for (let i = 0; i < userInvoices.length; i += 1) {
          if (preferedMethod?.parsedAddress === userInvoices[i].parsedAddress) {
            defaultAddress = userInvoices[i];
            defaultAddressComment = userInvoices[i]?.comment;
            break;
          }
        }
      }
    }
    if (userInvoices) {
      const preferedInvoice = localStorage.getItem("prefered-invoice");
      for (let i = 0; i < userInvoices.length; i += 1) {
        if (preferedInvoice === userInvoices[i]?.vat) {
          defaultInvoice = userInvoices[i];
          break;
        }
      }
    }
    const preferedMethod = localStorage.getItem("prefered-payment-method");
    defaultPaymentMethod = preferedMethod;
    if (typeof defaultPaymentMethod === "string") {
      defaultPaymentMethod = parseInt(defaultPaymentMethod, 10);
    }
    if (
      defaultPaymentMethod !== 1 &&
      defaultPaymentMethod !== 2 &&
      defaultPaymentMethod !== 3
    ) {
      defaultPaymentMethod = 1;
    }
    _setOrderInfo({
      deliverInStore: selectedTab === "TakeOut" || selectedTab === "DineIn",
      isInvoice: false,
      selectedInvoice: defaultInvoice,
      deliveryAddress: defaultAddress,
      paymentMethod: defaultPaymentMethod,
      addressComments: defaultAddressComment,
      orderComments: "",
      tip: "no-tip",
      contactless: false,
      deliveryUpdates: false,
    });
  };

  const openStoreInfoModal = () => {
    navigate(location.pathname, {
      state: {
        displayStoreInfo: true,
      },
    });
  };

  useEffect(() => {
    const init = async () => {
      let errorMessage = "";
      try {
        dispatch(setLoader(true));
        const userInfo = {}; // await dispatch(fetchUserInfo());
        const stores = await dispatch(
          storeByIdActions.storeById(localStorage.storeID)
        );
        // When we get the user and store data we check the user object
        // it should have an array called enrolledStores which declares
        // which stores the user has ordered from. In case the store we're currently
        // into isn't on this array, we will add the store by calling the enrollCustomer action
        let isEnrolled = false;
        for (let i = 0; i < userInfo?.result?.enrolledStores?.length; i += 1) {
          if (userInfo?.result?.enrolledStores[i] === localStorage.storeID)
            isEnrolled = true;
          break;
        }
        if (!isEnrolled) {
          // const enrollData = await dispatch(
          //   enrollCustomer(stores?.brandId || "", stores?.id)
          // );
        }
        let userImage = await localStorage.getItem("cached-profile-picture");
        if (!userImage) {
          // const parsedToken = await parseJwt();
          // userImage = parsedToken?.picture || "";
          // await localStorage.setItem(
          //   "cached-profile-picture",
          //   parsedToken?.picture || ""
          // );
        }
        // dispatch(setProfilePicture(userImage || ""));
        // dispatch(storesActions.fetchStores());
      } catch (e) {
        console.log(e);
        dispatch(
          setModal({
            isVisible: true,
            hideCancelButton: true,
            content:
              "There was an error loading the user and store info. Press the button to reload the page",
            title: "Error",
            okFunction: () => window.location.reload(),
          })
        );
      } finally {
        dispatch(setLoader(false));
      }
    };
    if (!isComingFromBasket || !userInfo || !Object.keys(userInfo).length) {
      init();
    }
    // window.history.pushState(null, document.title, location.href);
    // window.addEventListener('popstate', function (event) {
    //   window.history.pushState(null, document.title, location.href);
    // });
  }, []);

  useEffect(() => {
    // const currentListener = function (event) {
    //   if (event.type === 'popstate') {
    //     event.preventDefault();
    //     event.stopPropagation();

    //     var leave = 'confirm(message)';
    //     console.log(leave);
    //   } else {
    //     // navigate('/catalogue');
    //     // window.history.pushState(null, document.title, location.href);
    //     // // return 'message';
    //     // window.history.go(1);
    //     return 'mesage';
    //   }
    // };
    // window.onbeforeunload = currentListener;
    // window.onhashchange = currentListener;
    // window.addEventListener('load', function () {
    //   window.history.pushState({}, '');
    // });
    // window.history.pushState({}, '');
    // globalHistory.listen(({ action }) => {
    //   console.log('push');
    //   alert('push');
    //   if (action === 'PUSH') {
    //     // this.resetNav();
    //   }
    // });
    setTimeout(() => {
      // window.history.pushState({}, '');
      globalHistory.listen((props) => {
        const { action, location } = props;
        const { pathname } = location;
        const catalogueRoute = process.env.REACT_APP_RELATIVE_PATH
          ? `/${process.env.REACT_APP_RELATIVE_PATH}/catalogue`
          : `/catalogue`;
        const basketRoute = process.env.REACT_APP_RELATIVE_PATH
          ? `/${process.env.REACT_APP_RELATIVE_PATH}/basket`
          : "/basket";
        if (
          action === "POP" &&
          // pathname !== `/${process.env.REACT_APP_RELATIVE_PATH}/catalogue`
          pathname !== catalogueRoute &&
          pathname !== basketRoute
        ) {
          // window.open('http://localhost:3000/catalogue', '_self').close();
          window.history.back();

          // alert();
          // window.opener = null;
          // window.open('', '_self');
          // window.close();
        }
      });
    }, 1000);
  }, []);

  const shouldBeRenderedRecursivePart = (obj) => {
    if (obj?.subGroups?.length) {
      let shouldRender = shouldBeRendered(obj.subGroups);
      if (shouldRender) {
        return true;
      }
    }
    if (obj?.modifiers?.length) {
      let shouldRender = shouldBeRendered(obj.modifiers);
      if (shouldRender) {
        return true;
      }
    }
    if (
      obj?.servingSpots === "All" ||
      (selectedTab &&
        obj?.servingSpots &&
        obj?.servingSpots.indexOf(selectedTab) !== -1)
    ) {
      return true;
    }
    return false;
  };

  const shouldBeRendered = (obj) => {
    try {
      if (!obj?.length) {
        return shouldBeRenderedRecursivePart(obj);
      } else {
        for (let i = 0; i < obj.length; i += 1) {
          let decision = shouldBeRenderedRecursivePart(obj[i]);
          if (decision) {
            return true;
          }
        }
        return false;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  const findIfNodeHasSelectedChildren = (node) => {
    let _node = node;
    const recursivePart = (object, id) => {
      if (object?.isSelected) {
        return true;
      }
      if (object?.subGroups?.length) {
        let val = searchFunction(object?.subGroups, id);
        if (val) {
          return true;
        }
      }
      if (object?.modifiers?.length) {
        let val = searchFunction(object?.modifiers, id);
        if (val) {
          return true;
        }
      }
      return false;
    };
    const searchFunction = (object, id) => {
      if (!object?.length) {
        let value = recursivePart(object);
        if (value) {
          return true;
        }
      } else {
        for (let i = 0; i < object?.length; i += 1) {
          let value = recursivePart(object[i]);
          if (value) {
            return true;
          }
        }
      }
    };
    let result = searchFunction(_node);
    return result ? true : false;
  };

  const checkIfMandatoryItemsAreChecked = (obj) => {
    let mandatories = obj?.mandatoryItems;
    for (let i = 0; i < mandatories.length; i += 1) {
      if (shouldBeRendered(mandatories[i])) {
        let hasSelectedChildren = findIfNodeHasSelectedChildren(mandatories[i]);
        if (!hasSelectedChildren) {
          return false;
        }
      }
    }
    return true;
  };

  const renderErrorElement = (products) => {
    return (
      <>
        <span>
          Changing the order method made the following products to be removed
          from your basket, either because they were unavailable or because the
          item's preferences changed:
        </span>
        <ul className={css(styles.listItem)}>
          {products.map((productName) => (
            <li>{productName}</li>
          ))}
        </ul>
      </>
    );
  };

  useEffect(() => {
    if (basket?.length) {
      // updating the price of each basket object while also
      // removing the ones that should not be rendered in the selected delivery method
      let _basket = [];
      let unavailableProducts = [];
      let incompleteProducts = [];
      // for each of the basket's items we will do some checks in order to update it's price
      // filter out any selected items that are NOT needed
      // and delete any items that should not exist on the new selected tab
      for (let i = 0; i < basket?.length; i += 1) {
        let foundPrice = false;
        for (let j = 0; j < basket[i]?.prices?.length; j += 1) {
          if (
            basket[i]?.prices[j]?.type === "All" ||
            basket[i]?.prices[j]?.type === selectedTab
          ) {
            foundPrice = true;
            // edit the total price
            // initial price is the price of the item on this selected tab without any
            // modifiers attached
            // if foundPrice = true it means that we have found the price of the item and that we
            // can safely assume that it exists on this selected tab. If foundPrice was false
            // it would mean that the item did not have a price for the selected tab value so it is not served here
            basket[i].totalPrice =
              basket[i].totalPrice -
              basket[i].initialPrice +
              basket[i].prices[j].value;
            basket[i].initialPrice = basket[i]?.prices[j]?.value;
            break;
          }
        }
        if (foundPrice) {
          // we save the selected modifiers that will be removed on this array and we remove them after all the
          // calculations have taken place
          const itemsToRemove = [];
          for (let j = 0; j < basket[i]?.selectedItemsArray?.length; j += 1) {
            let servSpots = basket[i]?.selectedItemsArray[j]?.servingSpots;
            if (
              servSpots === "All" ||
              (selectedTab &&
                servSpots &&
                servSpots.indexOf(selectedTab) !== -1)
            ) {
              // the item is selected and it matches the currently selected tab
            } else {
              // the item should not be selected so we remove it from the selected list.
              basket[i].selectedItemsArray[j].isSelected = false;
              if (basket[i]?.selectedItemsArray[j]?.hasQuantity) {
                basket[i].selectedItemsArray[j].selectedQuantity = 0;
              }
              itemsToRemove.push(j);
            }
          }
          // itemsToRemove is an array of indexes. It's format is like this
          // [0,1,2,3] if we start using splice on it's normal order the order of basket[i].selectedItemsArray
          // will get messed up because when we remove the 0th element, the 1st element takes it's place
          // so in order to avoid this we do the removals in reverse order which ensures that nothing will be affected
          itemsToRemove
            ?.reverse()
            ?.forEach((index) => basket[i].selectedItemsArray.splice(index, 1));

          // now that we have removed the items that must not be selected, we will do an additional check
          // we will check if the mandatory items are of the new selected tab are all fulfilled, if they are not
          // then we will remove the object from the basket
          // this is what we call "incompleteProducts"
          if (checkIfMandatoryItemsAreChecked(basket[i])) {
            _basket.push(basket[i]);
          } else {
            incompleteProducts.push(basket[i]?.name);
          }
        } else {
          // Also, in case the item doesn't have a price we will remove it from the basket since it's an unavailable product
          unavailableProducts.push(basket[i]?.name);
        }
      }
      // if we have at least 1 product that wont be rendered we notify the user
      if (incompleteProducts?.length || unavailableProducts?.length) {
        dispatch(
          setModal({
            isVisible: true,
            hideCancelButton: true,
            content: renderErrorElement([
              ...incompleteProducts,
              ...unavailableProducts,
            ]),
            title: "Notification",
          })
        );
      }
      setBasket([..._basket]);
    }
    // changing the delivery address to the shop's address in case the selected method is takeAway or dineIn
    if (selectedTab === "TakeOut" || selectedTab === "DineIn") {
      _setOrderInfo({
        ...orderInfo,
        deliverInStore: true,
        deliveryAddress: {
          city: selectedStore?.address?.city,
          floor: selectedStore?.address?.floor,
          street: selectedStore?.address?.street,
          zipCode: selectedStore?.address?.postalCode,
          parsedAddress: parseAddressObject(selectedStore?.address),
        },
        contactless: false,
        addressComments: selectedStore?.address?.comment,
      });
    } else {
      let defaultAddress = null;
      let defaultAddressComment = null;
      if (userAddresses || userInvoices) {
        // const preferedMethod = parseAddressObject(
        //   JSON.parse(localStorage.getItem("prefered-address"))
        // );
        const preferedMethod = JSON.parse(
          localStorage.getItem("prefered-address")
        );
        if (userAddresses && !defaultAddress) {
          for (let i = 0; i < userAddresses.length; i += 1) {
            if (
              preferedMethod?.parsedAddress === userAddresses[i]?.parsedAddress
            ) {
              defaultAddress = userAddresses[i];
              defaultAddressComment = userAddresses[i]?.comment || "";
              break;
            }
          }
        }
        if (userInvoices && !defaultAddress) {
          for (let i = 0; i < userInvoices.length; i += 1) {
            if (
              preferedMethod?.parsedAddress === userInvoices[i].parsedAddress
            ) {
              defaultAddress = userInvoices[i];
              defaultAddressComment = userInvoices[i]?.comment || "";
              break;
            }
          }
        }
      }
      let defaultPaymentMethod;
      // ensuring that payment method will ONLY change if it's not selected
      if (
        orderInfo?.paymentMethod !== 1 &&
        orderInfo?.paymentMethod !== 2 &&
        orderInfo?.paymentMethod !== 3
      ) {
        const preferedMethod = localStorage.getItem("prefered-payment-method");
        defaultPaymentMethod = preferedMethod;
        if (typeof defaultPaymentMethod === "string") {
          defaultPaymentMethod = parseInt(defaultPaymentMethod, 10);
        }
        if (
          defaultPaymentMethod !== 1 &&
          defaultPaymentMethod !== 2 &&
          defaultPaymentMethod !== 3
        ) {
          defaultPaymentMethod = 1;
        }
      } else {
        defaultPaymentMethod = orderInfo?.paymentMethod;
      }
      _setOrderInfo({
        ...orderInfo,
        paymentMethod: defaultPaymentMethod,
        deliverInStore: false,
        deliveryAddress: defaultAddress,
        addressComments: defaultAddressComment,
        contactless: false,
      });
    }
  }, [selectedTab]);

  useEffect(() => {
    // initializing the order address/payment method when user data is loaded
    if (
      userInfo &&
      Object.keys(userInfo).length &&
      !isComingFromBasket &&
      !userInfo.preventOrderInfoUpdate
    ) {
      initializeOrderInfo();
    }
  }, [userInfo]);

  return (
    <>
      <SideBar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        name={userInfo?.name}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          minHeight: "100%",
          height: "100%",
        }}
      >
        <CarouselComponent
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          pictures={selectedStore?.carouselPictures}
          isLoading={isStoreInfoLoading || isUserInfoLoading}
        />
        <Header
          storeInfo={selectedStoreInfo}
          isLoading={isStoreInfoLoading || isUserInfoLoading}
          selectedTab={selectedTab}
          setTab={setSelectedTab}
          tabOptions={selectedStore?.storeOptions}
        />
        {
          <div className={css(styles.pageContainer)}>
            <div className={css(styles.wrapper)}>
              {selectedStore?.description}
            </div>
            <div
              style={{
                margin: "auto",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <Button
                  onClick={() => {
                    // if (modalData?.cancelFunction) {
                    //   modalData?.cancelFunction();
                    // }
                    // if (!modalData?.dontCloseAfterButtonPress) {
                    //   dispatch(setModal({ isVisible: false }));
                    // }
                    navigate("choose-date", {});
                  }}
                >
                  {"Reserve Now"}
                </Button>
                <TextButton onClick={openStoreInfoModal}>
                  {"Store Info"}
                </TextButton>
              </div>
            </div>
          </div>
        }

        {/* {
          <Footer
            storeInfo={{
              logo: selectedStore?.profilePicture,
              storeName: selectedStore?.name,
              address: selectedStore?.parsedAddress,
              vat: selectedStore?.taxRegNo,
              doy: "N. Smirnis",
              personInCharge: selectedStore?.legalTitle,
              website: selectedStore?.webSite?.url,
              phone: selectedStore?.phoneNo?.phoneNumber,
              facebook: selectedStore?.facebookLink,
              instagram: selectedStore?.instagramLink,
              twitter: selectedStore?.twitterLink,
              tripadvisor: selectedStore?.tripAdvisorLink,
            }}
          />
        } */}
      </div>
      <ScrollToTop />
      <OpenBasket />
      <UserSettings
        path={location.pathname}
        setOrderInfo={_setOrderInfo}
        orderInfo={orderInfo}
      />
      <Preferences
        path={location.pathname}
        basket={basket}
        setBasket={setBasket}
        isStoreClosed={!selectedStore.enabled}
      />
      <StoreInfo />
      <div
        style={{
          position: "absolute",
          left: "80%",
          bottom: 26,
        }}
      >
        <Fab
          color="white"
          aria-label="add"
          onClick={() => {
            window.open(
              "https://maps.google.com?q=" + selectedStore?.parsedAddress
            );
          }}
        >
          <NavigationIcon />
        </Fab>
      </div>
    </>
  );
};

const memoizedDashboardPage = React.memo(DashboardPage);
export { memoizedDashboardPage as DashboardPage };
