import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, loginUser } from "../../redux/slices/slice";

const LoginForm = ({onClose}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    useEffect(()=>{
      if(jwt){
        dispatch(fetchUser());
      }
    },[jwt, dispatch]);
    const {loading, error} = useSelector((state)=>state.auth)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Enter a valid email";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
   
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try{
      const resultAction = await dispatch(loginUser(formData)).unwrap();
      console.log("Login success:", resultAction);
      if(onClose) onClose();
      navigate("/");
    }catch(error){
      console.error("Logging failed ",error.message);
    } 
    
    // 👉 Here you can call your API to register user
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 400,
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="h5" fontWeight={600} textAlign="center" gutterBottom>
        Login
      </Typography>

      
        
      <TextField
        label="Email Address"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
        fullWidth
      />

      <TextField
        label="Password"
        name="password"
        type={showPassword ? "text" : "password"}
        value={formData.password}
        onChange={handleChange}
        error={!!errors.password}
        helperText={errors.password}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

     

      <Button
        variant="contained"
        size="large"
        sx={{ mt: 1, borderRadius: 2 }}
        onClick={handleSubmit}
      >
        {loading?"Logging in...":"Login"}
      </Button>

        {error && (
          <Typography color="error" textAlign={"center"}>{error}</Typography>
        )}
      <Typography variant="body2" textAlign="center">
        Didn't have an account?{" "}
        <span
          style={{ color: "#1976d2", cursor: "pointer", fontWeight: 500 }}
          onClick={() => navigate("/register")}
        >
          Register
        </span>
      </Typography>
    </Box>
  );
};

export default LoginForm;





