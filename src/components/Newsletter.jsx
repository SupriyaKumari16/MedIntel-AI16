import React, { memo } from "react";
import { useNavigate } from "react-router-dom";

const Newsletter = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full bg-gradient-to-r from-[#2f5fb3] via-[#3b74c8] to-[#58b7b3] text-white py-12 px-4 sm:px-8 lg:px-16 overflow-hidden">
      
      {/* BACKGROUND ELEMENTS */}
      {/* Teal Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#58b7b3] rounded-full filter blur-[100px] opacity-30 pointer-events-none" />
      
      {/* Blue Glow */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#2f5fb3] rounded-full filter blur-[100px] opacity-40 pointer-events-none" />
      
      {/* Watermark Logo */}
      <div className="absolute right-10 bottom-0 text-[180px] font-bold text-white/5 select-none pointer-events-none font-sans leading-none hidden lg:block">
        MI
      </div>

      <div className="relative z-10 w-full flex flex-col lg:flex-row items-center justify-between gap-8">
        
        {/* LEFT TEXT */}
        <div className="text-center lg:text-left max-w-xl">
          {/* Small Badge */}
          <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium tracking-wide mb-3 border border-white/20">
            <span>✔</span> Trusted AI Healthcare Platform
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight flex flex-col">
            <span className="flex items-center justify-center lg:justify-start gap-2 mb-1">
              {/* AI Healthcare Icon */}
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Ready to Experience
            </span>
            <span>Smarter Healthcare?</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-white/90 font-light leading-relaxed">
            Experience AI-powered medical analysis, upload reports, connect with experienced doctors and receive intelligent healthcare guidance.
          </p>
        </div>

        {/* RIGHT BUTTONS */}
        <div className="w-full flex justify-center lg:justify-end">
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center justify-center lg:justify-end">
            
            {/* Primary Button */}
            <button
              onClick={() => navigate("/appointment")}
              className="w-full sm:w-auto animate-pulse bg-white text-[#2f5fb3] font-semibold px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 whitespace-nowrap text-lg"
            >
              Book Appointment
            </button>

            {/* Secondary Button */}
            <button
              onClick={() => navigate("/report")}
              className="w-full sm:w-auto bg-transparent text-white border-2 border-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:bg-white/10 transition-all duration-300 transform hover:scale-105 whitespace-nowrap text-lg"
            >
              Start AI Analysis
            </button>

          </div>
        </div>

      </div>
    </section>
  );
};

export default memo(Newsletter);