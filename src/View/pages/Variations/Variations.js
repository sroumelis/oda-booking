import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { navigate, useLocation, Router } from '@reach/router';

import styles from './styles';

import {
  variationsActions,
  variationsSelectors,
} from '../../../State/modules/catalog/variations';

const Variations = (props) => {
  const [open, setOpen] = React.useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const fullScreen = useMediaQuery('(max-width:768px)'); // previously in the parenthesis it was (theme.breakpoints.down('sm'))
  const { productId, groupId } = location.state;

  const _fetchVariations = async () => {
    try {
      console.log('fetch');
      const data = {
        groupId,

        productId,
      };
      if (productId && groupId) {
        const vriations = await dispatch(
          variationsActions.fetchVariations(data)
        );
        console.log(vriations);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log('fetch');
    _fetchVariations();
  }, [productId]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    window.history.back();
  };

  if (!productId || !groupId) {
    return null;
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      open
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{groupId}</DialogTitle>
      <DialogContent>
        {/* <Variations /> */}
        {productId}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Disagree
        </Button>
        <Button onClick={handleClose} color="primary" autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const memoizedVariations = React.memo(Variations);
export { memoizedVariations as Variations };
