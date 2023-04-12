const ApptInfo = (props) => {

return (
  <div className="apptInfoContainer">
    
    <h2>Time: {props.Time}</h2>
    <h2>Date: {props.Date}</h2>
    
    <h3>HCN: {props.HCN}</h3>
    <h3>Practitioner: {props.Name}</h3>
    <h3>Department: {props.Dep ? props.Dep : "Check up"}</h3>
    <button className="cancelButton" onClick={props.onClick}>Cancel Appointment</button>

  </div>
)
}

export default ApptInfo
