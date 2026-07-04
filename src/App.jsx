import React, { useEffect } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import {
  initLenis,
  destroyLenis,
} from "./utils/lenis";

/* COMPONENTS */

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Stats from "./components/Stats";
import Services from "./components/Services";
import Facilities from "./components/Facilities";
import DoctorSection from "./components/DoctorSection";
import Testimonial from "./components/Testimonial";
import Support from "./components/Support";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import BookAppointment from "./components/BookAppointment";
import ChatBot from "./chatbot/ChatBot";

/* PAGES */

import Auth from "./pages/Auth";
import ProcessingPage from "./pages/ProcessingPage";
import PatientCasePage from "./pages/PatientCasePage";
import PrescriptionPage from "./pages/PrescriptionPage";
import PatientAppointments from "./pages/PatientAppointments";

/* REPORTS */

import ReportPage from "./My-report/ReportPage";
import UploadReport from "./My-report/UploadReport";
import DoctorFinalReport from "./My-report/DoctorFinalReport";

/* DOCTOR */

import DoctorDashboard from "./Doctor/component/DoctorDashboard";
import VideoCallPage from "./Doctor/component/VideoCallPage";
import DoctorDecisionPage from "./Doctor/component/DoctorDecisionPage";
import DoctorDetailPage from "./Doctor/Doctorpage/DoctorDetailPage";



function Layout() {

  const location =
    useLocation();


  const hideNavbar =

    location.pathname.startsWith(
      "/doctor-dashboard"
    )

    ||

    location.pathname.startsWith(
      "/video-call"
    )

    ||

    location.pathname.startsWith(
      "/doctor-decision"
    );


  return (

    <>

      {

        !hideNavbar

        &&

        <Navbar />

      }



      <Routes>


        {/* HOME */}

        <Route

          path="/"

          element={

            <>

              <Home />

              <About />

              <Stats />

              <Services />

              <Facilities />

              <DoctorSection />

              <Testimonial />

              <Support />

              <Newsletter />

              <Footer />

            </>

          }

        />



        {/* AUTH */}

        <Route

          path="/auth"

          element={<Auth />}

        />




        {/* APPOINTMENT */}

        <Route

          path="/appointment"

          element={

            <BookAppointment />

          }

        />




        {/* PROCESS */}

        <Route

          path="/processing"

          element={

            <ProcessingPage />

          }

        />




        {/* REPORT */}

        <Route

          path="/report"

          element={<ReportPage />}

        />


        <Route

          path="/upload-report"

          element={<UploadReport />}

        />


        <Route

          path="/prescription"

          element={

            <PrescriptionPage />

          }

        />

        <Route
  path="/my-appointments"
  element={<PatientAppointments />}
/>




        {/* DOCTOR */}

        <Route

          path="/doctor-dashboard"

          element={

            <DoctorDashboard />

          }

        />


        <Route

          path="/doctor/:id"

          element={

            <DoctorDetailPage />

          }

        />


        <Route

          path="/video-call"

          element={

            <VideoCallPage />

          }

        />


        <Route

          path="/doctor-decision"

          element={

            <DoctorDecisionPage />

          }

        />


        <Route

          path="/doctor-final-report"

          element={

            <DoctorFinalReport />

          }

        />




        {/* CASE */}

        <Route

          path="/patient-case"

          element={

            <PatientCasePage />

          }

        />


      </Routes>
      <ChatBot />


    </>

  );

}





export default function App() {

  useEffect(() => {

    initLenis();


    return () => {

      destroyLenis();

    };

  }, []);



  return (

    <Router>

      <Layout />

    </Router>

  );

}


