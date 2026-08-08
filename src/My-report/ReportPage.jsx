import React, { useEffect, useRef } from "react";
import { FaVial, FaDownload } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";

const ReportPage = () => {
  const needleRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const patient = location.state || JSON.parse(localStorage.getItem("latestPatient"));
  const ai = patient?.aiAnalysis || {};

  const type = patient?.type || "initial";
  const risk =
  patient?.aiAnalysis?.riskLevel?.toUpperCase() === "MODERATE"
    ? "MEDIUM"
    : patient?.aiAnalysis?.riskLevel?.toUpperCase() ||
      patient?.risk ||
      "LOW";
  const symptoms = patient?.symptoms || "N/A";
  const bp = patient?.bp || "N/A";
  const oxygen = patient?.oxygen || "N/A";
  const heartRate = patient?.heartRate || "N/A";

  useEffect(() => {
    localStorage.setItem("latestPatient", JSON.stringify(patient));

    gsap.fromTo(
      needleRef.current,
      { rotation: 0 },
      {
        rotation: risk === "LOW" ? 20 : risk === "MEDIUM" ? 45 : 65,
        duration: 1.5,
        transformOrigin: "center bottom",
      }
    );
  }, []);

  const handleDownload = () => {
    const content = `MEDINTEL AI REPORT

Symptoms: ${symptoms}

Risk: ${risk}

Possible Conditions:
${ai?.possibleConditions?.join(", ")}

Recommended Tests:
${ai?.recommendedTests?.join(", ")}

Specialist:
${ai?.specialist}

Urgency:
${ai?.urgency}

BP: ${bp}

Heart Rate: ${heartRate}

Oxygen: ${oxygen}
`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "report.txt";
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f7f6] to-[#f5f9ff] pt-20 px-3 flex justify-center">
      <div className="bg-white/70 backdrop-blur-xl max-w-[1150px] w-full rounded-3xl shadow-xl p-6">

        <h2 className="text-2xl font-semibold mb-5">AI Assessment</h2>

        <div className="bg-white rounded-xl p-5 text-center mb-5">
          <p>
            Risk: <span className="text-red-500 font-semibold">{risk}</span>
          </p>

          <div className="flex justify-center">
            <svg className="w-[250px]" viewBox="0 0 200 100">
              <path d="M20 100 A80 80 0 0 1 180 100" stroke="#ddd" strokeWidth="18" fill="none" />
              <line ref={needleRef} x1="100" y1="100" x2="100" y2="30" stroke="#111" strokeWidth="5" />
            </svg>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">

          <div className="md:col-span-2 space-y-4">

           <div className="bg-white rounded-xl p-5">

  <h3 className="font-semibold text-lg">
    Possible Conditions
  </h3>

  <ul className="list-disc ml-5 mt-3 space-y-2">

  {ai?.possibleConditions?.length > 0 ? (
    ai.possibleConditions.map((item, index) => (
      <li key={index}>{item}</li>
    ))
  ) : (
    <p className="text-gray-500">No conditions detected.</p>
  )}

</ul>

</div>

            {type === "initial" && (
              <div>
                <h3 className="font-semibold">Suggested Tests</h3>

                {ai?.recommendedTests?.length > 0 &&
  ai.recommendedTests.map((test, index) => (

  <div
    key={index}
    className="bg-white p-4 rounded-xl mt-2 flex gap-4 items-center"
  >

    <FaVial className="text-teal-500" />

    <span>
      {test}
    </span>

  </div>

))}
              </div>
            )}

            {ai?.homeCare?.length > 0 && (

  <div className="bg-green-100 p-5 rounded-xl">

    <h3 className="font-semibold text-lg">
      Home Care
    </h3>

    <ul className="list-disc ml-5 mt-3 space-y-2">

      {ai.homeCare.map((item, index) => (

        <li key={index}>
          {item}
        </li>

      ))}

    </ul>

  </div>

)}

            {ai?.doctorRequired && (
              <div className="bg-red-100 p-5 rounded-xl">
                <h3>Doctor Consultation Required</h3>
                <p className="mt-3 mb-4">
  <b>Recommended Specialist:</b>{" "}
  {ai?.specialist}
</p>

                <button onClick={() => navigate("/doctors", { state: patient })} className="mt-3 bg-teal-500 text-white px-5 py-2 rounded" > Consult Doctor </button>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl p-5">
            <h3>Patient Info</h3>

            <p>Symptoms: {symptoms}</p>
            {type === "initial" && (
  <p className="mt-3">
    <b>Urgency:</b> {ai?.urgency}
  </p>
)}

            {type === "final" && (
              <>
                <p>BP: {bp}</p>
                <p>Heart: {heartRate}</p>
                <p>Oxygen: {oxygen}</p>
              </>
            )}
          </div>
        </div>
        {ai?.disclaimer && (

  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mt-8">

    <h3 className="font-semibold text-yellow-700">
      AI Disclaimer
    </h3>

    <p className="text-sm text-gray-600 mt-2">

      {ai.disclaimer}

    </p>

  </div>

)}

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => navigate("/")}
            className="bg-teal-500 text-white px-5 py-2 rounded"
          >
            Back Home
          </button>

          <button
            onClick={handleDownload}
            className="border px-5 py-2 rounded flex gap-2"
          >
            <FaDownload />
            Download
          </button>
        </div>

      </div>
    </div>
  );
};

export default ReportPage;