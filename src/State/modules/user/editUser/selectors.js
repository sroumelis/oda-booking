import { createSelector } from "reselect";

const editUser = (state) => state.editUser;

const getUserInfo = createSelector(editUser, (editUserState) => {
  return editUserState ? editUserState.data : [];
});

const getError = createSelector(editUser, (editUserState) => {
  return editUserState?.error;
});
export { editUser, getError, getUserInfo };
