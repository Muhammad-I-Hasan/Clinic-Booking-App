import { useState } from 'react'
import './App.css'
import { DatePicker } from '@mui/x-date-pickers'
import { TimePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs';

function App() {
  var now = dayjs();
  //const [date, setDate] = useState<Dayjs | null>(null);
  const [date, setDate] = useState(now);

  //this is a constan
  const times = ["8:00 AM","8:30 AM","9:00 AM","9:30 AM","10:00 AM","10:30 AM",
                "11:00 AM","11:30 AM","12:00 PM","12:30 PM","1:00 PM","1:30 PM",
                "2:00 PM","2:30 PM","3:00 PM","3:30 PM","4:00 PM","4:30 PM"];

  function getBookedAppointments() {
    //do an sql query using axios
    //Axios.Get();
    //this will query the database given a date and chosen doctor, to show available times for a specific doctor
    //doctor should be chosen before this with the button, get name and do query for prac_id using name
    //then once we get that list of times we can do times-this to get a list of available times
    const tempTimes = ["9:00 AM","9:30 AM","10:00 AM","10:30 AM",
    "11:00 AM","11:30 AM","12:00 PM","12:30 PM","1:00 PM","1:30 PM",
    "2:00 PM","2:30 PM","3:00 PM"];

    let difference = times
    .filter(x => !tempTimes.includes(x))
    .concat(tempTimes.filter(x => !times.includes(x)));
  }

  return (
    <div className="App">
      <div>
    
        <button>Dr 1</button>
        <button>Dr 2</button>
        <button>Dr 3</button>
      </div>
      <DatePicker value={date} onChange={(newValue) => {setDate(newValue); getBookedAppointments}}/>
      {/* <TimePicker /> */}
      {console.log(date.format("DD/MM/YYYY").toString())}
      {times.map((x, i) => {
        return <button key={i}>{x}</button>
      })}
    </div>
  )
}

export default App
