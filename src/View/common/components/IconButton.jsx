import { IconButton as MuiIconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import React from 'react';
import styled from 'styled-components';
import oda from '../../common/theme/oda.js';

const Image = styled.img`
  width: 29px;
  height: 29px;
`;

const CustomIconButton = withStyles({
  root: {
    padding: '18px',
    backgroundColor: oda.colors.primary,
    border: '0px',
    height: '100%',
    width: '100%',
    maxHeight: 72,
    maxWidth: 72,
    opacity: 1,
    borderRadius: '8px',
    '&:hover': {
      backgroundColor: oda.colors.primary,
      // opacity: 0.8,
      cursor: 'pointer',
    },
    '&:focus': {
      backgroundColor: oda.colors.primary,
      // opacity: 0.8,
    },
  },
})(MuiIconButton);

const IconButton = props => {
  const { id, onClick, className, imgSource, children } = props;
  return (
    <CustomIconButton
      {...props}
      disableRipple
      disableFocusRipple
      id={id}
      onClick={onClick}
      className={className}
    >
      <Image src={imgSource} />
      {children}
    </CustomIconButton>
  );
};

export default IconButton;
