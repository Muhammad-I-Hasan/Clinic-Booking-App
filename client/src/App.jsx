
import './App.css'
import Home from "./pages/Home"
import { Routes, Route } from "react-router-dom";
import Menu from "./components/Menu"
function App() {

  return (
      // <Routes>
      //   <Route path="/" element={<Home />}/>
      //   {/* <Route path="/book" element={<Booking />}/>
      //   <Route path="/manage" element={<Manage />}/>
      //   <Route path="/doctors" element={<DoctorView />}/> */}
      // </Routes>
      <div className="deez"><Menu /></div>
      
  )
}

export default App

