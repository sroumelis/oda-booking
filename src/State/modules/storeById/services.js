import Request from "../../../Utils/Request";

const _apiHost = process.env.REACT_APP_API_URL_SUBSCRIPTION;

const handleResults = (results) => {
  // console.log("MOCK DATA IN modules/storeById/services.js");
  // return {
  //   brandId: "2329fd65-e691-4982-ab4c-849eae6e8502",
  //   description: null,
  //   category: null,
  //   location: {
  //     x: 23.8160748,
  //     y: 38.0881961,
  //   },
  //   storeOptions: [
  //     {
  //       option: "Delivery",
  //       enabled: true,
  //       workingHours: [],
  //     },
  //     {
  //       option: "Take Away",
  //       enabled: true,
  //       workingHours: [],
  //     },
  //     {
  //       option: "Dine In",
  //       enabled: true,
  //       workingHours: [],
  //     },
  //   ],
  //   name: "Frankie Kifisia",
  //   legalTitle: "Athanasiadis IKE",
  //   taxRegNo: "GR679409204959",
  //   address: {
  //     street: "125 Χαρ. Τρικούπη",
  //     city: "Νέα Ερυθραία",
  //     province: "",
  //     postalCode: "146 71",
  //   },
  //   phoneNo: {
  //     phoneNumber: "+302108003851",
  //   },
  //   email: null,
  //   webSite: null,
  //   pictures: [],
  //   socialUrls: [],
  //   tags: null,
  //   id: "3eff54bd-177d-43a6-a04d-48d853147653",
  //   createdOn: "2021-08-29T13:53:42.855603",
  //   enabled: true,
  // };
  return results;
};

const storeById = async (id) => {
  const results = await Request.get(`${_apiHost}/customer/stores/${id}`);
  if (results.status === "error") {
    console.log("error");
    return Promise.reject(results.message);
  }
  return handleResults(results);
};

export const Service = {
  storeById,
};
