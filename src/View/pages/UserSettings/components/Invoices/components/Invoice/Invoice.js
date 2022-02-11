import { withStyles } from "@material-ui/styles";
import React from "react";
import styles from "./styles";
import { StyleSheet, css } from "aphrodite";
import InvoiceImage from "../../../../../../common/img/invoice.svg";
import deleteButton from "../../../../../../common/img/delete.svg";
import { useSelector, useDispatch } from "react-redux";
import { removeInvoice } from "../../../../../../../State/modules/invoice/remove/actions";
import { fetchUserInfo } from "../../../../../../../State/modules/user/userInfo/actions";
import { setModal } from "../../../../../../../State/modules/confirmationModal/actions";
import { setLoader } from "../../../../../../../State/modules/globalLoader/actions";
import { parseInvoiceObject } from "../../../../../../../Utils/utilities";
import { RadioButton } from "../../../../../Preferences/components/";

const Invoice = (props) => {
  const {
    card,
    info,
    onClick,
    isFirst,
    selectedInvoiceIndex,
    setSelectedInvoiceIndex,
    index,
  } = props;
  const dispatch = useDispatch();
  const deleteInvoice = async (invoiceId) => {
    let isDeleted = false;
    if (invoiceId) {
      try {
        dispatch(setLoader(true));
        await dispatch(removeInvoice(invoiceId));
        dispatch(
          setModal({
            isVisible: true,
            hideCancelButton: true,
            content: "Invoice deleted succesfully",
            title: "Success",
          })
        );
        isDeleted = true;
        await dispatch(fetchUserInfo(true));
      } catch (e) {
        console.log(e);
        if (!isDeleted) {
          dispatch(
            setModal({
              isVisible: true,
              hideCancelButton: true,
              content: "Failed to delete the invoice",
              title: "Error",
            })
          );
        }
      } finally {
        dispatch(setLoader(false));
      }
    }
  };

  return (
    <div className={css(styles.container, isFirst && styles.borderTop)}>
      <RadioButton
        checked={selectedInvoiceIndex === index}
        radioButtonOnly
        hidePrice
        onClick={() => setSelectedInvoiceIndex(index)}
      />
      <div
        className={css(styles.miniFlex)}
        onClick={() => setSelectedInvoiceIndex(index)}
      >
        <img src={InvoiceImage} alt="" />
        <div>
          <span>{info?.parsedAddress}</span>
          <br />
          <span>{info?.parsedExtraData}</span>
        </div>
      </div>
      <img
        src={deleteButton}
        className={css(styles.deleteButton)}
        alt=""
        onClick={() =>
          dispatch(
            setModal({
              isVisible: true,
              title: "Invoice deletion",
              content:
                "Are you sure that you'd like to delete the invoice that has a VAT of " +
                info?.vat +
                "? ",
              okFunction: () => deleteInvoice(info?.id),
            })
          )
        }
      />
    </div>
  );
};

const memoizedInvoice = React.memo(Invoice);
export { memoizedInvoice as Invoice };
