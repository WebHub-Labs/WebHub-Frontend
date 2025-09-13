import React, { useState } from "react";
import { Button, TextField } from "@mui/material";

function Form(props) {
  const [val1, setVal1] = useState("");
  const [val2, setVal2] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (val1 != "" && val2 != "") {
      props.onSubmit(props.name1, val1, props.name2, val2);
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
        <img src='/back.gif' />
      </Button>
      <div className="flex-auto w-[20%] pt-[5%]">
        <img src='/logo1.png' className="w-[7rem]" />
      </div>
      <div className="flex-auto w-[70%] pt-[5%] pr-[10%]">
        <h1 className="font-mono font-bold text-xl text-[#4d4d4d]">
          {props.title}
        </h1>
        <h4 className="font-mono font-medium text-lg text-[#919191]">
          {props.subtitle}
        </h4>
        <div className="grid gap-2 ">
          <TextField
            type={props.type1}
            label={props.value1}
            variant="filled"
            fullWidth={true}
            value={val1}
            onChange={(e) => setVal1(e.target.value)}
            required={true}
          />
          <TextField
            type={props.type2}
            label={props.value2}
            variant="filled"
            fullWidth={true}
            value={val2}
            onChange={(e) => setVal2(e.target.value)}
            required={true}
          />
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
export default Form;
