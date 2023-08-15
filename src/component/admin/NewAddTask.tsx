import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  List,
  Slide,
  TextField,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { IformValue, IsubTask } from "../dataType/Datatype";
import SubTaskBox from "./SubTaskBox";
import ViewSubTask from "./ViewSubTask";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

type IopenDialogProps = {
  openDialog: boolean;
  handleCloseDialog: () => void;
  handleSaveData: (data: IformValue) => void;
  editValue: IformValue | null;
  handleNewEditData: (newEditData: IformValue) => void;
};

export default function NewAddTask(props: IopenDialogProps) {
  const {
    openDialog,
    handleCloseDialog,
    handleSaveData,
    editValue,
    handleNewEditData,
  } = props;

  const initialFormValue: IformValue = {
    title: "",
    desc: "",
    startDate: 0,
    endDate: 0,
    hour: 0,
    id: 0,
    subTask: [],
  };

  const [formValue, setFormValue] = useState(
    editValue ? editValue : initialFormValue
  );
  const [openSubTask, setOpenSubTask] = useState(false);

  
 
  const handleChangeValue = (e: any) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddFormValue = (e: any) => {
    e.preventDefault();
     const data: IformValue = {
       id: new Date().getTime(),
       title: formValue.title,
       desc: formValue.desc,
       startDate: formValue.startDate,
       endDate: formValue.endDate,
       hour: formValue.hour,
       subTask: formValue.subTask,
      
     };

    if (editValue) {
       let newEditData = { ...data, id: editValue.id };
       handleNewEditData(newEditData);
       setOpenSubTask(true);
    } else {
      handleSaveData(data);
    }
   
    handleCloseDialog();
    setFormValue({
      id: 0,
      title: "",
      desc: "",
      startDate: 0,
      endDate: 0,
      hour: 0,
      subTask: [],
    });
  };

  
  const handleAddSubTask = () => {
   const newSubTask: IsubTask = {
      title: "",
      subdesc: "",
      startDate: 0,
      endDate: 0,
      hour: 0,
      id: new Date().getTime(),
    }; 
      setFormValue((prev) => {
         return { ...prev, subTask: [...prev.subTask, newSubTask]};
       });
      setOpenSubTask(true);
   };


 


  const handleAddSubValue = (value: IformValue) => {
    if (value) {
      setFormValue(value);
    }
  };

  return (
    <div>
      

      <Dialog
        TransitionComponent={Transition}
        open={openDialog}
        onClose={handleCloseDialog}
        sx={{ height: "80vh" }}
      >
        <Box sx={{ bgcolor: "white" }}>
          <DialogTitle sx={{ fontSize: "23px", fontWeight: "600" }}>
            Create Task :
          </DialogTitle>
          <DialogContent>
            <Box>
              <List>
                <form onSubmit={handleAddFormValue}>
                  <Grid container spacing={2}>
                    {/* Title */}
                    <Grid item xs={12}>
                      <TextField
                        required
                        sx={{ width: "66%" }}
                        id="title"
                        label="Title"
                        name="title"
                        value={formValue.title}
                        onChange={handleChangeValue}
                      />
                      <TextField
                        name="hour"
                        value={formValue.hour}
                        onChange={handleChangeValue}
                        required
                        sx={{ width: "32%", marginLeft: "6px" }}
                        type="text"
                        id="hour"
                        label="Hour"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          step: 300,
                        }}
                      />
                    </Grid>
                    {/* Start Date */}
                    <Grid item xs={12}>
                      <TextField
                        name="startDate"
                        value={formValue.startDate}
                        onChange={handleChangeValue}
                        required
                        sx={{ width: "49%" }}
                        type="date"
                        id="date"
                        label="start Date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />

                      <TextField
                        name="endDate"
                        value={formValue.endDate}
                        onChange={handleChangeValue}
                        required
                        sx={{ width: "49%", marginLeft: "6px" }}
                        type="date"
                        id="date"
                        label=" End Date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    {/* Description */}
                    <Grid item xs={12}>
                      <TextField
                        name="desc"
                        value={formValue.desc}
                        onChange={handleChangeValue}
                        required
                        fullWidth
                        id="description"
                        label="Description"
                        multiline
                        rows={4}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Box display={"flex"} justifyContent={"space-between"}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: "600",
                            cursor: "pointer",
                            color: "#1976d2",
                          }}
                        >
                          SubTask
                        </Typography>

                        <Button onClick={handleAddSubTask}>
                          <AddIcon />
                        </Button>
                      </Box>
                    </Grid>

                    
                      <SubTaskBox
                        mainFormValue={formValue}
                        handleSetMainValue={handleAddSubValue}
                      />
               
                    {/* Submit button */}
                    <Grid item xs={12}>
                      {editValue ? (
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                        >
                          Update
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                        >
                          Submit
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </form>
              </List>
            </Box>
          </DialogContent>
        </Box>
      </Dialog>
    </div>
  );
}
