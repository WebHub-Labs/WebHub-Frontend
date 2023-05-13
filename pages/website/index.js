import React, { useEffect } from "react";
import { useState } from "react";
import WebNavbar from "../../components/WebNavbar";
import WebFooter from "../../components/WebFooter";
import WebProducts from "../../components/WebProducts";
import Top from "../../components/Top";

const Website = () => {
  const [DetailsResult, setDetailsResult] = useState([]);

  const displayDetails = async () => {
    try {
      const fetchedDetails = await fetch("/api/DetailsAPI")
        .find()
        .sort({ _id: -1 })
        .limit(1)
        .exec.then((res) => res.json());

      console.log("FETCHED DOCUMENTS");
      setDetailsResult(fetchedDetails);
      console.log(DetailsResult);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    displayDetails();
  }, []);

  return (
    <Top>
      <div>
        <WebNavbar
          Webname={
            DetailsResult.fetchedDetails &&
            DetailsResult.fetchedDetails.length > 0 && (
              <ul>
                                    
                {DetailsResult.fetchedDetails.map((detail) => (
                  <li key={detail._id}>
                                          <p>{detail.name}</p>
                                                               
                  </li>
                ))}
                                
              </ul>
            )
          }
          navbarcontent={["Home", "Contact", "About Us"]}
          color="gray"
        />
        <img
          class="   object-contain m-auto"
          src="http://res.cloudinary.com/dir7pptxd/image/upload/v1683798799/my-uploads/zmvz0hrglchvp5xuyntb.png"
          alt="Uploaded Image"
        />
        <WebProducts />
                
        <WebFooter />
      </div>
    </Top>
  );
};

export default Website;
