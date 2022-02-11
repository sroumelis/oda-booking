import { createReducer } from "../../../../Utils";
import * as type from "./types";

const initialState = {
  isLoading: false,
  data: {},
  profilePicture: "",
};

export default createReducer(initialState, {
  [type.REQUEST](state) {
    return {
      ...state,
      isLoading: true,
      data: {},
    };
  },

  [type.SUCCESS](state, action) {
    return {
      ...state,
      isLoading: false,
      data: action?.response?.result,
      error: false,
    };
  },

  [type.FAILURE](state, action) {
    return {
      ...state,
      isLoading: false,
      data: action.response,
      error: true,
    };
  },
  [type.SET_PROFILE_PIC](state, action) {
    return {
      ...state,
      profilePicture: action.payload.profilePicture,
    };
  },
  // All other action types result in state being returned
});
