import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import { useLocation, useNavigate } from "react-router"
const useSignUp = () =>{

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(null)
  const [error, setError] = useState(null)
  const {dispatch} = useAuthContext()
  const location = useLocation()
  const prev = location.state?.prevLocation ? location.state?.prevLocation: "/"



  const signUp = async (HCN, Name, Phone, Address) =>{
    setIsLoading(false)
    setError("")

    const response = await fetch(
      `http://localhost:3001/patients/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ HCN, Name, Phone, Address }),
      }
    );


    const json = await response.json();
    console.log(json)
    if (!response.ok) {
      setIsLoading(false);
      setError(json.message);
    }

    if (response.ok) {
      console.log('hello')
      // sessionStorage.setItem("user", JSON.stringify(json[0]));
      dispatch({ type: "LOGIN", payload: json[0] });
      setIsLoading(false);
      console.log("navigating to + " + prev)
      navigate("/");
    }

  }

  return {isLoading, error, signUp}
}

export default useSignUp