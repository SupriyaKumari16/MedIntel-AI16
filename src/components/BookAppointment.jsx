import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import team from "../assets/team.webp";
import doctorVideo from "../assets/video/doctorvideo-compressed.mp4";
import Footer from "../components/Footer";

export default function BookAppointment() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");

  const handleBook = async () => {

    const token = localStorage.getItem("token");

    if (
      !name ||
      !email ||
      !phone ||
      !symptoms ||
      !address ||
      !age
    ) {
      alert("Please fill all fields");
      return;
    }

    try {

      const response = await fetch(
        "http://localhost:5000/api/cases/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            symptoms,
            address,
            age
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      const aiResponse = await fetch(
  "http://localhost:5000/api/ai/analyze-initial",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      age,
      symptoms,
    }),
  }
);

const aiData = await aiResponse.json();

if (!aiResponse.ok) {
  alert("AI Analysis Failed");
  return;
}

      alert("Appointment Submitted Successfully");

      navigate("/processing", {
  state: {
    type: "initial",

    name,
    age,
    symptoms,

    aiAnalysis: aiData.analysis,
  },
});

    }
    catch (error) {

      console.log(error);

      alert("Server Error");

    }

  };

  return (
    <>
      <section className="bg-[#d9f1ef] pt-28 pb-12 px-4 md:px-10">

        {/* HERO */}
        <div className="max-w-[1500px] mx-auto">

          <p className="text-teal-500 font-bold tracking-wide mb-4">
            ~ GET AN APPOINTMENT
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Widest Network Of Best Healthcare
          </h1>

          <p className="text-gray-600 text-sm md:text-lg">
            Using advanced healing technologies, our professionals restore your health quickly.
          </p>

        </div>

        {/* MAIN */}
        <div className="w-full flex flex-col lg:flex-row gap-10 mt-10 justify-center items-start">

          {/* CARD */}
          <div className="bg-white shadow-xl rounded-2xl p-5 flex flex-col lg:flex-row gap-8 w-full max-w-[1000px]">

            {/* IMAGE */}
            <div className="w-full lg:w-1/2">

              <img
                loading="lazy"
                src={team}
                alt="team"
                className="w-full h-[250px] md:h-[360px] object-cover rounded-xl"
              />

              <p className="text-gray-500 italic text-center mt-8 px-4 text-sm">

                "Trusted healthcare begins with compassion,
                expertise and commitment."

              </p>

            </div>

            {/* FORM */}
            <div className="w-full lg:w-1/2">

              <h3 className="text-2xl font-semibold mb-6">
                Make an appointment
              </h3>

              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded p-3 mb-3"
              />

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded p-3 mb-3"
              />

              <input
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border rounded p-3 mb-3"
              />

              <textarea
                placeholder="Describe symptoms..."
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                className="w-full border rounded p-3 mb-3 h-[80px]"
              />

              <textarea
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border rounded p-3 mb-3 h-[60px]"
              />

              <input
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full border rounded p-3 mb-3"
              />

              <button
                onClick={handleBook}
                className="w-full bg-teal-400 hover:bg-teal-500 text-white py-3 rounded-lg transition"
              >
                Book Appointment
              </button>

            </div>

          </div>

          {/* VIDEO */}
          <div className="rounded-2xl overflow-hidden shadow-xl w-full lg:max-w-[420px]">

            <video
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              className="
              w-full
              h-[420px]
              md:h-[500px]
              lg:h-[540px]
              object-cover
              "
            >

              <source
                src={doctorVideo}
                type="video/mp4"
              />

            </video>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}