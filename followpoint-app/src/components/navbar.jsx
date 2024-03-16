"use client";

import { useState } from "react";
import Link from "next/link";

//? masih optional ingfokan mau sidebar atau navbar + styling blm fix msh kasar

export default function DropdownSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="menu-icon" onClick={toggleSidebar}>
        &#9776;
      </div>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <Link href={"/"}>
          <label className="sidebar-item" onClick={toggleSidebar}>
            Events
          </label>
        </Link>
        <Link href={"/login"}>
          <label className="sidebar-item" onClick={toggleSidebar}>
            Login
          </label>
        </Link>
        <Link href={"/user/tickets"}>
          <label className="sidebar-item" onClick={toggleSidebar}>
            Tickets
          </label>
        </Link>
      </div>
      <style jsx>{`
        .menu-icon {
          font-size: 30px;
          cursor: pointer;
          position: absolute;
          top: 20px;
          left: 20px;
          z-index: 2;
          color: #f6bd43;
        }
        .sidebar {
          background-color: rgba(27, 29, 34, 1);
          padding: 2rem 1rem;
          height: 100vh;
          width: 250px;
          position: fixed;
          z-index: 1;
          top: 0;
          left: -250px;
          overflow-x: hidden;
          transition: left 0.5s;
          display: flex;
          flex-direction: column;
          align-items: start;
        }
        .sidebar.open {
          left: 0;
        }
        .sidebar-item {
          color: #f6bd43;
          font-size: 18px;
          transition: color 0.3s ease;
          cursor: pointer;
          margin: 0 0 0 20px;
          text-decoration: none;
        }
        .sidebar-item:hover {
          color: #ffffff;
        }
      `}</style>
    </>
  );
}
