import React, { useState, useEffect } from "react";
import Header from "../components/header";
import "next-cloudinary";
import Modal from "react-modal";
import Table from "../components/table";
import Layout from "../components/layout";

import "flowbite";

const Products = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();
  const [formValues, setFormValues] = useState({
    name: "",
    color: "",
    category: "",
    price: "",
    image: "",
    shop:""
  });

  const { name, color, category, price, image } = formValues;

  const [inputarr, setInputarr] = useState([]);

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
    console.log(data.secure_url);
    setFormValues({ ...formValues, image: data.secure_url });
    setUploadData(data);
    console.log(formValues);
    console.log(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formValues);
    const shop = await JSON.parse(window.localStorage.getItem("response")).data.shops[0];
    console.log(shop)
    const createdProduct = await fetch("/api/ProductsAPI", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...formValues,shop:shop}),
    });

    const data = await createdProduct.json();
    console.log(data);
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value, image: imageSrc });
  }

  function handleOnChange(e) {
    const reader = new FileReader();
    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };

    reader.readAsDataURL(e.target.files[0]);
  }

  async function handleonDelte(ind) {
    const list = [...inputarr];
    list.splice(ind, 1);
    setInputarr(list);
    await fetch("/api/ProductsAPI", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    });
  }

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    displayProducts();
  }, []);

  const [ProductsResult, setProductsResult] = useState([]);
  const displayProducts = async () => {
    try {
      console.log("FETCHING DOCUMENTS");
      const fetchedProduct = await fetch("/api/ProductsAPI").then((res) =>
        res.json()
      );
      console.log("FETCHED DOCUMENTS");
      setProductsResult(fetchedProduct);
      console.log(ProductsResult);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <Header Title="Products" buttonTitle="Add Products" onClick={openModal} />
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
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="eg:clothing"
              >
                Product Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                value={formValues.name}
                name="name"
                onChange={handleChange}
                // placeholder="eg:Clothing"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Category Image"
              >
                Color
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="color"
                type="text"
                value={formValues.color}
                onChange={handleChange}
                // placeholder="eg:Clothing"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Category Image"
              >
                Category
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="category"
                value={formValues.category}
                onChange={handleChange}
                // placeholder="eg:Clothing"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Category Image"
              >
                Price
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                value={formValues.price}
                name="price"
                onChange={handleChange}
                // placeholder="eg:Clothing"
              />
            </div>
            <div className="flex items-end ">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleOnSubmit}
            onChange={handleOnChange}
            method="POST"
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

      <Table />

      <div>
        {ProductsResult.fetchedProduct &&
          ProductsResult.fetchedProduct.length > 0 && (
            <div className="flex-1 ml-72  ">
              <table className="w-auto text-sm text-left text-gray-500 mt-10">
                <tbody>
                  {ProductsResult.fetchedProduct.map((product, ind) => (
                    <>
                      <tr className="bg-white border-b" key={product?.id}>
                        <th scope="col" className="px-7 py-3 ">
                          {product.name}
                        </th>

                        <th scope="col" className="px-7 py-3  ">
                          {product.color}
                        </th>

                        <th scope="col" className="px-7 py-3 ">
                          {product.category}
                        </th>

                        <th scope="col" className="px-7 py-3 ">
                          {product.price}
                        </th>

                        <th scope="col" className="px-7 py-3 ">
                          <button onClick={() => handleonDelte(ind)}>x</button>
                        </th>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          )}
      </div>
    </Layout>
  );
};

export default Products;