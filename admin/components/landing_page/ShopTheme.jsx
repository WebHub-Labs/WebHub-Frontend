import axios from "axios";
import React, { useState } from "react";
import logo1 from "../assets/logo1.png";
import {
  Button,
  FormControl,
  InputLabel,
  TextField,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import { useRouter } from "next/router";
function ShopTheme() {
  const [shopName, setShopName] = useState("");
  const [theme, setTheme] = useState("");
  const [email, setEmail] = useState("");

  const router = useRouter();

  const handleChangeTheme = (event) => {
    setTheme(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (shopName != "" && theme != "") {
      axios
        .post("http://localhost:4000/register/shop", {
          shopName,
          theme,
          email,
        })
        .then((res) => {
          console.log(res);

          if (!res.ok) {
            alert(res.data);
            router.push("/shopregister");
          } else {
            console.log(res);
            alert("successfully registered");
            router.push("/register");
          }
        })
        .catch((err) => {
          console.log("la failed bhayo ta");
          alert("failed " + err);
        });
    } else {
      alert("please enter data");
    }
  };

  return (
    <form className="flex w-[98%] mr-0 min-h-[40vh] bg-[white] border-2 border-black translate-y-3 ">
      <div className="flex-auto w-[20%] pt-[5%]">
        <img src={logo1} className="w-[9rem]" />
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
          <TextField
            type="text"
            label="email"
            required={true}
            variant="filled"
            fullWidth={true}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
export default ShopTheme;
