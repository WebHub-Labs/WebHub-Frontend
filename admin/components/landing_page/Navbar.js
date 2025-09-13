import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src="/logo.png" alt="logo1" />

      <div className="links">
        <Link href="/login">
          <button type="button">Login</button>
        </Link>
        <Link href="/signup">
          <button type="button"> Get Started</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
