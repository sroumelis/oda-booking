import { withStyles } from "@material-ui/styles";
import React from "react";
import styles from "./styles";
import { StyleSheet, css } from "aphrodite";
import noImage from "../../../../../../common/img/no-image-available.jpg";
import { formatMoney } from "../../../../../../../Utils/utilities";
import {
  CustomExpansionPanel,
  ExpandableItem as ExpandableItem2,
  Item,
} from "./";

const ExpandableItem = (props) => {
  const { selectedTab, item, openPreferences, depth, disableHeader } = props;

  const [isExpanded, setIsExpanded] = React.useState(false);

  const returnChildrenSize = () => {
    const subGroupsSize = item?.subGroups?.length || 0;
    const productsSize = item?.products?.length || 0;
    return subGroupsSize + productsSize;
  };
  const childrenSize = returnChildrenSize();

  const returnProductPrice = (priceObject) => {
    try {
      for (let i = 0; i < priceObject?.length; i += 1) {
        if (priceObject[i]?.type === selectedTab) {
          return formatMoney(priceObject[i]?.value || "0");
          // return priceObject[i]?.value;
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const content = (
    <>
      {item?.subGroups?.map((innerGroup, i) => {
        if (innerGroup?.subGroups?.length || innerGroup?.products?.length) {
          return (
            <ExpandableItem2 depth={depth + 1} item={innerGroup} key={i} />
          );
        } else {
          const price = returnProductPrice(innerGroup?.prices);
          return (
            <Item
              key={i}
              item={innerGroup}
              selectedTab={selectedTab}
              parsedPrice={price}
            />
          );
        }
      })}
      {item?.products?.map((product, i) => {
        if (product?.subGroups?.length || product?.products?.length) {
          return <ExpandableItem2 depth={depth + 1} item={product} key={i} />;
        } else {
          const price = returnProductPrice(product?.prices);
          return (
            <Item
              item={product}
              key={i}
              selectedTab={selectedTab}
              parsedPrice={price}
            />
          );
        }
      })}
      {!item?.subGroups?.length && !item?.products?.length && (
        <Item
          item={item}
          selectedTab={selectedTab}
          parsedPrice={returnProductPrice(item?.prices)}
        />
      )}
    </>
  );

  if (!disableHeader) {
    return (
      <CustomExpansionPanel
        title={item?.name || "-"}
        isExpanded={isExpanded}
        setIsExpanded={(expanded) => setIsExpanded(expanded)}
        subtitle={"(" + childrenSize + ")"}
        depth={depth + 1}
      >
        <div style={{ paddingLeft: 16 }}>{content}</div>
      </CustomExpansionPanel>
    );
  } else {
    return <>{content}</>;
  }
};

export default ExpandableItem;
