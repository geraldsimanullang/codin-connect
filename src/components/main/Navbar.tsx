import Image from "next/image";
import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="w-full h-[65px] fixed top-0  bg-white backdrop-blur-md z-50 shadow-md">
      <div className="w-full h-full flex flex-row items-center justify-between m-auto px-[10px]">
        <Image src="/logo.jpg" alt="logo" width={100} height={50} />

        <div className="w-[500px] h-full flex flex-row items-center justify-end md:mr-20">
          <Link
            href="/about-me"
            className="cursor-pointer text-gray-800 mx-5 my-5 font-semibold bg-gray-100 rounded-full px-4 py-2"
          >
            About me
          </Link>
          <Link
            href="/"
            className="cursor-pointer text-gray-800 mx-5 my-5 font-semibold bg-gray-100 rounded-full px-4 py-2"
          >
            Home
          </Link>
          <Link
            href="/contact"
            className="cursor-pointer text-gray-800 mx-5 my-5 font-semibold bg-gray-100 rounded-full px-4 py-2"
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
