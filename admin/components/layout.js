import Navbar from "./navbar";
import SideMenu from "./sidemenu";

const Layout = ({ children }) => {
  return (
    <>
      <main>{children}</main>
    </>
  );
};

export default Layout;
