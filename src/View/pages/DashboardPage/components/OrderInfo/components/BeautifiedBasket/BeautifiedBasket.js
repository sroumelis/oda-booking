import { withStyles } from "@material-ui/styles";
import React from "react";
import styles from "./styles";
import { StyleSheet, css } from "aphrodite";
import { useSelector, useDispatch } from "react-redux";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import oda from "../../../../../../common/theme/oda";
import { CheckBox } from "../../../CheckBox";
import { setModal } from "../../../../../../../State/modules/confirmationModal/actions";
import { formatMoney } from "../../../../../../../Utils/utilities";
import { Container } from "../../../../../../common/components/";
import OrderInfoGenericSkeleton from "../OrderInfoGenericSkeleton/OrderInfoGenericSkeleton";
import { navigate, useLocation, Router } from "@reach/router";
import deleteButton from "../../../../../../common/img/delete.svg";

const BeautifiedBasket = (props) => {
  const { basket, isLoading, setBasket } = props;
  const location = useLocation();
  const dispatch = useDispatch();

  const openPreferences = (obj) => {
    navigate(location.pathname, {
      state: {
        item: { ...obj },
      },
    });
  };

  if (isLoading) {
    return <OrderInfoGenericSkeleton />;
  }

  const removeFrombasket = (index) => {
    const basketCopy = [...basket];
    basketCopy.splice(index, 1);
    setBasket(basketCopy);
  };

  const removeFromBasketQuestion = (index) => {
    dispatch(
      setModal({
        isVisible: true,
        title: "Delete Item",
        content: `Are you sure that you want to delete ${
          basket[index]?.name || ""
        }?`,
        okFunction: () => removeFrombasket(index),
      })
    );
  };

  return (
    <div className={css(styles.section)}>
      {basket && basket.length ? (
        basket.map((item, j) => {
          return (
            <div
              className={css(
                styles.content,
                item?.length - 1 === j && styles.noBorderBottom
              )}
              key={j}
            >
              <div className={css(styles.spaceBetweenFlex)}>
                <span
                  onClick={() => openPreferences(item)}
                  className={css(styles.itemNamePrice, styles.ellipsis)}
                >{`(${item?.selectedQuantity || 1}x) ${item.name}`}</span>
                <div className={css(styles.priceAndX)}>
                  <span
                    onClick={() => openPreferences(item)}
                    className={css(styles.itemNamePrice, styles.bold)}
                  >
                    {formatMoney(
                      (item?.selectedQuantity || 1) * (item?.totalPrice || 0)
                    )}
                  </span>
                  <img
                    src={deleteButton}
                    className={css(styles.deleteButton)}
                    alt=""
                    onClick={() => removeFromBasketQuestion(j)}
                  />
                </div>
              </div>
              <div onClick={() => openPreferences(item)}>
                <span className={css(styles.itemContent)}>
                  {(item?.comment || "") +
                    (item?.comment && item?.selectedItemsArray?.length
                      ? ", "
                      : "")}
                </span>
                {item?.selectedItemsArray?.map((selectedItem, i) => {
                  if (selectedItem.isSelected) {
                    return (
                      <span key={i} className={css(styles.itemContent)}>
                        {selectedItem?.name +
                          (item?.selectedItemsArray.length - 1 !== i
                            ? ", "
                            : "")}
                      </span>
                    );
                  }
                })}
              </div>
            </div>
          );
        })
      ) : (
        <span
          className={css(
            styles.fieldValue,
            styles.textCenter,
            styles.disabledText
          )}
        >
          (The basket is empty)
        </span>
      )}
    </div>
  );
};

export default BeautifiedBasket;
