import React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./Login.css"
import useLogin from "../../hooks/useLogin"
import { Navigate } from "react-router-dom";
// import "../SignUp.css";
// import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate()
  useLogin()
  const [formInputs, setinput] = useState({
    healthCard: "",
  });

  const { login, error, isLoading } = useLogin();
  // const navigate = useNavigate();

  const handleChange = (e) => {
    setinput({ ...formInputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formInputs);


    //temporary fix
    await login(formInputs.healthCard);

    // navigate(-1);

    
  };
  return (
    <div className="loginContainer">

      <div className="login">
        <h2 className="loginTitle">
          Welcome To Taffy's Medical Clinic
        </h2>
        <form className="loginForm" onSubmit={handleSubmit}>
          <TextField
            type="number"
            className="textField"
            value={formInputs.healthCard}
            onChange={handleChange}
            name="healthCard"
            required
            id="healthCard"
            label="Health Card"
            variant="outlined"
            color="primary"
          />

          
          <div className="buttons">
            <Button
              // disabled={isLoading}
              type="submit"
              size="large"
              color="primary"
              variant="contained"
              className="mainButton"
            >
              Login
            </Button>
            <Button
              size="large"
              color="primary"
              variant="contained"
              className="sideButton"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </Button>
            
          </div>
      </form>
      </div>
      
    </div>
  );
}
