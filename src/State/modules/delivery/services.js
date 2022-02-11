import Request from "../../../Utils/Request";

const _apiHost = process.env.REACT_APP_API_URL_ORDER;

const handleResults = (results) => {
  return results;
};

const postOrder = async (requestBody) => {
  const body = {
    body: requestBody,
  };
  const results = await Request.post(`${_apiHost}/orders/delivery`, body);
  if (results.status === "error") {
    console.log("error");
    return Promise.reject(results.message);
  }
  console.log(results);
  return handleResults(results);
};

export const Service = {
  postOrder,
};
