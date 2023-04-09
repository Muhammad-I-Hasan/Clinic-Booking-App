import { useState } from 'react'
import './App.css'
import { DatePicker } from '@mui/x-date-pickers'
import { TimePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs';
import { mobileStepperClasses } from '@mui/material';

function App() {

  // const now = dayjs();
  //const [date, setDate] = useState<Dayjs | null>(null);
  
  const [date, setDate] = useState(null);//date
  const [time, setTime] = useState(null);//date
  const [prac, setPrac] = useState(null);//selected dr
  const [avail, setAvail] = useState([]);//available times

  //this is a constant used to find difference
  const times = ["8:00 AM","8:30 AM","9:00 AM","9:30 AM","10:00 AM","10:30 AM",
                "11:00 AM","11:30 AM","12:00 PM","12:30 PM","1:00 PM","1:30 PM",
                "2:00 PM","2:30 PM","3:00 PM","3:30 PM","4:00 PM","4:30 PM"];

  
  function getBookedAppointments(e) {
    
    console.log("deez")
    console.log(prac)
    console.log("date", date)
    
    //set date
    setDate(e);
    //dont dispaly anything if prac not selected
    if(prac === null)
      return;

    //do an sql query using axios
    //Axios.Get();
    //query db given a dr name to find his id
    //join that with a query for appointments
    //this should return Dr's appointments on that date
    //we then find the difference using the times array to display the available appointments
  
    let bookedAppointments =[];

    //instead of these if statement it would be an axios fetch to get the drs booked times, and saved in here
    if(prac === "Dr 1") {
      bookedAppointments = ["9:00 AM","9:30 AM","10:00 AM","10:30 AM",
      "11:00 AM","11:30 AM","12:00 PM","12:30 PM","1:00 PM","1:30 PM",
      "2:00 PM","2:30 PM","3:00 PM"]; //booked appointments for DR 1
    }
    else if(prac === "Dr 2") {
      bookedAppointments = ["9:00 AM"]; //booked appointments for DR 2
    }
    else if(prac === "Dr 3") {
      bookedAppointments = ["3:00 PM"]; //booked appointments for DR 3
    }
    
    //this sets the available times to the difference between the constant "times" and the queried "bookedAppointments"
    setAvail( 
      times
      .filter(x => !bookedAppointments.includes(x))
      .concat(bookedAppointments.filter(x => !times.includes(x))));
      console.log(avail);
  
  }

  return (
    <div className="App">
      <div>
        <button onClick={(e)=> {setPrac("Dr 1"); setAvail([]); setDate(null)}}>Dr 1</button>
        <button onClick={(e)=> {setPrac("Dr 2"); setAvail([]); setDate(null)}}>Dr 2</button>
        <button onClick={(e)=> {setPrac("Dr 3"); setAvail([]); setDate(null)}}>Dr 3</button>
      </div>

      <DatePicker value={date} onChange={(e) => {console.log("gottem123"); getBookedAppointments(e)}}/>


      {/* this could be a mui list or something instead see link below*/}
      {/* https://mui.com/material-ui/react-list/ */}
      {avail.map((x) => {
        {/* map available appointments Here */}
        return <button key={x} onClick={() => {setTime(x)}}>{x}</button>
      })}
    </div>
  )
}

export default App
