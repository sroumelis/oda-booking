import { createSelector } from "reselect";

const confirmationModal = (state) => state.confirmationModal;

const getConfirmationModalData = createSelector(
  confirmationModal,
  (confirmationModalState) => {
    return confirmationModalState?.data;
  }
);

export { getConfirmationModalData };
