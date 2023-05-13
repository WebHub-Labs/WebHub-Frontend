import Link from "next/link";

const SideMenu = () => (
  <div className="  flex  bg-gray-100">
    <div className="flex flex-col w-56 fixed bg-white r-3xl overflow-hidden">
      <div className="inline-flex items-center justify-left px-10 h-12 shadow-md">
        <h1 className="text-sm text-gray-500">Main Links</h1>
      </div>
      <ul className="flex flex-col py-4">
        <li>
          <Link
            href="/"
            className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
          >
            <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
              <i className="bx bx-home"></i>
            </span>
            <span className="text-sm font-medium">Home</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/products"
            className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
          >
            <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
              <i className="bx bx-music"></i>
            </span>
            <span className="text-sm font-medium">Products</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/categories"
            className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
          >
            <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
              <i className="bx bx-drink"></i>
            </span>
            <span className="text-sm font-medium">Categories</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/store"
            className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
          >
            <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
              <i className="bx bx-shopping-bag"></i>
            </span>
            <span className="text-sm font-medium">Store Users</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/orders"
            className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
          >
            <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
              <i className="bx bx-chat"></i>
            </span>
            <span className="text-sm font-medium">Orders</span>
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default SideMenu;
