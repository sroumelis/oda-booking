import { withStyles } from "@material-ui/styles";
import React from "react";
import styles from "./styles";
import { StyleSheet, css } from "aphrodite";
import { useSelector, useDispatch } from "react-redux";
import CardImage from "../../../../../../common/img/credit-card.png";
import deleteImage from "../../../../../../common/img/delete.svg";
import { removePaymentMethod } from "../../../../../../../State/modules/paymentMethod/remove/actions";
import { setModal } from "../../../../../../../State/modules/confirmationModal/actions";
import { setLoader } from "../../../../../../../State/modules/globalLoader/actions";
import { RadioButton } from "../../../../../Preferences/components/";
import { fetchUserInfo } from "../../../../../../../State/modules/user/userInfo/actions";

const Card = (props) => {
  const {
    card,
    isFirst,
    imageArg,
    selectedCardIndex,
    setSelectedCardIndex,
    index,
  } = props;
  const dispatch = useDispatch();
  const deleteCard = async (cardId) => {
    if (cardId) {
      try {
        dispatch(setLoader(true));
        await dispatch(removePaymentMethod(cardId));
        dispatch(
          setModal({
            isVisible: true,
            hideCancelButton: true,
            content: "Card deleted succesfully",
            title: "Success",
          })
        );
        await dispatch(fetchUserInfo(true));
      } catch (e) {
        console.log(e);
        dispatch(
          setModal({
            isVisible: true,
            hideCancelButton: true,
            content: "Failed to delete the card",
            title: "Error",
          })
        );
      } finally {
        dispatch(setLoader(false));
      }
    }
  };

  const showDeleteCardModal = (card) =>
    dispatch(
      setModal({
        isVisible: true,
        title: "Card deletion",
        content:
          "Are you sure that you'd like to delete the card with a card number of " +
          card?.cardNumber,
        okFunction: () => deleteCard(card?.id),
      })
    );

  return (
    <div className={css(styles.container, isFirst && styles.borderTop)}>
      <RadioButton
        checked={selectedCardIndex === index}
        radioButtonOnly
        hidePrice
        onClick={() => setSelectedCardIndex(index)}
      />
      <div
        className={css(styles.miniFlex)}
        onClick={() => setSelectedCardIndex(index)}
      >
        <img
          className={css(styles.cardImage)}
          src={imageArg || CardImage}
          alt=""
        />
        <span>{card}</span>
      </div>
      {/* {!isFirst && (
        <img
          className={css(styles.deleteButton)}
          src={deleteImage}
          alt=""
          onClick={() => showDeleteCardModal(card)}
        />
      )} */}
    </div>
  );
};

const memoizedCard = React.memo(Card);
export { memoizedCard as Card };
