import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v1 as uuidv1 } from "uuid";
import Dialog from "@material-ui/core/Dialog";
import { StyleSheet, css } from "aphrodite";
import { Navbar } from "../../common/components";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { navigate, useLocation, Router } from "@reach/router";
import refreshImage from "../../common/img/refresh.svg";
import { setLoader } from "../../../State/modules/globalLoader/actions";
import { setModal } from "../../../State/modules/confirmationModal/actions";
import { safeRound } from "../../../Utils/utilities";
import { withStyles } from "@material-ui/styles";
import { Button, ReloadComponent } from "../../common/components";
import {
  ItemInfo,
  ItemDescription,
  CheckBox,
  RadioButton,
  RadioGroup,
  CustomExpansionPanel,
  PreferenceFooter,
  ItemWithQuantity,
  Quantity,
  InstructionsGroup,
  OptionsContainer,
} from "./components";
import styles from "./styles";
import { Formik, Form, Field, FieldArray, useFormik } from "formik";
import { TextField } from "../../common/components";
import debugItem from "./debugItem.js";
import {
  variationsActions,
  variationsSelectors,
} from "../../../State/modules/catalog/variations";
import { getSelectedTab } from "../../../State/modules/selectedTab/selectors";
const StyledDialog = withStyles({
  paperScrollPaper: {
    height: "100%",
    width: "100%",
    maxHeight: 900,
    // backgroundColor: "red",
  },
})(Dialog);

const Preferences = (props) => {
  const { basket, setBasket, isStoreClosed } = props;
  const debugMode = false;
  const [showFooter, setShowFooter] = React.useState(false);
  const [foo, setFoo] = React.useState(0);
  //Start of Items used in order to keep track of a delivery object
  // The sorted and deep copied instance of the item we're showing;
  const [parsedItem, setParsedItem] = React.useState([]);
  const location = useLocation();
  const dispatch = useDispatch();
  const selectedTab = useSelector(getSelectedTab);
  const fullScreen = useMediaQuery("(max-width:768px)"); // previously in the parenthesis it was (theme.breakpoints.down('sm'))
  const fetchVariationsError = useSelector(variationsSelectors.getError);
  const { item } = location.state;
  // const [item] = React.useState(debugItem);

  const handleClose = () => {
    window.history.back();
  };

  // sorts an array without diving in according to its displayIndex
  const sortWithDisplayIndex = (arr) => {
    if (arr?.length >= 2) {
      return arr?.sort((a, b) => {
        return (a?.displayIndex || 0) - (b?.displayIndex || 0);
      });
    } else {
      return arr;
    }
  };

  // sorts a preferencesObject while diving recursively, which means that it
  // also sorts the modifiers/subGroups objects and their children.
  // This DOES NOT sort the root of an object, just the root object's modifiers/subgroups
  const sortPreferencesObject = (obj) => {
    let objectCopy = JSON.parse(JSON.stringify(obj));
    const sortRecursively = (arr) => {
      const _arr = [...sortWithDisplayIndex(arr)];
      for (let i = 0; i < _arr.length; i += 1) {
        if (_arr[i]?.modifiers?.length) {
          _arr[i].modifiers = [...sortRecursively(_arr[i].modifiers)];
        }
        if (_arr[i]?.subGroups?.length) {
          _arr[i].subGroups = [...sortRecursively(_arr[i].subGroups)];
        }
      }
      return _arr;
    };
    objectCopy.synthesis.synthesisModifiers = sortWithDisplayIndex(
      objectCopy.synthesis.synthesisModifiers
    );
    for (
      let i = 0;
      i < objectCopy?.synthesis?.synthesisModifiers.length;
      i += 1
    ) {
      // checking the products element
      if (objectCopy?.synthesis?.synthesisModifiers[i]?.modifiers?.length) {
        objectCopy.synthesis.synthesisModifiers[i].modifiers = [
          ...sortRecursively(
            objectCopy?.synthesis?.synthesisModifiers[i]?.modifiers
          ),
        ];
      }
      // checking the subgroups element
      if (objectCopy?.synthesis?.synthesisModifiers[i]?.subGroups?.length) {
        objectCopy.synthesis.synthesisModifiers[i].subGroups = [
          ...sortRecursively(
            objectCopy?.synthesis?.synthesisModifiers[i]?.subGroups
          ),
        ];
      }
    }
    return objectCopy;
  };

  const formatObject = (obj, parentId, selectionBehavior, parentName) => {
    if (!obj?.length) {
      if (obj?.modifiers?.length) {
        formatObject(obj.modifiers, obj?.id, obj?.selectionBehavior, obj?.name);
      }
      if (obj?.subGroups?.length) {
        formatObject(obj.subGroups, obj?.id, obj?.selectionBehavior, obj?.name);
      }
      let isPlainItem = !obj?.modifiers?.length && !obj?.subGroups?.length;
      obj.parentId = parentId || "root";
      obj.parentSelectionBehavior = selectionBehavior || "root";
      obj.parentName = parentName || "";
      if (isPlainItem) {
        if (
          obj?.isDefault &&
          ((selectedTab &&
            obj.servingSpots &&
            obj.servingSpots.indexOf(selectedTab) !== -1) ||
            obj.servingSpots === "All")
        ) {
          obj.isSelected = true;
          if (obj?.hasQuantity) {
            obj.selectedQuantity = 1;
          }
        } else {
          obj.isSelected = false;
        }
      } else {
        obj.selectedChildren = [];
      }
    } else {
      for (let i = 0; i < obj.length; i += 1) {
        if (obj[i]?.modifiers?.length) {
          formatObject(
            obj[i].modifiers,
            obj[i]?.id,
            obj[i]?.selectionBehavior,
            obj[i]?.name
          );
        }
        if (obj[i]?.subGroups?.length) {
          formatObject(
            obj[i].subGroups,
            obj[i]?.id,
            obj[i]?.selectionBehavior,
            obj[i]?.name
          );
        }
        let isPlainItem =
          !obj[i]?.modifiers?.length && !obj[i]?.subGroups?.length;
        obj[i].parentId = parentId || "root";
        obj[i].parentName = parentName || "";
        obj[i].parentSelectionBehavior = selectionBehavior || "root";
        if (isPlainItem) {
          if (
            obj[i]?.isDefault &&
            ((selectedTab &&
              obj[i].servingSpots &&
              obj[i].servingSpots.indexOf(selectedTab) !== -1) ||
              obj[i].servingSpots === "All")
          ) {
            obj[i].isSelected = true;
            if (obj[i]?.hasQuantity) {
              obj[i].selectedQuantity = 1;
            }
          } else {
            obj[i].isSelected = false;
          }
        } else {
          obj[i].selectedChildren = [];
        }
      }
    }
  };

  const updateMandatoryItemsList = (obj, mandatoryItemsList) => {
    if (!obj?.length) {
      if (obj?.mandatory) {
        mandatoryItemsList.push(obj);
      }
      if (obj?.modifiers?.length) {
        updateMandatoryItemsList(obj.modifiers, mandatoryItemsList);
      }
      if (obj?.subGroups?.length) {
        updateMandatoryItemsList(obj.subGroups, mandatoryItemsList);
      }
    } else {
      for (let i = 0; i < obj.length; i += 1) {
        if (obj[i]?.mandatory) {
          mandatoryItemsList.push(obj[i]);
        }
        if (obj[i]?.modifiers?.length) {
          updateMandatoryItemsList(obj[i].modifiers, mandatoryItemsList);
        }
        if (obj[i]?.subGroups?.length) {
          updateMandatoryItemsList(obj[i].subGroups, mandatoryItemsList);
        }
      }
    }
  };

  const parseItemsObject = (item) => {
    const obj = JSON.parse(JSON.stringify(item));
    let components = obj?.synthesis?.synthesisModifiers;
    obj.isExpanded = true;
    obj.selectedQuantity = 1;
    obj.comment = "";
    components.forEach((category) => {
      formatObject(category);
    });
    obj.mandatoryItems = [];
    updateMandatoryItemsList(components, obj.mandatoryItems);
    let instructions = obj?.synthesis?.instructions;
    let _instructionsArr = [];
    for (let i = 0; i < instructions?.length; i += 1) {
      _instructionsArr.push({
        name: instructions[i],
        isSelected: false,
      });
    }
    obj.synthesis.instructions = [..._instructionsArr];
    updateTotalPrice(false, obj);
    return obj;
  };

  const updateTotalPrice = (index, obj) => {
    let objectToUse = obj ? obj : parsedItem[index];
    let prices = objectToUse?.prices;
    let totalPrice = 0;
    let initialPrice = 0;
    for (let i = 0; i < prices?.length; i += 1) {
      if (
        (selectedTab && selectedTab === prices[i]?.type) ||
        prices[i]?.type === "All"
      ) {
        totalPrice = prices[i]?.value;
        initialPrice = prices[i]?.value;
        break;
      }
    }
    let selectedItems = getAllSelectedNodes(obj, index);
    selectedItems.forEach((item) => {
      if (item.hasQuantity) {
        totalPrice += (item?.price || 0) * (item?.selectedQuantity || 1);
      } else {
        totalPrice += item?.price || 0;
      }
    });
    objectToUse.totalPrice = totalPrice;
    objectToUse.initialPrice = initialPrice;
  };

  const searchTreeNode = (id, index) => {
    let root = parsedItem[index]?.synthesis?.synthesisModifiers;
    const recursivePart = (object, id) => {
      if (object?.id === id) {
        return object;
      }
      if (object?.subGroups?.length) {
        let node = searchFunction(object?.subGroups, id);
        if (node) {
          return node;
        }
      }
      if (object?.modifiers?.length) {
        let node = searchFunction(object?.modifiers, id);
        if (node) {
          return node;
        }
      }
    };
    const searchFunction = (object, id) => {
      if (!object?.length) {
        let node = recursivePart(object, id);
        if (node) {
          return node;
        }
      } else {
        for (let i = 0; i < object?.length; i += 1) {
          let node = recursivePart(object[i], id);
          if (node) {
            return node;
          }
        }
      }
    };
    return searchFunction(root, id);
  };

  const getAllSelectedNodes = (obj, index) => {
    let selectedObject = obj ? obj : parsedItem[index];
    let root = selectedObject?.synthesis?.synthesisModifiers;
    let selectedItems = [];
    const recursivePart = (object, id) => {
      if (object?.subGroups?.length) {
        searchFunction(object?.subGroups, id);
      }
      if (object?.modifiers?.length) {
        searchFunction(object?.modifiers, id);
      }
      if (
        !object?.modifiers?.length &&
        !object?.subGroups?.length &&
        object?.isSelected
      ) {
        selectedItems.push(object);
      }
    };
    const searchFunction = (object) => {
      if (!object?.length) {
        recursivePart(object);
      } else {
        for (let i = 0; i < object?.length; i += 1) {
          recursivePart(object[i]);
        }
      }
    };
    searchFunction(root);
    return selectedItems;
  };

  const findIfNodeHasSelectedChildren = (node) => {
    let _node = node;
    const recursivePart = (object, id) => {
      if (object?.isSelected) {
        return true;
      }
      if (object?.subGroups?.length) {
        let val = searchFunction(object?.subGroups, id);
        if (val) {
          return true;
        }
      }
      if (object?.modifiers?.length) {
        let val = searchFunction(object?.modifiers, id);
        if (val) {
          return true;
        }
      }
      return false;
    };
    const searchFunction = (object, id) => {
      if (!object?.length) {
        let value = recursivePart(object);
        if (value) {
          return true;
        }
      } else {
        for (let i = 0; i < object?.length; i += 1) {
          let value = recursivePart(object[i]);
          if (value) {
            return true;
          }
        }
      }
    };
    let result = searchFunction(_node);
    return result ? true : false;
  };

  const unselectNodesChildren = (node, exception) => {
    const recursivePart = (object, id) => {
      if (!exception || exception !== object?.id) {
        if (object?.subGroups?.length) {
          searchFunction(object?.subGroups, id);
        }
        if (object?.modifiers?.length) {
          searchFunction(object?.modifiers, id);
        }
        if (!object?.subGroups?.length && !object?.modifiers?.length) {
          object.isSelected = false;
        }
      }
    };
    const searchFunction = (object, id) => {
      if (!object?.length) {
        recursivePart(object, id);
      } else {
        for (let i = 0; i < object?.length; i += 1) {
          recursivePart(object[i], id);
        }
      }
    };
    searchFunction(node, exception);
  };

  // function passed for the main preferences of the item.
  // if the product is selected then we delete it, otherwise we add it
  const toggleProduct = (product, index) => {
    if (!product?.isSelected) {
      product.isSelected = true;
      if (product?.hasQuantity && !product?.selectedQuantity) {
        product.selectedQuantity = 1;
      }
      let parentNode = searchTreeNode(product?.parentId, index);
      let exceptionId = product?.id;
      while (parentNode && parentNode?.id !== "root" && parentNode?.parentId) {
        if (parentNode?.selectionBehavior === "Single") {
          unselectNodesChildren(parentNode, exceptionId);
        } else if (parentNode?.selectionBehavior === "Multiple") {
          // do nothing because we allow multiple selections
          // unselectNodesChildren(parentNode, parentNode?.id);
        }
        exceptionId = parentNode?.id;
        parentNode = searchTreeNode(parentNode?.parentId, index);
      }
    } else {
      product.isSelected = false;
      if (product?.hasQuantity) {
        product.selectedQuantity = 0;
      }
    }
    updateTotalPrice(index);
    setParsedItem([...parsedItem]);
  };

  const changeProductQuantity = (product, offset, index) => {
    if (product?.selectedQuantity) {
      product.selectedQuantity += offset;
      product.isSelected = true;
    } else {
      product.selectedQuantity = offset;
      product.isSelected = true;
    }
    if (!product?.selectedQuantity) {
      product.isSelected = false;
    }
    updateTotalPrice(index);
    setParsedItem([...parsedItem]);
  };

  const changeDishQuantity = (dish, offset) => {
    if (dish?.selectedQuantity || dish?.selectedQuantity === 0) {
      dish.selectedQuantity += offset;
    }
    if (!dish?.selectedQuantity || dish?.selectedQuantity < 0) {
      dish.selectedQuantity = 0;
    }
    setParsedItem([...parsedItem]);
  };

  const toggleInstructionSelection = (instruction) => {
    if (instruction?.isSelected) {
      instruction.isSelected = false;
    } else {
      instruction.isSelected = true;
    }
    setParsedItem([...parsedItem]);
  };

  const checkIfMandatoryItemsAreChecked = (index) => {
    let mandatories = parsedItem[index]?.mandatoryItems;
    for (let i = 0; i < mandatories.length; i += 1) {
      if (shouldBeRendered(mandatories[i])) {
        let hasSelectedChildren = findIfNodeHasSelectedChildren(mandatories[i]);
        if (!hasSelectedChildren) {
          return false;
        }
      }
    }
    return true;
  };

  const generateObjectUUID = (index) => {
    let selectedItems = getAllSelectedNodes(false, index);
    const selectedParsedItem = parsedItem[index];
    parsedItem[index].selectedItemsArray = selectedItems;
    let str = "";
    selectedItems.forEach((item) => {
      if (item?.hasQuantity) {
        str += item?.id + "," + item?.selectedQuantity;
      } else {
        str += item?.id;
      }
    });
    let instructions = selectedParsedItem?.synthesis?.instructions;
    instructions.forEach((item) => {
      if (item?.isSelected) {
        str += item?.name;
      }
    });
    str += selectedParsedItem?.comment || "";
    selectedParsedItem.uuid = str;
  };

  const addNewParsedItem = () => {
    if (item) {
      for (let i = 0; i < parsedItem.length; i += 1) {
        parsedItem[i].isExpanded = false;
      }
      let newItem = {
        ...parseItemsObject(sortPreferencesObject({ ...item })),
      };
      for (let i = 0; i < parsedItem?.length; i += 1) {
        generateObjectUUID(i);
      }
      let noMatches = true;
      while (noMatches) {
        noMatches = false;
        for (let i = 0; i < parsedItem?.length; i += 1) {
          for (let j = 0; j < parsedItem?.length; j += 1) {
            if (j !== i && parsedItem[i]?.uuid === parsedItem[j]?.uuid) {
              parsedItem[i].selectedQuantity +=
                parsedItem[j]?.selectedQuantity || 0;
              parsedItem.splice(j, 1);
              noMatches = true;
              break;
            }
          }
          if (noMatches) {
            break;
          }
        }
      }
      parsedItem.push(newItem);
      setParsedItem([...parsedItem]);
    }
  };

  const removeParsedItem = (index) => {
    if (parsedItem?.[index]) {
      parsedItem.splice(index, 1);
    }
    setParsedItem([...parsedItem]);
  };

  React.useEffect(() => {
    if (basket?.length && item) {
      let tempArr = [];
      for (let i = 0; i < basket?.length; i += 1) {
        if (item?.id === basket[i]?.id) {
          basket[i].isExpanded = false;
          tempArr.push(basket[i]);
        }
      }
      if (tempArr?.length) {
        setParsedItem(JSON.parse(JSON.stringify(tempArr)));
      } else {
        setParsedItem([{ ...parseItemsObject(sortPreferencesObject(item)) }]);
      }
    } else if (item) {
      setParsedItem([{ ...parseItemsObject(sortPreferencesObject(item)) }]);
    }
  }, [item]);

  const shouldBeRenderedRecursivePart = (obj) => {
    if (obj?.subGroups?.length) {
      let shouldRender = shouldBeRendered(obj.subGroups);
      if (shouldRender) {
        return true;
      }
    }
    if (obj?.modifiers?.length) {
      let shouldRender = shouldBeRendered(obj.modifiers);
      if (shouldRender) {
        return true;
      }
    }
    if (
      obj?.servingSpots === "All" ||
      (selectedTab &&
        obj?.servingSpots &&
        obj?.servingSpots?.indexOf(selectedTab) !== -1)
    ) {
      return true;
    }
    return false;
  };

  const shouldBeRendered = (obj) => {
    try {
      if (!obj?.length) {
        return shouldBeRenderedRecursivePart(obj);
      } else {
        for (let i = 0; i < obj.length; i += 1) {
          let decision = shouldBeRenderedRecursivePart(obj[i]);
          if (decision) {
            return true;
          }
        }
        return false;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  const submitItem = (index) => {
    // TODO: check for mandatory items ALL OF THEM
    generateObjectUUID(index);
    setShowFooter(true);
    for (let i = 0; i < parsedItem?.length; i += 1) {
      parsedItem[i].isExpanded = false;
    }
    for (let i = 0; i < parsedItem?.length; i += 1) {
      if (i !== index && parsedItem[i]?.uuid === parsedItem[index]?.uuid) {
        parsedItem[index].selectedQuantity +=
          parsedItem[i]?.selectedQuantity || 0;
        parsedItem.splice(i, 1);
      }
    }
    setParsedItem([...parsedItem]);
  };

  const checkAndAddItemsToBasket = () => {
    for (let i = 0; i < parsedItem?.length; i += 1) {
      generateObjectUUID(i);
    }
    // in case one of the items is the same as another one then we
    // combine the items by adding their selected quantities
    let noMatches = true;
    while (noMatches) {
      noMatches = false;
      for (let i = 0; i < parsedItem?.length; i += 1) {
        for (let j = 0; j < parsedItem?.length; j += 1) {
          if (j !== i && parsedItem[i]?.uuid === parsedItem[j]?.uuid) {
            parsedItem[i].selectedQuantity +=
              parsedItem[j]?.selectedQuantity || 0;
            parsedItem.splice(j, 1);
            noMatches = true;
            break;
          }
        }
        if (noMatches) {
          break;
        }
      }
    }
    // to this point we ensure that all items are parsed
    // here, if the item has a selected quantity different than 0
    // we check to see if it contains all the mandatory items etc
    // in case the item has a selectedQuantity of 0 we don't need
    // to check anything because the item will be deleted shortly.
    // in order to delete the item we need to wait to see if the form
    // can be submitted, which will be known after this for loop
    for (let i = 0; i < parsedItem?.length; i += 1) {
      if (parsedItem[i]?.selectedQuantity) {
        const shouldProceed = checkIfMandatoryItemsAreChecked(i);
        if (!shouldProceed) {
          dispatch(
            setModal({
              isVisible: true,
              hideCancelButton: true,
              content:
                "Can not proceed because you haven't selected all the necessary products on item " +
                (i + 1),
              title: "Error",
            })
          );
          return;
        }
      }
    }
    // now we remove the items without a selectedQuantity
    for (let i = parsedItem?.length - 1; i >= 0; i -= 1) {
      if (!parsedItem[i].selectedQuantity) {
        parsedItem.splice(i, 1);
      }
    }
    let arr = [];
    // we add in the basket the items that originally belonged to the basket
    // but we pay attention to not add the existing item's values that are contained in the basket
    // since the current item is contained in the parsedItem variable
    for (let i = 0; i < basket?.length; i += 1) {
      if (basket[i]?.id !== item?.id) {
        arr.push(basket[i]);
      }
    }
    setBasket([...arr, ...parsedItem]);
    handleClose();
  };

  const toggleExpansionPanel = (event, expanded, formIndex) => {
    for (let i = 0; i < parsedItem?.length; i += 1) {
      parsedItem[i].isExpanded = false;
    }
    if (parsedItem?.[formIndex]) {
      parsedItem[formIndex].isExpanded = true;
    }
    setParsedItem([...parsedItem]);
  };

  if (!item) {
    return null;
  }

  return (
    <StyledDialog
      fullScreen={fullScreen}
      open
      className="asd"
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <div className={css(styles.pageContainer)}>
        <Navbar onClose={handleClose} />
        {parsedItem?.length && (
          <ItemDescription
            name={parsedItem?.[0]?.name}
            description={parsedItem?.[0]?.description}
            pictureUri={parsedItem?.[0]?.pictureUri}
          />
        )}
        <div className={css(styles.itemPreferencesContent)}>
          {parsedItem?.map((_item, i) => {
            return (
              <React.Fragment key={i}>
                <CustomExpansionPanel
                  outerId={"item-pref-item-" + i}
                  expanded={_item?.isExpanded}
                  onChange={(e, expanded) =>
                    toggleExpansionPanel(e, expanded, i)
                  }
                >
                  <ItemInfo
                    item={_item}
                    changeDishQuantity={changeDishQuantity}
                    canRemoveItems={parsedItem?.length > 1}
                    index={i}
                    instructions={_item?.synthesis?.instructions}
                    removeItem={removeParsedItem}
                    getAllSelectedNodes={(arg) => getAllSelectedNodes(arg, i)}
                  />
                  <div>
                    {_item?.synthesis?.synthesisModifiers?.length ? (
                      <OptionsContainer
                        items={_item?.synthesis?.synthesisModifiers}
                        toggleProduct={(arg) => toggleProduct(arg, i)}
                        changeProductQuantity={(arg1, arg2) =>
                          changeProductQuantity(arg1, arg2, i)
                        }
                        shouldBeRendered={shouldBeRendered}
                      />
                    ) : (
                      <></>
                    )}
                    {_item?.synthesis?.instructions?.length ? (
                      <InstructionsGroup
                        items={_item?.synthesis?.instructions}
                        toggleInstructionSelection={toggleInstructionSelection}
                      />
                    ) : (
                      <></>
                    )}
                    <TextField
                      label={"Comment"}
                      className={css(styles.marginTop16)}
                      onChange={(e) => {
                        _item.comment = e.target.value;
                        setParsedItem([...parsedItem]);
                      }}
                      multiline
                      withoutFormik
                      value={_item.comment}
                      rows={4}
                    />
                  </div>
                </CustomExpansionPanel>
                {!isStoreClosed && _item?.isExpanded && (
                  <Button
                    style={{ marginTop: 16, marginBottom: 16 }}
                    onClick={() => submitItem(i)}
                  >
                    {` add`}
                    <span className={css(styles.odaText)}>oda</span>
                  </Button>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
      {/* {showFooter && ( */}
      <PreferenceFooter
        addToBasket={checkAndAddItemsToBasket}
        addQuantity={addNewParsedItem}
        totalQuantity={parsedItem?.length}
      />
      {/* )} */}
    </StyledDialog>
  );
};

const memoizedPreferences = React.memo(Preferences);
export { memoizedPreferences as Preferences };
