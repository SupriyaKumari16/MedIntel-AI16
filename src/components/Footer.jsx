import React from "react";
import { FaPhoneAlt, FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative w-full bg-[#1f2a44] text-white overflow-hidden">

      {/* ✅ BACKGROUND TEXT */}
      <h1 className="absolute inset-0 flex items-center justify-center 
        text-[90px] sm:text-[140px] md:text-[180px] lg:text-[240px] 
        font-bold text-white opacity-[0.04] tracking-widest
        pointer-events-none select-none">
        MedIntelAI
      </h1>

      {/* ✅ CONTENT */}
      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-16 py-12">
        
        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
          
          {/* 1 */}
          <div>
            <h2 className="text-xl font-semibold mb-4">MedIntelAI</h2>
            <p className="text-sm text-gray-300 mb-4">
              It was popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages.
            </p>

            <div className="text-sm text-gray-300 space-y-2">
              <p>📧 info@websitename.com</p>
              <p>📍 1378 Whitefall Fisco, 75034</p>
            </div>
          </div>

          {/* 2 */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>About Us</li>
              <li>Our Services</li>
              <li>Testimonials</li>
              <li>Our Blogs</li>
              <li>Contact Us</li>
            </ul>
          </div>

          {/* 3 */}
          <div>
            <h3 className="font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Terms of Use</li>
              <li>Privacy Policy</li>
              <li>Contact Support</li>
              <li>Careers</li>
            </ul>
          </div>

          {/* 4 */}
          <div>
            <h3 className="font-semibold mb-4">Book An Appointment</h3>
            <p className="text-sm text-gray-300 mb-4">
              The doctorate staff members are well trained professionals.
            </p>

            <button className="flex items-center gap-2 border border-gray-400 px-4 py-2 rounded-md hover:bg-white hover:text-black transition">
              <FaPhoneAlt />
              Call : +012 345 6789
            </button>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="border-t border-gray-600 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-300">
          
          <p className="text-center md:text-left">
            All Rights Reserved © Company 2023 | Terms & Conditions | Privacy Policy
          </p>

          <div className="flex gap-4">
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-[#2f5fb3]">
              <FaFacebookF />
            </span>
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-[#2f5fb3]">
              <FaTwitter />
            </span>
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-[#2f5fb3]">
              <FaInstagram />
            </span>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;