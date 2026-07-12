import React from "react";
import { useNavigate } from "react-router-dom";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

const Footer = () => {
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-teal-900 via-slate-900 to-[#0f172a] text-white border-t border-teal-900/40">
      
      {/* LARGE BACKGROUND TEXT */}
      <div 
        className="absolute inset-0 flex items-center justify-center text-[80px] sm:text-[130px] md:text-[180px] lg:text-[240px] font-extrabold opacity-[0.06] tracking-widest pointer-events-none select-none whitespace-nowrap z-0 font-sans"
      >
        MedIntelAI
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-20 pb-10">
        
        {/* MAIN GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-16 border-b border-slate-800/80">
          
          {/* SECTION 1: ABOUT */}
          <div className="flex flex-col space-y-5">
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span className="text-teal-400 drop-shadow-[0_0_15px_rgba(45,212,191,0.3)]">🛡</span> MedIntel AI
            </h2>
            <p className="text-slate-400 leading-relaxed text-[14px] font-normal">
              MedIntel AI is an intelligent healthcare platform designed to help patients with AI-powered medical analysis, medical report evaluation, doctor consultation and smarter healthcare decisions.
            </p>
          </div>

          {/* SECTION 2: QUICK LINKS */}
          <div className="flex flex-col space-y-5 lg:pl-8">
            <h3 className="text-sm font-semibold tracking-wider text-teal-400 uppercase">
              Quick Links
            </h3>
            <ul className="space-y-3 text-[14px]">
              {[
                { label: "Home", id: "home" },
                { label: "About", id: "about" },
                { label: "Services", id: "services" },
                { label: "Doctors", id: "doctors" },
                { label: "Support", id: "support" }
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-slate-400 hover:text-white transition-colors duration-300 ease-in-out font-medium flex items-center group bg-transparent border-none p-0 cursor-pointer"
                  >
                    <span className="w-0 h-[1.5px] bg-teal-400 mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* SECTION 3: PATIENT SERVICES */}
          <div className="flex flex-col space-y-5">
            <h3 className="text-sm font-semibold tracking-wider text-teal-400 uppercase">
              Patient Services
            </h3>
            <ul className="space-y-3 text-[14px]">
              {[
                { label: "Book Appointment", path: "/appointment" },
                { label: "AI Health Analysis", path: "/report" },
                { label: "Upload Medical Report", path: "/upload-report" },
                { label: "My Appointments", path: "/my-appointments" }
              ].map((service) => (
                <li key={service.path}>
                  <button
                    onClick={() => navigate(service.path)}
                    className="text-slate-400 hover:text-white transition-colors duration-300 ease-in-out font-medium flex items-center group bg-transparent border-none p-0 cursor-pointer text-left"
                  >
                    <span className="w-0 h-[1.5px] bg-teal-400 mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                    {service.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* SECTION 4: CONTACT & SOCIALS */}
          <div className="flex flex-col space-y-5">
            <h3 className="text-sm font-semibold tracking-wider text-teal-400 uppercase">
              Contact
            </h3>
            <div className="space-y-3.5 text-[14px] text-slate-400">
              <a 
                href="mailto:sjha0885@gmail.com" 
                className="flex items-center gap-3 hover:text-white transition-colors group"
              >
                <MdEmail className="text-teal-500 group-hover:text-teal-400 text-lg flex-shrink-0 transition-colors" />
                <span className="truncate">sjha0885@gmail.com</span>
              </a>
              <a 
                href="tel:+919572546087" 
                className="flex items-center gap-3 hover:text-white transition-colors group"
              >
                <MdPhone className="text-teal-500 group-hover:text-teal-400 text-lg flex-shrink-0 transition-colors" />
                <span>+91 9572546087</span>
              </a>
              <div className="flex items-start gap-3">
                <MdLocationOn className="text-teal-500 text-lg mt-0.5 flex-shrink-0" />
                <span>Greater Noida, India</span>
              </div>
            </div>

            {/* SOCIAL ICON PLATFORMS */}
            <div className="flex gap-3.5 pt-2">
              <a
                href="https://github.com/SupriyaKumari16"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-10 h-10 rounded-xl bg-slate-800/60 backdrop-blur-md border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-teal-400 hover:border-teal-500/50 hover:bg-teal-950/30 transition-all duration-300 group shadow-lg"
              >
                <FaGithub className="text-lg group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a
                href="https://www.linkedin.com/in/supriya-kumari-9257aa281"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-xl bg-slate-800/60 backdrop-blur-md border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-teal-400 hover:border-teal-500/50 hover:bg-teal-950/30 transition-all duration-300 group shadow-lg"
              >
                <FaLinkedin className="text-lg group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a
                href="mailto:sjha0885@gmail.com"
                aria-label="Email"
                className="w-10 h-10 rounded-xl bg-slate-800/60 backdrop-blur-md border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-teal-400 hover:border-teal-500/50 hover:bg-teal-950/30 transition-all duration-300 group shadow-lg"
              >
                <FaEnvelope className="text-lg group-hover:scale-110 transition-transform duration-300" />
              </a>
            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-500 text-[13px] font-medium">
          <p className="text-center sm:text-left">
            &copy; 2026 MedIntel AI. All Rights Reserved.
          </p>
          <p className="text-center sm:text-right flex items-center gap-1">
            Built with <span className="text-red-500 animate-pulse text-sm">❤️</span> by{" "}
            <a 
              href="https://www.linkedin.com/in/supriya-kumari-9257aa281"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-400 hover:text-teal-300 transition-colors font-semibold"
            >
              Supriya Kumari
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;