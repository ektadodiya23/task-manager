import { Alert, AlertTitle, Box, Button, FormControlLabel, Stack, Switch, TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import JoditEditor from "jodit-react-ts";
import "jodit/build/jodit.min.css";
import { useNavigate } from "react-router-dom";
import { InewsData } from "../dataType/Datatype";
import JoditReact from "jodit-react-ts";

export default function Settings() {

  const newsValue: InewsData = {
    id: 0,
    newsTitle: "",
    newsDate: 0,
    isActive: false,
    position: {
      x: 0,
      y: 0
    }
  };
 const [initialNewsValue, setInitialNewsValue] = useState( newsValue );
  const [editorValue, setEditorValue] = useState("");
  const [showAlert , setShowAlert] = useState(false);
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const navigate = useNavigate();
 

  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if(name === "isActive"){
      setInitialNewsValue((prev)=>({
        ...prev , 
        [name]: !prev.isActive,
      }));
    } else {
      setInitialNewsValue((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    }
  };


const handleAddData = (event :any) => {
   event.preventDefault();

   if (
     !initialNewsValue.newsTitle ||
     !initialNewsValue.newsDate ||
     !editorValue 
   ) {
    setShowAlert(true);
     return;
   }

   const formData = {
     id: new Date().getTime(),
     newsTitle: initialNewsValue.newsTitle,
     newsDate: initialNewsValue.newsDate,
     editorValue: editorValue,
     isActive: initialNewsValue.isActive,
     position : {
      x : position.x,
      y  : position.y
     }
   };
   console.log(  "data" ,formData)
  
    const existingData = JSON.parse(localStorage.getItem("newsData") || "[]");
    const updatedData = [...existingData, formData];
    localStorage.setItem("newsData", JSON.stringify(updatedData));
    navigate("/addData");
    };

    const handleCloseAlert=()=>{
      setShowAlert(false);
    }



  return (
    <Box>
      {showAlert && (
        <Stack
          sx={{ width: "30%", marginTop: "1%", marginLeft: "2%" }}
          spacing={2}
        >
          <Alert
            severity="warning"
            onClose={() => {
              handleCloseAlert();
            }}
          >
            <AlertTitle>Warning</AlertTitle>
            Please fill in all — <strong>required fields!</strong>
          </Alert>
        </Stack>
      )}

      <form onSubmit={handleAddData}>
        <Box sx={{ marginTop: "3%" }}>
          <TextField
            onChange={handleChangeValue}
            value={initialNewsValue.newsTitle}
            sx={{ width: "45%", marginLeft: "3%" }}
            label="Title"
            type="text"
            autoComplete="off"
            color="info"
            name="newsTitle"
          />

          <TextField
            onChange={handleChangeValue}
            value={initialNewsValue.newsDate}
            name="newsDate"
            sx={{ width: "45%", marginLeft: "3%" }}
            type="date"
            id="date"
            label="Start Date"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
        <Box sx={{ marginTop: "2%", marginLeft: "3%", marginRight: "3%" }}>
          <JoditReact
            defaultValue={editorValue}
            onChange={(content) => setEditorValue(content)}
          />
        </Box>

        <Box sx={{ marginTop: "2%", marginRight: "3%" }}>
          <TextField
            value={position.x}
            sx={{ width: "20%", marginLeft: "3%" }}
            type="number"
            id="number"
            label=" position : x"
            onChange={(event) =>
              setPosition((prevPosition) => ({
                ...prevPosition,
                x: parseInt(event.target.value),
              }))
            }
          />

          <TextField
            value={position.y}
            sx={{ width: "20%", marginLeft: "3%" }}
            type="number"
            id="number"
            label=" position : y"
            onChange={(event) =>
              setPosition((prevPosition) => ({
                ...prevPosition,
                y: parseInt(event.target.value),
              }))
            }
          />
        </Box>

        <Box sx={{ marginTop: "2%", marginLeft: "3%", marginRight: "3%" }}>
          <FormControlLabel
            control={
              <Switch
                checked={initialNewsValue.isActive}
                onChange={handleChangeValue}
                name="isActive"
              />
            }
            label="Click for vital news*"
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          sx={{ marginTop: "20px", marginLeft: "3%" }}
        >
          Add content
        </Button>
      </form>
    </Box>
  );
}
