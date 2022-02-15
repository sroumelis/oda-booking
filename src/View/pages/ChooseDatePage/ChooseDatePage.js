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
  DatePicker,
  TimePicker,
  ThankyouPage,
  ServingPointsList,
  Review,
  Catalogue,
  ScrollToTop,
  ConfirmationModal,
  ConfirmationBackToHomeModal,
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
import { bookingSelectors } from "../../../State/modules/booking";
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

import _ from "lodash";

const ChooseDatePage = (props) => {
  const location = useLocation();
  const isComingFromBasket = location?.state?.comesFromBasketMobile || false;
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [canSubmit, setCansubmit] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const selectedTab = useSelector(selectedTabSelectors.getSelectedTab);
  const selectedStore = useSelector(storeByIdSelectors.getStore);
  const selectedStoreInfo = useSelector(storeByIdSelectors.getStoreInfo);
  const isStoreInfoLoading = useSelector(storeByIdSelectors.isLoading);
  const areCatalogGroupsLoading = useSelector(catalogSelectors.isLoading);
  const selectedTable = useSelector(bookingSelectors.selectedTable);
  const userInfo = useSelector(getUserInfo);
  const userAddresses = useSelector(getUserAddresses);
  const userCards = useSelector(getUserCards);
  const userInvoices = useSelector(getUserInvoices);
  const isUserInfoLoading = useSelector(isLoading);
  const orderInfo = useSelector(orderInfoSelectors.getOrderInfo);
  const basket = useSelector(basketSelectors.getBasket);
  const [activeStep, setActiveStep] = React.useState(0);
  const [table, setTable] = React.useState({ id: 1 });
  const [complete, setComplete] = React.useState(false);
  const [collectedData, setCollectedData] = React.useState({
    date: new Date(),
  });

  const steps = getSteps();
  function getSteps() {
    return ["", "", "", ""];
  }
  const handleNext = () => {
    if (activeStep === 2) {
      if (!Number(localStorage.dontShowOnHoldConfirmation)) {
        _openTimeConfirmationModal();
        return;
      }
    }
    if (activeStep >= 3) {
      _handleSubmit();
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const _openTimeConfirmationModal = () => {
    navigate(location.pathname, {
      state: {
        showConfirmModal: true,
      },
    });
  };

  const _openBackToHomeConfirmationModal = () => {
    navigate(location.pathname, {
      state: {
        showBackToHomeModal: true,
      },
    });
  };

  const _handleSubmit = () => {
    try {
      console.log({ ...collectedData, tableId: selectedTable?.id });
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false);
        setComplete(true);
      }, 1000);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } catch (error) {
      setRefreshing(false);

      alert(error);
    }
  };

  const handleBack = () => {
    if (activeStep === 0) {
      window.history.back();
      return;
    }
    if (activeStep === 3) {
      _openBackToHomeConfirmationModal();

      return;
    }
    if (activeStep === 4) {
      window.history.back();

      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const _returnButtonStyle = () => {
    if (
      (activeStep === 1 && !collectedData?.timeSlot) ||
      (activeStep === 2 && !selectedTable) ||
      (activeStep > 2 && !canSubmit)
    ) {
      return {
        width: "119.34px",
        backgroundColor: "#bac3d3",
      };
    }
    return {
      width: "119.34px",
      backgroundColor: "#253141",
    };
  };

  const _dataCollector = (property, value) => {
    console.log("tableId");

    const data = _.cloneDeep(collectedData);
    data[property] = value;
    if (
      "date" in data &&
      "timeSlot" in data &&
      data?.userName?.length > 0 &&
      data?.email?.length > 0 &&
      data?.phone?.length > 0 &&
      selectedTable?.id
    ) {
      setCansubmit(true);
    } else {
      setCansubmit(false);
    }
    setCollectedData(data);
  };

  const _releaseTables = async () => {
    try {
    } catch (e) {}
  };

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
          // setIsSidebarOpen={setIsSidebarOpen}
          pictures={
            selectedTable?.pictures?.length > 0
              ? selectedTable?.pictures
              : selectedStore?.carouselPictures
          }
          isLoading={isStoreInfoLoading || isUserInfoLoading}
        />
        <Header
          steps={steps}
          activeStep={activeStep}
          storeInfo={selectedStoreInfo}
          isLoading={isStoreInfoLoading || isUserInfoLoading}
          selectedTab={selectedTab}
          // setTab={setSelectedTab}
          tabOptions={selectedStore?.storeOptions}
        />
        {
          <div className={css(styles.pageContainer)}>
            <div className={css(styles.title)}>
              {"Choose Date" + activeStep}
            </div>
            <div className={css(styles.wrapper)}>
              {activeStep === 0 && !refreshing && (
                <DatePicker
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
                  callback={_dataCollector}
                />
              )}
              {activeStep === 1 && !refreshing && (
                <TimePicker
                  callback={_dataCollector}
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
              )}
              {activeStep === 2 && !refreshing && (
                <ServingPointsList callback={_dataCollector} />
              )}
              {activeStep === 3 && !refreshing && (
                <Review callback={_dataCollector} />
              )}
              {activeStep === 4 && (
                <ThankyouPage loading={refreshing} complete={complete} />
              )}
            </div>
            <div className={css(styles.footer)}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    gap: 20,
                  }}
                >
                  {!complete && !refreshing && (
                    <Button
                      style={{ backgroundColor: "#e0e0e0", color: "black" }}
                      disabled={activeStep === 0}
                      onClick={handleBack}
                    >
                      Back
                    </Button>
                  )}
                  {complete && (
                    <Button
                      style={{ backgroundColor: "#e0e0e0", color: "black" }}
                      disabled={activeStep === 0}
                      onClick={handleBack}
                    >
                      Back To Home
                    </Button>
                  )}
                  {console.log("render___")}
                  {activeStep !== 4 && (
                    <Button
                      isDisabled={
                        (activeStep === 1 && !collectedData?.timeSlot) ||
                        (activeStep === 2 && !selectedTable) ||
                        (activeStep > 2 && !canSubmit)
                      }
                      style={_returnButtonStyle()}
                      // variant="contained"
                      // color="primary"
                      onClick={handleNext}
                    >
                      {activeStep === 2
                        ? "Review"
                        : activeStep >= 3
                        ? "Book"
                        : "Continue"}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        }
      </div>
      <ScrollToTop />
      <ConfirmationModal
        onClose={() => {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }}
        path={location.pathname}
      />
      <ConfirmationBackToHomeModal
        onClose={() => {
          _releaseTables();
        }}
      />
      <StoreInfo />
    </>
  );
};

const memoizedChooseDatePage = React.memo(ChooseDatePage);
export { memoizedChooseDatePage as ChooseDatePage };
