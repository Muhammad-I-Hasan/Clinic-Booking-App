import {Box, TextField} from "@mui/material"
import { useState } from "react" 
const Home = () => {

    
  const [num, setNum] = useState();
  const limitChar = 7;
  const handleChange = (e) => {
    // if (e.target.value.toString().includes("+") || e.target.value.toString().includes("-") || e.target.value.toString().includes("e") || e.target.value.toString().includes(".")) {
    //   setNum
    //   return;
    // }
    if (e.target.value.toString().length <= limitChar) {
      setNum(e.target.value);
    }
  };

  return (
    <Box component="form">
      <TextField
        type="number"
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        onChange={(e) => handleChange(e)}
        defaultValue={num}
        value={num}
        inputProps={{pattern: '[0-9]*'}}
      />
    </Box>
  );
    
}

export default Home