import { Box, IconButton, Typography, useTheme } from "@mui/material";
import React, { useContext } from "react";
import "../navbar/Style.nav.css";
import { RootState, useAppSelector } from "../reducer/Store";



export default function Topbar() {
  const topTitle = useAppSelector((state: RootState) => state.topbar.title);
  const role = useAppSelector((state) => state.topbar.role);
  const user = useAppSelector((state) => state.topbar.userName);



  return (
    <Box>
      <Box
        className="topbar"
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"} 
         >
        <Typography className="Top_bar">{topTitle}</Typography>
        <Box>
         
          <Typography className="Top_bar_role">role:{role}</Typography>
          <Typography className="Top_bar_user">user:{user}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
