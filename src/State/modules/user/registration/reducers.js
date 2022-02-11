import { createReducer } from '../../../../Utils';
import * as type from './types';

const initialState = {
  isLoading: false,
  data: [],
};

export default createReducer(initialState, {
  [type.REQUEST](state) {
    return {
      ...state,
      isLoading: true,
      data: [],
    };
  },

  [type.SUCCESS](state, action) {
    return {
      ...state,
      isLoading: false,
      data: action?.response,
    };
  },

  [type.FAILURE](state, action) {
    return {
      ...state,
      isLoading: false,
      data: action.response,
      error: action.error,
    };
  },

  // All other action types result in state being returned
});
