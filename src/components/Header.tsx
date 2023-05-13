import React from "react";
import { FaHome } from "react-icons/fa";
import { MdMovie, MdTv } from "react-icons/md";
import image from "../assets/download.jpg";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="sticky top-0 flex items-center justify-around gap-2 lg:gap-8 py-2 text-white bg-header z-[100000] lg:text-[1.3rem]">
      <Link to="/">
        <h1 className="text-red-600 text-[1rem] lg:text[1.2rem] font-extrabold tracking-wide cursor-pointer">
          Entertain Me
        </h1>
      </Link>

      <div className="flex items-center justify-center gap-6 lg:gap-12 ">
        <Link to="/" className="hover:text-red-500">
          <FaHome />
        </Link>
        <Link to="/movies" className="hover:text-red-500">
          <MdMovie />
        </Link>
        <Link to="/tv" className="hover:text-red-500">
          <MdTv />
        </Link>
      </div>

      <img
        src={image}
        alt=""
        className="border border-red-500 w-[50px] h-[50px] rounded-[50%] object-cover p-0"
      />
    </div>
  );
};

export default Header;
