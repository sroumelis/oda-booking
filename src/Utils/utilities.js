import { createBrowserHistory } from "history";
import userManager from "./userManager";

const history = createBrowserHistory();

const saveCurrentRoute = () => {
  const history = createBrowserHistory();
  localStorage.lastRoute = history.location.pathname;
};
const getLastRoute = (route) => {
  //   if (route) {
  //     return route;
  //   }
  const { lastRoute } = localStorage;
  if (lastRoute) {
    return lastRoute;
  }
  return "/";
};

const historyHelpers = {
  history,
  saveCurrentRoute,
  getLastRoute,
};

const setSelectedItemAtFront = (array) => {
  if (!array) {
    return [];
  }
  const selectedItem = array.filter((customer) => {
    return customer.isSelected;
  });

  const results = selectedItem.concat(
    array.filter((customer) => {
      return !customer.isSelected;
    })
  );
  return results;
};

const dateComparison = (var1, var2) => {
  // date1,2 are arrays. 0th position contains day, 1st contains month and 2nd the year
  let date1 = var1.split("/");
  let date2 = var2.split("/");
  if (date1.length <= 1) {
    date1 = var1.split("-");
  }
  if (date2.length <= 1) {
    date2 = var2.split("-");
  }
  for (let i = 2; i >= 0; i -= 1) {
    if (date1[i] !== date2[i]) {
      return parseInt(date1[i], 10) > parseInt(date2[i], 10);
    }
  }
  return false;
};

/** returns true if var 2 should be sorted  before var1 */
const compareVariables = (var1, var2, comparisonType) => {
  if (comparisonType === "num") {
    return var1 > var2;
  }
  if (comparisonType === "txt") {
    if (!var1 && var2) {
      return true;
    }
    if (!var2 && var1) {
      return false;
    }
    if (!var2 && !var1) {
      return false;
    }
    return var1.localeCompare(var2) === 1;
  }
  if (comparisonType === "date") {
    return dateComparison(var1, var2);
  }
  if (comparisonType === "logical") {
    // the logic in this comparison is that false should only be after truth
    // so it returns true ONLY when we have a true statement after a false one
    return !var1 && var2;
  }
};

// default sort is ASCENDING (from small to big)
const sortArrayAscendingDescending = (array, col, asc, comparisonType) => {
  /** This var is true if we have changed the position of elements in the array in the current loop */
  let haveSwappedElements = true;
  /** Col 1 and col 2 are used because in order to get some elements we have to travel an extra step. for example
   * if we want to get id we go array[0][id] but,
   * if we want to get swiftNumber we go array[0][primaryBank][swiftNumber]
   */
  const col1 = col.split(".")[0];
  const col2 = col.split(".")[1];
  while (haveSwappedElements) {
    haveSwappedElements = false;
    for (let i = 0; i < array.length - 1; i += 1) {
      // if we have 2 cols to take into consideration, we use them both
      const var1 = col2 ? array[i][col1][col2] : array[i][col1];
      const var2 = col2 ? array[i + 1][col1][col2] : array[i + 1][col1];
      const comparison = compareVariables(var1, var2, comparisonType);
      // if a swap HAS to be done, we do it and we also raise the flag to true so that we can re-check the array for new swaps
      if (comparison) {
        const temp = array[i + 1];
        array[i + 1] = array[i];
        array[i] = temp;
        haveSwappedElements = true;
      }
    }
  }
  return asc ? array : array.reverse();
};

const dateFilter = (array, date, dateField) => {
  const filteredArray = [];
  // dateField is the field that will get filtered
  for (let i = 0; i < array.length; i += 1) {
    if (array[i][dateField] === date) {
      filteredArray.push(array[i]);
    }
  }
  return filteredArray;
};

const statusFilter = (array, status, statusField) => {
  const filteredArray = [];
  // statusField is the field that will get filtered
  for (let i = 0; i < array.length; i += 1) {
    if (array[i][statusField] === status) {
      filteredArray.push(array[i]);
    }
  }
  return filteredArray;
};

const countryFilter = (array, status, statusField) => {
  const filteredArray = [];
  // statusField is the field that will get filtered
  for (let i = 0; i < array.length; i += 1) {
    if (
      array[i][statusField].toLowerCase().indexOf(status.toLowerCase()) !== -1
    ) {
      filteredArray.push(array[i]);
    }
  }
  return filteredArray;
};

const wordFilter = (array, word) => {
  const filteredArray = [];
  for (let i = 0; i < array.length; i += 1) {
    let containsWord = false;
    if (
      array[i]?.content &&
      array[i]?.content.toLowerCase().indexOf(word.toLowerCase()) !== -1
    ) {
      containsWord = true;
    }
    if (
      array[i]?.createdAt &&
      array[i]?.createdAt.toLowerCase().indexOf(word.toLowerCase()) !== -1
    ) {
      containsWord = true;
    }
    if (
      array[i]?.title &&
      array[i]?.title.toLowerCase().indexOf(word.toLowerCase()) !== -1
    ) {
      containsWord = true;
    }
    // Object.keys(array[i]).forEach(row => {
    //   console.log(array[i]);
    //   // check if a row contains the selected word
    //   if ((array[i][row] + '').toLowerCase().indexOf(word.toLowerCase()) !== -1) {
    //     containsWord = true;
    //   }
    // });
    if (containsWord) {
      // keep the current row for display
      filteredArray.push(array[i]);
    }
  }
  return filteredArray;
};

const applyWordFilter = (array, word, fields, isNotJSON) => {
  if (!word) {
    return array;
  }
  const filteredArray = [];
  for (let i = 0; i < array.length; i += 1) {
    if (!isNotJSON) {
      for (let j = 0; j < fields.length; j += 1) {
        if (
          (array[i][fields[j]] + "" || "").toLowerCase().indexOf(word) !== -1
        ) {
          filteredArray.push(array[i]);
        }
      }
    }
  }
  return filteredArray;
};

const sortArray = {
  setSelectedItemAtFront,
  sortArrayAscendingDescending,
};

const applyFilters = (array, filters) => {
  if (filters) {
    for (let i = 0; i < filters.length; i += 1) {
      if (filters[i].type === "word") {
        array = wordFilter(array, filters[i].word);
      } else if (filters[i].type === "date") {
        array = dateFilter(array, filters[i].date, filters[i].dateField);
      } else if (filters[i].type === "status") {
        array = statusFilter(array, filters[i].status, filters[i].statusField);
      }
    }
  }
  return array;
};

const applyFiltersCustom = (array, filters) => {
  if (filters) {
    for (let i = 0; i < filters.length; i += 1) {
      if (filters[i].type === "word") {
        array = wordFilter(array, filters[i].word);
      } else if (filters[i].type === "date") {
        array = dateFilter(array, filters[i].date, filters[i].dateField);
      } else if (filters[i].type === "status") {
        array = countryFilter(array, filters[i].status, filters[i].statusField);
      }
    }
  }
  return array;
};

const fixDateTime = (date, withTime = true) => {
  const validDate = new Date(date);
  const year = validDate.getFullYear();
  let month = validDate.getMonth() + 1;
  let dt = validDate.getDate();
  if (dt < 10) {
    dt = "0" + dt;
  }
  if (month < 10) {
    month = "0" + month;
  }
  const d = dt + "/" + month + "/" + year;
  let time = "";
  if (withTime) {
    let hours = validDate.getHours();
    if (hours < 10) {
      hours = "0" + hours;
    }
    let minutes = validDate.getMinutes();
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    let seconds = validDate.getSeconds();
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    time = `${hours}:${minutes}:${seconds}`;
  }

  return !withTime ? d : `${d} ${time}`;
};

const safeRound = (value, decimals) => {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
};

// const formatMoney = (
//   amount,
//   decimalCount = 2,
//   decimal = ".",
//   thousands = ","
// ) => {
//   try {
//     decimalCount = Math.abs(decimalCount);
//     decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

//     const negativeSign = amount < 0 ? "-" : "";

//     // eslint-disable-next-line radix
//     const i = parseInt(
//       (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
//     ).toString();
//     const j = i.length > 3 ? i.length % 3 : 0;

//     return (
//       negativeSign +
//       (j ? i.substr(0, j) + thousands : "") +
//       i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
//       (decimalCount
//         ? decimal +
//           Math.abs(amount - i)
//             .toFixed(decimalCount)
//             .slice(2)
//         : "")
//     );
//   } catch (e) {
//     console.log(e);
//   }
// };

const formatMoney = (
  amount,
  decimalCount = 2,
  decimal = ".",
  thousands = ","
) => {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    // eslint-disable-next-line radix
    const i = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
    ).toString();
    const j = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : "") +
      " €"
    );
  } catch (e) {
    console.log(e);
  }
};

const getQueryVariable = (variable) => {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
};

const parseWeekday = (dayNumber) => {
  if (dayNumber === 0) {
    return "Sunday";
  } else if (dayNumber === 1) {
    return "Monday";
  } else if (dayNumber === 2) {
    return "Tuesday";
  } else if (dayNumber === 3) {
    return "Wednesday";
  } else if (dayNumber === 4) {
    return "Thursday";
  } else if (dayNumber === 5) {
    return "Friday";
  } else {
    return "Saturday";
  }
};

const oidc_logout = async () => {
  const user = await userManager.getUser();
  // removing the cached profile pic so that it can be re-cached
  localStorage.removeItem("cached-profile-picture");
  userManager.signoutRedirect({ id_token_hint: user?.id_token });
};

const hideCardNumbers = (card) => {
  let parsedCard = "";
  for (let i = 0; i < card.length; i += 1) {
    if (i !== 0 && i % 4 === 0) {
      parsedCard += " ";
    }
    parsedCard += i < 4 || i >= card.length - 4 ? card[i] : "*";
  }
  return parsedCard;
};

const locationQuery = async (text) =>
  new Promise((resolve, reject) => {
    if (!text) {
      return reject("Need valid text input");
    }

    // for use in things like GatsbyJS where the html is generated first
    if (typeof window === "undefined") {
      return reject("Need valid window object");
    }
    try {
      new window.google.maps.places.AutocompleteService().getPlacePredictions(
        {
          input: text,
          componentRestrictions: { country: ["gr", "cy"] },
          fields: ["address_components", "geometry"],
          types: ["address"],
        },
        async (data) => {
          const zipCodes = [];
          const predictionsObj = {
            address: [],
            city: [],
            state: [],
            zipCode: [],
          };
          for (let i = 0; i < data?.length; i += 1) {
            const code = await getPlaceZipCode(data[i].place_id);
            zipCodes.push(code);
            let splitData = data?.[i]?.description?.split(", ");
            if (
              splitData?.[0] &&
              !predictionsObj.address.includes(splitData?.[0])
            ) {
              predictionsObj.address.push(splitData?.[0]);
            }
            if (
              splitData?.[1] &&
              !predictionsObj.city.includes(splitData?.[1])
            ) {
              predictionsObj.city.push(splitData?.[1]);
            }
            if (
              splitData?.[2] &&
              !predictionsObj.state.includes(splitData?.[2])
            ) {
              predictionsObj.state.push(splitData?.[2]);
            }
          }
          for (let i = 0; i < zipCodes.length; i += 1) {
            if (zipCodes[i] && !predictionsObj.zipCode.includes(zipCodes[i])) {
              predictionsObj.zipCode.push(zipCodes[i]);
            }
          }
          resolve(predictionsObj);
        }
      );
    } catch (e) {
      reject(e);
    }
  });

const getPlaceZipCode = async (placeId) => {
  // returns a promise that when it's fulfilled it will return the
  //  zip code of a place provided with the placeId
  return new Promise((resolve, reject) => {
    var geocoder = new window.google.maps.Geocoder();
    geocoder.geocode(
      {
        placeId,
      },
      function (results, status) {
        let components = results?.[0]?.address_components || [];
        let filteredComponents = components.filter((component) =>
          component.types.includes("postal_code")
        )?.[0];
        resolve(filteredComponents?.long_name || "");
      },
      () => {
        reject(-1);
      }
    );
  });
};

const searchLocation = (e) => {
  const prom = new Promise((resolve, reject) => {
    var geocoder = new window.google.maps.Geocoder();
    geocoder.geocode(
      { address: e },
      function (results, status) {
        if (status == window.google.maps.GeocoderStatus.OK) {
          const predictionsObj = {
            address: [],
            city: [],
            state: [],
            zipCode: [],
          };
          for (let i = 0; i < results?.length; i += 1) {
            const parsedObj = handleCurrentPositionObject(
              results[i]?.address_components
            );
            if (parsedObj.address) {
              predictionsObj.address.push(parsedObj.address);
            }
            if (parsedObj.city) {
              predictionsObj.city.push(parsedObj.city);
            }
            if (parsedObj.state) {
              predictionsObj.state.push(parsedObj.state);
            }
            if (parsedObj.zipCode) {
              predictionsObj.zipCode.push(parsedObj.zipCode);
            }
          }
          resolve(predictionsObj);
        } else {
          resolve({ address: [], city: [], state: [], zipCode: [] });
        }
      },
      () => reject({ address: [], city: [], state: [], zipCode: [] })
    );
  });
  return prom;
};

const handleCurrentPositionObject = (obj) => {
  let geoObj = {
    address: "", //street + number
    city: "", // perioxi (px birwnas),
    state: "", //country
    zipCode: "",
  };
  for (let i = 0; i < obj?.length; i += 1) {
    for (let j = 0; j < obj?.[i]?.types?.length; j += 1) {
      if (obj[i]?.types[j] === "route") {
        geoObj.address = obj?.[i]?.long_name + geoObj.address;
      } else if (obj[i]?.types[j] === "street_number") {
        geoObj.address = geoObj.address + " " + obj[i]?.long_name;
      } else if (
        (obj[i]?.types[j] === "locality" || obj[i]?.types[j] === "political") &&
        !geoObj.city
      ) {
        geoObj.city = obj[i]?.long_name;
      } else if (obj[i]?.types[j] === "country") {
        geoObj.state = obj[i]?.long_name;
      } else if (obj[i]?.types[j] === "postal_code") {
        geoObj.zipCode = obj[i]?.long_name;
      }
    }
  }
  return geoObj;
};

const parseAddressObject = (addressObj, makeShort) => {
  const street = addressObj?.street || "";
  const floor = addressObj?.floor || "";
  const city = addressObj?.city || "";
  const zipCode = addressObj?.zipCode || "";
  let finalStr = "";

  if (street) {
    finalStr = street;
    if (floor || city || zipCode) {
      finalStr += ", ";
    }
  }
  if (city) {
    finalStr += city;
    if ((zipCode || floor) && !makeShort) {
      finalStr += ", ";
    }
  }
  // makeShort returns only address, city
  if (makeShort) {
    return finalStr;
  } else {
    if (zipCode) {
      finalStr += zipCode;
      if (floor) {
        finalStr += ", ";
      }
    }
    if (floor) {
      finalStr += "όροφος " + floor;
    }
    return finalStr;
  }
};

const parseJwt = async () => {
  const user = await userManager.getUser();
  const token = user.id_token;
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = await decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
};

const parseInvoiceObject = (addressObj, makeShort) => {
  const street = addressObj?.address || "";
  const floor = addressObj?.floor || "";
  const city = addressObj?.city || "";
  const zipCode = addressObj?.postCode || "";
  let finalStr = "";

  if (street) {
    finalStr = street;
    if (floor || city || zipCode) {
      finalStr += ", ";
    }
  }
  if (city) {
    finalStr += city;
    if ((zipCode || floor) && !makeShort) {
      finalStr += ", ";
    }
  }
  // makeShort returns only address, city
  if (makeShort) {
    return finalStr;
  } else {
    if (zipCode) {
      finalStr += zipCode;
      if (floor) {
        finalStr += ", ";
      }
    }
    if (floor) {
      finalStr += "όροφος " + floor;
    }
    return finalStr;
  }
};

const cleanBase64 = (base64) => {
  try {
    return base64?.split(",")?.[1] || "";
  } catch (e) {
    console.log(e);
    return "";
  }
};

export {
  sortArray,
  historyHelpers,
  applyFilters,
  applyFiltersCustom,
  fixDateTime,
  formatMoney,
  parseWeekday,
  applyWordFilter,
  safeRound,
  // parseJwt,
  getQueryVariable,
  oidc_logout,
  hideCardNumbers,
  searchLocation,
  handleCurrentPositionObject,
  parseJwt,
  parseAddressObject,
  parseInvoiceObject,
  locationQuery,
  cleanBase64,
};
