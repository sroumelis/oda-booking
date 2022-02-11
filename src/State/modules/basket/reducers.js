import { createReducer } from "../../../Utils";
import * as type from "./types";

const initialState = {
  data: [],
};

export default createReducer(initialState, {
  [type.SET_BASKET](state, action) {
    return {
      ...state,
      data: action.payload.basket,
    };
  },
  // All other action types result in state being returned
});
