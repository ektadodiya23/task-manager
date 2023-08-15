import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Register from "./component/auth/Register";
import Login from "./component/auth/Login";
import SidebarMenu from "./component/navbar/SidebarMenu";
import { Box } from "@mui/material";
import Topbar from "./component/navbar/Topbar";
import { useAppSelector } from "./component/reducer/Store";
import Dashboard from "./component/admin/Dashboard";
import Taskmanagment from "./component/admin/Taskmanagment";
import Createtask from "./component/admin/Createtask";
import User from "./component/admin/User";
import Settings from "./component/admin/Settings";
import NewesForm from "./component/admin/NewesForm";
import ViewPost from "./component/admin/ViewPost";
import { NewsItem } from "./component/admin/NewesForm";
import Demo from "./component/admin/Demo";



function App() {

  const [islogin, setIsLogin] = useState(
    localStorage.getItem("login") === "true" &&
      localStorage.getItem("login") !== null
      ? true
      : false
  );

  
  
  const role = useAppSelector((state) => state.topbar.role);

  useEffect(() => {
    setIsLogin(localStorage.getItem("login") === "true" ? true : false);
    console.log("login", localStorage.getItem("login"));
  }, []);

  return (
    <div>
      {!islogin && (
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="login" element={<Login setLogin={setIsLogin} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      )}

      {islogin && (
        <>
          <Box display={"flex"}>
            <Box>
              <SidebarMenu setLogin={setIsLogin} />
            </Box>
            <Box width={"100%"}>
              <Topbar />
              {role === "user" && (
                <Routes>
                  <Route path="/Dashboard" element={<Dashboard />} />
                  {/* <Route path="/task" element={<Taskmanagment />} /> */}
                  <Route path="/createTask" element={<Createtask />} />
                  <Route path="/newsView" element={<ViewPost />} />
                </Routes>
              )}
              {role === "admin" && (
                <Routes>
                  <Route path="/Dashboard" element={<Dashboard />} />
                  <Route path="/UserList" element={<User />} />
                  <Route path="/task" element={<Taskmanagment />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/addData" element={<Demo />} />
                </Routes>
              )}
              {role === "analyst" && (
                <Routes>
                  <Route path="/Dashboard" element={<Dashboard />} />
                  {/* <Route path="/task" element={<Taskmanagment />} /> */}
                  <Route path="/createTask" element={<Createtask />} />
                </Routes>
              )}
            </Box>
          </Box>
        </>
      )}
    </div>
  );
}

export default App;
