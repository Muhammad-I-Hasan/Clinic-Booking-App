import { Button, Typography, AppBar, Toolbar } from "@mui/material"

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
          <Button href="/" color="inherit">Home</Button>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>

  );
}

export default Topbar