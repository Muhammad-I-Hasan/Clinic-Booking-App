const ApptInfo = (props) => {

return (
  <div className="apptInfoContainer">
    
    <h2>Time: {props.Time}</h2>
    <h2>Date: {props.Date}</h2>
    
    <h4>HCN: {props.HCN}</h4>
    <h4>Practitioner: {props.Name}</h4>
    <h4>Department: {props.Dep ? props.Dep : "Check up"}</h4>
    <h4>Room Number: {props.RNumber}</h4>
    <button onClick={props.onClick}className="cancelAppt">Cancel Appointment</button>

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