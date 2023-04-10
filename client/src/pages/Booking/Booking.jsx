import PracButton from "../../components/PracButton"
import "./Booking.css"
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs from 'dayjs';


const Booking = () => {
  

    return (
      <div className="booking">
        <div className="bookingContainer"> 
        
          <div className="pracSelect">
            <PracButton name="Dr one one" speciality="foot specialist"/>
            <PracButton name="Dr two two" speciality="toe specialist"/>
            <PracButton name="Dr three three" speciality="fungus specialist"/>
            <PracButton name="Dr four four" speciality="general practitioner"/>
          </div>

          <div className="datepicker">
              <MobileDatePicker defaultValue={dayjs('2022-04-17')} />
          </div>

          <div className="availableBookings">
          <AvailableBooking/>

          </div>

        </div>
      </div>
    ) 
}

const AvailableBooking = () =>{
  return (

    <div className="availableBookingContainer">
        <h3>Date: </h3>
        <h4> Doctor: </h4>
        <h5>Room: </h5>
    </div>

  )
}


export default Booking