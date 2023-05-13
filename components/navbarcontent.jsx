import React from 'react'

const Navbarcontent = ({navbarcontent}) => {
  return (
    <>
      <li>
                <a
                  href="#"
                  className="block ml-2 mr-3 py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                  aria-current="page"
                >
                  {navbarcontent}
                </a>
              </li>
    </>
  )
}

export default Navbarcontent
