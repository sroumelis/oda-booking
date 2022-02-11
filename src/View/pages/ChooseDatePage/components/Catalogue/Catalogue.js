import { withStyles } from "@material-ui/styles";
import React, { useEffect } from "react";
import styles from "./styles";
import { StyleSheet, css } from "aphrodite";
import {
  CustomExpansionPanel,
  Item,
  ExpandableItem,
} from "./components/catalogueComponents";
import { useDispatch, useSelector } from "react-redux";
import { Container, ReloadComponent } from "../../../../common/components";
import { setLoader } from "../../../../../State/modules/globalLoader/actions";
import catalogueImage from "../../../../common/img/catalogue.png";
import {
  catalogActions,
  catalogSelectors,
} from "../../../../../State/modules/catalog/catalog";
import { navigate, useLocation, Router } from "@reach/router";

const Catalogue = (props) => {
  const { selectedTab, catalogueState, setCatalogueState, isComingFromBasket } =
    props;
  const dispatch = useDispatch();
  const catalogGroups = useSelector(catalogSelectors.getCatalogProducts);
  // let catalogGroups = '';
  const catalogFetchError = useSelector(catalogSelectors.getError);
  const areCatalogGroupsLoading = useSelector(catalogSelectors.isLoading);
  const location = useLocation();
  const _fetchCatalog = async (showLoader) => {
    try {
      if (showLoader) {
        dispatch(setLoader(true));
      }
      const data = {
        StoreId: "5CDA86A1-4CB6-4EBE-B879-3203A68E89BF",
        CatalogName: "oda Catalog",
        Hash: "3AE025E89A21CEC3A81CB082FCC8B49D",
      };
      const catalogHash = await localStorage.getItem("catalogueHash");
      const catalog = await dispatch(
        catalogActions.fetchCatalog(data, catalogHash || false)
      );
      localStorage.setItem('catalogueHash',catalog?.hash || "");
    } catch (error) {
      console.log(error);
    } finally {
      if (showLoader) {
        dispatch(setLoader(false));
      }
    }
  };

  useEffect(() => {
    if (!isComingFromBasket || !catalogGroups || !catalogGroups.length) {
      _fetchCatalog();
    }
  }, []);

  useEffect(() => {
    let _catalogState = [];
    for (let i = 0; i < catalogGroups?.length; i += 1) {
      _catalogState.push(false);
    }
    setCatalogueState([..._catalogState]);
  }, [catalogGroups]);

  const renderSkeletons = () => {
    const el = [];
    for (let i = 0; i < 10; i += 1) {
      el.push(<CustomExpansionPanel key={i} isLoading={true} />);
    }
    return el;
  };

  const changeExpansionState = (index, expanded) => {
    const _arr = catalogueState;
    if (_arr?.length >= index) {
      for (let i = 0; i < _arr?.length; i += 1) {
        _arr[i] = false;
      }
      _arr[index] = expanded;
      setCatalogueState([..._arr]);
    }
  };
  // catalogGroups = [
  //   {
  //     name: "Outer Onoma",
  //     products: [
  //       {
  //         name: "product1",
  //         description: "desc!!",
  //       },
  //       {
  //         name: "product2",
  //         description: "desc!!",
  //         subGroups: [
  //           {
  //             name: "1mesa mesa1",
  //             description: "desc!!",
  //           },
  //           {
  //             name: "1 mesa mesa2",
  //             description: "desc!!",
  //           },
  //         ],
  //       },
  //       {
  //         name: "product3",
  //         description: "desc!!",
  //       },
  //     ],
  //     subGroups: [
  //       {
  //         name: "onoma mesa",
  //         description: "desc!!",
  //         products: [
  //           {
  //             name: "1mesa",
  //             description: "desc!!",
  //             subGroups: [
  //               {
  //                 name: "1mesa mesa1",
  //                 description: "desc!!",
  //               },
  //               {
  //                 name: "1 mesa mesa2",
  //                 description: "desc!!",
  //               },
  //             ],
  //           },
  //           {
  //             name: "2mesa",
  //             products: [
  //               {
  //                 name: "2mesa mesa1",
  //                 description: "desc!!",
  //               },
  //               {
  //                 name: "2mesa mesa2",
  //                 description: "desc!!",
  //               },
  //               {
  //                 name: "2mesa mesa3",
  //                 description: "desc!!",
  //               },
  //             ],
  //           },
  //           {
  //             name: "3mesa",
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ];
  // return <ExpandableItem item={item} depth={0} />;

  const checkObjectRecursively = (obj) => {
    if (obj?.subGroups?.length) {
      let val = shouldRenderCategory(obj.subGroups);
      if (val) {
        return true;
      }
    }
    if (obj?.products?.length) {
      let val = shouldRenderCategory(obj.products);
      if (val) {
        return true;
      }
    }
    if (obj?.prices) {
      for (let j = 0; j < obj.prices.length; j += 1) {
        if (
          obj.prices[j].type === "All" ||
          obj.prices[j].type === selectedTab
        ) {
          return true;
        }
      }
    }
  };

  const shouldRenderCategory = (arr) => {
    if (arr && !arr?.length) {
      let val = checkObjectRecursively(arr);
      if (val) {
        return true;
      }
    } else {
      for (let i = 0; i < arr.length; i += 1) {
        let val = checkObjectRecursively(arr[i]);
        if (val) {
          return true;
        }
      }
    }
    return false;
  };

  return (
    <Container removePadding header="Catalogue" headerImage={catalogueImage}>
      <div className={css(styles.catalogueMotherDiv)}>
        {!catalogFetchError ? (
          <>
            {(!catalogGroups || areCatalogGroupsLoading) &&
              // Making loading skeletons appear
              renderSkeletons()}
            {catalogGroups?.map((group, i) => {
              let shouldRender = shouldRenderCategory(group);
              return shouldRender && group?.name ? (
                <div
                  className={css(styles.catalogueContainer)}
                  id={"catalogue-expansion-panel-" + i}
                  key={i}
                >
                  <CustomExpansionPanel
                    containerId={"catalogue-expansion-panel-" + i}
                    title={group?.name}
                    isExpanded={catalogueState[i]}
                    setIsExpanded={(expanded) =>
                      changeExpansionState(i, expanded)
                    }
                    subtitle={"(" + (group?.products?.length || 0) + ")"}
                  >
                    <ExpandableItem
                      disableHeader
                      item={group}
                      selectedTab={selectedTab}
                    />
                  </CustomExpansionPanel>
                </div>
              ) : (
                <React.Fragment key={i}></React.Fragment>
              );
            })}
          </>
        ) : (
          <ReloadComponent refreshFunction={() => _fetchCatalog(true)} />
        )}
      </div>
    </Container>
  );
};

export default Catalogue;
