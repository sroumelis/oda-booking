import { withStyles } from "@material-ui/styles";
import React from "react";
import styles from "./styles";
import { StyleSheet, css } from "aphrodite";
import { TextField } from "@material-ui/core";
import search from "../../../../common/img/search.svg";
import oda from "../../../../common/theme/oda";
import Item from "../Catalogue/components/catalogueComponents/Item";
import { formatMoney } from "../../../../../Utils/utilities";
import { useDispatch, useSelector } from "react-redux";
import { navigate, useLocation, Router } from "@reach/router";
import {
  catalogActions,
  catalogSelectors,
} from "../../../../../State/modules/catalog/catalog";
const CustomTextField = withStyles({
  root: {
    backgroundColor: oda.colors.surface,
    color: oda.colors.primary,
    padding: "10px 16px 11px",
    borderRadius: "4px",
    "& > div": {
      fontSize: oda.fonts.large,
      lineHeight: oda.lineHeights.large,
    },
    "& input": {
      padding: 0,
    },
  },
})(TextField);

const SearchBar = (props) => {
  const { selectedTab } = props;
  const [value, onChange] = React.useState("");
  const [foundItems, setFoundItems] = React.useState([]);
  const [areResultsVisible, setAreResultsVisible] = React.useState(false);
  const catalogueItems = useSelector(catalogSelectors.getAllCatalogueProducts);
  const location = useLocation();

  React.useEffect(() => {
    if (value.length >= 3) {
      // All the values we compare are on lower case letters
      const _lowCaseValue = value.toLowerCase();
      const _foundItems = [];
      // CatalogueItems is a dictionary that stores the items depending on their starting letters
      const semiMatchingItems = catalogueItems[_lowCaseValue[0]];
      for (let i = 0; i < semiMatchingItems?.length; i += 1) {
        let itemName = semiMatchingItems[i]?.name?.toLowerCase() || "";
        if (itemName.indexOf(_lowCaseValue) !== -1) {
          // we have a matching name, now we need to see if the item
          // can be served on our selected method (delivery, dine in, take away)
          for (let j = 0; j < semiMatchingItems[i]?.prices?.length; j += 1) {
            if (
              semiMatchingItems[i]?.prices[j]?.type === "All" ||
              semiMatchingItems[i]?.prices[j]?.type === selectedTab
            ) {
              _foundItems.push(semiMatchingItems[i]);
              break;
            }
          }
        }
      }
      setFoundItems(_foundItems);
    } else {
      setFoundItems([]);
    }
  }, [value, catalogueItems]);

  React.useEffect(() => {
    // erasing the searchabr results when the selected tab changes
    setFoundItems([]);
    setAreResultsVisible(false);
  }, [selectedTab]);

  const returnProductPrice = (priceObject) => {
    for (let i = 0; i < priceObject.length; i += 1) {
      if (
        priceObject[i]?.type === "All" ||
        priceObject[i]?.type === selectedTab
      ) {
        return formatMoney(priceObject[i]?.value) || "0.00";
      }
    }
    return "-";
  };

  return (
    <div
      className={css(
        styles.searchBar,
        areResultsVisible && foundItems.length && styles.searchBarExpanded
      )}
      id="search-bar-div"
    >
      <img src={search} alt="" style={{ cursor: "pointer" }} />
      <CustomTextField
        style={{ width: "100%" }}
        InputProps={{ disableUnderline: true }}
        value={value}
        onFocus={() => setAreResultsVisible(true)}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search"
      />
      {areResultsVisible && foundItems?.length ? (
        <div
          onClick={() => setAreResultsVisible(false)}
          className={css(styles.searchBarResultsInvisibleBg)}
        />
      ) : (
        <></>
      )}
      {areResultsVisible && foundItems?.length ? (
        <div className={css(styles.searchBarResults)}>
          {foundItems?.map((item, key) => (
            <Item
              key={key}
              parsedPrice={returnProductPrice(item?.prices)}
              item={item}
            />
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SearchBar;
