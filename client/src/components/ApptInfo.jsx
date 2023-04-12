const ApptInfo = (props) => {

return (
  <div className="apptInfoContainer">

    <h2>Time: {props.Time}</h2>
    <h2>Date: {props.Date}</h2>
    
    <p>HCN: {props.HCN}</p>
    <p>Practitioner: {props.Name}</p>
    <p>Room Number: {props.RNumber}</p>


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