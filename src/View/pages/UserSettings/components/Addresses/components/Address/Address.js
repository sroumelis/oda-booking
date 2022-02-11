import { withStyles } from "@material-ui/styles";
import React from "react";
import styles from "./styles";
import { StyleSheet, css } from "aphrodite";
import { useSelector, useDispatch } from "react-redux";
import AddressImage from "./img/address.svg";
import InvoiceImage from "../../../../../../common/img/invoice.svg";
import deleteButton from "../../../../../../common/img/delete.svg";
import { removeAddress } from "../../../../../../../State/modules/address/remove/actions";
import { removeInvoice } from "../../../../../../../State/modules/invoice/remove/actions";
import { setModal } from "../../../../../../../State/modules/confirmationModal/actions";
import { setLoader } from "../../../../../../../State/modules/globalLoader/actions";
import { fetchUserInfo } from "../../../../../../../State/modules/user/userInfo/actions";
import { parseAddressObject } from "../../../../../../../Utils/utilities";
import { RadioButton } from "../../../../../Preferences/components/";

const Address = (props) => {
  const {
    info,
    onClick,
    isFirst,
    selectedAddressIndex,
    setSelectedAddressIndex,
    index,
  } = props;
  const dispatch = useDispatch();
  const deleteAddress = async (address) => {
    let isDeleted = false;
    if (address) {
      try {
        dispatch(setLoader(true));
        if (!address.isInvoice) {
          await dispatch(removeAddress(address?.id));
        } else {
          await dispatch(removeInvoice(address?.id));
        }
        dispatch(
          setModal({
            isVisible: true,
            hideCancelButton: true,
            content: !address?.isInvoice
              ? "The address has been sucesfully deleted"
              : "The invoice has been sucesfully deleted",
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
              content: !address?.isInvoice
                ? "Address deletion failed"
                : "Invoice deletion failed",
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
        checked={selectedAddressIndex === index}
        radioButtonOnly
        hidePrice
        onClick={() => setSelectedAddressIndex(index)}
      />
      <div
        className={css(styles.miniFlex)}
        onClick={() => setSelectedAddressIndex(index)}
      >
        <img src={info?.isInvoice ? InvoiceImage : AddressImage} alt="" />
        <span>{info?.parsedAddress}</span>
      </div>
      <img
        src={deleteButton}
        className={css(styles.deleteButton)}
        alt=""
        onClick={() =>
          dispatch(
            setModal({
              isVisible: true,
              title: !info?.isInvoice
                ? "Delete Address"
                : "Delete Invoice",
              content: !info?.isInvoice
                ? "Are you sure you want to delete the address " +
                  info?.parsedAddress +
                  "?"
                : "Are you sure that you want to deleve the invoice with the address " +
                  info?.parsedAddress +
                  "?",
              okFunction: () => deleteAddress(info),
            })
          )
        }
      />
    </div>
  );
};

const memoizedAddress = React.memo(Address);
export { memoizedAddress as Address };
