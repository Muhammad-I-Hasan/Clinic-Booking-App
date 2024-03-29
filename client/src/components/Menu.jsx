import { Drawer, Box, Typography, IconButton, Button } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { useState } from "react";

const Menu = () => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton size='large' edge='start' color='inherit' aria-label='logo' onClick={() => setIsOpen(true)}>
        <MenuIcon />
      </IconButton>
    
      <Drawer anchor='left' open={isOpen} onClose={() => setIsOpen(false)}>
        <Box p={2} width='250px' textAlign='center'>
          <Typography style={{ fontSize: "3em" }}variant='h6' component='div'>
            Menu
          </Typography>
        </Box>
        <Button style={{ color: '#2E3B55', fontSize: "1em"  }} href="/">Home</Button>
        <Button style={{ color: '#2E3B55', fontSize: "1em" }} href="/booking">Book An Appointment</Button>
        <Button style={{ color: '#2E3B55', fontSize: "1em" }} href="/manage">Manage Your Appointments</Button>
        <Button style={{ color: '#2E3B55', fontSize: "1em" }} href="/doctorview">For Doctors</Button>
      </Drawer>
    </>
  ) 
}
  
export default Menu