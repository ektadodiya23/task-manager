import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import { type } from 'os';
import React from 'react'
import { IformValue, IsubTask } from '../dataType/Datatype';


type IpropsMsg = {
  openMsg: boolean;
  handleClose : () =>void ; 
};


export default function ViewSubTask(props:IpropsMsg) {

   const { openMsg, handleClose } = props; 


  return (
    <div>
      <Dialog
        open={openMsg}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">subTask</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Title :
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
