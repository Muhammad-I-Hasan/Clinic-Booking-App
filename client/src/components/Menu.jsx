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
          <Typography variant='h6' component='div'>
            Menu
          </Typography>
        </Box>
        <Button href="/">Home</Button>
        <Button href="/booking">Book an Appointment</Button>
        <Button href="/manage">Manage an Appointment</Button>
      </Drawer>
    </>
  ) 
}
  
export default Menu