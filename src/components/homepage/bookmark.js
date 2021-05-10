import React, { useContext, useState } from "react";
import RemoveCircleOutlinedIcon from "@material-ui/icons/RemoveCircleOutlined";
import Grid from "@material-ui/core/Grid";
import { UserContext } from "./context/UserContext";
import { X, Edit } from "react-feather";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  IconButton,
  DialogActions,
  Divider,
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { Menu, MenuItem } from "@material-ui/core/";
import produce from "immer";
import { SettingsInputComponentOutlined } from "@material-ui/icons";
import { BookmarkContext } from "./context/BookmarkContext";

const DialogActionButton = styled(DialogActions)({
  justifyContent: "left",
  marginLeft: "16px",
  marginBottom: "20px",
});
const Bookmark = (props) => {
  const { jiggle, setFolders, selectedFolderId, folders } = useContext(
    UserContext
  );
  const {
    mousePos,
    handleContextMenu,
    handleContextMenuClose,
    handleContextMenuEdit,
  } = useContext(BookmarkContext);
  const [open, setOpen] = useState(false);

  const handleClick = (url) => {
    // TODO Add noopener and noreferrer tags
    window.open(url, "_blank").focus();
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleRemoveBookmark = () => {
    const folderIndex = folders.findIndex(
      (folder) => folder.id === selectedFolderId
    );
    setFolders(
      produce((draft) => {
        draft[folderIndex].bookmarks.splice(
          draft[folderIndex].bookmarks.findIndex((bm) => bm.id === props.id),
          1
        );
      })
    );
    setOpen(false);
  };

  return (
    <>
      {jiggle ? (
        <Grid item xs={12} container justify="center">
          <div onClick={handleOpen}>
            <RemoveCircleOutlinedIcon
              color="error"
              fontSize="large"
              className="delete-icon bookmark"
            />
          </div>
        </Grid>
      ) : (
        <></>
      )}

      <div
        className={
          jiggle
            ? "bookmark-wrapper not-hoverable"
            : "bookmark-wrapper hoverable"
        }
        onClick={() => handleClick(props.url)}
        onContextMenu={(e) => handleContextMenu(e, props.id)}
      >
        <img
          src={props.thumbnail}
          width="80"
          height="80"
          className={`bookmark-border ${props.color}`}
        ></img>

        <small>{props.title}</small>
      </div>
      <Menu
        keepMounted
        open={mousePos.mouseY !== null}
        onClose={handleContextMenuClose}
        anchorReference="anchorPosition"
        anchorPosition={
          mousePos.mouseY !== null && mousePos.mouseX !== null
            ? { top: mousePos.mouseY, left: mousePos.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={handleContextMenuEdit}>
          <Edit /> &nbsp; Edit
        </MenuItem>
      </Menu>
      <Dialog
        onClose={handleClose}
        open={open}
        aria-labelledby="remove-bookmark-dialog"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="remove-bookmark-dialog">
          <h5 className="dialog-title">Delete a Bookmark</h5>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            size="small"
            className="button-dialog-close"
          >
            <X />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent>
          Do you really want to remove the bookmark?
        </DialogContent>

        <DialogActionButton>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            disableTouchRipple
            className="button-100"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            disableElevation
            disableTouchRipple
            className="button-100"
            onClick={handleRemoveBookmark}
          >
            Remove
          </Button>
        </DialogActionButton>
      </Dialog>
    </>
  );
};
export default React.memo(Bookmark);
