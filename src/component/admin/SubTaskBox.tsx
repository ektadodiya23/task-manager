import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import "./style.css";
import { type } from "os";
import { IformValue, IsubTask } from "../dataType/Datatype";

type IsubTaskProps = {
  mainFormValue: IformValue;
  handleSetMainValue: (value: IformValue) => void;
 };

export default function SubTaskBox(props: IsubTaskProps) {

  const { mainFormValue, handleSetMainValue } = props;

  const handleChangeValue = (e: any, id: number) => {

    const { name, value } = e.target;
    const updatedSubTasks = mainFormValue.subTask.map((subItem) => {
      if (subItem.id === id) {
        return {
          ...subItem,
          [name]: value,
        };
      }
      return subItem;
    });
    handleSetMainValue({ ...mainFormValue, subTask: updatedSubTasks });
   };

   const handleDeleteSubTask = (id:number)=>{
   
    const updatedSubTasks = mainFormValue.subTask.filter(
      (subItem) => subItem.id !== id
    );
    handleSetMainValue({ ...mainFormValue, subTask: updatedSubTasks });
   }



  return (
    <Box sx={{ marginLeft: "3%", marginTop: "1%", width: "100%" }}>

      {mainFormValue.subTask.map((subItem, index) => {

        return (
          <Box key={index}>
            <Box className="subTask_box">
              <Typography className="index_sunTask">{index + 1}</Typography>
              <Button
                onClick={() => handleDeleteSubTask(subItem.id)}
                variant="outlined"
                size="small"
                sx={{
                  bgcolor: "#d32f2f",
                  color: "white",
                  border: "none",
                  "&:hover": {
                    bgcolor: "#d32f2f",
                    color: "white",
                    border: "none",
                  },
                }}
              >
                Delete
              </Button>
            </Box>
            <Box sx={{ marginTop: "2%" }}>
              <TextField
                name="title"
                value={subItem.title}
                onChange={(e: any) => handleChangeValue(e, subItem.id)}
                sx={{ width: "65%" }}
                type="text"
                id="title"
                label="Title"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300,
                }}
              />
              <TextField
                name="hour"
                value={subItem.hour}
                onChange={(e: any) => handleChangeValue(e, subItem.id)}
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
            </Box>
            <Box sx={{ marginTop: "3%" }}>
              <TextField
                name="startDate"
                value={subItem.startDate}
                onChange={(e: any) => handleChangeValue(e, subItem.id)}
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
                value={subItem.endDate}
                onChange={(e: any) => handleChangeValue(e, subItem.id)}
                sx={{ width: "49%", marginLeft: "6px" }}
                type="date"
                id="date"
                label=" End Date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
            <Box sx={{ marginTop: "3%" }}>
              <TextField
                name="subdesc"
                value={subItem.subdesc ?? "---"}
                onChange={(e: any) => handleChangeValue(e, subItem.id)}
                fullWidth
                id="description"
                label="Description"
                multiline
                rows={4}
              />
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}


