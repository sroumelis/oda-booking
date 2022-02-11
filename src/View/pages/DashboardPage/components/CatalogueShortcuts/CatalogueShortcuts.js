import { withStyles } from "@material-ui/styles";
import React, { useEffect } from "react";
import styles from "./styles";
import oda from "../../../../common/theme/oda";
import { StyleSheet, css } from "aphrodite";
import { useDispatch, useSelector } from "react-redux";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import {
  catalogActions,
  catalogSelectors,
} from "../../../../../State/modules/catalog/catalog";
import { Container } from "../../../../common/components";
import { navigate, useLocation, Router } from "@reach/router";
import categoriesImage from "../../../../common/img/categories.png";

const CatalogueShortcuts = (props) => {
  const { selectedTab, catalogueState, setCatalogueState } = props;
  const catalogGroups = useSelector(catalogSelectors.getCatalogProducts);
  const areCatalogGroupsLoading = useSelector(catalogSelectors.isLoading);
  const catalogFetchError = useSelector(catalogSelectors.getError);
  const expandCategory = (index) => {
    const _arr = catalogueState;
    if (_arr?.length >= index) {
      for (let i = 0; i < _arr?.length; i += 1) {
        _arr[i] = false;
      }
      _arr[index] = true;
      setCatalogueState([..._arr]);
    }
  };

  const jumpToCatalogue = (index) => {
    setTimeout(() => {
      let el = document.getElementById("catalogue-expansion-panel-" + index);
      if (el) {
        let searchBarHeight = 0;
        let searchBar = document.getElementById("search-bar-div");
        searchBarHeight = searchBar?.getBoundingClientRect()?.height || 0;
        const y =
          el.getBoundingClientRect().top + window.pageYOffset - searchBarHeight;
        window.scrollTo({ top: y, behavior: "smooth" });
        expandCategory(index);
      }
    }, 450);
  };

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

  return (!areCatalogGroupsLoading && catalogGroups?.length) ||
    catalogFetchError ? (
    <div className={css(styles.shortcutsContainer)}>
      <Container header="Categories" headerImage={categoriesImage}>
        {!catalogFetchError ? (
          <>
            {catalogGroups?.map((group, i) => {
              let shouldRender = shouldRenderCategory(group);
              return shouldRender && group?.name ? (
                <div
                  className={css(
                    styles.shortcut,
                    catalogueState?.[i] && styles.expanded
                  )}
                  onClick={() => jumpToCatalogue(i)}
                  key={i}
                >
                  {group?.name}
                </div>
              ) : (
                <React.Fragment key={i}></React.Fragment>
              );
            })}
          </>
        ) : (
          <span className={css(styles.shortcut, styles.emptyShortcuts)}>
            No shortcuts available currently because of an error
            <br />
          </span>
        )}
      </Container>
    </div>
  ) : (
    <div className={css(styles.shortcutsContainer)}>
      <Container minWidth220 fullWidth header="Categories">
        <SkeletonTheme
          color={oda.colors.background}
          highlightColor={oda.colors.disabled + "26"}
        >
          <div style={{ width: "100%" }}>
            {/* <b>
            <div className={css(styles.shortcut, styles.shortcutHeader)}>
              Categories
            </div>
          </b> */}
            {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((item, i) => (
              <div
                key={i}
                className={css(styles.shortcut)}
                style={{ width: "100%" }}
                height={oda.lineHeights.normal}
              >
                <Skeleton height="100%" width="100%" />
              </div>
            ))}
          </div>
        </SkeletonTheme>
      </Container>
    </div>
  );
};

export default CatalogueShortcuts;
