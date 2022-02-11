import { withStyles } from "@material-ui/styles";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./styles";
import {
  getUserAddresses,
  getUserInvoices,
  getUserDetails,
} from "../../../../../State/modules/user/userInfo/selectors";
import { parseAddressObject } from "../../../../../Utils/utilities";
import { setLoader } from "../../../../../State/modules/globalLoader/actions";
import { fetchUserInfo } from "../../../../../State/modules/user/userInfo/actions";
import { getError } from "../../../../../State/modules/user/userInfo/selectors";
import { StyleSheet, css } from "aphrodite";
import { Address, CreateAddress, PersonalInfo } from "./components";
import { CreateInvoice } from "../Invoices/components";
import {
  Button,
  TextButton,
  ReloadComponent,
} from "../../../../common/components";
import { EditUserInfo } from "../";

const Addresses = (props) => {
  const { onClick, isComingFromSidebar, orderInfo } = props;
  const userAddresses = useSelector(getUserAddresses);
  const userInvoices = useSelector(getUserInvoices);
  const userInfoHasError = useSelector(getError);
  const userInfo = useSelector(getUserDetails);
  const dispatch = useDispatch();
  const [activePage, setActivePage] = React.useState(0);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(undefined);
  const [selectedInvoiceIndex, setSelectedInvoiceIndex] = useState(undefined);

  React.useEffect(() => {
    // if coming from sidebar load from localStorage, else select the selected value
    const preferedMethod = isComingFromSidebar
      ? JSON.parse(localStorage.getItem("prefered-address"))
      : orderInfo?.deliveryAddress;
    // const parsedStr = parseAddressObject(preferedMethod);
    const parsedStr = preferedMethod?.parsedAddress;
    let isAddressFound = false;
    // Finding the default user's address in case the address is an address
    for (let i = 0; i < userAddresses.length; i += 1) {
      if (parsedStr === userAddresses[i]?.parsedAddress) {
        setSelectedAddressIndex(i);
        isAddressFound = true;
      }
    }
    // Finding the default user's address in case the address is an invoice
    if (!isAddressFound) {
      setSelectedAddressIndex(0);
    }
    for (let i = 0; i < userInvoices.length; i += 1) {
      if (parsedStr === userInvoices[i]?.parsedAddress) {
        setSelectedInvoiceIndex(i);
        setActivePage(3);
        return;
      }
    }
    setSelectedInvoiceIndex(0);
  }, []);
  // 0 = starting page
  // 1 = create address
  // 2 = edit profile
  // 3 = select invoice as address
  // 4 = create invoice

  return (
    <>
      <div className={css(styles.buttonsContainer)}>
        <div
          className={css(
            styles.tab,
            (activePage === 0 || activePage === 1) && styles.selectedTab
          )}
          onClick={() => setActivePage(0)}
        >
          Addresses
        </div>
        <div
          className={css(
            styles.tab,
            (activePage === 3 || activePage === 4) && styles.selectedTab
          )}
          onClick={() => setActivePage(3)}
        >
          Invoices
        </div>
      </div>
      <div className={css(styles.container)}>
        {(activePage === 0 || activePage === 3) && (
          <>
            {!userInfoHasError ? (
              <div>
                {/* {!isComingFromSidebar && (
                  <PersonalInfo
                    setActivePage={setActivePage}
                    userInfo={userInfo}
                  />
                )} */}
                <span className={css(styles.instructionsText)}>
                  {activePage === 0
                    ? "Please choose an address"
                    : "Please choose an invoice address"}
                </span>
                <div>
                  {(activePage === 0 ? userAddresses : userInvoices)?.map(
                    (address, i) => (
                      <Address
                        onClick={onClick}
                        info={address}
                        selectedAddressIndex={
                          activePage === 0
                            ? selectedAddressIndex
                            : selectedInvoiceIndex
                        }
                        index={i}
                        setSelectedAddressIndex={
                          activePage === 0
                            ? setSelectedAddressIndex
                            : setSelectedInvoiceIndex
                        }
                      />
                    )
                  )}
                  {activePage === 0 && !userAddresses?.length && (
                    <span className={css(styles.disabledText)}>
                      There are currently no addresses.
                      <br /> Please create a new one by pressing the button
                      bellow.
                    </span>
                  )}
                  {activePage === 3 && !userInvoices?.length && (
                    <span className={css(styles.disabledText)}>
                      There are currently no invoices.
                      <br /> Please create a new one by pressing the button
                      bellow.
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <ReloadComponent />
            )}
          </>
        )}
        {activePage === 1 && <CreateAddress setActivePage={setActivePage} />}
        {activePage === 4 && (
          <CreateInvoice isOnAddressPage setActivePage={setActivePage} />
        )}
        {activePage === 2 && (
          <EditUserInfo
            setActivePage={setActivePage}
            onCancel={() => setActivePage(0)}
          />
        )}
        {(activePage === 0 || activePage === 3) && (
          <div className={css(styles.twoButtons)}>
            <TextButton onClick={() => setActivePage(activePage === 0 ? 1 : 4)}>
              {activePage === 0 ? "Add New Address" : "Add New Invoice"}
            </TextButton>
            <Button
              isDisabled={
                activePage === 0
                  ? selectedAddressIndex === undefined
                  : selectedInvoiceIndex === undefined
              }
              onClick={() =>
                onClick(
                  activePage === 0
                    ? userAddresses?.[selectedAddressIndex]
                    : userInvoices?.[selectedInvoiceIndex]
                )
              }
            >
              Select
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

const memoizedAddresses = React.memo(Addresses);
export { memoizedAddresses as Addresses };
