import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCalendarCheck,
  FaClock,
  FaVideo,
  FaHospital,
  FaArrowLeft,
} from "react-icons/fa";

export default function PatientAppointments() {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyAppointments = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/appointments/my-appointments`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("MY APPOINTMENTS:", res.data);

        setAppointments(res.data);
      } catch (error) {
        console.log("MY APPOINTMENTS ERROR:", error);

        alert(
          error.response?.data?.message ||
            "Could not load appointments"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMyAppointments();
  }, []);

  const getStatusStyle = (status) => {
    if (status === "completed") {
      return "bg-green-100 text-green-700";
    }

    if (status === "cancelled") {
      return "bg-red-100 text-red-700";
    }

    if (status === "accepted") {
      return "bg-blue-100 text-blue-700";
    }

    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="min-h-screen bg-[#eef4f7] pt-[90px] sm:pt-[100px] px-4 pb-10">
      <div className="max-w-[1100px] mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 mb-5"
        >
          <FaArrowLeft />
          Back
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-4xl font-bold">
              My Appointments
            </h1>

            <p className="text-gray-500 mt-2">
              Track your consultations and join video calls.
            </p>
          </div>

          <div className="bg-teal-500 text-white px-5 py-3 rounded-xl">
            {appointments.length} Appointments
          </div>
        </div>

        {loading && (
          <div className="bg-white rounded-3xl shadow-lg p-10 text-center text-gray-500">
            Loading appointments...
          </div>
        )}

        {!loading && appointments.length === 0 && (
          <div className="bg-white rounded-3xl shadow-lg p-10 sm:p-16 text-center">
            <FaCalendarCheck className="text-5xl mx-auto text-gray-300 mb-4" />

            <h2 className="text-xl font-semibold">
              No appointments found
            </h2>

            <p className="text-gray-500 mt-2">
              Book a doctor consultation to see it here.
            </p>

            <button
              onClick={() => navigate("/")}
              className="mt-5 bg-teal-500 text-white px-5 py-3 rounded-xl"
            >
              Find Doctors
            </button>
          </div>
        )}

        {!loading && appointments.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {appointments.map((appointment) => {
              const doctor = appointment.doctorId;

              return (
                <div
                  key={appointment._id}
                  className="bg-white rounded-3xl shadow-lg p-5 sm:p-6"
                >
                  <div className="flex gap-4 items-center">
                    <img
                      src={
                        doctor?.profileImage ||
                        "https://i.pravatar.cc/100?img=12"
                      }
                      alt="Doctor"
                      className="w-16 h-16 rounded-full object-cover"
                    />

                    <div className="min-w-0">
                      <h2 className="font-bold text-lg truncate">
                        {doctor?.name ||
                          appointment.doctorName ||
                          "Doctor"}
                      </h2>

                      <p className="text-sm text-gray-500">
                        {doctor?.specialization ||
                          "Medical Specialist"}
                      </p>
                    </div>

                    <span
                      className={`ml-auto px-3 py-1 rounded-full text-xs capitalize ${getStatusStyle(
                        appointment.status
                      )}`}
                    >
                      {appointment.status}
                    </span>
                  </div>

                  <div className="mt-5 space-y-3 text-sm">
                    <p className="flex items-center gap-3">
                      <FaClock className="text-teal-500" />
                      {appointment.slot || "Time not selected"}
                    </p>

                    <p className="flex items-center gap-3 capitalize">
                      {appointment.appointmentType === "video" ? (
                        <FaVideo className="text-teal-500" />
                      ) : (
                        <FaHospital className="text-teal-500" />
                      )}

                      {appointment.appointmentType || "hospital"} consultation
                    </p>

                    {appointment.reportId?.symptoms && (
                      <p className="text-gray-600 line-clamp-2">
                        <b>Symptoms:</b> {appointment.reportId.symptoms}
                      </p>
                    )}
                  </div>

                  <div className="mt-6 pt-5 border-t flex gap-3">
                    {appointment.appointmentType === "video" &&
                    appointment.status !== "completed" ? (
                      <button
                        onClick={() =>
                          navigate("/video-call", {
                            state: {
                              ...appointment,
                              appointmentId: appointment._id,
                              name:
                                doctor?.name ||
                                appointment.doctorName ||
                                "Doctor",
                            },
                          })
                        }
                        className="flex-1 bg-teal-500 text-white py-3 rounded-xl flex justify-center items-center gap-2"
                      >
                        <FaVideo />
                        Join Video Call
                      </button>
                    ) : (
                      <button
                        disabled
                        className="flex-1 bg-gray-100 text-gray-400 py-3 rounded-xl"
                      >
                        {appointment.status === "completed"
                          ? "Consultation Completed"
                          : "Hospital Visit"}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}