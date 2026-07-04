import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../../components/Footer";

export default function DoctorDashboard() {
  const navigate = useNavigate();

  const loggedInUser = JSON.parse(
    localStorage.getItem("user")
  );

  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/appointments/doctor-appointments",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("DOCTOR APPOINTMENTS:", res.data);

        const formattedPatients = res.data.map((appointment) => ({
          ...appointment,

          // appointment details
          appointmentId: appointment._id,
          patientId: appointment.patientId?._id,
          reportId: appointment.reportId?._id || null,

          // patient details
          name: appointment.patientId?.name || "Patient",
          email: appointment.patientId?.email || "",

          // doctor + booking details
          doctorId: appointment.doctorId,
          doctorName: appointment.doctorName || "Doctor",
          slot: appointment.slot || "N/A",
          appointmentType: appointment.appointmentType || "hospital",
          status: appointment.status || "pending",

          // uploaded report details
          symptoms:
            appointment.reportId?.symptoms ||
            "No symptoms available",
          heartRate: appointment.reportId?.heartRate || "N/A",
          bp: appointment.reportId?.bp || "N/A",
          oxygen: appointment.reportId?.oxygen || "N/A",
          risk: appointment.reportId?.riskLevel || "pending",

          img: "https://i.pravatar.cc/40?img=5",
        }));

        setPatients(formattedPatients);
      } catch (error) {
        console.log("FETCH APPOINTMENTS ERROR:", error);

        alert(
          error.response?.data?.message ||
            "Could not load doctor appointments"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* NAVBAR */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <div className="w-8 h-8 bg-teal-500 rounded-full flex justify-center items-center text-white">
              +
            </div>

            <h1 className="font-bold text-xl">
              MedIntel
              <span className="text-teal-500">AI</span>
            </h1>
          </div>

          <ul className="hidden md:flex gap-8 text-sm">
            <li
              onClick={() => navigate("/")}
              className="cursor-pointer hover:text-teal-500"
            >
              Home
            </li>

            <li>Dashboard</li>
            <li>Help</li>
            <li>Contact</li>
          </ul>

          {/* LOGGED-IN DOCTOR */}
          <div className="flex gap-2 items-center">
            <img
              src="https://i.pravatar.cc/40?img=44"
              className="w-8 h-8 rounded-full object-cover"
              alt="Doctor"
            />

            <span className="hidden sm:block font-medium">
              {loggedInUser?.name || "Doctor"}
            </span>
          </div>
        </div>
      </nav>

      {/* MAIN */}
      <main className="flex-grow">
        <div className="max-w-[1500px] mx-auto mt-8 px-4 sm:px-6">
          <h1 className="text-2xl font-semibold mb-6">
            Doctor Dashboard
          </h1>

          <div className="bg-white rounded-xl shadow overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="bg-gray-50 text-sm">
                  <th className="p-4 text-center">Patient</th>
                  <th className="p-4 text-center">Appointment Time</th>
                  <th className="p-4 text-center">Appointment Type</th>
                  <th className="p-4 text-center">View Case</th>
                  <th className="p-4 text-center">Call</th>
                  <th className="p-4 text-center">Decision</th>
                  <th className="p-4 text-center">Status</th>
                </tr>
              </thead>

              <tbody>
                {patients.map((p) => (
                  <tr key={p.appointmentId} className="border-t">
                    <td className="p-4 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <img
                          src={p.img}
                          className="w-10 h-10 rounded-full"
                          alt="Patient"
                        />

                        <span>{p.name}</span>
                      </div>
                    </td>

                    <td className="p-4 text-center">
                      {p.slot}
                    </td>

                    <td className="p-4 text-center capitalize">
                      {p.appointmentType}
                    </td>

                    <td className="p-4 text-center">
                      <button
                        onClick={() =>
                          navigate("/patient-case", {
                            state: p,
                          })
                        }
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                      >
                        View
                      </button>
                    </td>

                    <td className="p-4 text-center">
                      <button
                        onClick={() =>
                          navigate("/video-call", {
                            state: p,
                          })
                        }
                        className="bg-teal-500 text-white px-4 py-2 rounded"
                      >
                        Call
                      </button>
                    </td>

                    <td className="p-4 text-center">
                      <button
                        onClick={() =>
                          navigate("/doctor-decision", {
                            state: p,
                          })
                        }
                        className="bg-orange-500 text-white px-4 py-2 rounded"
                      >
                        Decision
                      </button>
                    </td>

                    <td className="p-4 text-center">
                      <span
                        className={`px-3 py-1 rounded capitalize ${
                          p.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : p.status === "cancelled"
                            ? "bg-red-100 text-red-700"
                            : p.status === "accepted"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {loading && (
              <div className="p-8 text-center text-gray-500">
                Loading appointments...
              </div>
            )}

            {!loading && patients.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                No appointments scheduled yet.
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

