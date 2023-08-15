import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

type IdeleteProps = {
  openDelete: boolean;
  handleClose: () => void;
  handleDeleteTask: () => void;
};

export default function DeleteItem(props: IdeleteProps) {
    
  const { openDelete, handleClose, handleDeleteTask } = props;

  return (
    <div>
      <Dialog
        open={openDelete}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure , you want to delete this task ??
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteTask}>Delete</Button>
          <Button onClick={handleClose} autoFocus>
            cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
