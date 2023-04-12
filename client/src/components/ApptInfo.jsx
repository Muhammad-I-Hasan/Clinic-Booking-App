const ApptInfo = (props) => {

return (
  <div className="patientBookingContainer">

    <h3>Time: {props.Time}</h3>
    <h5>Date: {props.Date}</h5>
    
    <p>HCN: {props.HCN}</p>
    <p>Name: {props.Name}</p>
    <p>Room: {props.Room}</p>


  </div>
)
}

export default ApptInfo



// return (
//     <div className="apptContainer">
//       <h2>{props.Date}</h2>
//       <h2>{props.Time}</h2>
//       <h2>{props.HCN}</h2>
//     </div>
//   ) 