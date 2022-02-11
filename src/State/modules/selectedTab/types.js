import { createType } from "../../../Utils";

const actionName = "SELECTED_TAB";

export const SET_TAB = createType.customAction(`${actionName}`, "SET_TAB");
