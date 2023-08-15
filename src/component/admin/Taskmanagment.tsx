import { Box, Button, Grid,  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./style.css";
import { IformValue } from "../dataType/Datatype";




export default function Taskmanagment() {
 
  const [taskValue , setTaskValue] = useState<IformValue[]>([]);

  useEffect(()=>{
    const getTaskData:any = localStorage.getItem("TaskData");
    const convertData = JSON.parse(getTaskData);

    if (Array.isArray(convertData)) {
      setTaskValue(convertData);
    } else {
      setTaskValue([]);
    }

  } , []);

  const handleDeleteTask=(id : number)=>{
    
        const value = [...taskValue];
        const filterValue = value.filter((element)=>{
          return element.id !== id ; 
        })
        setTaskValue(filterValue);
        localStorage.setItem("TaskData", JSON.stringify(filterValue));
       }


  return (
    <Box sx={{ marginLeft: "7%", marginTop: "3%" }}>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={6} md={8}>
            <Typography variant="h6" mb={2}>
              Task
            </Typography>
            <Box border={"1px solid gray"}>
              <TableContainer sx={{ maxHeight: 550 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{ fontWeight: "700", fontSize: "20px" }}
                        align="center"
                      >
                       index
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: "700", fontSize: "20px" }}
                        align="center"
                      >
                        Title
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: "700", fontSize: "20px" }}
                        align="center"
                      >
                        Description
                      </TableCell>
                      <TableCell sx={{ fontWeight: "700", fontSize: "20px" }}>
                        subTask
                      </TableCell>
                      <TableCell sx={{ fontWeight: "700", fontSize: "20px" }}>
                        Delete
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {taskValue.map((item, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell align="center">
                            {index+1}
                          </TableCell>
                          <TableCell align="center">
                            {item.title ? item.title : "---"}
                          </TableCell>
                          <TableCell align="center">
                            {item.desc ? item.desc : "---"}
                          </TableCell>
                          <TableCell>
                            {item.subTask.length > 0 ? (
                              <ul>
                                {item.subTask.map((subItem) => (
                                  <>
                                    <li key={subItem.id}>
                                      Title : {subItem.title ?? "---"}
                                    </li>
                                    <li>Hour : {subItem.hour ?? "---"}</li>
                                    <li>
                                      Start-date : {subItem.startDate ?? "---"}
                                    </li>
                                    <li>
                                      End-date : {subItem.endDate ?? "---"}
                                    </li>
                                    <li>Desc : {subItem.subdesc ?? "---"}</li>
                                  </>
                                ))}
                              </ul>
                            ) : (
                              "---"
                            )}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outlined"
                              onClick={() => handleDeleteTask(item.id)}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}



 