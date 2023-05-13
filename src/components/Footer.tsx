import React from "react";
import logo from "../assets/TMDB.png";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <div className="text-white flex flex-col gap-3 justify-center items-center bg-header
     p-4  w-[100%] absolute bottom-0 lg:static">
      <p className="">Powered by</p>
      <img src={logo} alt="" width="50px" height="30px" />
      <p>Developed by Dev Lolly &copy; {year}. </p>
    </div>
  );
};

export default Footer;
