
import './App.css'
import Home from "./pages/Home"
import Booking from "./pages/Booking/Booking"
import Login from './pages/Login/Login'
import SignUp from "./pages/SignUp/SignUp"
import Manage from "./pages/Manage/Manage"
import { Routes, Route } from "react-router-dom";
import Topbar from "./components/Topbar"
import DoctorView from './pages/DoctorView/DoctorView'
function App() {

  return (

    <div className='App'>
      <Routes>
        <Route element={<Topbar />}>



          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/manage" element={<Manage />} />
        </Route>
        <Route path="/doctorview" element={<DoctorView/>}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<h1>Error 404 Not Found</h1>} />
      </Routes>
    </div>

  )
}

export default App

