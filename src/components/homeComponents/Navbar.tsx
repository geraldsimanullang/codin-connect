"use client"
import Link from "next/link";
import React, { useState } from "react";
import { logout } from "@/app/login/action";
import Image from "next/image";
import { useRouter } from "next/navigation";

const NavbarComponent: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    if (!searchQuery) {
      setError("Please enter a username to search.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/user?username=${searchQuery}`);
      const data = await res.json();

      if (res.status === 200 && data.data) {
        router.push(`/profile/${data.data.username}`);
      } else {
        setError(data.message || "User not found.");
      }
    } catch (err) {
      console.error("Failed to fetch user:", err);
      setError("An error occurred while searching for the user.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    logout();
  };

  return (
    <div className="bg-white h-20 px-4 md:px-10 flex flex-col md:flex-row items-center justify-between shadow-lg border backdrop-blur-md z-50 shadow-md">
      {/* Logo */}
      <div className="flex items-center mb-4 md:mb-0">
        <Image
          src="/logo-coding-connect.png"
          alt="Logo"
          height={50}
          width={150}
          className="object-contain"
        />
      </div>

      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className="flex flex-grow items-center w-full md:w-1/2 mb-4 md:mb-0 md:mr-4"
      >
        <input
          type="text"
          placeholder="Search User?"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className={`ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ${
            loading ? "opacity-50" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* Navigation */}
      <div className="flex space-x-4 md:space-x-8 items-center">
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
