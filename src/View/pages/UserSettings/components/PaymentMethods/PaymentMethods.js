import { withStyles } from "@material-ui/styles";
import React, { useEffect } from "react";
import styles from "./styles";
import { StyleSheet, css } from "aphrodite";
import { useSelector, useDispatch } from "react-redux";
import { getUserCards } from "../../../../../State/modules/user/userInfo/selectors";
import { DeletionModal, CreateCardForm, Card } from "./components/";
import { Button } from "../../../../common/components/Button";
import { TextButton } from "../../../../common/components/TextButton";
import contactless from "../../../../common/img/contactless-delivery.png";
import cashOnDelivery from "../../../../common/img/cash-on-delivery.svg";
import cardOnDelivery from "../../../../common/img/credit-card.png";

const PaymentMethods = (props) => {
  const { onClick, isComingFromSidebar, orderInfo } = props;
  const userCards = useSelector(getUserCards);
  const [isCreatingCard, setIsCreatingCard] = React.useState(false);
  const cardTypes = [
    "",
    "Cash",
    "Card payment",
    "Card payment during delivery",
  ];
  const cardImages = ["", cashOnDelivery, contactless, cardOnDelivery];
  const [selectedCardIndex, setSelectedCardIndex] = React.useState(undefined);
  useEffect(() => {
    // if we're coming from the sidebar we draw the prefered option from local storage
    // else we are coming from the basket, so we load the selected value as default
    const preferedMethod = isComingFromSidebar
      ? localStorage.getItem("prefered-payment-method")
      : orderInfo?.paymentMethod;
    let parsedMethod = preferedMethod;
    if (typeof parsedMethod === "string") {
      parsedMethod = parseInt(parsedMethod, 10);
    }
    if (parsedMethod === 1 || parsedMethod === 2 || parsedMethod === 3) {
      setSelectedCardIndex(parsedMethod);
    }
  }, []);

  return (
    <>
      <div className={css(styles.container)}>
        {/* {!isCreatingCard ? ( */}
        <div>
          <span className={css(styles.instructionsText)}>
            Please choose a payment method
          </span>
          {cardTypes?.map(
            (card, i) =>
              i !== 0 && (
                <Card
                  key={i}
                  selectedCardIndex={selectedCardIndex}
                  setSelectedCardIndex={setSelectedCardIndex}
                  index={i}
                  imageArg={cardImages[i]}
                  card={card}
                  isFirst={i === 0}
                />
              )
          )}
          {/* {userCards?.map((card, i) => (
            <Card
              key={i}
              selectedCardIndex={selectedCardIndex}
              setSelectedCardIndex={setSelectedCardIndex}
              index={i + 1}
              card={card}
              isFirst={false}
            />
          ))} */}
        </div>
        {/* ) : (
          <CreateCardForm setIsCreatingCard={setIsCreatingCard} />
        )} */}
        {!isCreatingCard && (
          <div className={css(styles.twoButtons)}>
            {/* <TextButton onClick={() => setIsCreatingCard(true)}>
              Add New Card
            </TextButton> */}
            <div />
            <Button
              isDisabled={selectedCardIndex === undefined}
              onClick={() => onClick(selectedCardIndex)}
            >
              Select
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

const memoizedPaymentMethods = React.memo(PaymentMethods);
export { memoizedPaymentMethods as PaymentMethods };
