import PracButton from "../../components/PracButton"
import "./Booking.css"
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import Axios from "axios"
import { useState, useEffect } from "react"

const Booking = () => {

  const [doctors, setDoctors] = useState([]);
  const [nurses, setNurses] = useState([]);
  const [loaded1, setLoaded1] = useState(false);
  const [loaded2, setLoaded2] = useState(false);

  const [selectedPrac, setSelectedPrac] = useState(null);//selected practitioner
  const [date, setDate] = useState(dayjs());//selected date
  const [avail, setAvail] = useState([]);//show available times for selected date and practitioner

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

  //handle click for practitioner
  const selectPrac = (ID, name, type) => {
    console.log(ID, name, type)
    setSelectedPrac(ID);
    console.log(selectedPrac)
    
  }

  const getAvailTimes = () => {
    console.log("called getAvial")
    const times = ["8:00 am","8:30 am","9:00 am","9:30 am","10:00 am","10:30 am",
    "11:00 am","11:30 am","12:00 pm","12:30 pm","1:00 pm","1:30 pm",
    "2:00 pm","2:30 pm","3:00 pm","3:30 pm","4:00 pm","4:30 pm"];
    const notimes = []
    console.log(times);
    
    (async () => {
      const bookedTimes = await fetchBookedTimes();
      bookedTimes.map((e)=> {
        notimes.push(e.Time);
      })
      console.log("notime", notimes)
      
    })();

    
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
      {selectedPrac && <div>Selected Prac: {selectedPrac}</div>}
      {date && <div>Selected Date: {date.format("MMMM DD YYYY")}</div>}
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
        <MobileDatePicker value={date} onChange={(e)=> {setDate(e)}} />
        <button className="thingy" onClick={()=> {console.log("date on button press:", date.format("MMMM DD YYYY")); getAvailTimes()}}>View Available</button>
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