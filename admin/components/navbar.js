import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-[#E8CDF9] p-6 shadow-md sticky top-0">
      <div className="logo font-semibold text-xl text-white tracking-tight">
        <Image
          priority={true}
          className="h-9"
          src="/logo.png"
          alt="logo-dashford"
          width="100"
          height="100"
        ></Image>
      </div>
      <div className="contents"></div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-white-200 border-white-400 hover:text-white hover:border-white">
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>

      <div className="relative ml-3">
        <div>
          <button
            id="dropdownDefaultButton"
            data-dropdown-toggle="dropdown"
            type="button"
            className="flex px-2 py-1 rounded-full focus:ring-1 focus:ring-white hover:bg-white"
            aria-expanded="false"
            aria-haspopup="true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <h1 className="flex px-2">Profile</h1>
          </button>

          <div
            id="dropdown"
            className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-30"
          >
            <ul
              className="py-2 text-sm text-gray-700 "
              aria-labelledby="dropdownDefaultButton"
            >
              <li>
                <Link href="#" className="block px-4 py-2 hover:bg-gray-100 ">
                  Settings
                </Link>
              </li>
              <li>
                <Link href="#" className="block px-4 py-2 hover:bg-gray-100 ">
                  Sign out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
