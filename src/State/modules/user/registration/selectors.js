import { createSelector } from "reselect";

const registration = (state) => state.registration;

const getRegistrationData = createSelector(registration, (registrationState) => {
  return registrationState ? registrationState.data : [];
});

const isLoading = createSelector(registration, (registrationState) => {
  return registrationState?.isLoading;
});

export {
  registration,
  getRegistrationData,
  isLoading,
};
