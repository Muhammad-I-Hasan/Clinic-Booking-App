import { Box, Typography, AppBar, Toolbar } from "@mui/material"
import Menu from "./Menu"
import { Outlet } from "react-router-dom";

const Topbar = () => {

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Menu /> {/*Custom menu component*/}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Taffy's Clinic
          </Typography>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>

  );
}

export default Topbar