import React from "react";
import { useState } from "react";
import Router from "next/router";
import Popup from "../../components/popups";
import Template from "./components/Template";
import Link from "next/link";

const Templates = () => {
  const handleClick = () => {
    Router.push("/switch");
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  return (
    <div class="flex flex-wrap">
      <Link legacyBehavior href="/website/clothings/Theme1">
        <Template
          onClick={openModal}
          handleClick={handleClick}
          themeName="Clothing 1"
        />
      </Link>

      <Link legacyBehavior href="/website/clothings/Theme2">
        <Template
          onClick={openModal}
          handleClick={handleClick}
          themeName="Clothing 2"
        />
      </Link>

      <Link legacyBehavior href="/website/electronic/Theme1">
        <Template
          onClick={openModal}
          handleClick={handleClick}
          themeName="Electronic 1"
        />
      </Link>

      <Template
        onClick={openModal}
        handleClick={handleClick}
        themeName="Electronic 2"
      />
      <Template
        onClick={openModal}
        handleClick={handleClick}
        themeName="Miscellenous 1"
      />
      <Template
        onClick={openModal}
        handleClick={handleClick}
        themeName="Miscellenous 2"
      />

      <Popup
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        imageUrl="/Temp.png"
      />
    </div>
  );
};

export default Templates;
