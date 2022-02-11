import { withStyles } from "@material-ui/styles";
import React from "react";
import styles from "./styles";
import { StyleSheet, css } from "aphrodite";
// import { TextField } from "@material-ui/core";
import oda from "../../../../common/theme/oda";
import { Button, Container } from "../../../../common/components";
import { getAddressComments } from "../../../../../State/modules/orderInfo/selectors";
import {
  setModal,
  closeModal,
} from "../../../../../State/modules/confirmationModal/actions";
import { fetchOrderStatus } from "../../../../../State/modules/orderStatus/actions";
import Item from "../Catalogue/components/catalogueComponents/Item";
import userManager from "../../../../../Utils/userManager";
import UAParser from "ua-parser-js";
import {
  parseAddressObject,
  hideCardNumbers,
  parseJwt,
  formatMoney,
} from "../../../../../Utils/utilities";
import basketImage from "../../../../common/img/basket.png";
import tipImage from "../../../../common/img/tip.png";
import { useDispatch, useSelector } from "react-redux";
import { navigate, useLocation, Router } from "@reach/router";
import { TextField } from "../../../../common/components";
import { Tips } from "./components/Tips";
import { PaymentSection } from "./components/PaymentSection";
import { AddressSection } from "./components/AddressSection";
import { TermsSection } from "./components/TermsSection";
import { InvoiceSection } from "./components/InvoiceSection";
import { BeautifiedBasket } from "./components/BeautifiedBasket";
import { submitTakeoutOrder } from "../../../../../State/modules/takeout/actions";
import { submitDeliveryOrder } from "../../../../../State/modules/delivery/actions";
import { getUserInfo } from "../../../../../State/modules/user/userInfo/selectors";
import { getStore } from "../../../../../State/modules/storeById/selectors";
import { InvoiceOrReceipt } from "./components/InvoiceOrReceipt";
import OrderInfoGenericSkeleton from "./components/OrderInfoGenericSkeleton/OrderInfoGenericSkeleton";
import { getSelectedTab } from "../../../../../State/modules/selectedTab/selectors";
import { setLoader } from "../../../../../State/modules/globalLoader/actions";

const OrderInfo = (props) => {
  const {
    basket,
    orderInfo,
    isFromBasket,
    setOrderInfo,
    actAsModal,
    isLoading,
    setBasket,
  } = props;
  const addressComments = useSelector(getAddressComments);
  const selectedTab = useSelector(getSelectedTab);
  const userInfo = useSelector(getUserInfo);
  const storeInfo = useSelector(getStore);
  const dispatch = useDispatch();
  const [orderComments, setOrderComments] = React.useState("");
  const [_addressComments, _setAddressComments] = React.useState("");
  // The names of the cards to be rendered
  const cardTypes = [
    "",
    "Cash",
    "Card payment",
    "Card payment during delivery",
  ];
  React.useEffect(() => {
    setOrderComments(orderInfo?.orderComments || "");
  }, []);

  React.useEffect(() => {
    _setAddressComments(addressComments);
  }, [addressComments]);

  const location = useLocation();

  const openAddressesModal = () => {
    navigate(location.pathname, {
      state: {
        displaySettings: true,
        userSettings: false,
        paymentMethods: false,
        addresses: true,
        invoices: false,
        isComingFromSidebar: false,
      },
    });
  };
  const openPaymentsModal = () => {
    navigate(location.pathname, {
      state: {
        displaySettings: true,
        userSettings: false,
        paymentMethods: true,
        addresses: false,
        invoices: false,
        isComingFromSidebar: false,
      },
    });
  };

  const openInvoicesModal = () => {
    navigate(location.pathname, {
      state: {
        displaySettings: true,
        userSettings: false,
        paymentMethods: false,
        addresses: false,
        invoices: true,
        isComingFromSidebar: false,
      },
    });
  };

  const renderErrorElement = (
    isBasketFilled,
    isAddressFilled,
    isPaymentFilled,
    isInvoiceSelected,
    isMinOrderExceeded,
    isAmountPositive
  ) => {
    return (
      <>
        <span>Can't submit your order because:</span>
        <ul className={css(styles.listItem)}>
          {!isBasketFilled && <li>Your basket is empty</li>}
          {isBasketFilled && !isAmountPositive && (
            <li>Your order balance is 0.</li>
          )}
          {!isAddressFilled && <li>The order address is not filled</li>}
          {!isPaymentFilled && <li>Payment details are not filled</li>}
          {!isInvoiceSelected && <li>An invoice is not selected</li>}
          {!isMinOrderExceeded && (
            <li>
              You haven't exceeded the store's min. order amount of{" "}
              {formatMoney(storeInfo?.minOrderPrice || 0)}
            </li>
          )}
        </ul>
      </>
    );
  };

  // checking everything to see if the order form is filled
  // if it's not a popup will appear notifying the user of what
  // they need to fill.
  // Also, when everything is ok the func will return true
  const checkOrderFields = () => {
    const isBasketFilled = basket?.length ? true : false;
    const isAddressFilled = orderInfo?.deliveryAddress ? true : false;
    // payment method can only have the values of 0,1,2
    const isPaymentFilled = [1, 2, 3].indexOf(orderInfo?.paymentMethod) !== -1;
    const isInvoiceSelected =
      !orderInfo?.isInvoice ||
      (orderInfo?.isInvoice && orderInfo?.selectedInvoice);
    const basketTotalPrice = calculateBasketTotalPrice();
    const isMinOrderExceeded =
      basketTotalPrice >= storeInfo?.minOrderPrice || 0;
    const isAmountPositive = basketTotalPrice && basketTotalPrice > 0;
    if (
      isBasketFilled &&
      isAddressFilled &&
      isPaymentFilled &&
      isInvoiceSelected &&
      isMinOrderExceeded &&
      isAmountPositive
    ) {
      return true;
    } else {
      dispatch(
        setModal({
          isVisible: true,
          hideCancelButton: true,
          customContentEl: renderErrorElement(
            isBasketFilled,
            isAddressFilled,
            isPaymentFilled,
            isInvoiceSelected,
            isMinOrderExceeded,
            isAmountPositive
          ),
          title: "Error",
        })
      );
      return false;
    }
  };

  const calculateBasketTotalPrice = () => {
    let price = 0;
    for (let i = 0; i < basket?.length; i += 1) {
      price +=
        (basket[i]?.totalPrice || 0) * (basket[i]?.selectedQuantity || 1);
    }

    return price?.toFixed(2) || 0;
  };

  const parseItemModifiers = (obj) => {
    let arr = [];
    for (let i = 0; i < obj?.synthesis?.synthesisConsumables?.length; i += 1) {
      let item = obj?.synthesis?.synthesisConsumables[i];
      if (
        item?.servingSpots === "All" ||
        (selectedTab &&
          item?.servingSpots &&
          item?.servingSpots?.indexOf(selectedTab) !== -1)
      ) {
        arr.push({
          modifierId: item?.id || "",
          modifierName: item?.name || "",
          modifierGroupName: item?.parentName || "-",
          unitPrice: item?.price?.toFixed(2) || 0,
          units: item?.selectedQuantity || 1,
        });
      }
    }
    for (let i = 0; i < obj?.selectedItemsArray?.length; i += 1) {
      arr.push({
        modifierId: obj?.selectedItemsArray[i]?.id || "",
        modifierName: obj?.selectedItemsArray[i]?.name || "",
        modifierGroupName: obj?.selectedItemsArray[i]?.parentName || "",
        unitPrice: obj?.selectedItemsArray[i]?.price?.toFixed(2) || 0,
        units: obj?.selectedItemsArray[i]?.selectedQuantity || 1,
      });
    }
    return arr;
  };

  const generateItemsArray = () => {
    let itemsArray = [];
    for (let i = 0; i < basket?.length; i += 1) {
      let obj = {};
      obj.productId = basket[i]?.id || "";
      obj.discountPercent = 0;
      obj.discountAmount = 0;
      obj.comment = basket[i]?.comment || "";
      obj.productName = basket[i]?.name || "";
      obj.units = basket[i]?.selectedQuantity || 1;
      obj.unitPrice = basket[i]?.totalPrice?.toFixed(2) || 0;
      obj.modifiers = parseItemModifiers(basket[i]); //dsadas
      itemsArray.push(obj);
    }
    return itemsArray;
  };

  const submitOrder = async () => {
    // console.log(basket);
    const tokenData = await parseJwt();
    const parser = new UAParser();
    const deviceOS = parser.getOS();
    const deviceInfo = parser.getDevice();
    console.log("--- Debug device info (to be deleted) ---");
    console.log({
      inputDevicePlatform: navigator?.userAgentData?.platform || "-",
      inputDeviceOS: deviceOS?.name + " " + deviceOS?.version,
      inputDeviceName:
        navigator?.userAgentData?.platform === "Windows"
          ? "personal-computer"
          : deviceInfo?.vendor || deviceInfo?.model || "-",
    });
    console.log("---   ---   ---");
    // we check to see if all the fields in the order are filled up
    // console.log(orderInfo);
    console.log("APP ID AND APP NAME HAS HARD CODED DATA!!!!");
    console.log("Na anoiksw iframe gia thn plhrwmh sthn idia selida?");
    const tipsArray = [5, 10, 15, 20];
    if (checkOrderFields()) {
      dispatch(setLoader(true));
      const body = {
        customerId: tokenData?.sub || "",
        customerName: tokenData?.name || "",
        customerEmail: tokenData?.email || "",
        appId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        appName: "oda-market",
        amount: calculateBasketTotalPrice(),
        paymentType: orderInfo?.paymentMethod,
        items: generateItemsArray(),
        inputDevicePlatform: navigator?.userAgentData?.platform || "-",
        inputDeviceOS: deviceOS?.name + " " + deviceOS?.version,
        inputDeviceName:
          navigator?.userAgentData?.platform === "Windows"
            ? "personal-computer"
            : deviceInfo?.vendor || deviceInfo?.model || "-",
        customerPhone: userInfo?.phones?.[0]?.phoneNumber || "",
        storeId: storeInfo?.id || "",
        tipAmountPercentage:
          orderInfo?.paymentMethod !== 2 || orderInfo?.tip === "no-tip"
            ? 0
            : tipsArray[orderInfo?.tip],
        comment: orderInfo?.orderComments || "",
      };
      // if isInvoice then voucher type is 1, otherwise it's 0
      // also, we fill up the invoice object
      if (orderInfo?.isInvoice) {
        body.invoice = {
          company: orderInfo?.selectedInvoice?.company || "-",
          address: orderInfo?.selectedInvoice?.address || "-",
          city: orderInfo?.selectedInvoice?.city || "-",
          state: orderInfo?.selectedInvoice?.state || "-",
          postCode: orderInfo?.selectedInvoice?.postCode || "-",
          floor: orderInfo?.selectedInvoice?.floor || "-",
          telephone: orderInfo?.selectedInvoice?.telephone || "-",
          vat: orderInfo?.selectedInvoice?.vat || "-",
          taxAuth: orderInfo?.selectedInvoice?.taxAuth || "-",
          comment: orderInfo?.selectedInvoice?.comment || "-",
        };
        body.voucherType = 1;
      } else {
        body.voucherType = 0;
      }
      // then we can start the order
      try {
        let orderReply;
        if (orderInfo?.deliverInStore) {
          orderReply = await dispatch(submitTakeoutOrder(body));
        } else {
          body.address = {
            street: orderInfo?.deliveryAddress?.street || "",
            city: orderInfo?.deliveryAddress?.city || "",
            state: orderInfo?.deliveryAddress?.state || "",
            country: orderInfo?.deliveryAddress?.country || "",
            zipCode: orderInfo?.deliveryAddress?.zipCode || "",
            floor: orderInfo?.deliveryAddress?.floor || "",
            addressType: orderInfo?.deliveryAddress?.type || "",
            comment: orderInfo?.addressComments || "",
            // "state": "string",
          };
          body.contactlessDelivery = orderInfo?.contactless ? true : false;

          orderReply = await dispatch(submitDeliveryOrder(body));
        }
        dispatch(
          setModal({
            isVisible: true,
            actAsLoader: true,
            content:
              "Please wait while we're waiting for the store to approve your order.",
          })
        );
        dispatch(setLoader(false));

        // When the order is sent we have to poll in order to change the order status from pending to approved
        pollForOrderStatus(
          storeInfo?.id,
          orderReply?.orderId,
          orderReply?.paymentUri,
          performance.now()
        );
      } catch (e) {
        console.log(e);
        dispatch(
          setModal({
            isVisible: true,
            hideCancelButton: true,
            content:
              "There was a problem while sending your order to the Server. Please try again",
            title: "Error",
          })
        );
        dispatch(setLoader(false));
      }
    }
  };

  const renderPaymentIframe = (paymentUri) => {
    const parent = document.createElement("div");
    parent.id = "payment-iframe-parent";
    const close = document.createElement("span");
    close.textContent = "PRESS TO CLOSE THIS";
    close.style.color = "white";
    close.style.cursor = "pointer";
    close.onclick = deletePaymentIframe;
    const parent2 = document.createElement("div");
    parent2.id = "iframe-close-and-content";
    const el = document.createElement("iframe");
    el.id = "payment-iframe";
    el.src = paymentUri;
    parent2.appendChild(close);
    parent2.appendChild(el);
    parent.appendChild(parent2);
    document.body.appendChild(parent);
  };

  const deletePaymentIframe = () => {
    const el = document.getElementById("payment-iframe-parent");
    if (el) {
      el.remove();
    }
  };

  const checkIfPaymentIframeExists = () => {
    const el = document.getElementById("payment-iframe-parent");
    return el ? true : false;
  };

  // polls in order to see if the order status has changed from pending to approved
  // polls every 5 seconds for a max time of 300 seconds.
  // this is why we have the argument called "startingTime"
  const pollForOrderStatus = async (
    storeId,
    orderId,
    paymentUri,
    startingTime
  ) => {
    try {
      let now = performance.now();
      let pollTime = (now - startingTime) / 1000;
      if (pollTime <= 60) {
        // means that we haven't found an answer yet.
        const data = await dispatch(fetchOrderStatus(storeId, orderId));
        // we examine if data.orderStatus = 0. If this is the case it means that the order is still
        // unverified so we make the api call again.
        if (data?.orderStatus === 0) {
          setTimeout(() => {
            pollForOrderStatus(storeId, orderId, paymentUri, startingTime);
          }, 5000);
        } else if (
          data?.orderStatus === 1 ||
          data?.orderStatus === 4 ||
          data?.orderStatus === 3
        ) {
          console.log("end normal poll");
          // we have a reply so we parse it
          if (orderInfo?.paymentMethod === 2) {
            // when payment method = 2 it means that the user is paying with their card now
            // so we are redirecting the user to pay with their card
            // and then we'll poll again in order to wait for the payment status to change

            dispatch(
              setModal({
                isVisible: true,
                actAsLoader: true,
                content:
                  "The order has been accepted. Please complete the payment in order to proceed.",
              })
            );
            window.open(paymentUri, "_blank");
            renderPaymentIframe(paymentUri);
            pollForPaymentResults(
              storeId,
              orderId,
              paymentUri,
              performance.now()
            );
          } else {
            dispatch(
              setModal({
                isVisible: true,
                hideCancelButton: true,
                content: "The order has been accepted!",
                title: "Notification",
              })
            );
          }
        } else {
          dispatch(
            setModal({
              isVisible: true,
              hideCancelButton: true,
              content: "The order has been rejected by the store",
              title: "Notification",
            })
          );
        }
      } else {
        // means that we're polling for over 300 seconds = 5mins
        dispatch(
          setModal({
            isVisible: true,
            hideCancelButton: true,
            content: "The order has been cancelled",
            title: "Notification",
          })
        );
      }
    } catch (e) {
      console.log(e);
      dispatch(
        setModal({
          isVisible: true,
          hideCancelButton: true,
          content:
            "There was an error while waiting for the order's approval. Please try submitting the order again",
          title: "Error",
        })
      );
    }
  };

  const pollForPaymentResults = async (
    storeId,
    orderId,
    paymentUri,
    startingTime
  ) => {
    try {
      let now = performance.now();
      let pollTime = (now - startingTime) / 1000;
      if (!checkIfPaymentIframeExists()) {
        dispatch(
          setModal({
            isVisible: true,
            hideCancelButton: true,
            content: "The payment has been cancelled.",
            title: "Notification",
          })
        );
        return;
      }
      if (pollTime <= 60) {
        // means that we haven't found an answer yet.
        const data = await dispatch(fetchOrderStatus(storeId, orderId));
        // we examine if data.orderStatus = 0. If this is the case it means that the order is still
        // unverified so we make the api call again.
        if (data?.paymentStatus === 0) {
          setTimeout(() => {
            pollForPaymentResults(storeId, orderId, paymentUri, startingTime);
          }, 5000);
        } else if (data?.paymentStatus === 0) {
          dispatch(
            setModal({
              isVisible: true,
              hideCancelButton: true,
              content: "The payment has been accepted!",
              title: "Notification",
            })
          );
          deletePaymentIframe();
        } else {
          deletePaymentIframe();

          dispatch(
            setModal({
              isVisible: true,
              hideCancelButton: true,
              content: "The payment has been rejected. Please try again",
              title: "Notification",
            })
          );
        }
      } else {
        // means that we're polling for over 300 seconds = 5mins
        deletePaymentIframe();
        dispatch(
          setModal({
            isVisible: true,
            hideCancelButton: true,
            content: "The payment order has expired",
            title: "Notification",
          })
        );
      }
    } catch (e) {
      console.log(e);
      dispatch(
        setModal({
          isVisible: true,
          hideCancelButton: true,
          content: "There was an error while waiting for the user's payment",
          title: "Error",
        })
      );
    }
  };

  return (
    <div className={css(styles.container, actAsModal && styles.actAsModal)}>
      <Container
        headerImage={basketImage}
        hideNavbar={isFromBasket}
        header="Basket"
      >
        <BeautifiedBasket
          isLoading={isLoading}
          basket={basket}
          setBasket={setBasket}
        />
      </Container>
      <AddressSection
        isLoading={isLoading}
        orderInfo={orderInfo}
        openAddressesModal={openAddressesModal}
        addressComments={_addressComments}
        isFromBasket
        setOrderInfo={setOrderInfo}
        setAddressComments={_setAddressComments}
      />
      <Container header="Payment Details">
        <PaymentSection
          isLoading={isLoading}
          openPaymentsModal={openPaymentsModal}
          orderInfo={orderInfo}
          setOrderInfo={setOrderInfo}
          cardTypes={cardTypes}
        />
        <InvoiceOrReceipt
          isLoading={isLoading}
          orderInfo={orderInfo}
          setOrderInfo={setOrderInfo}
          openInvoicesModal={openInvoicesModal}
        />
      </Container>
      {orderInfo?.isInvoice && (
        <Container header="Selected Invoice">
          <InvoiceSection
            isLoading={isLoading}
            openPaymentsModal={openInvoicesModal}
            orderInfo={orderInfo}
          />
        </Container>
      )}
      {/* Tips section will only be available if the user is paying by card. */}
      {orderInfo?.paymentMethod === 2 && (
        <Container header="Tip" headerImage={tipImage}>
          <Tips
            isLoading={isLoading}
            orderInfo={orderInfo}
            setOrderInfo={setOrderInfo}
          />
        </Container>
      )}
      <Container header="Order Details">
        {!isLoading ? (
          <TextField
            label="Order Comments"
            className={css(styles.commentsField)}
            value={orderComments}
            onBlur={() => setOrderInfo({ ...orderInfo, orderComments })}
            onChange={(e) => setOrderComments(e.target.value)}
            multiline
            rows={3}
          />
        ) : (
          <OrderInfoGenericSkeleton emulateTextField />
        )}
        <TermsSection
          isLoading={isLoading}
          orderInfo={orderInfo}
          setOrderInfo={setOrderInfo}
          isPayingWithCard={orderInfo?.paymentMethod === 2}
          isDelivery={selectedTab === "Delivery"}
        />
        {!isLoading ? (
          <Button style={{ width: "100%" }} onClick={submitOrder}>
            Send
          </Button>
        ) : (
          <OrderInfoGenericSkeleton emulateButton />
        )}
      </Container>
    </div>
  );
};

export default OrderInfo;
