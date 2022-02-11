import { createReducer } from '../../../../Utils';
import * as type from './types';

const initialState = {
  isAuthenticated: false,
  data: [],
};

export default createReducer(initialState, {
  [type.IS_AUTHENTICATED](state) {
    return {
      ...state,
      isAuthenticated: true,
    };
  },

  [type.IS_NOT_AUTHENTICATED](state, action) {
    return {
      ...state,
      isAuthenticated: false,
    };
  },

  // All other action types result in state being returned
});
