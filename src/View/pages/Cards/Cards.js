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

// import {
//   CardsActions,
//   CardsSelectors,
// } from '../../../State/modules/catalog/Cards';

const Cards = (props) => {
  const [open, setOpen] = React.useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const fullScreen = useMediaQuery('(max-width:768px)'); // previously in the parenthesis it was (theme.breakpoints.down('sm'))
  const { cardId } = location.state;

  const _fetchCards = async () => {
    try {
      console.log('fetch');
      const data = {
        cardId,
      };
      // if (productId && groupId) {
      //   const vriations = await dispatch(
      //     CardsActions.fetchCards(data)
      //   );
      //   console.log(vriations);
      // }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log('fetch');
    _fetchCards();
  }, [cardId]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    window.history.back();
  };

  if (!cardId) {
    return null;
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      open
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{cardId}</DialogTitle>
      <DialogContent>
        {/* <Cards /> */}
        {'productId'}
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

const memoizedCards = React.memo(Cards);
export { memoizedCards as Cards };
