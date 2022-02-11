/* eslint-disable no-prototype-builtins */
const createReducer = (initialState, handlers) => {
  return (state, action) => {
    if (state === undefined) state = initialState;

    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    }
    return state;
  };
};

export default createReducer;
