import { createSelector } from "reselect";
import {
  hideCardNumbers,
  parseAddressObject,
  parseInvoiceObject,
} from "../../../../Utils/utilities";

const checkUserEmail = (state) => state.checkUserEmail;

const getCheckUserEmail = createSelector(
  checkUserEmail,
  (checkUserEmailState) => {
    return checkUserEmailState ? checkUserEmailState.data : [];
  }
);

const isLoading = createSelector(checkUserEmail, (checkUserEmailState) => {
  return checkUserEmailState?.isLoading;
});

export { getCheckUserEmail, isLoading };
