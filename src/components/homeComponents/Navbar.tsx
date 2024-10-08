"use client"
import Link from "next/link";
import React, { useState } from "react";
import { logout } from "@/app/login/action";
import Image from "next/image";

const NavbarComponent: React.FC = () => {
  const [active, setActive] = useState<number>(0);

  const handleLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    logout();
  };

  return (
    <div className="bg-white h-20 px-4 md:px-10 flex flex-col md:flex-row items-center justify-between shadow-lg border backdrop-blur-md z-50 shadow-md ">
      {/* Logo */}
      <div className="flex items-center">
        <Image
          src="/logo-coding-connect.png"
          alt="Logo"
          height={50}
          width={150}
          className="object-contain"
        />
      </div>

      {/* Input Pencarian */}
      <div className="flex w-full md:w-1/2 mt-4 md:mt-0">
        <input
          type="text"
          placeholder="Search User?"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Navigasi */}
      <div className="flex mt-4 md:mt-0 space-x-4 md:space-x-8">
        <Link href={"/"}>
          <span className="cursor-pointer transition-all hover:text-blue-600">
            Home
          </span>
        </Link>
        <Link href={"/profile"}>
          <span className="cursor-pointer transition-all hover:text-blue-600">
            Profile
          </span>
        </Link>
        <button
          onClick={handleLogout}
          className="cursor-pointer transition-all hover:text-red-500 text-red-400"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default NavbarComponent;
