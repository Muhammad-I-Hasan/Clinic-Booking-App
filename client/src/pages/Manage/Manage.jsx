import { useState, useEffect } from "react";
import {useAuthContext} from "../../hooks/useAuthContext"
import Axios from "axios"
import ApptInfo from "../../components/ApptInfo";

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
      {loaded && appts.map((appt, index) => 
          <button key={index}>{appt.Date}</button>)}
      <button onClick={()=> {console.log(appts);}}>Hello</button>
      <ApptInfo />
    </div>
  ) 
}

export default Manage