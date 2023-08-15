import { Alert, Box, Button, Container, FilledInput, FormControl, Grid, IconButton, InputAdornment, InputLabel,  TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import '../auth/auth.style.css';
import regImg from '../img/register.png';
import { Link, useNavigate } from 'react-router-dom';
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IregisterData } from '../dataType/Datatype';




export default function Register() {

  const initialValue : IregisterData = {
    email: '',
    userName: '',
    number: "",
    password: '',
    confirmPass: '',
    id: new Date().getTime(),
    role: 'user'
  }
  const navigate = useNavigate();

  const [showPassword , setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [inputValue , setInputValue] = useState (initialValue);
   
   const [inputError, setInputError] = useState<any>({});
   const [isSubmit, setIsSubmit] = useState(false);
   const [dialogMsg , setDialogMsg] = useState(false);
  

    
  const handleClickShowPassword = () => 
         setShowPassword((show) => !show);

   const handleClickShowConfirmPassword = () =>
     setShowConfirmPassword((show) => !show);

     const handleCloseAlert=()=>{
        setDialogMsg(false);
     }

 
    const handleChangeInput=(e:any)=>{
        const {name , value} = e.target ; 
        setInputValue((prevData)=>({
          ...prevData , [name]:value
        }))
       }

   const handleSubmitReg = (e:any) =>{
      e.preventDefault();
      setInputError(handleValidationErr(inputValue));
      setIsSubmit(true);
      console.log("isSubmit",isSubmit)
     }

    

   useEffect(() => {
       if(Object.keys(inputError).length === 0 && isSubmit ){
       const storedData = localStorage.getItem("Register");
         let existingData: IregisterData[] = [];
         if (storedData) {
           existingData = JSON.parse(storedData);
         }
         const updatedData = [...existingData, inputValue];
         localStorage.setItem("Register", JSON.stringify(updatedData));
          setDialogMsg(true);
         alert("Registration successfully !!");
         navigate("/login");
       }
    }, [inputError]);





  const handleValidationErr = (value :any) => {

  const errors:any = {} ;
  const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const letter = /^[a-zA-Z]+$/i;
  const Uppercase = /^(?=.*[A-Z]).*$/;
  const ContainsNumber = /^(?=.*[0-9]).*$/;
  const specialSymbol = /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;

  if(!value.email){
    errors.email = "***Email is required!"
  }else if (!regexEmail.test(value.email)){
      errors.email = "***This is not a valid email format!"
  }

  if(!value.userName){
    errors.userName = "***userName is required!"
  } else if (!letter.test(value.userName)){
    errors.userName = "***Only letters required!";
  } else if(!Uppercase.test(value.userName)){
    errors.userName =
      "***Username must have at least one uppercase characters!";
  }

  if(!value.number){
    errors.number = "***number is required!"
  } if(value.number.length > 10){
    errors.number = "***Only 10 characters required!"
  }

  if(!value.password){
    errors.password = "***password is required!"
  } else if (value.password.length < 4 ){
      errors.password = "***Password must be more than 4 characters!"
  } else if (value.password.length > 10){
    errors.password = "***Password cannot exceed more than 1o characters !"
  }else if (!Uppercase.test(value.password)){
    errors.password = "***Password must have at least one uppercase characters !"
  } else if (!ContainsNumber.test(value.password)){
    errors.password = "***Password must contain at least one digit !" 
  } else if (!specialSymbol.test(value.password)){
    errors.password = "***Password must contain at least one speical symbol!"
  }

  if(!value.confirmPass){
    errors.confirmPass = "***Confirm password is requied!"
  } else if (value.confirmPass !== value.password){
    errors.confirmPass = "***password not matched!"
  }
  return errors;
 }
  

  return (
    <Box className="header_part">
      <Box>
        {dialogMsg && (
          <Alert
            onClose={() => {
              handleCloseAlert();
            }}
          >
            Registration successfully !!
          </Alert>
        )}
      </Box>
      <Container
        className="reg_box"
        maxWidth="xl"
        sx={{ bgcolor: "#90caf9", marginTop: "3%" }}
      >
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={6} md={4}>
              <Box>
                <img src={regImg} alt="reg_img" className="reg_image" />
              </Box>
            </Grid>
            <Grid item xs={6} md={8}>
              <Box
                className="reg_field"
                height={750}
              >
                <Typography sx={{ paddingTop: "3%" }} variant="h4" gutterBottom>
                  Register
                </Typography>
                <Typography variant="subtitle1">
                  "Welcome! Register now and join our community for exclusive
                  benefits and exciting updates."
                </Typography>
                <form onSubmit={handleSubmitReg}>
                  <Box sx={{ marginTop: "3%" }}>
                    <TextField
                      variant="filled"
                      sx={{ width: "60%" }}
                      label="email"
                      type="email"
                      autoComplete="off"
                      color="info"
                      name="email"
                      value={inputValue.email}
                      onChange={handleChangeInput}
                    />
                  </Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "red", marginBottom: "2%" }}
                  >
                    {inputError.email}
                  </Typography>

                  <Box sx={{ marginTop: "3%" }}>
                    <TextField
                      variant="filled"
                      sx={{ width: "60%" }}
                      label="username"
                      type="text"
                      autoComplete="off"
                      color="info"
                      name="userName"
                      value={inputValue.userName}
                      onChange={handleChangeInput}
                    />
                  </Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "red", marginBottom: "2%" }}
                  >
                    {inputError.userName}
                  </Typography>

                  <Box sx={{ marginTop: "3%" }}>
                    <TextField
                      variant="filled"
                      sx={{ width: "60%" }}
                      label="number"
                      type="number"
                      autoComplete="off"
                      color="info"
                      name="number"
                      value={inputValue.number}
                      onChange={handleChangeInput}
                    />
                  </Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "red", marginBottom: "2%" }}
                  >
                    {inputError.number}
                  </Typography>

                  <Box sx={{ marginTop: "3%" }}>
                    <FormControl sx={{ width: "60%" }} variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">
                        Password
                      </InputLabel>
                      <FilledInput
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={inputValue.password}
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
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "red", marginBottom: "2%" }}
                  >
                    {inputError.password}
                  </Typography>

                  <Box sx={{ marginTop: "3%" }}>
                    <FormControl sx={{ width: "60%" }} variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">
                        Confirm Password
                      </InputLabel>
                      <FilledInput
                        id="outlined-adornment-password"
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPass"
                        value={inputValue.confirmPass}
                        onChange={handleChangeInput}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowConfirmPassword}
                              edge="end"
                            >
                              {showConfirmPassword ? (
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
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "red", marginBottom: "2%" }}
                  >
                    {inputError.confirmPass}
                  </Typography>


                  <Box sx={{ marginTop: "3%" }}>
                    <Typography variant="subtitle1">
                      Already have an account?
                      <span>
                        <Link to={"/login"}>Login</Link>
                      </span>
                    </Typography>
                  </Box>

                  <Box sx={{ marginTop: "3%" }}>
                    <Button type="submit" variant="contained">
                      create account 
                    </Button>
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
