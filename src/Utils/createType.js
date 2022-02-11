const createPrefix = path => {
  const pathArray = path.split('/');
  pathArray.splice(5, 1);
  const prefix = pathArray.join('/');
  return prefix;
};

const simpleAction = path => {
  return `${createPrefix(path)}_SIMPLE_ACTION`;
};
const customAction = (path, actionName) => {
  return `${createPrefix(path)}_${actionName}`;
};

const request = path => {
  return `${createPrefix(path)}_REQUEST`;
};

const success = path => {
  return `${createPrefix(path)}_SUCCESS`;
};

const failure = path => {
  return `${createPrefix(path)}_FAILURE`;
};

const createType = {
  customAction,
  simpleAction,
  request,
  success,
  failure,
};

export default createType;
