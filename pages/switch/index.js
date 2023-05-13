import React, { useState } from "react";
import Router from "next/router";

const Switchit = () => {
  const websiteClick = () => {
    Router.back();
  };
  const dashboardClick = () => {
    Router.push("/dashboard");
  };

  return (
    <div className=" flex  justify-center mt-3 mb-3">
      <label class="relative inline-flex items-center cursor-pointer">
        <span
          class="mr-3 text-sm font-medium text-gray-900  "
          onClick={websiteClick}
        >
          Website
        </span>
      </label>
      <label class="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" value="" class="sr-only peer" />
        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none  dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span
          class="ml-3 text-sm font-medium text-gray-900 "
          onClick={dashboardClick}
        >
          Dashboard
        </span>
      </label>
    </div>
  );
};

export default Switchit;
