import React from "react";
import { useNavigate } from "react-router-dom";

export default function DoctorNavbar() {

  const navigate = useNavigate();

  return (
    <nav className="w-full bg-white shadow-sm border-b">

      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Logo */}

        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer"
        >

          <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold">
            +
          </div>

          <h1 className="text-lg font-semibold text-gray-700">
            MedIntel <span className="text-teal-500">AI</span>
          </h1>

        </div>


        {/* Menu */}

        <ul className="flex items-center gap-8 text-gray-600 text-sm font-medium">

          <li
            onClick={() => navigate("/")}
            className="hover:text-teal-600 cursor-pointer"
          >
            Home
          </li>

          <li
            onClick={() => navigate("/doctor-dashboard")}
            className="hover:text-teal-600 cursor-pointer"
          >
            Dashboard
          </li>

          <li className="hover:text-teal-600 cursor-pointer">
            Help
          </li>

          <li className="hover:text-teal-600 cursor-pointer">
            Contact
          </li>

        </ul>


        {/* Doctor Profile */}

        <div className="flex items-center gap-2 cursor-pointer">

          <img
            src="https://i.pravatar.cc/40?img=12"
            alt="doctor"
            className="w-8 h-8 rounded-full"
          />

          <span className="text-sm text-gray-700 font-medium">
            Dr. Singh
          </span>

          <span className="text-gray-500 text-xs">▼</span>

        </div>

      </div>

    </nav>
  );
}