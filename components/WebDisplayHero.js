import React from "react";

const WebDisplayHero = ({ imageData }) => {
  return (
    <div>
      <img src={imageData} alt="uploaded image" />
    </div>
  );
};

export default WebDisplayHero;
