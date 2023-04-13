import { Button, Typography, AppBar, Toolbar, IconButton } from "@mui/material"
import HomeIcon from "@mui/icons-material/Home"
import Menu from "./Menu"
import { Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const Topbar = () => {
  const { user, dispatch } = useAuthContext();
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
          <Button disabled={user? false : true} href="/" onClick={()=>{dispatch({type: "LOGOUT"})}} color='inherit' aria-label='user'>{user && "Logout"}</Button>
        </Toolbar>
        
      </AppBar>
      <Outlet />
    </>

  );
}

export default Topbar