import { withStyles } from "@material-ui/styles";
import React from "react";
import styles from "./styles";
import { getUserInitials } from "../../../../State/modules/user/userInfo/selectors";
import { setModal } from "../../../../State/modules/confirmationModal/actions";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, css } from "aphrodite";

const ProfilePicture = (props) => {
  const {
    selectedImage,
    name,
    outerStyle,
    smallPicture,
    onChange,
    disableChange,
    className,
    disableMarginBottom,
  } = props;
  const dispatch = useDispatch();
  const userInitials = useSelector(getUserInitials);
  return (
    <div
      className={css(
        styles.container,
        smallPicture && styles.smallWidthHeight,
        disableMarginBottom && styles.marginBottom0
      )}
    >
      {selectedImage && (
        <img className={css(styles.profileImage)} src={selectedImage} alt="" />
      )}
      {!selectedImage &&
        (!disableChange || (disableChange && userInitials)) && (
          <div
            className={css(
              styles.selectImage,
              !smallPicture && !userInitials && styles.text,
              !smallPicture && userInitials && styles.initialsText,
              smallPicture && userInitials && styles.smallPictureInitialsText
            )}
          >
            {userInitials || "Click to select a picture"}
          </div>
        )}
      {!disableChange && (
        <div className={css(styles.hoverEffect)}>
          Click to select a picture
          <input
            className={css(styles.fileInput)}
            type="file"
            onChange={(e) => {
              console.log(e);
              let fileType = e?.target?.files?.[0]?.type || "";
              let fileSize = e?.target?.files?.[0]?.size / 1000000; //converting KB to MB
              if (e?.target?.files?.length) {
                if (
                  (fileType === "image/png" ||
                    fileType === "image/jpg" ||
                    fileType === "image/jpeg") &&
                  fileSize < 6 // max size = 6MB
                ) {
                  onChange(e);
                } else {
                  e.target.value = "";
                  dispatch(
                    setModal({
                      isVisible: true,
                      hideCancelButton: true,
                      content:
                        "The uploaded file's size should not exceed 6MB and it's type should either be PNG or JPG",
                      title: "Error",
                    })
                  );
                }
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

const memoizedProfilePicture = React.memo(ProfilePicture);
export { memoizedProfilePicture as ProfilePicture };
