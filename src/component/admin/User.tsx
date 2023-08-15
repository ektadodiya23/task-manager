import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { IregisterData } from '../dataType/Datatype';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import '../admin/style.css';






export default function User() {

    const [dataArray, setDataArray] = useState<IregisterData[]>([]);
    console.log("array" , dataArray);

    useEffect(() => {
        const getData:any = localStorage.getItem("Register");
        const convertData = JSON.parse(getData); 

       if(Array.isArray(convertData)){
           setDataArray(convertData);    
        } else {
            setDataArray([]);    
        }
      }, []);


    

   
   
  return (
    <Box>
      <Box>
        <Typography variant="h6" sx={{ marginTop: "3%", marginLeft: "6%" }}>
          User List :
        </Typography>
      </Box>

      <Box className="table_item">
        <TableContainer sx={{ maxHeight: 600 }} component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "700", fontSize: "20px" }}>
                  id
                </TableCell>

                <TableCell
                  sx={{ fontWeight: "700", fontSize: "20px" }}
                  align="center"
                >
                  Username
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "700", fontSize: "20px" }}
                  align="center"
                >
                  Email
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "700", fontSize: "20px" }}
                  align="center"
                >
                  Password
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "700", fontSize: "20px" }}
                  align="center"
                >
                  Number
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "700", fontSize: "20px" }}
                  align="center"
                >
                  Role
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataArray.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                    {/* {row.role ?? "---"} */}
                  </TableCell>
                  <TableCell align="center">{row.userName ?? "---"}</TableCell>
                  <TableCell align="center">{row.email ?? "---"}</TableCell>
                  <TableCell align="center">{row.password ?? "---"}</TableCell>
                  <TableCell align="center">
                    +91 {row.number ?? "---"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
