
import './App.css'
import Home from "./pages/Home"
import Booking from "./pages/Booking"
import Manage from "./pages/Manage"
import { Routes, Route } from "react-router-dom";
import Menu from "./components/Menu"
import Topbar from "./components/Topbar"
function App() {

  return (
      // <div className='App'>
      //   <Menu />
        
      //   <Routes>  
      //     <Route path="/" element={<Home />}/>
      //     <Route path="/booking" element={<Booking />}/>
      //     <Route path="/manage" element={<Manage />}/>
      //     <Route path="*" element={<h1>Error 404 Not Found</h1>}/>
      //   </Routes>
      // </div>
      <Topbar />
  )
}

export default App

