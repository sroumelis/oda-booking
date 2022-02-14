import { createSelector } from "reselect";

const booking = (state) => state.booking;

const selectedTable = createSelector(booking, (bookingState) => {
  return bookingState?.selectedTable;
});

export { booking, selectedTable };
