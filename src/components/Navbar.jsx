import React, { useState, memo } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

 function Navbar() {
  const [active, setActive] = useState("Home");
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");

    window.location.reload();
  };

  const navItems = [
    { name: "Home", id: "home", type: "scroll" },
    { name: "Upload Report", path: "/upload-report", type: "route" },
    { name: "Prescription", path: "/prescription", type: "route" },
    {
      name: "My Appointments",
      path: "/my-appointments",
      type: "route",
    },
    { name: "Doctors", id: "doctors", type: "scroll" },
    { name: "Support", id: "support", type: "scroll" },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);

    if (!element) return;

    if (window.lenis) {
      window.lenis.scrollTo(element, {
        offset: -100,
      });
    } else {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const handleNav = (item) => {
    setActive(item.name);
    setOpen(false);

    if (item.type === "route") {
      navigate(item.path);
      return;
    }

    if (location.pathname !== "/") {
      navigate("/");

      setTimeout(() => {
        scrollToSection(item.id);
      }, 300);
    } else {
      scrollToSection(item.id);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full flex justify-center z-50 px-2 pt-3">
      <nav className="bg-white/80 backdrop-blur-md w-full max-w-[1400px] rounded-full shadow-md px-4 md:px-8 lg:px-14 py-3 flex items-center justify-between">
        <h1
          onClick={() => handleNav(navItems[0])}
          className="text-xl md:text-2xl font-bold cursor-pointer"
        >
          Med
          <span className="text-teal-500">
            Intel
          </span>
        </h1>

        <ul className="hidden md:flex gap-5 lg:gap-8 font-extrabold tracking-widest font-serif">
          {navItems.map((item) => (
            <li
              key={item.name}
              onClick={() => handleNav(item)}
              className={`cursor-pointer px-3 lg:px-4 py-1.5 rounded-full transition text-xs lg:text-sm whitespace-nowrap ${
                active === item.name
                  ? "bg-teal-400 text-white shadow-lg"
                  : "hover:text-teal-500"
              }`}
            >
              {item.name}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden lg:block font-semibold text-gray-700">
                Hi, {user.name}
              </span>

              <button
                onClick={handleLogout}
                className="hidden sm:block bg-red-500 text-white px-4 lg:px-6 py-2 rounded-full font-semibold hover:bg-red-600 text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/auth")}
              className="hidden sm:block bg-teal-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-teal-600"
            >
              Login
            </button>
          )}

          <div className="md:hidden">
            {open ? (
              <X
                size={28}
                onClick={() => setOpen(false)}
                className="cursor-pointer"
              />
            ) : (
              <Menu
                size={28}
                onClick={() => setOpen(true)}
                className="cursor-pointer"
              />
            )}
          </div>
        </div>
      </nav>

      {open && (
        <div className="absolute top-20 w-[90%] bg-white rounded-2xl shadow-lg py-6 flex flex-col items-center gap-6 md:hidden">
          {navItems.map((item) => (
            <p
              key={item.name}
              onClick={() => handleNav(item)}
              className={`text-lg font-semibold cursor-pointer ${
                active === item.name
                  ? "text-teal-500"
                  : ""
              }`}
            >
              {item.name}
            </p>
          ))}

          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-6 py-2 rounded-full"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/auth")}
              className="bg-teal-500 text-white px-6 py-2 rounded-full"
            >
              Login
            </button>
          )}
        </div>
      )}
    </div>
  );
}
export default memo(Navbar);