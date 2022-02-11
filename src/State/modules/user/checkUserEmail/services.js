import Request from "../../../../Utils/Request";

const _apiHost = process.env.REACT_APP_API_URL_CUSTOMERS;

const handleResults = (results, preventOrderInfoUpdate) => {
  return results;
};

const checkIfUserExists = async (email) => {
  const results = await Request.get(`${_apiHost}/customer/email-check?Email=${email}`);
  if (results.status === "error") {
    console.log("error");
    return Promise.reject(results.message);
  }
  return handleResults(results);
};

export const Service = {
  checkIfUserExists,
};
