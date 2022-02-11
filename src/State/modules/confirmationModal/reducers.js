import { createReducer } from "../../../Utils";
import * as type from "./types";

const initialState = {
  data: {},
};

export default createReducer(initialState, {
  [type.SET_MODAL](state, action) {
    return {
      ...state,
      data: action.payload.data,
    };
  },
  [type.CLOSE_MODAL](state, action) {
    return {
      ...state,
      data: {},
    };
  },
  // All other action types result in state being returned
});
