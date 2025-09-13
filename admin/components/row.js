import React from "react";

const Row = (props) => {
  return (
    <div className="flex-1 ml-72">
      <tbody>
        <tr className="bg-white border-b ">
          <th scope="row" className="px-6 py-4 ">
            {props.name}
          </th>
          <td className="px-6 py-4">Silver</td>
        </tr>
        <tr className="bg-white border-b 0">
          <th scope="row" className="px-6 py-4  ">
            {props.color}
          </th>
          <td className="px-6 py-4">White</td>
        </tr>
      </tbody>
    </div>
  );
};

export default Row;
