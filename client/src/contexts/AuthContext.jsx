import { createContext, useReducer, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

//sample user is
// name
// health card
// dob
// age?

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      sessionStorage.setItem("user", JSON.stringify(action.payload));
      return { user: action.payload };
    case "LOGOUT":
      sessionStorage.removeItem("user");
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, { user: null });
  const navigate = useNavigate();
  const location = useLocation();



  useEffect(() => {



    // console.log("current path " + location.pathname)
    const user = JSON.parse(sessionStorage.getItem("user"));

    if (user) {
      console.log("dispatching")
      dispatch({ type: "LOGIN", payload: user });
    } else {
      if (location.pathname != "/") {
        if (location.pathname == "/login") {
          // sessionStorage.setItem("prevLocation", JSON.stringify(location.pathname));
          navigate("/login", {state: {prevLocation: location.pathname}});
          
        }
        if (location.pathname == "/signup") {
          navigate("/signup", {state: {prevLocation: location.pathname == "/signUp" || location.pathname == "/login" ? "/": location.pathname}})
        }
        if (location.pathname == "/doctorview"){
          navigate("/doctorview", {state: {prevLocation: location.pathname == "/doctorview" ? "/": location.pathname}})
        }

        else {
          navigate("/login" , {state: {prevLocation: location.pathname == "/login" || location.pathname == "/signUp" ? "/": location.pathname}})
        }
      }

    }

    // const user = JSON.parse(localStorage.getItem("user"));
    // if (user) {
    //   dispatch({ type: "LOGIN", payload: user });
    // } else {
    //   //go to login page if user is not logged in
    //   if (location.pathname == "/login") {
    //     navigate("/login");
    //   } else if (location.pathname == "/signup") {
    //     navigate("/signup");
    //   } else if (location.pathname == "/") {
    //     navigate("/login");
    //   }
    // }
  }, [dispatch, navigate]);

  console.log("Auth context state: ", authState);
  //console.log("user: ", user);
  return (
    <AuthContext.Provider value={{ ...authState, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
