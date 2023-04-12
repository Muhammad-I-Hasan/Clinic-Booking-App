import { useState, useEffect } from "react";
import {useAuthContext} from "../../hooks/useAuthContext"
import Axios from "axios"
import ApptInfo from "../../components/ApptInfo";
import "./Manage.css"

const Manage = () => {
  
  const [appts, setAppts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { user } = useAuthContext();
  //appointment with a dr
  const fetchPatientApptsWDR = async () => {
    return await Axios.get("http://localhost:3001/patients/appts/dr/" + user.HCN)
  }
  const fetchPatientApptsWNR = async () => {
    return await Axios.get("http://localhost:3001/patients/appts/nr/" + user.HCN)
  }
  
  const cancelAppt = async (Time, Date, HCN, Prac_ID) => {
    const response = await Axios.delete("http://localhost:3001/patients/appt", {
      data: {
        Time: Time,
        Date: Date,
        HCN: HCN,
        Prac_ID: Prac_ID
      }
    })
    console.log(response);
  }
  const handleCancelAppt = (Time, Date, HCN, Prac_ID) => {
    console.log(Time, Date, HCN, Prac_ID)
    cancelAppt(Time, Date, HCN, Prac_ID);
  }

  useEffect(()=> {
    console.log("useeff", user);
    if (user !== null) {
      (async () => {
        const temp = await fetchPatientApptsWDR();
        const temp2 = await fetchPatientApptsWNR();
        setAppts([...temp.data,...temp2.data]);
        //setAppts()
        setLoaded(true)
      })();
      // (async () => {
      //   const temp = await fetchPatientApptsWNR();
      //   setAppts(appts.push(...await temp.data));
      //   setLoaded(true)
      // })();
    }
  }, [user])

  return (
    <div>
      <div>Patient Name: {user && user.Name}</div>
      <div>Patient HCN: {user && user.HCN}</div>
      <div className="apptBody">
        <div className="apptSelect">
          {loaded && appts.map((appt) => 
            <ApptInfo 
              key={appt.Prac_ID} 
              Time={appt.Time} 
              Date={appt.Date} 
              HCN={appt.HCN} 
              Name={appt.Name} 
              RNumber={appt.RNumber}
              onClick={()=>handleCancelAppt(appt.Time, appt.Date, appt.HCN, appt.Prac_ID)} 
              />)}
             
        </div>
      </div>
      
    </div>
  ) 
}

export default Manage