import { withStyles } from "@material-ui/styles";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./styles";
import {
  getUserInvoices,
  getUserDetails,
  getError,
} from "../../../../../State/modules/user/userInfo/selectors";
import { fetchUserInfo } from "../../../../../State/modules/user/userInfo/actions";
import { setLoader } from "../../../../../State/modules/globalLoader/actions";
import { StyleSheet, css } from "aphrodite";
import {
  Address,
  Invoice,
  CreateAddress,
  CreateInvoice,
  PersonalInfo,
} from "./components";
import {
  Button,
  TextButton,
  ReloadComponent,
} from "../../../../common/components";
import { EditUserInfo } from "../";
import { parseAddressObject } from "../../../../../Utils/utilities";

const Invoices = (props) => {
  const { onClick, orderInfo, isComingFromSidebar } = props;
  const userInvoices = useSelector(getUserInvoices);
  const userInfo = useSelector(getUserDetails);
  const userInfoError = useSelector(getError);
  const dispatch = useDispatch();
  const [activePage, setActivePage] = React.useState(0);
  // 0 = starting page
  // 1 = create invoice

  const [selectedInvoiceIndex, setSelectedInvoiceIndex] =
    React.useState(undefined);
  React.useEffect(() => {
    // const preferedInvoice = isComingFromSidebar ? localStorage.getItem("prefered-invoice") : orderInfo?.selectedInvoice?.;
    const preferedInvoice = isComingFromSidebar
      ? localStorage.getItem("prefered-invoice")
      : orderInfo?.selectedInvoice?.vat;
    for (let i = 0; i < userInvoices.length; i += 1) {
      if (preferedInvoice === userInvoices[i]?.vat) {
        setSelectedInvoiceIndex(i);
        return;
      }
    }
    setSelectedInvoiceIndex(0);
  }, []);

  return (
    <div className={css(styles.container)}>
      {activePage === 0 && (
        <>
          {!userInfoError ? (
            <div>
              <span className={css(styles.instructionsText)}>
                Please choose an invoice
              </span>
              <div>
                {userInvoices?.map((invoice, i) => (
                  <Invoice
                    onClick={onClick}
                    info={invoice}
                    selectedInvoiceIndex={selectedInvoiceIndex}
                    setSelectedInvoiceIndex={setSelectedInvoiceIndex}
                    index={i}
                  />
                ))}
                {activePage === 0 && !userInvoices?.length && (
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
      {activePage === 1 && <CreateInvoice setActivePage={setActivePage} />}
      {activePage === 0 && (
        <div className={css(styles.twoButtons)}>
          <TextButton onClick={() => setActivePage(1)}>
            Add New Invoice
          </TextButton>
          <Button
            isDisabled={selectedInvoiceIndex === undefined}
            onClick={() => onClick(userInvoices?.[selectedInvoiceIndex])}
          >
            Select
          </Button>
        </div>
      )}
    </div>
  );
};

const memoizedInvoices = React.memo(Invoices);
export { memoizedInvoices as Invoices };
