import Request from "../../../../Utils/Request";

const _apiHost = process.env.REACT_APP_API_URL_CUSTOMERS;

const handleResults = (results) => {
  return results;
};

const addPaymentMethod = async (requestBody) => {
  const body = {
    body: requestBody,
  };
  const results = await Request.post(
    `${_apiHost}/customer/paymentmethod`,
    body
  );
  if (results.status === "error") {
    console.log("error");
    const parsedJSON = JSON.parse(results?.rawText);
    return Promise.reject(parsedJSON?.[""]?.[0] || results.message);
  }
  return handleResults(results);
};

export const Service = {
  addPaymentMethod,
};
