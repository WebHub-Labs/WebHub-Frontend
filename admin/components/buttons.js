import React, { use, useState } from "react";

const Buttons = ({ name }) => {
  const [Enable, setEnable] = useState(false);

  const onClickEnable = () => {
    setEnable(!Enable);
  };

  return (
    <>
      <button
        className={`bg-transparent text-black hover:bg-[#D9ACF5] text-200 font-md hover:text-white py-1 px-2 border border-bg-[#D9ACF5] hover:border-transparent rounded ${
          Enable === true ? "bg-transparent" : "bg-[#D9ACF5] text-white font-md"
        }`}
        onClick={onClickEnable}
      >
        {name}
      </button>
    </>
  );
};

export default Buttons;
