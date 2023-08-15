import {
  Box,
  Button,
  Container,
  FilledInput,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import loginImage from "../img/login_des.png";
import "../auth/auth.style.css";
import userImage from "../img/6723600.png";
import { Link, useNavigate } from "react-router-dom";
import { Ilogin } from "../dataType/Datatype";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useAppDispatch } from "../reducer/Store";
import { set_Role, set_userName } from "../reducer/TopBarSlice";

const addData = [
  {
    email: "john3@gmail.com",
    userName: "John",
    number: "1234567894",
    password: "John123#",
    confirmPass: "John123#",
    id: new Date().getTime(),
    role: "admin",
  },
  {
    email: "richal4@gmail.com",
    userName: "Richal",
    number: "1234567894",
    password: "Richa123#",
    confirmPass: "Richa123#",
    id: new Date().getTime(),
    role: "analyst",
  },
];

export default function Login(props: any) {
  const dispatch = useAppDispatch();
  const initialLoginValue: Ilogin = {
    email: "",
    password: "",
  };
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loginValue, setLoginValue] = useState(initialLoginValue);
  const [loginError, setLoginError] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleChangeInput = (e: any) => {
    const { name, value } = e.target;
    setLoginValue({ ...loginValue, [name]: value });
  };

  const handleSubmitLogin = (e: any) => {
    e.preventDefault();
    console.log("inside submit");
    if (selectedValue == "user") {
      const getValue = localStorage.getItem("Register");
      console.log("getData", getValue);

      if (getValue) {
        const getStringData = JSON.parse(getValue);
        console.log("Data", getStringData);

        const foundUser = getStringData.find((user: any) => {
          if (
            user.email === loginValue.email &&
            user.password === loginValue.password
          ) {
            localStorage.setItem("role", user.role);
            dispatch(set_Role(user.role));
            localStorage.setItem("user", user.userName);
            dispatch(set_userName(user.userName));

            return true;
          }
        });

        if (foundUser) {
          setLoginError(false);
          localStorage.setItem("login", "true");
          props.setLogin(true);
          navigate("/Dashboard");
        } else {
          setLoginError(true);
        }
      }
    } else if (selectedValue == "admin" || selectedValue == "analyst") {
      console.log("inside admin", loginValue);

      const foundUserData = addData.find((user: any) => {
        console.log(user);
        if (
          user.email === loginValue.email &&
          user.password === loginValue.password
        ) {
          localStorage.setItem("role", user.role);
          dispatch(set_Role(user.role));
          localStorage.setItem("user", user.userName);
          dispatch(set_userName(user.userName));
          
          return true;
        }
      });
      
      if (foundUserData) {
        setLoginError(false);
        localStorage.setItem("login", "true");
        props.setLogin(true);
        navigate("/Dashboard");
      } else {
        setLoginError(true);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setSelectedValue(e.target.value);
  };

  return (
    <Box>
      <Container maxWidth="xl" sx={{ bgcolor: "#90caf9", marginTop: "6%" }}>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={6} md={4}>
              <Box>
                <img src={loginImage} alt="user-login" className="login_img" />
              </Box>
            </Grid>
            <Grid item xs={6} md={8}>
              <Box className="login_about">
                <Box>
                  <img src={userImage} alt="icon_img" className="icon_img" />
                </Box>

                <Box sx={{ paddingTop: "3%" }}>
                  <Typography variant="h5">Hello Again!</Typography>
                </Box>

                <form onSubmit={handleSubmitLogin}>
                  <Box sx={{ marginTop: "3%" }}>
                    <TextField
                      variant="filled"
                      sx={{ width: "60%" }}
                      label="email"
                      type="email"
                      autoComplete="off"
                      color="info"
                      name="email"
                      value={loginValue.email}
                      onChange={handleChangeInput}
                    />
                  </Box>

                  <Box sx={{ marginTop: "3%" }}>
                    <FormControl sx={{ width: "60%" }} variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">
                        Password
                      </InputLabel>
                      <FilledInput
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={loginValue.password}
                        onChange={handleChangeInput}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityIcon />
                              ) : (
                                <VisibilityOffIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </Box>

                  <Box sx={{ marginTop: "2%" }}>
                    {loginError && (
                      <Typography sx={{ color: "red" }}>
                        Error: Invalid email or password
                      </Typography>
                    )}
                  </Box>

                  
                    <Box sx={{ minWidth: 60 }}>
                      <FormControl sx={{ width: "60%" }}>
                        <InputLabel id="demo-simple-select-label">
                          Role
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={selectedValue}
                          label="Age"
                          onChange={(e: any) => handleChange(e)}
                        >
                          <MenuItem value={"user"}>User</MenuItem>
                          <MenuItem value={"admin"}>Admin</MenuItem>
                          <MenuItem value={"analyst"}>Analyst</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                 

                  <Box sx={{ marginTop: "3%" }}>
                    <Button type="submit" size="medium" variant="contained">
                      Login
                    </Button>
                  </Box>

                  <Box sx={{ marginTop: "3%" }}>
                    <Typography variant="subtitle1">
                      Don't have an account ??
                      <span>
                        <Link to={"/"}>Register</Link>
                      </span>
                    </Typography>
                  </Box>
                </form>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
