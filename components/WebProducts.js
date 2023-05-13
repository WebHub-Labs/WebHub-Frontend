import React from "react";
import { useState, useEffect } from "react";

const WebProducts = () => {
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
    <div className="flex flex-wrap justify-center">
         
      {ProductsResult.fetchedProduct &&
        ProductsResult.fetchedProduct.length > 0 && (
          <div class="max-w-auto justify-center ">
            <div class=" ">
              {ProductsResult.fetchedProduct.map((product) => (
                <div
                  key={product._id}
                  className="w-60 inline-block justify-center bg-white border ml-3 mt-2 border-gray-200 px-3"
                >
                  <a href="#">
                    <img
                      class="flex justify-center rounded-t-lg"
                      src=""
                      alt="Uploaded Image"
                    />
                  </a>
                  <div class="p-5 ">
                    <a href="#">
                      <h5 class="mb-2 text-2xl font-bold tracking-tight">
                        {product.name}
                      </h5>
                    </a>

                    <p class="mb-3 font-normal ">Color : {product.color}</p>
                    <p class="mb-3 font-normal ">
                      Category : {product.category}
                    </p>
                    <p class="mb-3 font-normal ">Price : {product.price}</p>

                    <a
                      href="#"
                      class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg"
                    >
                      Read more
                      <svg
                        aria-hidden="true"
                        class="w-4 h-4 ml-2 -mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
    </div>
  );
};

export default WebProducts;
