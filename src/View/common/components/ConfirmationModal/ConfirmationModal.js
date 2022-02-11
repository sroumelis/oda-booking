import { withStyles } from "@material-ui/styles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, css } from "aphrodite";
import styles from "./styles";
import oda from "../../../common/theme/oda.js";
import { getConfirmationModalData } from "../../../../State/modules/confirmationModal/selectors";
import { setModal } from "../../../../State/modules/confirmationModal/actions";
import { Button } from "../../../common/components";
import CloseImage from "../../../common/img/close.svg";

const ConfirmationModal = (props) => {
  const modalData = useSelector(getConfirmationModalData);
  const dispatch = useDispatch();
  const { customContentEl } = props;
  return modalData?.isVisible ? (
    <div className={css(styles.container)}>
      <div className={css(styles.modalWindow)}>
        {!modalData?.actAsLoader && (
          <img
            src={CloseImage}
            alt=""
            className={css(styles.closeButton)}
            onClick={() => dispatch(setModal({ isVisible: false }))}
          />
        )}
        {!modalData?.actAsLoader && (
          <span className={css(styles.title)}>{modalData?.title}</span>
        )}
        {!modalData?.customContentEl ? (
          <span className={css(styles.content, modalData?.actAsLoader && styles.textAlignCenter)}>{modalData?.content}</span>
        ) : (
          <div className={css(styles.content, modalData?.actAsLoader && styles.textAlignCenter)}>
            {modalData?.customContentEl}
          </div>
        )}
        <div className={css(!modalData?.actAsLoader ? styles.buttonsContainer : styles.loaderContainer)}>
          {!modalData?.actAsLoader && (
            <>
              {!modalData?.hideCancelButton && (
                <Button
                  style={{
                    flex: 1,
                    backgroundColor: oda.colors.surface,
                    border: "1px solid " + oda.colors.primary,
                    color: oda.colors.primary,
                  }}
                  onClick={() => {
                    if (modalData?.cancelFunction) {
                      modalData?.cancelFunction();
                    }
                    if (!modalData?.dontCloseAfterButtonPress) {
                      dispatch(setModal({ isVisible: false }));
                    }
                  }}
                >
                  {modalData?.cancelText || "Cancel"}
                </Button>
              )}
              <Button
                style={{ flex: 1 }}
                onClick={() => {
                  if (modalData?.okFunction) {
                    modalData?.okFunction();
                  }
                  if (!modalData?.dontCloseAfterButtonPress) {
                    dispatch(setModal({ isVisible: false }));
                  }
                }}
              >
                {modalData?.okText || "Okay"}
              </Button>
            </>
          )}
          {modalData?.actAsLoader && <div className={css(styles.loader)} />}
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default ConfirmationModal;
