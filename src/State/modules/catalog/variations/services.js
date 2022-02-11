import Request from "../../../../Utils/Request";

const _apiHost = process.env.REACT_APP_API_URL_8004;

const handleResults = (results) => {
  return results;
};

const fetchVariations = async (requestBody) => {
  // const results = await Request.post(`/accounts/activities/search?p=${p || 0}&pSize=${pSize || 1000}`, body);
  const results = await Request.get(`${_apiHost}/Catalog/Variations`, {
    ...requestBody,
    header: {},
  });
  if (results.status === "error") {
    console.log("error");
    return Promise.reject(results.message);
  }
  return handleResults(results);
};

export const Service = {
  fetchVariations,
};
