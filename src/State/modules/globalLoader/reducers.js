import { createReducer } from "../../../Utils";
import * as type from "./types";

const initialState = {
  isVisible: false,
};

export default createReducer(initialState, {
 
  [type.SET_LOADER](state, action) {
    return {
      ...state,
      isVisible: action.payload.isVisible,
    };
  },
  // All other action types result in state being returned
});
