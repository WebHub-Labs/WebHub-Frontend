import Header from "../../components/header";
import Cards from "../../components/card";

import Link from "next/link";
import { useState } from "react";
import Modal from "react-modal";
import Layout from "@/components/layout";
import Top from "../../components/Top";

const Dashford = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [webname, setWebname] = useState({
    name: "",
  });
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "file"
    );

    const formData = new FormData();

    for (const file of fileInput.files) {
      formData.append("file", file);
    }

    formData.append("upload_preset", "my-uploads");

    const data = await fetch(
      "https://api.cloudinary.com/v1_1/dir7pptxd/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());

    setImageSrc(data.secure_url);
    setUploadData(data);
    console.log(data);
  };

  const handleOnChange = async (e) => {
    const reader = new FileReader();
    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  function HandleChange(e) {
    const { name, value } = e.target;
    setWebname({ ...webname, [name]: value });
  }

  const HandleSubmit = async (e) => {
    e.preventDefault();

    alert("Your Web name is saved as " + webname);
    const createdProduct = await fetch("/api/DetailsAPI", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(webname),
    });

    const data = await createdProduct.json();
    console.log(data);
  };

  return (
    <Top>
      <Layout>
        <Link legacyBehavior href="/website">
          {/* <a target="_blank"> */}
          <Header Title="Date" buttonTitle="Go to your website" />
          {/* </a> */}
        </Link>

        <div className="flex  space-x-20 ">
          <Cards Title="Revenue" SubTitle="Rs. 0" p="Last from tuesday" />
          <Cards Title="Orders" SubTitle="0" p="Last from tuesday" />
        </div>

        <Cards
          Title="Website Details"
          p="Click Here"
          name="->"
          onClick={openModal}
        />

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          ariaHideApp={false}
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
          <button onClick={closeModal} className="flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div className="w-fit m-auto">
            <form
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
              onSubmit={HandleSubmit}
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="eg:clothing"
                >
                  Website Name (to be appear as logo)
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="name"
                  value={webname.name}
                  onChange={HandleChange}
                />
              </div>

              <div className="flex items-end ">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  value="Submit"
                >
                  Save
                </button>
              </div>
            </form>
            <form
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
              onSubmit={handleOnSubmit}
              onChange={handleOnChange}
              method="post"
            >
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="Category Image"
                ></label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="file"
                  name="file"
                />
                <img src={imageSrc} />

                {imageSrc && !uploadData && (
                  <p>
                    <button>Upload Files</button>
                  </p>
                )}

                {uploadData && (
                  <code>
                    <pre>{JSON.stringify(uploadData, null, 2)}</pre>
                  </code>
                )}
              </div>
            </form>
          </div>
        </Modal>
        {/* <div className="flex mt-10 "> */}
        {/* {image && <img src={image} style={{ width: "100px" }} />} */}
        {/* </div> */}
      </Layout>
    </Top>
  );
};

export default Dashford;
