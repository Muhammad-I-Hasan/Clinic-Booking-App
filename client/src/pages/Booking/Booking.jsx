import PracButton from "../../components/PracButton"
import "./Booking.css"
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { TextField } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import Axios from "axios"
import { useState, useEffect } from "react"
import { useAuthContext } from "../../hooks/useAuthContext"

const Booking = () => {
  const { user } = useAuthContext();
  const [doctors, setDoctors] = useState([]);
  const [nurses, setNurses] = useState([]);
  const [loaded1, setLoaded1] = useState(false);
  const [loaded2, setLoaded2] = useState(false);
  const [avail, setAvail] = useState([]);//show available times for selected date and practitioner
  const [bookable, setBookable] = useState(true);

  const [name, setName] = useState("");
  const [selectedPrac, setSelectedPrac] = useState(null);//selected practitioner
  const [date, setDate] = useState(dayjs());//selected date
  const [time, setTime] = useState(null);//selected date
  const [HCN, setHCN] = useState("");//inputted hcn
  //these four values are used for booking an appointment

  //fetch functions
  const fetchDoctors = async () => {
    return await Axios.get("http://localhost:3001/doctors/");
  };
  const fetchNurses = async () => {
    return await Axios.get("http://localhost:3001/api/nurses/");
  };
  const fetchBookedTimes = async () => {
    const temp = date.format("MMMM DD YYYY");
    console.log("pracid",selectedPrac)
    console.log("date q",temp)
    const response =  await Axios.get("http://localhost:3001/appt/bookedAppts/" + selectedPrac + "/" + temp);
    return response.data;
  }

  //post function
  const postAppt = async () => {
    const formattedDate = date.format("MMMM DD YYYY");
    const response = await Axios.post("http://localhost:3001/appt/newAppt", {
      HCN: HCN,
      Date: formattedDate,
      Time: time,
      Prac_id: selectedPrac,
      Rnumber: 100, //need to make this dynamic somehow
      record_id: HCN
    })
    console.log(response);
  }

  //handle click for selecting practitioner
  const selectPrac = (ID, name, type) => {
    console.log(ID, name, type)
    setSelectedPrac(ID);
    setName(name);
    console.log(selectedPrac)
    //on click the available times should not be displayed
    //on click the selected time should be removed
    setAvail(null)
    setTime(null);
  }

  const getAvailTimes = () => {
    //error checking incase they dont select a dr before chooseing a date and clicking view
    if(selectedPrac === null)
      return;
    const times = ["8:00 am","8:30 am","9:00 am","9:30 am","10:00 am","10:30 am",
    "11:00 am","11:30 am","12:00 pm","12:30 pm","1:00 pm","1:30 pm",
    "2:00 pm","2:30 pm","3:00 pm","3:30 pm","4:00 pm","4:30 pm"];
    const bookedTimes = [];
    
    (async () => {
      const response = await fetchBookedTimes();
      response.map((e)=> {
        bookedTimes.push(e.Time);
      })
      console.log("notime", bookedTimes)
      let diff = times.filter(x => !bookedTimes.includes(x));
      setAvail(diff)
    })();

    
  }

  const bookAppointment = () => {
    //check if all selected elements are correct before continuing
    if(HCN === null || HCN.length !== 7 || time === null || date === null || selectedPrac === null) {
      console.log("not booked")
      return
    }

    postAppt();
    setBooked(true);
    console.log("booked appointment:", HCN, time, date.format("MMMM DD YYYY"), selectedPrac)
  }
  //load doctors and nurses on mount
  useEffect(() => {
    
    let temp = [];
    if (!loaded1) {//if doctors havent been loaded yet
      (async () => {
        temp = await fetchDoctors();
        setDoctors(temp.data)
        setLoaded1(true);
      })();
    }
    if (!loaded2) {//if nurses havent been loaded yet
      (async () => {
        temp = await fetchNurses();
        setNurses(temp.data)
        setLoaded2(true);
      })();
    }
  }, [])

  useEffect(() => {
    if(user !== null)
      setHCN(String(user.HCN))
  }, [user])

  useEffect(() => {
    if(selectedPrac && date && time && HCN) {
      setBookable(false)
    } else {
      setBookable(true)
    }
  }, [selectedPrac, date, time, HCN])

  return (
    <div className="bookingBody">

      <div className="pracSelect">
        {/* {loading up all the doctors from the database} */}
        {loaded1 && doctors.map((doctor, index) => 
          <PracButton 
            key={doctor.ID} 
            name={doctor.Name} 
            spec={doctor.Specialization} 
            onClick={() => selectPrac(doctor.ID, doctor.Name, doctor.Specialization)}/>)}

        {/* {loading up all the nurses from the database} */}
        {loaded2 && nurses.map((nurse, index) => 
          <PracButton 
            key={nurse.ID} 
            name={nurse.Name} 
            spec="Check up" 
            onClick={()=> selectPrac(nurse.ID, nurse.Name, "Check up")}/>)}
      </div>
      {<div className="selections"><h1>Selected Prac: {selectedPrac ? name : ""}</h1></div>}
      <div className="datepicker">
        <MobileDatePicker
          disablePast={true}
          label="Select a date" 
          value={date} 
          onChange={(e)=> {setDate(e); setAvail(null)}}/>
        {/* button displays available tiems once a date and dr are selected */}
        <button className="viewTimes" onClick={()=> { getAvailTimes()}}>View Available</button>
      </div>
      
      {/* display available times for that dr and date */}
      {/* These can be replaced with availableBooking component made below but we dont need to dispaly dr date or room since they already have knowledge of that */}
      <div className="timesTitle"><h1>Available Times</h1></div>
      <div className="timeSection">
        <div className="availTimes">
            {avail && avail.map((time,index) => (
              <button className="timeButton" key={time} onClick={()=>setTime(time)}>{time}</button>
            ))}
        </div>
      </div>
      {<div className="selections"><h1>Selected Time: {time && time}</h1></div>}

      {/* only show input when previous inputs have been selected. Not sure if we want to keep this*/}
      
      <form className="subForm" onSubmit={(e)=>{bookAppointment();}}>
        <TextField 
          label="Health Card Number" 
          helperText="Enter a valid 7 digit HCN" 
          value={HCN} 
          onChange={(e)=>{setHCN(e.target.value); console.log(HCN)}} 
          inputProps={{ 
            inputMode: 'number', 
            pattern: '[0-9]{7}' 
        }} />
        <button disabled={bookable} className="book">Book Appointment</button>
      </form>
      
    </div>
  ) 
}

export default Booking
