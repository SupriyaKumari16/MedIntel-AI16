import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaDownload,
  FaArrowLeft,
  FaFileMedical,
} from "react-icons/fa";

export default function PrescriptionPage() {
  const navigate = useNavigate();

  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/prescriptions/my-prescriptions",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPrescriptions(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, []);

  const handleDownload = (item) => {
    const content = `
MEDINTEL AI - FINAL PRESCRIPTION

Patient: ${item.patientId?.name || "Patient"}
Doctor: ${item.doctorName || "Dr Singh"}
Date: ${new Date(item.createdAt).toLocaleDateString()}

Risk Level: ${item.risk || "N/A"}

Symptoms:
${item.symptoms || "N/A"}

Diagnosis:
${item.diagnosis || "N/A"}

Medicine / Prescription:
${item.prescription || "N/A"}

Recommendation:
${item.recommendation || "N/A"}

Follow Up:
${item.followUp || "N/A"}

Doctor Notes:
${item.notes || "N/A"}
`;

    const blob = new Blob([content], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "medintel-prescription.txt";

    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#eef4f7] pt-[90px] sm:pt-[100px] md:pt-[90px] px-4 pb-8">
      <div className="max-w-[1100px] mx-auto">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between gap-5 items-start sm:items-center mb-8">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="flex gap-2 items-center text-gray-500 mb-3"
            >
              <FaArrowLeft />
              Back
            </button>

            <h1 className="text-2xl sm:text-4xl font-bold">
              My Prescriptions
            </h1>

            <p className="text-gray-500 mt-2 text-sm sm:text-base">
              Your medical reports and doctor prescriptions
            </p>
          </div>

          <div className="bg-teal-500 text-white px-5 py-3 rounded-xl">
            {prescriptions.length} Reports
          </div>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="bg-white rounded-3xl shadow-xl p-10 text-center text-gray-500">
            Loading prescriptions...
          </div>
        )}

        {/* EMPTY */}
        {!loading && prescriptions.length === 0 && (
          <div className="bg-white rounded-3xl shadow-xl p-10 sm:p-20 text-center">
            <FaFileMedical className="text-5xl sm:text-6xl mx-auto text-gray-300 mb-5" />

            <h2 className="text-xl sm:text-2xl font-semibold">
              No Prescription Found
            </h2>

            <p className="text-gray-500 mt-3">
              Consult a doctor to receive a prescription.
            </p>
          </div>
        )}

        {/* PRESCRIPTION CARDS */}
        {!loading && prescriptions.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {prescriptions.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-3xl shadow-lg p-5 sm:p-8 space-y-4"
              >
                <div className="flex justify-between items-center gap-3">
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold">
                      {item.patientId?.name || "Patient"}
                    </h2>

                    <p className="text-gray-500 text-sm">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <span className="bg-red-100 text-red-500 px-3 py-1 rounded-full text-xs sm:text-sm">
                    {item.risk || "N/A"}
                  </span>
                </div>

                <div>
                  <p>
                    <b>Symptoms:</b> {item.symptoms || "N/A"}
                  </p>
                </div>

                <div>
                  <p>
                    <b>Diagnosis:</b> {item.diagnosis || "N/A"}
                  </p>
                </div>

                <div>
                  <p>
                    <b>Medicine:</b> {item.prescription || "N/A"}
                  </p>
                </div>

                <div>
                  <p>
                    <b>Recommendation:</b> {item.recommendation || "N/A"}
                  </p>
                </div>

                <div>
                  <p>
                    <b>Follow Up:</b> {item.followUp || "N/A"}
                  </p>
                </div>

                <div>
                  <p>
                    <b>Doctor Notes:</b> {item.notes || "N/A"}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center border-t pt-5">
                  <div className="font-medium">
                    {item.doctorName || "Dr Singh"}
                  </div>

                  <button
                    onClick={() => handleDownload(item)}
                    className="bg-teal-500 text-white px-4 py-2 rounded-lg flex gap-2 items-center"
                  >
                    Download
                    <FaDownload />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}