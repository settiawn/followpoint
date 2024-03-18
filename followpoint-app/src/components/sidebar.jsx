"use client";

import { useState } from "react";
import Link from "next/link";

export default function DropdownSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="relative z-30">
        <button onClick={toggleSidebar} className="text-3xl text-yellow-400">
          &#9776;
        </button>
      </div>
      <div
        className={`fixed top-0 left-0 h-full w-64 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-20 sidebar-gradient`}
      >
        <img src="/Logo_Concept_3_nobg.png" alt="logo" className="p-4" />
        <div className="flex flex-col items-start p-4">
          <Link href="/">
            <div
              className="text-yellow-400 text-lg mb-4 hover:text-white"
              onClick={toggleSidebar}
            >
              Events
            </div>
          </Link>
          <Link href="/login">
            <div
              className="text-yellow-400 text-lg mb-4 hover:text-white"
              onClick={toggleSidebar}
            >
              Login
            </div>
          </Link>
          <Link href="/user/tickets">
            <div
              className="text-yellow-400 text-lg mb-4 hover:text-white"
              onClick={toggleSidebar}
            >
              Tickets
            </div>
          </Link>
        </div>
      </div>
      <style jsx>{`
        .sidebar-gradient {
          background: linear-gradient(
            to right,
            rgba(27, 29, 34, 1),
            rgba(35, 40, 45, 1)
          );
        }
      `}</style>
    </>
  );
}
