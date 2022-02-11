const simpleAction = type => {
  return { type };
};
const set = (type, response) => {
  return { type, response };
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
  set,
  request,
  success,
  failure,
  simpleAction,
};

export default createAction;
