import Request from "../../../../Utils/Request";

const _apiHost = process.env.REACT_APP_API_URL_CUSTOMERS;

const handleResults = (results, preventOrderInfoUpdate) => {
  results.result.preventOrderInfoUpdate = preventOrderInfoUpdate ? true : false;
  return results;
};

const registerUser = async (preventOrderInfoUpdate) => {
  const results = await Request.get(`${_apiHost}/customer/info`);
  if (results.status === "error") {
    console.log("error");
    const parsedJSON = JSON.parse(results?.rawText);
    return Promise.reject(parsedJSON?.[""]?.[0] || results.message);
  }
  return handleResults(results, preventOrderInfoUpdate);
};

export const Service = {
  registerUser,
};
