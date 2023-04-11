import PracButton from "../../components/PracButton"
import "./Booking.css"
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { TextField } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import Axios from "axios"
import { useState, useEffect } from "react"

const Booking = () => {

  const [doctors, setDoctors] = useState([]);
  const [nurses, setNurses] = useState([]);
  const [loaded1, setLoaded1] = useState(false);
  const [loaded2, setLoaded2] = useState(false);
  const [avail, setAvail] = useState([]);//show available times for selected date and practitioner

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
    const response =  await Axios.get("http://localhost:3001/api/bookedAppts/" + selectedPrac + "/" + temp);
    return response.data;
  }

  //post function
  const postAppt = async () => {
    const formattedDate = date.format("MMMM DD YYYY");
    const response = await Axios.post("http://localhost:3001/api/newAppt", {
      HCN: HCN,
      Date: formattedDate,
      Time: time,
      Prac_id: selectedPrac,
      Rnumber: 100 //need to make this dynamic somehow
    })
    console.log(response);
  }

  //handle click for selecting practitioner
  const selectPrac = (ID, name, type) => {
    console.log(ID, name, type)
    setSelectedPrac(ID);
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


  return (
    <div className="bookingBody">
      {/* temporary for displaying info */}
      {selectedPrac && <div>Selected Prac: {selectedPrac}</div>}
      {date && <div>Selected Date: {date.format("MMMM DD YYYY")}</div>}
      {time && <div>Selected Time: {time}</div>}

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

      <div className="datepicker">
        <MobileDatePicker 
          value={date} 
          onChange={(e)=> {setDate(e); setAvail(null)}}/>
        {/* button displays available tiems once a date and dr are selected */}
        <button className="viewTimes" onClick={()=> { getAvailTimes()}}>View Available</button>
      </div>
      
      {/* display available times for that dr and date */}
      {/* These can be replaced with availableBooking component made below but we dont need to dispaly dr date or room since they already have knowledge of that */}
      <div className="availTimes">
            {avail && avail.map((time,index) => (
              <button className="deez" key={time} onClick={()=>setTime(time)}>{time}</button>
            ))}
      </div>

      {/* only show input when previous inputs have been selected. Not sure if we want to keep this*/}
      {(date && time) && 
      <form className="subForm" onSubmit={()=>{bookAppointment();}}>
        <TextField 
          label="Health Card Number" 
          helperText="Enter a valid 7 digit HCN" 
          value={HCN} 
          onChange={(e)=>{setHCN(e.target.value); console.log(HCN)}} 
          inputProps={{ 
            inputMode: 'number', 
            pattern: '[0-9]{7}' 
        }} />
        <button className="book">Book Appointment</button>
      </form>}
      {/* <button onClick={()=>console.log(avail)}>button</button> */}
    </div>
  ) 
}

// const AvailableBooking = () =>{
//   return (

//     <div className="availableBookingContainer">
//         <h3>Date: </h3>
//         <h4> Doctor: </h4>
//         <h5>Room: </h5>
//     </div>

//   )
// }


export default Booking

// return (
//   <div className="booking">
//     <div className="bookingContainer"> 
    
//       <div className="pracSelect">
//         <PracButton name="Dr one one" speciality="foot specialist"/>
//         <PracButton name="Dr two two" speciality="toe specialist"/>
//         <PracButton name="Dr three three" speciality="fungus specialist"/>
//         <PracButton name="Dr four four" speciality="general practitioner"/>
//       </div>

//       <div className="datepicker">
//           <MobileDatePicker defaultValue={dayjs('2022-04-17')} />
//       </div>

//       <div className="availableBookings">
//       <AvailableBooking/>

//       </div>

//     </div>
//   </div>
// ) 