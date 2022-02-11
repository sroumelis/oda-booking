import { withStyles } from "@material-ui/styles";
import React from "react";
import styles from "./styles";
import { StyleSheet, css } from "aphrodite";
import { RadioButton, Title, CheckBox } from "../";

const InstructionsGroup = (props) => {
  const { items, toggleInstructionSelection } = props;
  return (
    <div>
      <Title title="Other Options" />
      <div className={css(styles.instructionsStep)}>
        {items?.map((item, i) => (
          <CheckBox
            key={i}
            text={item?.name}
            onChange={() => {
              toggleInstructionSelection(item);
            }}
            checked={item?.isSelected}
            hidePrice
          />
        ))}
      </div>
    </div>
  );
};

export default InstructionsGroup;
