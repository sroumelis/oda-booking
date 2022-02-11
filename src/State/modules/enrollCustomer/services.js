import Request from "../../../Utils/Request";

const _apiHost = process.env.REACT_APP_API_URL_CUSTOMERS;

const handleResults = (results) => {
  return results;
};

const enrollCustomer = async (brandId, storeId) => {
  const body = {
    body: {
      brandId,
      storeId,
    },
  };
  const results = await Request.post(`${_apiHost}/stores/customer`, body);
  if (results.status === "error") {
    console.log("error");
    return Promise.reject(results.message);
  }
  return handleResults(results);
};

export const Service = {
  enrollCustomer,
};
