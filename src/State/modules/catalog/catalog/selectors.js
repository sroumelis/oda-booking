import { createSelector } from "reselect";

const catalog = (state) => state.catalog;

const getCatalog = createSelector(catalog, (catalogState) => {
  return catalogState ? catalogState.data : [];
});

const sortWithDisplayIndex = (arr) => {
  if (arr?.length >= 2) {
    return arr?.sort((a, b) => {
      // if(a < b ) {
      //   return -1;
      // } else if (a > b) {
      //   return 1;
      // }
      // return 0;
      return (a?.displayIndex || 0) - (b?.displayIndex || 0);
    });
  } else {
    return arr;
  }
};

const sortRecursively = (arr) => {
  const _arr = [...sortWithDisplayIndex(arr)];
  for (let i = 0; i < _arr.length; i += 1) {
    if (_arr[i]?.products?.length) {
      _arr[i].products = [...sortRecursively(_arr[i].products)];
    }
    if (_arr[i]?.subGroups?.length) {
      _arr[i].subGroups = [...sortRecursively(_arr[i].subGroups)];
    }
  }
  return _arr;
};
//

const getCatalogProducts = createSelector(catalog, (catalogState) => {
  let productGroups = catalogState?.data?.productGroups;
  // let productGroups = [
  //   {
  //     displayIndex: 0,
  //     products: [
  //       {
  //         displayIndex: 1,
  //       },
  //       {
  //         displayIndex: 3,
  //       },
  //       {
  //         displayIndex: 2,
  //       },
  //     ],
  //     subGroups: [
  //       {
  //         displayIndex: 1,
  //       },
  //       {
  //         displayIndex: 3,
  //       },
  //       {
  //         displayIndex: 2,
  //       },
  //     ],
  //   },
  //   {
  //     displayIndex: 2,
  //     products: [
  //       {
  //         displayIndex: 1,
  //       },
  //       {
  //         displayIndex: 3,
  //       },
  //       {
  //         displayIndex: 2,
  //         products: [
  //           {
  //             displayIndex: 1,
  //           },
  //           {
  //             displayIndex: 3,
  //           },
  //           {
  //             displayIndex: 2,
  //           },
  //         ],
  //         subGroups: [
  //           {
  //             displayIndex: 1,
  //           },
  //           {
  //             displayIndex: 3,
  //             products: [
  //               {
  //                 displayIndex: 1,
  //               },
  //               {
  //                 displayIndex: 3,
  //               },
  //               {
  //                 displayIndex: 2,
  //               },
  //             ],
  //             subGroups: [
  //               {
  //                 displayIndex: 1,
  //               },
  //               {
  //                 displayIndex: 3,
  //               },
  //               {
  //                 displayIndex: 2,
  //               },
  //             ],
  //           },
  //           {
  //             displayIndex: 2,
  //           },
  //         ],
  //       },
  //     ],
  //     subGroups: [
  //       {
  //         displayIndex: 1,
  //       },
  //       {
  //         displayIndex: 3,
  //       },
  //       {
  //         displayIndex: 2,
  //         products: [
  //           {
  //             displayIndex: 1,
  //           },
  //           {
  //             displayIndex: 3,
  //           },
  //           {
  //             displayIndex: 2,
  //           },
  //         ],
  //         subGroups: [
  //           {
  //             displayIndex: 1,
  //             products: [
  //               {
  //                 displayIndex: 1,
  //               },
  //               {
  //                 displayIndex: 3,
  //               },
  //               {
  //                 displayIndex: 2,
  //               },
  //             ],
  //             subGroups: [
  //               {
  //                 displayIndex: 1,
  //               },
  //               {
  //                 displayIndex: 3,
  //               },
  //               {
  //                 displayIndex: 2,
  //                 products: [
  //                   {
  //                     displayIndex: 1,
  //                   },
  //                   {
  //                     displayIndex: 3,
  //                   },
  //                   {
  //                     displayIndex: 2,
  //                   },
  //                 ],
  //                 subGroups: [
  //                   {
  //                     displayIndex: 1,
  //                   },
  //                   {
  //                     displayIndex: 3,
  //                   },
  //                   {
  //                     displayIndex: 2,
  //                   },
  //                 ],
  //               },
  //             ],
  //           },
  //           {
  //             displayIndex: 3,
  //           },
  //           {
  //             displayIndex: 2,
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     displayIndex: 1,
  //     products: [{}, {}, {}],
  //     subGroups: [{}, {}, {}],
  //   },
  // ];
  if (productGroups?.length) {
    // sorting the main categories
    productGroups = [...sortWithDisplayIndex(productGroups)];
    // for each subcategory inside a main category we will sort the products + subcategories
    for (let i = 0; i < productGroups.length; i += 1) {
      // checking the products element
      if (productGroups[i]?.products?.length) {
        productGroups[i].products = [
          ...sortRecursively(productGroups[i]?.products),
        ];
      }
      // checking the subgroups element
      if (productGroups[i]?.subGroups?.length) {
        productGroups[i].subGroups = [
          ...sortRecursively(productGroups[i]?.subGroups),
        ];
      }
    }
    return productGroups;
  } else {
    return [];
  }
});

const getAllCatalogueProducts = createSelector(catalog, (catalogState) => {
  const rawData = catalogState?.data?.productGroups;
  let arr = [];
  const finalObj = {};
  const recursivePart = (obj) => {
    if (!obj?.length) {
      if (obj?.subGroups?.length) {
        recursivePart(obj.subGroups);
      }
      if (obj?.products?.length) {
        recursivePart(obj.products);
      }
      if (!obj?.products?.length && !obj?.subGroups?.length) {
        // plain item so we add it on the array
        arr.push(obj);
      }
    } else {
      for (let i = 0; i < obj.length; i += 1) {
        if (obj[i]?.subGroups?.length) {
          recursivePart(obj.subGroups);
        }
        if (obj[i]?.products?.length) {
          recursivePart(obj[i].products);
        }
        if (!obj[i]?.products?.length && !obj[i]?.subGroups?.length) {
          // plain item so we add it on the array
          arr.push(obj[i]);
        }
      }
    }
  };

  for (let i = 0; i < rawData?.length; i += 1) {
    recursivePart(rawData[i]);
  }

  arr.forEach((item) => {
    if (item?.name) {
      if (!finalObj[item.name?.toLowerCase()?.[0]]) {
        finalObj[item.name?.toLowerCase()?.[0]] = [];
      }
      finalObj[item.name?.toLowerCase()?.[0]].push(item);
    }
  });
  return finalObj;
});

const isLoading = createSelector(catalog, (catalogState) => {
  return catalogState?.isLoading;
});

const getError = createSelector(catalog, (catalogState) => {
  return catalogState?.error;
});

export {
  catalog,
  getCatalog,
  getCatalogProducts,
  getAllCatalogueProducts,
  isLoading,
  getError,
};
