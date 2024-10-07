import Image from "next/image";
import React from "react";
import Link from "next/link";
// import logo from ""

const NavbarLanding = () => {
  return (
    <div className="w-full h-[65px] fixed top-0 bg-white backdrop-blur-md z-50 shadow-md">
      <div className="w-full h-full flex flex-row items-center justify-between m-auto px-[10px]">
        <Image
          src="/logo-coding-connect.png"
          alt="logo"
          height={50} // Atur tinggi logo agar sesuai dengan navbar
          width={150} // Atur lebar logo agar sesuai dengan navbar
          className="object-contain h-full m-0 p-0"
        />

        <div className=" h-full flex flex-row items-center justify-end md:mr-8 gap-3">
          <Link
            href="login"
            className="cursor-pointer text-gray-800 font-semibold bg-gray-100 rounded-full px-4 py-2"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="cursor-pointer text-white font-semibold bg-blue-500 rounded-full px-4 py-2"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavbarLanding;
