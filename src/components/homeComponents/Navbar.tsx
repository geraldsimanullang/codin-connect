"use client";
import Link from "next/link";
import React, { useState } from "react";
import { logout } from "@/app/login/action";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Search from "./search";

const NavbarComponent: React.FC = () => {
  const router = useRouter();

  const handleLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    logout();
  };

  return (
    <div className="bg-white h-20 px-4 md:px-10 flex flex-col md:flex-row items-center justify-between shadow-lg border backdrop-blur-md z-50 shadow-md">
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

      {/* Search Component */}
      <Search />

      {/* Navigation */}
      <div className="flex mt-4 md:mt-0 space-x-4 md:space-x-8">
        <Link href="/">
          <span className="cursor-pointer transition-all hover:text-blue-600">
            Home
          </span>
        </Link>
        <Link href="/profile">
          <span className="cursor-pointer transition-all hover:text-blue-600">
            Profile
          </span>
        </Link>
        <Link href="/create-challenge">
          <span className="cursor-pointer transition-all hover:text-blue-600">
            + Add Challenge
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
