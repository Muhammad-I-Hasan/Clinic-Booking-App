import { Box, Typography, AppBar, Toolbar } from "@mui/material"
import Menu from "./Menu"

const Topbar = () => {

    return (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Menu /> {/*Custom menu component*/}
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Taffy's Clinic
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
      );
}
  
export default Topbar