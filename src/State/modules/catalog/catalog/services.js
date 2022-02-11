import Request from "../../../../Utils/Request";

const _apiHost = process.env.REACT_APP_API_URL_8004;

const handleResults = (results) => {
  return results;
};

const fetchCatalog = async (requestBody, hash) => {
  // const results = await Request.post(`/accounts/activities/search?p=${p || 0}&pSize=${pSize || 1000}`, body);
  const results = await Request.get(
    `https://apis.oda-platforms.com/uat/costing/api/v1/Catalog/Catalog?StoreId=3eff54bd-177d-43a6-a04d-48d853147653&CatalogName=oda Catalog&Hash=${
      hash || "3eff54bd-177d-43a6-a04d-48d853147653"
    }`,
    {
      header: {},
    }
  );
  console.log(results)
  if (results.status === "error") {
    console.log("error");
    return Promise.reject(results.message);
  }
  return handleResults(results);
};

export const Service = {
  fetchCatalog,
};
