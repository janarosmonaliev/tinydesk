import React, { useCallback, useState, useRef, useContext } from "react";
import Folder from "./folder";
import Grid from "@material-ui/core/Grid";
import RemoveCircleOutlinedIcon from "@material-ui/icons/RemoveCircleOutlined";
import { FolderPlus, X } from "react-feather";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  IconButton,
  DialogActions,
  Divider,
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import nextId from "react-id-generator";
import { UserContext } from "./context/UserContext";
import axios from "axios";

const DialogActionButton = styled(DialogActions)({
  justifyContent: "left",
  marginLeft: "16px",
  marginBottom: "20px",
});

const FoldersWrapper = () => {
  const {
    jiggle,
    folders,
    setFolders,
    setSelectedFolderId,
    selectedFolderId,
    setJiggle,
  } = useContext(UserContext);

  const [openDelete, setOpenDelete] = useState(false);
  const [folderId, setFolderId] = useState("");
  const handleCloseDelete = () => {
    setOpenDelete(false);
    setFolderId("");
  };
  const handleOpenDelete = (_id) => {
    setOpenDelete(true);
    setFolderId(_id);
  };

  const handleRemoveFolder = () => {
    if (folders.length === 1) {
      alert("You must have at least one folder");
      return;
    }

    //special handling when removing first folder
    if (folderId === folders[0]._id) {
      setSelectedFolderId(folders[1]._id);
    }
    apiDeleteFolder();
    setFolders(folders.filter((folder) => folder._id !== folderId));

    if (selectedFolderId == folderId) {
      setSelectedFolderId(folders[0]._id);
    }

    setOpenDelete(false);
    setFolderId(-1);
  };

  const apiDeleteFolder = useCallback(() => {
    axios({
      method: "DELETE",
      data: {
        removeId: folderId,
      },
      withCredentials: true,
      url: "http://localhost:4000/home/folder", // <-------- We have to change this before Milestone 3 deadline to use the Heroku backend
    }).then((res) => console.log(res));
  });

  const AddFolder = () => {
    const onInsert = useCallback((title) => {
      const newFolder = {
        title: title,
        _id: nextId(),
        bookmarks: [],
      };
      apiAddFolder(title);
      setFolders(folders.concat(newFolder));
    });

    const apiAddFolder = useCallback((title) => {
      axios({
        method: "POST",
        data: {
          title: title,
        },
        withCredentials: true,
        url: "http://localhost:4000/home/folder", // <-------- We have to change this before Milestone 3 deadline to use the Heroku backend
      }).then((res) => console.log(res));
    });
    const [open, setOpen] = useState(false);
    const [folderTitle, setFolderTitle] = useState("");
    const [isEmpty, setIsEmpty] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    const handleChange = (event) => {
      if (isEmpty) {
        setIsEmpty(false);
      }
      setFolderTitle(event.target.value);
    };

    //preventDefault let you prevent entering with /? query string at the end
    const handleAdd = useCallback(
      (e) => {
        e.preventDefault();
        if (folderTitle === "") {
          setIsEmpty(true);
          return;
        }
        onInsert(folderTitle);
        setFolderTitle("");
        setOpen(false);
        setIsEmpty(false);
      },
      [onInsert, folderTitle]
    );

    return (
      <>
        <div className="folder-wrapper" onClick={() => handleClickOpen()}>
          <div className="add-folder">
            <FolderPlus size={20} color={"#4f4f4f"} />
          </div>
        </div>

        <Dialog
          onClose={handleClose}
          open={open}
          aria-labelledby="add-folder-dialog"
          fullWidth
          maxWidth="xs"
        >
          <DialogTitle id="add-folder-dialog">
            <h5 className="dialog-title">Add a new folder</h5>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              size="small"
              className="button-dialog-close"
            >
              <X />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <form className="test" onSubmit={handleAdd}>
              <TextField
                required
                id="add-folder-name"
                label="Folder name"
                error={isEmpty}
                fullWidth
                autoFocus
                autoComplete="off"
                value={folderTitle}
                onChange={handleChange}
              />
            </form>
          </DialogContent>
          <DialogActionButton>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              disableTouchRipple
              onClick={handleAdd}
              className="button-100"
            >
              Save
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              disableElevation
              disableTouchRipple
              onClick={handleClose}
              className="button-100"
            >
              Cancel
            </Button>
          </DialogActionButton>
        </Dialog>
      </>
    );
  };

  return (
    <>
      <div className="folders-wrapper">
        {folders.map((folder) => (
          <>
            <Grid
              item
              xs
              container
              className={jiggle ? "folders-jiggle" : ""}
              justify="flex-end"
            >
              {jiggle ? (
                <RemoveCircleOutlinedIcon
                  color="error"
                  fontSize="small"
                  className="delete-icon folder"
                  onClick={() => handleOpenDelete(folder._id)}
                />
              ) : (
                <></>
              )}

              <Folder folder={folder} />
            </Grid>
          </>
        ))}

        <AddFolder />
      </div>
      <Dialog
        onClose={handleCloseDelete}
        open={openDelete}
        aria-labelledby="remove-folder-dialog"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="remove-folder-dialog">
          <h5 className="dialog-title">Delete a folder</h5>
          <IconButton
            aria-label="close"
            onClick={handleCloseDelete}
            size="small"
            className="button-dialog-close"
          >
            <X />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent>
          Do you really want to remove the folder? Removing folder will delete
          all bookmarks in the folder.
        </DialogContent>

        <DialogActionButton>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            disableTouchRipple
            className="button-100"
            onClick={handleCloseDelete}
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            disableElevation
            disableTouchRipple
            className="button-100"
            onClick={handleRemoveFolder}
          >
            Remove
          </Button>
        </DialogActionButton>
      </Dialog>
    </>
  );
};
export default React.memo(FoldersWrapper);
