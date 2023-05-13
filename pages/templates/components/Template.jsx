import React from 'react'
import Image from "next/image";

const Template = ({onClick,handleClick,themeName}) => {
  
  return (
    <div class="md:w-1/2 lg:w-1/3 py-5 px-4" onClick={onClick}>
        <div class=" ">
          <a href="#">
            <div class="bg-white relative shadow p-2 rounded-lg text-gray-800 hover:shadow-lg scrollable-content overflow-y-auto ">
              <Image
                src="/Temp.png"
                class="object-cover  h-96 rounded-lg w-full"
                width="1440"
                height="3708"
              />
              <div class="flex justify-center">{themeName}</div>
              <div class="py-2 px-2">
                <div class=" font-bold font-title text-center"></div>
              </div>
              <div class="flex justify-center">
                <button
                  type="button"
                  class="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm m-auto px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={handleClick}
                >
                  Update Dashfoard
                  <svg
                    aria-hidden="true"
                    class="w-3 h-3 ml-2 -mr-1 "
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
                </button>
              </div>
            </div>
          </a>
        </div>
      </div>
  )
}

export default Template
