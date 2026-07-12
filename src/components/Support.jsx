import React, { useState, useEffect } from "react";
import { FiSend, FiMail, FiUser } from "react-icons/fi";
import { useForm } from "@formspree/react";

const Support = () => {
  const [state, handleSubmit] = useForm("mwvgepjy");
const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
  if (state.succeeded) {
    setShowSuccess(true);

    const timer = setTimeout(() => {
      setShowSuccess(false);

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    }, 5000);

    return () => clearTimeout(timer);
  }
}, [state.succeeded]);

  return (
    <section id="support" className="py-24 px-4 sm:px-8 lg:px-16 xl:px-24 bg-gradient-to-br from-teal-50 via-white to-teal-100">

      {/* FULL WIDTH (edge to edge feel) */}
      <div className="w-full grid lg:grid-cols-2 gap-12 items-center">

        {/* LEFT TEXT */}
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Talk to <br />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-600">
              Medical Experts
            </span>
          </h2>

          <p className="mt-4 text-gray-600 max-w-md text-sm sm:text-base">
            No bots, no automated replies — connect directly with healthcare professionals for real guidance and care.
          </p>

          <div className="mt-6 text-gray-700 space-y-2 text-sm sm:text-base">
            <p><strong>Email:</strong> support@medintelai.com</p>
            <p><strong>Phone:</strong> +91 98765 43210</p>
            <p><strong>Address:</strong> Greater Noida, India</p>
          </div>
        </div>

        {/* RIGHT FORM CARD */}
        <form
        
          onSubmit={handleSubmit}
          className="relative p-6 sm:p-8 rounded-2xl bg-white border border-teal-200 
          shadow-[0_20px_60px_rgba(0,0,0,0.15)] 
          hover:shadow-[0_25px_80px_rgba(0,0,0,0.2)] 
          transition-all duration-300 w-full"
        >
          
          <input
  type="hidden"
  name="_subject"
  value="MedIntel AI - New Support Request"
/>
          {showSuccess && (
  <div className="mb-5 rounded-lg bg-green-100 border border-green-300 text-green-700 py-3 text-center font-semibold">
    ✅ Support Request Sent Successfully
  </div>
)}

          {/* EMAIL */}
          <div className="relative mb-4">
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-200 
              focus:ring-2 focus:ring-teal-400 outline-none shadow-inner text-sm sm:text-base"
            />
          </div>

          {/* NAME */}
          <div className="relative mb-4">
            <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              name="name"
              placeholder="Patient Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-200 
              focus:ring-2 focus:ring-teal-400 outline-none shadow-inner text-sm sm:text-base"
            />
          </div>

          {/* SUBJECT */}
          <input
            type="text"
            name="subject"
            placeholder="Concern / Subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 mb-4 rounded-md border border-gray-200 
            focus:ring-2 focus:ring-teal-400 outline-none shadow-inner text-sm sm:text-base"
          />

          {/* MESSAGE */}
          <div className="relative">
            <textarea
              name="message"
              placeholder="Describe your symptoms, concerns, or health-related query..."
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full h-52 sm:h-56 md:h-60 px-4 py-3 rounded-md border border-gray-200 
              focus:ring-2 focus:ring-teal-400 outline-none resize-none shadow-inner text-sm sm:text-base"
            />

            {/* 🔥 BUTTON FIXED (touch bottom edge) */}
            <button
              type="submit"
              disabled={state.submitting}
              className="absolute bottom-1 right-2 sm:bottom-2 sm:right-3 
              px-5 sm:px-6 py-2 rounded-md 
              bg-gradient-to-r from-teal-500 to-cyan-600 text-white 
              flex items-center gap-2 
              shadow-[0_10px_30px_rgba(0,150,136,0.4)]
              hover:scale-105 hover:shadow-[0_15px_40px_rgba(0,150,136,0.5)] 
              transition text-sm sm:text-base"
            >
              <FiSend />
              {state.submitting ? "Sending..." : "Send"}
            </button>
          </div>

        </form>

      </div>
    </section>
  );
};

export default Support;