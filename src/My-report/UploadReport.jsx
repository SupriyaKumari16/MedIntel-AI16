import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UploadReport() {
  const [file, setFile] = useState(null);
  const [symptoms, setSymptoms] = useState("");

  const [heartRate, setHeartRate] = useState("");
  const [bp, setBp] = useState("");
  const [oxygen, setOxygen] = useState("");

  const navigate = useNavigate();

 const handleSubmit = async () => {

  const token = localStorage.getItem("token");

  if(!symptoms){
    alert("Please enter symptoms");
    return;
  }

  try{

    const response = await fetch(
      "http://localhost:5000/api/reports/create",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
        },
        body:JSON.stringify({
          symptoms,
          heartRate,
          bp,
          oxygen,
          reportFile:file?.name || ""
        })
      }
    );

    const data = await response.json();

    if(!response.ok){
      alert(data.message);
      return;
    }

    alert("Report Submitted Successfully");

    navigate("/processing",{
      state:{
        type:"final",
        symptoms,
        heartRate,
        bp,
        oxygen,
        report:file?.name
      }
    });

  }
  catch(error){

    console.log(error);

    alert("Server Error");

  }

};

  return (
    <div className="
min-h-screen
bg-gradient-to-b
from-teal-100
to-white
flex
justify-center
items-start

pt-28
sm:pt-24
md:pt-20
lg:pt-20

px-4
pb-8
sm:px-6
">

      <div className="
        bg-white
        w-full
        max-w-4xl
        rounded-3xl
        shadow-2xl
        border
        border-gray-100
        p-5
        sm:p-8
        md:p-10
      ">

        {/* TITLE */}

        <h2 className="
          text-xl
          sm:text-2xl
          md:text-3xl
          font-semibold
          text-center
          mb-8
        ">
          Describe your symptoms
        </h2>


        {/* Symptoms */}

        <div className="
          border
          rounded-2xl
          overflow-hidden
          mb-8
          shadow-sm
          flex
        ">

          <textarea
            placeholder="Type here to describe your symptoms..."
            rows="4"
            value={symptoms}
            onChange={(e)=>setSymptoms(e.target.value)}
            className="
              flex-1
              p-4
              outline-none
              resize-none
              text-sm
              sm:text-base
            "
          />

          <button className="
            bg-teal-500
            text-white
            px-4
            sm:px-6
            text-xl
          ">
            🎤
          </button>

        </div>



        {/* Upload */}

        <h3 className="
          text-lg
          sm:text-xl
          font-semibold
          text-center
          mb-4
        ">
          Upload Medical Reports
        </h3>


        <div className="
          border-2
          border-dashed
          border-gray-300
          rounded-2xl
          p-5
          sm:p-8
          text-center
          mb-8
        ">

          <p className="
            text-gray-600
            mb-4
            text-sm
            sm:text-base
          ">
            Upload PDF, JPG, PNG
          </p>


          <input
            type="file"
            id="fileUpload"
            accept=".pdf,.jpg,.jpeg,.png"
            className="hidden"
            onChange={(e)=>
              setFile(e.target.files[0])
            }
          />


          <label
            htmlFor="fileUpload"
            className="
              inline-block
              bg-teal-500
              text-white
              px-6
              py-3
              rounded-xl
              cursor-pointer
              hover:bg-teal-600
              transition
              text-sm
              sm:text-base
            "
          >

            Browse Files

          </label>


          {file && (

            <p className="
              mt-4
              text-green-600
              text-sm
              break-all
            ">

              Selected:
              {" "}
              {file.name}

            </p>

          )}

        </div>




        {/* Vitals */}

        <h3 className="
          text-lg
          sm:text-xl
          font-semibold
          text-center
        ">
          Enter Your Vitals
        </h3>


        <p className="
          text-center
          text-gray-500
          text-sm
          mb-6
        ">
          (Optional but helps AI)
        </p>



        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-5
          mb-8
        ">

          {/* HEART */}

          <div className="
            bg-gray-100
            p-5
            rounded-2xl
            text-center
          ">

            <div className="text-3xl mb-2">
              ❤️
            </div>

            <p>
              Heart Rate
            </p>

            <input
              type="number"
              value={heartRate}
              placeholder="72"
              onChange={(e)=>
                setHeartRate(e.target.value)
              }
              className="
                mt-3
                w-full
                border
                rounded-lg
                p-2
                text-center
              "
            />

          </div>



          {/* BP */}

          <div className="
            bg-gray-100
            p-5
            rounded-2xl
            text-center
          ">

            <div className="text-3xl mb-2">
              🔥
            </div>

            <p>
              Blood Pressure
            </p>

            <input
              type="text"
              placeholder="120/80"
              value={bp}
              onChange={(e)=>
                setBp(e.target.value)
              }
              className="
                mt-3
                w-full
                border
                rounded-lg
                p-2
                text-center
              "
            />

          </div>




          {/* Oxygen */}

          <div className="
            bg-gray-100
            p-5
            rounded-2xl
            text-center
          ">

            <div className="text-3xl mb-2">
              💧
            </div>

            <p>
              Oxygen

            </p>


            <input
              type="number"
              value={oxygen}
              placeholder="98"
              onChange={(e)=>
                setOxygen(e.target.value)
              }
              className="
                mt-3
                w-full
                border
                rounded-lg
                p-2
                text-center
              "
            />

          </div>

        </div>



        {/* Submit */}

        <button
          onClick={handleSubmit}
          className="
            w-full
            bg-teal-500
            text-white
            py-4
            rounded-2xl
            text-base
            sm:text-lg
            hover:bg-teal-600
            transition
          "
        >

          Submit Case

        </button>


      </div>

    </div>
  );
}