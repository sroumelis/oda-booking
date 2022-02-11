import { createSelector } from "reselect";
import {
  hideCardNumbers,
  parseAddressObject,
  parseJwt,
  parseInvoiceObject,
} from "../../../../Utils/utilities";

const userInfo = (state) => state.userInfo;

const getUserInfo = createSelector(userInfo, (userInfoState) => {
  return userInfoState ? userInfoState.data : [];
});

const isLoading = createSelector(userInfo, (userInfoState) => {
  return userInfoState?.isLoading;
});

const getUserCards = createSelector(userInfo, (userInfoState) => {
  // return [
  //   {
  //     cardNumber: "1111",
  //   },
  //   {
  //     cardNumber: "2222",
  //   },
  //   {
  //     cardNumber: "3333",
  //   },
  // ];
  const cards = userInfoState?.data?.paymentMethods || [];
  for (let i = 0; i < cards?.length; i += 1) {
    cards[i].cardNumber = hideCardNumbers(cards[i].cardNumber);
  }
  return cards || [];
});

const getUserDetails = createSelector(userInfo, (userInfoState) => {
  const birthday = userInfoState?.data?.birthdate;
  const userInfo = {
    firstName: userInfoState?.data?.name?.split(" ")[0] || "",
    lastName: userInfoState?.data?.name?.split(" ")[1] || "",
    mobile: userInfoState?.data?.selectedPhone?.phoneNumber || "",
    birthdate: birthday ? new Date(birthday) : new Date(),
  };
  return userInfo;
});

// const getUserAddresses = createSelector(userInfo, (userInfoState) => {
//   // return [{ street: "aaaa" }, { street: "bbbb" }, { street: "ccc" }];
//   const addresses = userInfoState?.data?.addresses || [];
//   const invoices = userInfoState?.data?.invoices || [];
//   let combinedArray = [...addresses, ...invoices];
//   const finalArray = [];
//   for (let i = 0; i < combinedArray.length; i += 1) {
//     combinedArray[i].parsedAddress = combinedArray[i]?.vat
//       ? parseInvoiceObject(combinedArray[i])
//       : parseAddressObject(combinedArray[i]);
//     combinedArray[i].isInvoice = combinedArray[i]?.vat ? true : false;
//   }
//   for (let i = 0; i < combinedArray.length; i += 1) {
//     let hasDuplicate = false;
//     for (let j = 0; j < finalArray.length; j += 1) {
//       if (finalArray[j].parsedAddress === combinedArray[i].parsedAddress) {
//         hasDuplicate = true;
//       }
//     }
//     if (!hasDuplicate) {
//       finalArray.push(combinedArray[i]);
//     }
//   }
//   return finalArray;
// });

const getUserAddresses = createSelector(userInfo, (userInfoState) => {
  // return [{ street: "aaaa" }, { street: "bbbb" }, { street: "ccc" }];
  const addresses = userInfoState?.data?.addresses || [];
  let combinedArray = [...addresses];
  for (let i = 0; i < combinedArray.length; i += 1) {
    combinedArray[i].parsedAddress = parseAddressObject(combinedArray[i]);
  }
  return combinedArray;
});

const getUserInvoices = createSelector(userInfo, (userInfoState) => {
  // return [
  //   { street: "aaaa", vat: "11111" },
  //   { street: "bbbb", vat: "333" },
  //   { street: "ccc", vat: "222" },
  // ];
  const _invoices = [...(userInfoState?.data?.invoices || [])];
  for (let i = 0; i < _invoices.length; i += 1) {
    _invoices[i].parsedAddress = parseInvoiceObject(_invoices[i]);
    _invoices[i].isInvoice = true;
    _invoices[i].parsedExtraData =
      (_invoices[i]?.vat ? "VAT: " + _invoices[i]?.vat + " " : "") +
      (_invoices[i]?.taxAuth ? "Tax Auth: " + _invoices[i]?.taxAuth : "");
  }
  return _invoices;
});

const getUserInitials = createSelector(userInfo, (userInfoState) => {
  try {
    const name = userInfoState?.data?.name;
    if (!name) {
      return "";
    }
    if (name.length <= 3) {
      return name;
    } else {
      const splitName = name.split(" ");
      if (splitName.length === 1) {
        return splitName[0].substring(0, 3);
      } else {
        return (splitName[0][0] || "") + (splitName[1][0] || "");
      }
    }
  } catch (e) {
    console.log(e);
    return "";
  }
});

const getProfileImage = createSelector(userInfo, (userInfoState) => {
  const pic = userInfoState?.profilePicture || "";
  return pic;
});

const getError = createSelector(userInfo, (userInfoState) => {
  return userInfoState?.error;
});
export {
  userInfo,
  getUserInitials,
  getUserInvoices,
  getProfileImage,
  getError,
  getUserInfo,
  isLoading,
  getUserCards,
  getUserAddresses,
  getUserDetails,
};
