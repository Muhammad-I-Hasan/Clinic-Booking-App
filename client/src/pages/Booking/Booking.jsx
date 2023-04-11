import PracButton from "../../components/PracButton"
import "./Booking.css"
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs from 'dayjs';
import Axios from "axios"
import { useState, useEffect } from "react"

const Booking = () => {

  const [doctors, setDoctors] = useState([]);
  const [nurses, setNurses] = useState([]);
  const [loaded1, setLoaded1] = useState(false);
  const [loaded2, setLoaded2] = useState(false);

  const [selectedPrac, setSelectedPrac] = useState(null);//selected practitioner
  const [date, setDate] = useState(null);//date
  const [avail, setAvail] = useState([]);//available times
  const times = ["8:00 AM","8:30 AM","9:00 AM","9:30 AM","10:00 AM","10:30 AM",
  "11:00 AM","11:30 AM","12:00 PM","12:30 PM","1:00 PM","1:30 PM",
  "2:00 PM","2:30 PM","3:00 PM","3:30 PM","4:00 PM","4:30 PM"];

  //fetch functions
  const fetchDoctors = async () => {
    return await Axios.get("http://localhost:3001/doctors/");
  };
  const fetchNurses = async () => {
    return await Axios.get("http://localhost:3001/api/nurses/");
  };
  

  //handle click for practitioner
  const selectPrac = (ID, name, type) => {
    console.log(ID, name, type)
    setSelectedPrac(ID);
  }

  //handle click for date
  const selectDate = (e) => {
    setDate(e);
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
    <div>
      <div>Selected Prac: {selectedPrac}</div>
      <div>Selected Date: {date}</div>
      <button onClick={()=>{console.log(doctors)}}>Test</button>
      <div className="pracSelect">
          {/* {loading up all the doctors from the database} */}
          {loaded1 && doctors.map((doctor, index) => 
          <PracButton key={doctor.ID} name={doctor.Name} spec={doctor.Specialization} onClick={()=> selectPrac(doctor.ID, doctor.Name, doctor.Specialization)}/>)}
          {/* {loading up all the nurses from the database} */}
          {loaded2 && nurses.map((nurse, index) => 
          <PracButton key={nurse.ID} name={nurse.Name} spec="Check up" onClick={()=> selectPrac(nurse.ID, nurse.Name, "Check up")}/>)}
      </div>
      <div className="datepicker">
           <MobileDatePicker value={date} onChange={(e)=> {selectDate(e)}} />
      </div>
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