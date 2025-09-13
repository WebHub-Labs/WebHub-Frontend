import React from "react";
import Header from "../components/header";
import "flowbite";
import Layout from "../components/layout";
import Modal from "react-modal";

const Categories = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Layout>
      <Header
        Title="Categories"
        buttonTitle="Add Categories"
        onClick={openModal}
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            width: "100%",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.75)",
          },
          content: {
            width: "40%",
            height: "40%",
            margin: "auto",
            position: "absolute",

            border: "1px solid #ccc",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: "20px",
          },
        }}
      >
        <button onClick={closeModal} classNameName="flex-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            classNameName="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div classNameName="w-fit m-auto">
          <form classNameName="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div classNameName="mb-4">
              <label
                classNameName="block text-gray-700 text-sm font-bold mb-2"
                for="eg:clothing"
              >
                Category Name
              </label>
              <input
                classNameName="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="eg:Clothing"
              />
            </div>
            <div classNameName="mb-6">
              <label
                classNameName="block text-gray-700 text-sm font-bold mb-2"
                for="Category Image"
              >
                Category Image
              </label>
            </div>
            <div classNameName="flex items-end ">
              <button
                classNameName="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </Layout>
  );
};

export default Categories;
