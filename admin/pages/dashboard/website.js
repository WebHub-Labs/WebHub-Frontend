import React, { useEffect } from "react";
import { useState } from "react";
import WebNavbar from "../components/WebNavbar";
import WebFooter from "../components/WebFooter";
import WebProducts from "../components/WebProducts";

const Website = () => {
  const [DetailsResult, setDetailsResult] = useState([]);

  const displayDetails = async () => {
    try {
      console.log("FETCHING DOCUMENTS");
      const fetchedDetails = await fetch("/api/DetailsAPI").then((res) =>
        res.json()
      );
      console.log("FETCHED DOCUMENTS");
      setDetailsResult(fetchedDetails);
      console.log(DetailsResult);
    } catch (error) {
      console.log(error);
    }
  };
  displayDetails();

  return (
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
      />
      <WebProducts />
              
      <WebFooter />
    </div>
  );
};

export default Website;
