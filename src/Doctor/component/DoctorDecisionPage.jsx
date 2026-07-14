import axios from "axios";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function DoctorDecisionPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const patient =
    location.state ||
    JSON.parse(localStorage.getItem("currentPatient"));

  const [diagnosis, setDiagnosis] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [prescription, setPrescription] = useState("");
  const [followUp, setFollowUp] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerateReport = async () => {
    try {
      if (!patient) {
        alert("Patient details not found");
        return;
      }

      if (!diagnosis.trim() || !prescription.trim()) {
        alert("Please fill diagnosis and medicine details");
        return;
      }

     const patientId =
  patient?.patientId?._id ||
  patient?.patientId ||
  patient?.userId?._id ||
  patient?.userId ||
  null;

const appointmentId =
  patient?.appointmentId ||
  patient?._id ||
  null;

  console.log("DECISION PAGE PATIENT:", patient);
console.log("FOUND PATIENT ID:", patientId);
console.log("FOUND APPOINTMENT ID:", appointmentId);

if (!patientId) {
  console.log("PATIENT DATA:", patient);
  alert("Patient ID not found");
  return;
}

if (!appointmentId) {
  console.log("APPOINTMENT DATA:", patient);
  alert("Appointment ID not found");
  return;
}

      setLoading(true);

      const token = localStorage.getItem("token");

      const payload = {
        patientId,
        appointmentId,
        reportId: patient.reportId || null,

        doctorId: patient.doctorId || null,
        doctorName: patient.doctorName || "Dr Singh",

        symptoms: patient.symptoms || "",
        heartRate: patient.heartRate || "N/A",
        bp: patient.bp || "N/A",
        oxygen: patient.oxygen || "N/A",
        risk: patient.risk || patient.riskLevel || "pending",

        diagnosis,
        prescription,
        recommendation,
        followUp,
        notes,
      };

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/prescriptions/create`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Final prescription saved successfully");

      navigate("/doctor-final-report", {
        state: {
          ...patient,
          ...payload,
          prescriptionId: res.data.prescription._id,
        },
      });
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to save final prescription"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#eef4f7] pt-24 px-4 flex justify-center">
      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-[900px] p-8">
        {/* HEADER */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-500"
          >
            ← Back
          </button>

          <h1 className="text-3xl font-bold mt-4">
            Doctor Final Decision
          </h1>

          <p className="text-gray-500 mt-2">
            Complete diagnosis and generate the patient prescription.
          </p>
        </div>

        {/* PATIENT PREVIEW */}
        <div className="bg-[#f7fafb] rounded-2xl p-5 shadow mb-8">
          <div className="flex gap-4 items-center">
            <img
              src="https://i.pravatar.cc/80"
              className="w-16 h-16 rounded-full"
              alt="Patient"
            />

            <div>
              <h2 className="font-semibold text-lg">
                {patient?.patientId?.name ||
                  patient?.name ||
                  "Patient"}
              </h2>

              <p className="text-gray-500 text-sm">
                {patient?.risk || patient?.riskLevel || "Pending"} Risk
              </p>

              <p className="text-gray-400 text-xs mt-1">
                {patient?.symptoms || "No symptoms available"}
              </p>
            </div>
          </div>
        </div>

        {/* FORM */}
        <div className="space-y-6">
          <textarea
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            placeholder="Diagnosis"
            className="w-full border rounded-xl p-4 h-28"
          />

          <select
            value={recommendation}
            onChange={(e) => setRecommendation(e.target.value)}
            className="w-full border rounded-xl p-4"
          >
            <option value="">Select Recommendation</option>
            <option value="Medication">Medication</option>
            <option value="Hospital Visit">Hospital Visit</option>
            <option value="Self Care">Self Care</option>
          </select>

          <textarea
            value={prescription}
            onChange={(e) => setPrescription(e.target.value)}
            placeholder="Medicine / Prescription"
            className="w-full border rounded-xl p-4 h-24"
          />

          <input
            type="date"
            value={followUp}
            onChange={(e) => setFollowUp(e.target.value)}
            className="w-full border rounded-xl p-4"
          />

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Doctor Notes"
            className="w-full border rounded-xl p-4 h-28"
          />
        </div>

        {/* BUTTON */}
        <div className="flex gap-4 mt-10">
          <button
            onClick={() => navigate(-1)}
            className="flex-1 bg-gray-100 py-4 rounded-xl"
          >
            Cancel
          </button>

          <button
            onClick={handleGenerateReport}
            disabled={loading}
            className="flex-1 bg-teal-500 text-white py-4 rounded-xl disabled:opacity-60"
          >
            {loading
              ? "Saving..."
              : "Generate Final Report →"}
          </button>
        </div>
      </div>
    </div>
  );
}