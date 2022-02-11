import { createReducer } from "../../../Utils";
import * as type from "./types";

const initialState = {
  data: "",
};

export default createReducer(initialState, {
  [type.SET_TAB](state, action) {
    return {
      ...state,
      data: action.payload.tabName,
    };
  },
  // All other action types result in state being returned
});
