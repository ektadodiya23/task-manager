import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import PersonIcon from "@mui/icons-material/Person";
import "../admin/style.css";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { Box } from "@mui/material";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { useAppDispatch, useAppSelector } from "../reducer/Store";
import { setTitle } from "../reducer/TopBarSlice";
import {USER_TYPE} from '../dataType/Datatype'
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import DatasetOutlinedIcon from "@mui/icons-material/DatasetOutlined";
import NewspaperIcon from "@mui/icons-material/Newspaper";

// User-Role-Interface
interface IuserTypeMapWithNumber {
  [USER_TYPE.ADMIN]: number;
   [USER_TYPE.ANALYST]: number;
   [USER_TYPE.USER]: number;
}

// User-Role
const userTypeMapWithNumber: IuserTypeMapWithNumber = {
  [USER_TYPE.ADMIN]: 1,
  [USER_TYPE.ANALYST]: 2,
  [USER_TYPE.USER]: 3,
};




const sidebar = [
  {
    id: 1,
    item: "Dashboard",
    link: "/Dashboard",
    title: "Dashboard",
    icon: <HomeRoundedIcon />,
    showToAll: true,
    showList: [1, 2, 3],
  },
  {
    id: 2,
    item: "Task Managment",
    link: "/task",
    title: "Task Managment",
    icon: <AssignmentTurnedInRoundedIcon />,
    showToAll: false,
    showList: [1],
  },
  {
    id: 3,
    item: " User",
    link: "/UserList",
    title: " User",
    icon: <PersonIcon />,
    showToAll: false,
    showList: [1],
  },
  {
    id: 4,
    item: "  Create task",
    link: "/createTask",
    title: " Create task",
    icon: <SaveAsIcon />,
    showToAll: false,
    showList: [2, 3],
  },
  {
    id: 5,
    item: "  Editor",
    link: "/settings",
    title: " Editor",
    icon: <BorderColorRoundedIcon />,
    showToAll: false,
    showList: [1],
  },
  {
    id: 6,
    item: " Data",
    link: "/addData",
    title: " Data",
    icon: <DatasetOutlinedIcon />,
    showToAll: false,
    showList: [1],
  },
  {
    id: 7,
    item: " News",
    link: "/newsView",
    title: " News",
    icon: <NewspaperIcon />,
    showToAll: false,
    showList: [ 2 , 3],
  },
];
  


export default function SidebarMenu(props: any) {

  const [menuCollapse, setMenuCollapse] = useState(false);
  const [selected , setSelected] = useState(-1);
  
  const navigate = useNavigate();
  const dispatch = useAppDispatch(); 
  const roleData = useAppSelector((state) => state.topbar.role as any);



  const handleCloseMenu = (e: any) => {
    e.preventDefault();
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

 

  const handleLogOut = () => {
    
    props.setLogin(false);
    localStorage.setItem("login", "false");
    navigate("/");
  };

  const handleClickActive = (id :number , title : string ) => {
    console.log(  "id", id)
    setSelected(id);
    dispatch(setTitle(title));
    
   };


  return (
    <Box>
      <Sidebar className="navbar" collapsed={menuCollapse}>
        <Menu className="menu_bar">
          <Box className="logotext">{menuCollapse ? "logo" : "big logo"}</Box>
          <Box className="closemenu" onClick={handleCloseMenu}>
            {menuCollapse ? (
              <ArrowCircleLeftRoundedIcon sx={{ fontSize: "30px" }} />
            ) : (
              <ArrowCircleRightRoundedIcon sx={{ fontSize: "30px" }} />
            )}
          </Box>

          <hr></hr>

        
            {sidebar.map((item) => {
              let show: boolean = item.showToAll;
              if (!show) {
                let role: keyof IuserTypeMapWithNumber = roleData;
                show = item.showList.some(
                  (it) => it === userTypeMapWithNumber[role]
                );
              }
              if (show) {
                return (
                  <MenuItem
                    key={item.id}
                    icon={item.icon}
                    title={item.title}
                    component={<Link to={item.link} />}
                    onClick={() => handleClickActive(item.id, item.title)}
                    className={
                      selected === item.id ? "menu_item" : "menu_item_active"
                    }
                  >
                    {item.item}
                  </MenuItem>
                );
              }
              return null;
            })}
         
        </Menu>

        <hr></hr>
        <Menu>
          <MenuItem onClick={handleLogOut} icon={<LogoutRoundedIcon />}>
            LogOut
          </MenuItem>
        </Menu>
      </Sidebar>

     
    </Box>
  );
}
