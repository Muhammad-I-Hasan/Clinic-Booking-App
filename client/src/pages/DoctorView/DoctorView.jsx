import React from "react";
import { useState, useEffect } from "react";
import useDoctorData from "../../hooks/useDoctorData"
import { useNavigate } from "react-router-dom";
import "./DoctorView.css"
import { Button, TextField } from "@mui/material";
import close from "../../assets/close.svg"
export default function DoctorView() {
  const navigate = useNavigate()
  const [formInputs, setinput] = useState({
    ID: "",
  });

  const [data, setData] = useState([])

  const { error, isLoading, login } = useDoctorData()
  // const navigate = useNavigate();

  const handleChange = (e) => {
    setinput({ ...formInputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formInputs);


    await login(formInputs.ID, setData);

    // navigate(-1);


  };

  const renderAppointments = () => {
    if (data.length != 0) {
      // console.log(data)
      return (

        <div className="patientContainer">
          <h5 className="patientTitle">
            Patient Bookings
          </h5>
          <div className="patientBookings">
            {data.map((booking, index) => {
              // console.log(booking.Time)
              return (
                // <div> pog </div>
                <PatientBooking
                  index = {index}
                  setArray={setData}
                  array={data}
                  key={index}
                  ID={booking.Prac_ID}
                  Time={booking.Time}
                  Date={booking.Date}
                  HCN={booking.HCN}
                  Name={booking.Name}
                  Room={booking.RNumber}
                  Comments={booking.Comments} />
              )
            })}
          </div>
        </div>
      )
    }
  }


  return (
    <div className="doctorViewContainer">

      <div className="doctorLoginView">
        <h2 className="doctorLoginTitle">
          Please enter your Id
        </h2>
        {<div>{error}</div>}

        <form className="loginForm" onSubmit={handleSubmit}>
          <TextField
            type="number"
            // className="IDfield"
            value={formInputs.ID}
            onChange={handleChange}
            name="ID"
            required
            id="ID"
            label="ID"
            variant="outlined"
            color="primary"
            sx={{
              marginBottom: "1em"
            }}
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

          </div>
        </form>
      </div>

      <div >
        {renderAppointments()}

      </div>

    </div>
  );



}



const PatientBooking = ({index, setArray, array, Time, Date, HCN, Name,Room, Comments, ID }) => {
  console.log(array)
  // console.log("key + " + key)
  const {submitComment, login, removeAppointment} = useDoctorData()
  const [comments, SetComments] = useState(Comments)
  const submitForm = async(e) => {
    e.preventDefault()
    await submitComment(Time,Date,ID,HCN, comments)

  }
  const handleCloseClick = async(e) =>{
    await removeAppointment(Time, Date, ID,HCN)
    await login(ID, setArray);

  }
  return (
    <div className="patientBookingContainer">
      <div className="closeIcon">
        <img
          className="close"
          onClick={handleCloseClick}
          src={close}
          alt=""
        />
      </div>
      <h3>Time: {Time}</h3>
      <h5>Date: {Date}</h5>

      <p>HCN: {HCN}</p>
      <p>Name: {Name}</p>
      <p>Room: {Room}</p>
      <p>{Comments}</p>
      <form onSubmit={submitForm}>
        <TextField
          className="comments"
          value={comments ? comments: ""}
          onChange={(e) => {
            SetComments(e.target.value)
          }}
          name="comments"
          required
          id="comments"
          label="comments"
          variant="outlined"
          color="primary"
          size="small"
        />
        <Button
              // disabled={isLoading}
              type="submit"
              size="small"
              color="primary"
              variant="contained"
              className="mainButton"
            >
              submit Comments
            </Button>
      </form>


    </div>
  )
}