
import './App.css'
import Home from "./pages/Home"
import Booking from "./pages/Booking/Booking"
import Manage from "./pages/Manage"
import { Routes, Route } from "react-router-dom";
import Topbar from "./components/Topbar"
function App() {

  return (
    
      <div className='App'>
        <Topbar />
        
        <Routes>  
          <Route path="/" element={<Home />}/>
          <Route path="/booking" element={<Booking />}/>
          <Route path="/manage" element={<Manage />}/>
          <Route path="*" element={<h1>Error 404 Not Found</h1>}/>
        </Routes>
      </div>
     
  )
}

export default App

