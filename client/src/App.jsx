import { useState } from 'react'
import './App.css'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs';

function App() {
  var now = dayjs();
  //const [date, setDate] = useState<Dayjs | null>(null);
  const [date, setDate] = useState(now);
  return (
    <div className="App">
      <DatePicker value={date} onChange={(newValue) => setDate(newValue)}/>
      
      {console.log(date.format("DD/MM/YYYY").toString())}
    </div>
  )
}

export default App
