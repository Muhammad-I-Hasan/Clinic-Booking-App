import { Button, Typography, AppBar, Toolbar, IconButton } from "@mui/material"
import HomeIcon from "@mui/icons-material/Home"
import Menu from "./Menu"
import { Outlet } from "react-router-dom";

const Topbar = () => {

  return (
    <>
      <AppBar position="sticky" style={{ background: '#2E3B55' }}>
        <Toolbar>
          <Menu /> {/*Custom menu component*/}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Taffy's Clinic
          </Typography>
          <IconButton href="/" color='inherit' aria-label='logo'>
            <HomeIcon fontSize="large"/>
          </IconButton> 
        </Toolbar>
      </AppBar>
      <Outlet />
    </>

  );
}

export default Topbar