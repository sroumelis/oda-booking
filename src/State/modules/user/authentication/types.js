import { createType } from '../../../../Utils';

export const IS_AUTHENTICATED = createType.simpleAction(`IS_AUTHENTICATED`);
export const IS_NOT_AUTHENTICATED = createType.simpleAction(
  `IS_NOT_AUTHENTICATED`
);
