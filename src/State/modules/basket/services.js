import Request from '../../../Utils/Request';

const _apiHost = process.env.REACT_APP_API_URL_SUBSCRIPTION;

const handleResults = (results) => {
  return results;
};

const fetchStores = async () => {
  const results = await Request.get(`${_apiHost}/customer/stores`);
  if (results.status === 'error') {
    console.log('error');
    return Promise.reject(results.message);
  }
  return handleResults(results);
};

export const Service = {
  fetchStores,
};
