import React from "react";
import Link from "next/link";

const Cards = (props) => {
  return (
    <div className="flex ml-72 mt-10  " onClick={props.onClick}>
      <div className="flex-1 w-auto">
        <Link
          href="#"
          className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 "
        >
          <h4 className="font-normal text-gray-700">{props.Title}</h4>
          <h5 className="mb-3 text-2xl font-bold tracking-tight text-gray-900 ">
            {props.SubTitle}
          </h5>
          <p className="font-normal text-gray-500">{props.p}</p>
          <buttons onClick={props.onClick} name={props.name} />
        </Link>
      </div>

      {/* <div className="flex-1 w-auto">
        <Link
          href="#"
          className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 "
        >
          <h4 className="font-normal text-gray-700">Revenue</h4>
          <h5 className="mb-3 text-2xl font-bold tracking-tight text-gray-900 ">
            RS.0{" "}
          </h5>
          <p className="font-normal text-gray-500">Last from Date</p>
        </Link>
      </div>
      <div className="flex-1 w-auto">
        <Link
          href="#"
          className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 "
        >
          <h4 className="font-normal text-gray-700 ">Orders</h4>
          <h5 className="mb-3 text-2xl font-bold tracking-tight text-gray-900 ">
            0{" "}
          </h5>
          <p className="font-normal text-gray-500">Last from Date</p>
        </Link>
      </div> */}
    </div>
  );
};

export default Cards;
