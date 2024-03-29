import { useState } from "react";


export default function useDoctorData  ()  {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const login = async (id, setState) => {

    setIsLoading(true);
    setError(null);

    console.log(
      "CALLED TO: " + `http://localhost:3001/doctors/${id}/appointments`
    );


    const response = await fetch(
      `http://localhost:3001/doctors/${id}/appointments`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },

      }
    );
    const json = await response.json();
    if (json.length === 0) {
      setIsLoading(false);
      // setError("Enter Valid ID");
      setState([])
    }
    if (!response.ok) {
      setIsLoading(false);
      setError(json.message);
      setState([])

    }
    if(response.ok && json.length !== 0){
      setError();
      setState(json)
      // console.log(json[0])
    }
    
  }

  const submitComment = async (time, date, id,hcn,comment) => {
    const data = {
      Time: time,
      Date:date,
      Prac_ID:id,
      HCN:hcn,
      Comment:comment
    }
    
    console.log (  "CALLED TO: " + `http://localhost:3001/doctors/appointments/`)
    const response = await fetch(
      `http://localhost:3001/doctors/appointments`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      }
    );



    const resData = await response.json();
    // console.log(resData)
  }

  const removeAppointment = async (time, date, id,hcn) =>{
    const data = {
      Time:time,
      Date:date,
      Prac_ID:id,
      HCN:hcn,
    }

    console.log (  "CALLED TO: " + `http://localhost:3001/doctors/appointments/`)
    const response = await fetch(
      `http://localhost:3001/doctors/appointments`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      }
    );
    const resData = await response.json();


  }

  return { error, isLoading, login, submitComment, removeAppointment }

}
