import React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./SignUp.css"
import useLogin from "../../hooks/useLogin"
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useSignUp from "../../hooks/useSignUp"
import { MobileDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import close from "../../assets/close.svg"

export default function SignUp() {
  const navigate = useNavigate()
  const [formInputs, setinput] = useState({
    healthCard: "",
    phone: "",
    name: "",
    address: ""

  });

  const { signUp, error, isLoading } = useSignUp();
  // const navigate = useNavigate();

  const handleChange = (e) => {
    setinput({ ...formInputs, [e.target.name]: e.target.value });
  };
  const handleDateChange = (date) => {
    console.log(date)
    // console.log(e.target.name)
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formInputs);


    //temporary fix
    await signUp(formInputs.healthCard, formInputs.name, formInputs.phone, formInputs.address);

    // navigate(-1);


  };
  return (
    <div className="signUpContainer">
      

      <div className="signUp">
      <div className="closeIcon">
        <img
          className="close"
          onClick={()=> navigate("/")}
          src={close}
          alt=""
        />
        </div>
        <h2 className="signUpTitle">
          Sign Up To Taffy's Medical Clinic
        </h2>
        <form className="signUpForm" onSubmit={handleSubmit}>
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
          <TextField

            className="nameSelector"
            value={formInputs.name}
            onChange={handleChange}
            name="name"
            required
            id="name"
            label="Name"
            variant="outlined"
            color="primary"
          />

          <TextField
            type="number"
            className="phoneSelector"
            value={formInputs.phone}
            onChange={handleChange}
            name="phone"
            required
            id="phone"
            label="phone"
            variant="outlined"
            color="primary"
          />
          <TextField
            className="addressSelector"
            value={formInputs.address}
            onChange={handleChange}
            name="address"
            required
            id="address"
            label="address"
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
              Sign Up
            </Button>

          </div>
        </form>
      </div>

    </div>
  );
}
