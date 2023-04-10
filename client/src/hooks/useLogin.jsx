import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

const useLogin = () =>{
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();


  const login = async (healthCard) =>{

    setIsLoading(true);
    setError(null);
    // sessionStorage.setItem("user", JSON.stringify({pog:"poggers"}));

    console.log(
      "CALLED TO: " + `http://localhost:3001/patients/${healthCard}`
    );


    var response = await fetch(
      `http://localhost:3001/patients/${healthCard}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        
      }
    );
    
    var json = await response.json();
    var temp = JSON.stringify(json)

    
    if (response.ok && temp.length === 0){
      console.log("creating new patient")
      response = await fetch(
        `http://localhost:3001/patients`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ healthCard }),
        }
      );
      json = await response.json();
      console.log(json)
    }

    console.log(json)


    if (!response.ok) {
      setIsLoading(false);
      setError(json.message);
      return
  }



    if(response.ok){

        dispatch({ type: "LOGIN", payload: json });
        setIsLoading(false);
        setError(null);
        navigate("/");
    }



    


    
    



    // if (!response.ok) {
    //   setIsLoading(false);
    //   setError(json.message);
    // }

    // if (response.ok) {
    //   localStorage.setItem("user", JSON.stringify(json));
    //   dispatch({ type: "LOGIN", payload: json });
    //   setIsLoading(false);
    //   navigate("/");
    // }
    // console.log("prev Location "  + prevState)
  };
  return { login, error, isLoading };

  
  // const { prevLocation} =  useAuthContext()

  // useEffect(() => {
  //   console.log("previous location:" + prevLocation)
  // })


  // return {dispatch}
}

export default useLogin