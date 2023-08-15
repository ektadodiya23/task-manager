import React, { useEffect, useState } from "react";
import { Alert, Box, Button } from "@mui/material";
import { IformValue } from "../dataType/Datatype";
import NewAddTask from "./NewAddTask";
import GetFormTable from "./GetFormTable";


const getDataform = () => {
  const List = localStorage.getItem("TaskData");

  if (List) {
    return JSON.parse(List);
  } else {
    return [];
  }
};

export default function Createtask() {
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState<IformValue[]>(getDataform);
  const [editData, setEditData] = useState<IformValue | null>(null);
 const [addDataMsg, setAddDataMsg] = useState(false);

  const handleOpenDialog = () => {
    setEditData(null);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setAddDataMsg(true);
   };

  const handleAddDataOnTable = (data: IformValue) => {

    if (formData) {
      setFormData([...formData, data]);
    } else {
      setFormData([data]);
    }
    handleStoreIntoLocal(data);
   };


  const handleStoreIntoLocal = (data : IformValue) => {
    localStorage.setItem("TaskData", JSON.stringify([...formData, data]));
  };

   const handleCloseAlert = () => {
     setAddDataMsg(false);
   };

   
   const onDeleteValue = (filterData: IformValue[]) => {
    setFormData(filterData);
    localStorage.setItem("TaskData", JSON.stringify(filterData));
   };

  
 // EDiT DATA
  const onEditValue = (item: IformValue) => {
    setEditData({ ...item });
    setOpenDialog(true);
  };

  const handleAddEditData = (newEditData: IformValue) => {
    let formDataCopy = [...formData];
    const index = formDataCopy.findIndex((element) => {
      return element.id === newEditData.id;
    });
    formDataCopy[index] = newEditData;
    setFormData(formDataCopy);
    localStorage.setItem("TaskData", JSON.stringify(formDataCopy));
    setOpenDialog(false);
  };

  

  return (
    <Box>
      <Box
        className="task_bar"
        sx={{ marginTop: "1%", marginLeft: "1%", marginRight: "20%" }}
      >
        <Button
          variant="contained"
          onClick={handleOpenDialog}
          sx={{ marginTop: "1%" }}
        >
          Add task
        </Button>
        <Box sx={{ marginTop: "2%", width: "30%" , marginLeft:"7%"}}>
          {addDataMsg && (
            <Alert
              onClose={() => {
                handleCloseAlert();
              }}
            >
              Task uploaded successfully !!
            </Alert>
          )}
        </Box>
      </Box>

      {openDialog && (
        <NewAddTask
          handleCloseDialog={handleClose}
          openDialog={openDialog}
          handleSaveData={handleAddDataOnTable}
          editValue={editData}
          handleNewEditData={handleAddEditData}
        />
      )}

      <GetFormTable
        handleDeleteValue={onDeleteValue}
        handleEditData={onEditValue}
        formDataValue={formData}
      />

      
    </Box>
  );
}


