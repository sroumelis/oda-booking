import { withStyles } from "@material-ui/styles";
import React from "react";
import styles from "./styles";
import { StyleSheet, css } from "aphrodite";
import { Checkbox as CustomCheckbox } from "@material-ui/core";
import { RadioButton } from "../";

const RadioGroup = (props) => {
  const { radioButtons, onChange } = props;

  const [selectedItem, setSelectedItem] = React.useState(false);

  React.useEffect(() => {
    if (radioButtons && radioButtons.length) {
      onChange(0);
      setSelectedItem(0);
    }
  }, [radioButtons]);

  return (
    <div className={css(styles.radioGroupContainerFlex)}>
      {radioButtons?.map((item, j) => (
        <React.Fragment key={j}>
          <RadioButton
            text={item?.Modifier}
            checked={selectedItem === j}
            price={item?.Price}
            onClick={() => {
              onChange(j);
              setSelectedItem(j);
            }}
          />
        </React.Fragment>
      ))}
    </div>
  );
};

export default RadioGroup;
