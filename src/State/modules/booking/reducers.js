import { createReducer } from "../../../Utils";
import * as type from "./types";

const initialState = {
  isLoading: false,
  data: [],
};

export default createReducer(initialState, {
  [type.SET_TABLE](state, action) {
    return {
      ...state,
      selectedTable: action?.payload,
    };
  },

  // All other action types result in state being returned
});
