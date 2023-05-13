import React from "react";

const WebHerocontainer = () => {
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
    <div>
      {ProductsResult.fetchedProduct &&
        ProductsResult.fetchedProduct.length > 0 && (
          <div class="max-w-sm bg-white border ml-3 mt-2 border-gray-200 rounded-lg shadow ">
            {ProductsResult.fetchedProduct.map((product) => (
              <div key={product._id} className="">
                <a href="#">
                  <img
                    class="rounded-t-lg"
                    src="https://res.cloudinary.com/dir7pptxd/image/upload/v1683721840/my-uploads/rv236ue1lujnh76apzfe.png"
                    alt="Uploaded Image"
                  />
                </a>
              </div>
            ))}
          </div>
        )}
    </div>
  );
};

export default WebHerocontainer;
