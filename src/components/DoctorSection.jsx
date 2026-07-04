import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { textReveal } from "../utils/animations";

export default function DoctorSection() {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const modalRef = useRef(null);
  const scrollRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/doctors"
        );

        setDoctors(res.data);
      } catch (error) {
        console.log("Doctor Fetch Error:", error);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    if (headingRef.current) {
      textReveal(headingRef.current);
    }

    if (textRef.current) {
      textReveal(textRef.current);
    }
  }, []);

  const next = () => {
    scrollRef.current?.scrollBy({
      left: 350,
      behavior: "smooth",
    });
  };

  const prev = () => {
    scrollRef.current?.scrollBy({
      left: -350,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (selectedDoctor && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        {
          scale: 0.8,
          opacity: 0,
          y: 50,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power3.out",
        }
      );
    }
  }, [selectedDoctor]);

  const handleClose = () => {
    if (!modalRef.current) {
      setSelectedDoctor(null);
      return;
    }

    gsap.to(modalRef.current, {
      scale: 0.8,
      opacity: 0,
      y: 50,
      duration: 0.3,
      ease: "power3.in",
      onComplete: () => {
        setSelectedDoctor(null);
      },
    });
  };

  return (
    <section
      id="doctors"
      className="w-full py-16 md:py-24 bg-gradient-to-r from-[#88dad1] via-[#d6f3ef] to-[#eefafa]"
    >
      <div className="flex justify-between items-center px-4 sm:px-6 md:px-16 mb-10 md:mb-16">
        <div>
          <p
            ref={textRef}
            className="text-teal-500 text-sm font-semibold"
          >
            — OUR DOCTORS
          </p>

          <h2
            ref={headingRef}
            className="text-2xl sm:text-3xl md:text-4xl font-bold"
          >
            Our Best Doctors
          </h2>
        </div>

        <div className="flex gap-3">
          <button
            onClick={prev}
            className="w-11 h-11 rounded-full bg-gray-200 flex items-center justify-center"
          >
            <FaArrowLeft />
          </button>

          <button
            onClick={next}
            className="w-11 h-11 rounded-full bg-teal-500 text-white flex items-center justify-center"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="overflow-x-auto px-4 sm:px-6 md:px-16 pb-20 scroll-smooth"
      >
        {doctors.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            Loading Doctors...
          </div>
        ) : (
          <div className="flex flex-nowrap gap-6">
            {doctors.map((doc) => (
              <div
                key={doc._id}
                onClick={() => setSelectedDoctor(doc)}
                className="group cursor-pointer w-[260px] sm:w-[300px] md:w-[340px] flex-shrink-0 relative hover:-translate-y-3 hover:scale-105 transition-all duration-300"
              >
                <div className="bg-[#eef1f5] p-4 md:p-5 rounded-2xl overflow-hidden">
                  <img
                    src={doc.profileImage}
                    alt={doc.name}
                    className="w-full h-[260px] sm:h-[300px] md:h-[340px] object-cover rounded-xl"
                  />
                </div>

                <div
                  className="absolute left-1/2 -translate-x-1/2 -bottom-14 md:-bottom-16 w-[95%] bg-white shadow-xl py-5 px-5 transition-all duration-300 group-hover:bg-teal-500"
                  style={{
                    clipPath:
                      "polygon(8% 0%,100% 0%,92% 100%,0% 100%)",
                  }}
                >
                  <h4 className="text-base font-semibold text-gray-800 group-hover:text-white">
                    {doc.name}
                  </h4>

                  <p className="text-sm text-gray-500 group-hover:text-teal-100">
                    {doc.specialization}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
            {selectedDoctor && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-lg flex items-center justify-center z-50"
          onClick={handleClose}
        >
          <div
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl w-[90%] max-w-[450px] p-6"
          >
            <div className="flex gap-4 items-center">
              <img
                src={selectedDoctor.profileImage}
                alt={selectedDoctor.name}
                className="w-20 h-20 rounded-full object-cover"
              />

              <div>
                <h2 className="text-lg font-bold">
                  {selectedDoctor.name}
                </h2>

                <p className="text-sm text-gray-500">
                  Principal Director & HOD
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="bg-gray-100 px-3 py-2 rounded-lg text-sm">
                {selectedDoctor.specialization}
              </div>
            </div>

            <div className="flex justify-between mt-6 text-center">
              <div>
                <p className="font-bold text-lg">
                  {selectedDoctor.experience}
                </p>

                <p className="text-sm text-gray-500">
                  Experience
                </p>
              </div>

              <div>
                <p className="font-bold text-lg">
                  ₹{selectedDoctor.fees}
                </p>

                <p className="text-sm text-gray-500">
                  Fees
                </p>
              </div>
            </div>

            <div className="flex mt-6">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/doctor/${selectedDoctor._id}`);
                }}
                className="w-1/2 border py-3 rounded-l-xl hover:bg-gray-100 transition"
              >
                View Full Profile
              </button>

              <button
                className="w-1/2 bg-teal-500 text-white py-3 rounded-r-xl hover:bg-teal-600 transition"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
