import React, { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  TextField,
  Select,
  MenuItem,
  Box,
} from "@mui/material";

function ThemeForm(props) {
  const [shopName, setShopName] = useState("");
  const [theme, setTheme] = useState("");

  const handleChangeTheme = (event) => {
    setTheme(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (shopName != "" && theme != "") {
      props.onSubmit(shopName, theme);
    } else {
      alert("please enter data");
    }
  };
  const clicked = (e) => {
    e.preventDefault();
    props.onClicked(true);
  };

  return (
    <form className="flex w-[98%] mr-0 min-h-[40vh] bg-[white] border-2 border-black translate-y-3 ">
      <Button variant="text" className={`w-[1rem] h-8`} onClick={clicked}>
        <img src="/back.gif" />
      </Button>
      <div className="flex-auto w-[20%] pt-[5%]">
        <img src="/logo1.png" className="w-[9rem]" />
      </div>
      <div className="flex-auto w-[70%] pt-[5%] pr-[10%]">
        <h1 className="font-mono font-bold text-xl text-[#4d4d4d]">
          Details and Informations
        </h1>
        <h4 className="font-mono font-medium text-lg text-[#919191]">
          some informations.
        </h4>
        <div className="grid gap-2 ">
          <TextField
            type="text"
            label="shop name"
            required={true}
            variant="filled"
            fullWidth={true}
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
          />
          <Box sx={{ width: "100%" }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Theme</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={theme}
                label="Theme"
                onChange={handleChangeTheme}
              >
                <MenuItem value={"Clothing Store"}>Clothing Store</MenuItem>
                <MenuItem value={"Gadget"}>Gadget Store</MenuItem>
                <MenuItem value={"Pharma"}>Pharmacy</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Button
            variant="contained"
            className="w-[20%] h-[2rem] ml-auto"
            onClick={handleSubmit}
          >
            next
          </Button>
        </div>
      </div>
    </form>
  );
}
export default ThemeForm;
