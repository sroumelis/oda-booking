import { createSelector } from "reselect";

const basket = (state) => state.basket;

const getBasket = createSelector(basket, (globalBasket) => {
  return globalBasket?.data || [];
});

export { getBasket };
