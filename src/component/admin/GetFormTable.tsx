import React, { useState } from "react";
import { IformValue } from "../dataType/Datatype";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  TooltipProps,
  Typography,
  styled,
  tooltipClasses,
} from "@mui/material";
import "./style.css";
import ViewSubTask from "./ViewSubTask";
import DeleteItem from "./DeleteItem";

type getDataProps = {
  formDataValue: IformValue[];
  handleEditData: (id: IformValue) => void;
  handleDeleteValue: (filterData: IformValue[]) => void;
};

interface IdataType {
  open: boolean;
  id: number | null;
}

export default function GetFormTable(props: getDataProps) {
  const { formDataValue, handleEditData, handleDeleteValue } = props;
  console.log("value", formDataValue);

  const [deleteDialog, setDeleteDialog] = useState<IdataType>({
    open: false,
    id: null,
  });

  const handleDeleteData = (id: number) => {
    setDeleteDialog({
      open: true,
      id,
    });
  };

  const handleCloseDialog = () => {
    setDeleteDialog({
      open: false,
      id: null,
    });
  };

  const handleDeleteTask = (id: number | null) => {
 
    if (!id) return;
    const arrayData = [...formDataValue];
    const filterData: any = arrayData.filter((item) => {
      return item.id !== id;
    });
    handleDeleteValue(filterData);
    setDeleteDialog({ open: false, id: null });
  };

  return (
    <Box>
      <Box sx={{ marginTop: "3%", marginLeft: "6%", marginBottom: "2%" }}>
        <Typography variant="h6">Added New Task</Typography>
      </Box>
      <>
        {formDataValue.length > 0 && (
          <Box className="form_table">
            <TableContainer sx={{ maxHeight: 550 }} component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{ fontSize: "16px", fontWeight: "600" }}
                      align="left"
                    >
                      Title
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: "16px", fontWeight: "600" }}
                      align="left"
                    >
                      Start Date
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: "16px", fontWeight: "600" }}
                      align="left"
                    >
                      End Date
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: "16px", fontWeight: "600" }}
                      align="left"
                    >
                      Description
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: "16px", fontWeight: "600" }}
                      align="left"
                    >
                      Hour
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: "16px", fontWeight: "600" }}
                      align="left"
                    >
                      Sub-Task
                    </TableCell>

                    <TableCell
                      sx={{ fontSize: "16px", fontWeight: "600" }}
                      align="left"
                    >
                      Edit
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: "16px", fontWeight: "600" }}
                      align="left"
                    >
                      Delete
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {formDataValue.map((item, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {item.title ?? "---"}
                      </TableCell>
                      <TableCell align="left">
                        {item.startDate ?? "---"}
                      </TableCell>
                      <TableCell align="left">
                        {item.endDate ?? "---"}
                      </TableCell>
                      <TableCell align="left">{item.desc ?? "---"}</TableCell>
                      <TableCell align="left">{item.hour ?? "---"}</TableCell>

                      <TableCell align="left">
                        {item.subTask.length > 0 ? (
                          <ul>
                            {item.subTask.map((subItem, index) => (
                              <Box key={index}>
                                <li>Title : {subItem.title ?? "---"}</li>
                                <li>Hour : {subItem.hour ?? "---"}</li>
                                <li>
                                  Start-date : {subItem.startDate ?? "---"}
                                </li>
                                <li>End-date : {subItem.endDate ?? "---"}</li>
                                <li>Desc : {subItem.subdesc ?? "---"}</li>
                                
                              </Box> 
                            ))}
                          </ul>
                        ) : (
                          "---"
                        )}
                      </TableCell>

                      <TableCell align="left">
                        <Button
                          onClick={() => handleEditData(item)}
                          variant="outlined"
                        >
                          Edit
                        </Button>
                      </TableCell>
                      <TableCell align="left">
                        <Button
                          sx={{
                            bgcolor: "#d32f2f",
                            color: "white",
                            border: "none",
                            "&:hover":{
                              bgcolor:"#d32f2f",
                              color:"white",
                              border:"none"
                            }
                          }}
                          onClick={() => handleDeleteData(item.id)}
                          variant="outlined"
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </>
      {formDataValue.length < 1 ? (
        <Typography>No record found!</Typography>
      ) : null}

      {deleteDialog && (
        <DeleteItem
          openDelete={deleteDialog.open}
          handleClose={handleCloseDialog}
          handleDeleteTask={() => handleDeleteTask(deleteDialog.id)}
        />
      )}
    </Box>
  );
}
