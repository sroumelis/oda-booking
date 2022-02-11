// import createAction from './createAction';

const simpleAction = type => {
  return { type };
};
const request = type => {
  return { type };
};
const success = (type, response) => {
  return { type, response };
};
const failure = (type, error) => {
  return { type, error };
};

const createAction = {
  request,
  success,
  failure,
  simpleAction,
};

const dispachRequest = (type, request, params = { withoutRequest: false }) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      if (!params.withoutRequest) {
        dispatch(createAction.request(type.REQUEST));
      }
      request(params).then(
        response => {
          dispatch(createAction.success(type.SUCCESS, response));
          resolve(response);
        },
        error => {
          dispatch(createAction.failure(type.FAILURE, error?.toString()));
          reject(error);
        },
      );
    });
  };
};

const dispachCustomAction = (type, payload) => {
  return dispatch => {
    dispatch({ type, payload });
  };
};

const dispatchHelper = {
  dispachRequest,
  dispachCustomAction,
};

export default dispatchHelper;
