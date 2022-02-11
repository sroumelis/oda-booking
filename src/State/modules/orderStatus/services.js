import Request from "../../../Utils/Request";

const _apiHost = process.env.REACT_APP_API_URL_ORDER;

const handleResults = (results) => {
  return results;
};

const fetchOrderStatus = async (storeId, orderId) => {
  const results = await Request.get(
    `${_apiHost}/orders?storeId=${storeId}&orderId=${orderId}`
  );
  if (results.status === "error") {
    console.log("error");
    return Promise.reject(results.message);
  }
  return handleResults(results);
};

export const Service = {
  fetchOrderStatus,
};
