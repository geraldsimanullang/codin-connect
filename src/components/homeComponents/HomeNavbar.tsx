"use client"
import React, { useState } from "react";
import Image from "next/image";
const Navigation = () => {
  const Menus = [
    { name: "Dashboard" },
    { name: "Profile" },
    { name: "Logout" },
  ];

  const [active, setActive] = useState(0);

  return (
    <div className="bg-white h-18 px-4 flex items-center shadow-md">
      <Image
          src="/logo-coding-connect.png"
          alt="logo"
          height={50}
          width={150} 
          className="object-contain h-full m-0 p-0" 
        />
      <ul className="flex justify-end w-full">
        {Menus.map((menu, i) => (
          <li key={i} className="w-20 flex justify-center">
            <a
              className="flex flex-col text-center p-5 cursor-pointer px-4"
              onClick={() => setActive(i)}
            >
              <span
                className={`${
                  active === i
                    ? "duration-700 opacity-100 font-bold"
                    : "opacity-40"
                }`}
              >
                {menu.name}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navigation;
