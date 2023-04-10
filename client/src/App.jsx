
import './App.css'
import Home from "./pages/Home"
import Booking from "./pages/Booking"
import Manage from "./pages/Manage"
import { Routes, Route } from "react-router-dom";
import Menu from "./components/Menu"
function App() {

  return (
      <div className='App'>
        <Menu />
        
        <Routes>  
          <Route path="/" element={<Home />}/>
          <Route path="/booking" element={<Booking />}/>
          <Route path="/manage" element={<Manage />}/>
        </Routes>
      </div>
  )
}

export default App

