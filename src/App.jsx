import React, { useEffect, lazy, Suspense } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
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
const DoctorSection = lazy(() => import("./components/DoctorSection"));
const Testimonial = lazy(() => import("./components/Testimonial"));
import Support from "./components/Support";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import BookAppointment from "./components/BookAppointment";
import ChatBot from "./chatbot/ChatBot";
import { SocketProvider } from "./videocall/providers/SocketProvider";
import { IncomingCallProvider } from "./videocall/providers/IncomingCallProvider";
import IncomingCallModal from "./videocall/components/IncomingCallModal";
import { CallingProvider } from "./videocall/providers/CallingProvider";
import CallingModal from "./videocall/components/CallingModal";
import ProtectedDoctorRoute from "./routes/ProtectedDoctorRoute";
import ProtectedPatientRoute from "./routes/ProtectedPatientRoute";
import ProtectedAuthRoute from "./routes/ProtectedAuthRoute";
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
    const user = JSON.parse(localStorage.getItem("user"));

if (location.pathname === "/" && user?.role === "doctor") {
  return <Navigate to="/doctor-dashboard" replace />;
}

    useEffect(() => {

  initLenis();

  return () => {

    destroyLenis();

  };

}, []);


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

             <Suspense fallback={<div className="h-[500px]" />}>

  <DoctorSection />

</Suspense>

<Suspense fallback={<div className="h-[500px]" />}>

  <Testimonial />

</Suspense>

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
    <ProtectedPatientRoute>
      <BookAppointment />
    </ProtectedPatientRoute>
  }
/>




       <Route
  path="/processing"
  element={
    <ProtectedPatientRoute>
      <ProcessingPage />
    </ProtectedPatientRoute>
  }
/>




        {/* REPORT */}

        <Route
  path="/report"
  element={
    <ProtectedAuthRoute>
      <ReportPage />
    </ProtectedAuthRoute>
  }
/>


       <Route
  path="/upload-report"
  element={
    <ProtectedPatientRoute>
      <UploadReport />
    </ProtectedPatientRoute>
  }
/>


       <Route
  path="/prescription"
  element={
    <ProtectedAuthRoute>
      <PrescriptionPage />
    </ProtectedAuthRoute>
  }
/>
        <Route
  path="/my-appointments"
  element={
    <ProtectedPatientRoute>
      <PatientAppointments />
    </ProtectedPatientRoute>
  }
/>

        <Route
  path="/patient-case"
  element={
    <ProtectedDoctorRoute>
      <PatientCasePage />
    </ProtectedDoctorRoute>
  }
/>




        {/* DOCTOR */}

        <Route
  path="/doctor-dashboard"
  element={
    <ProtectedDoctorRoute>
      <DoctorDashboard />
    </ProtectedDoctorRoute>
  }
/>


       <Route
  path="/doctor/:id"
  element={
    <ProtectedPatientRoute>
      <DoctorDetailPage />
    </ProtectedPatientRoute>
  }
/>


       <Route
  path="/video-call"
  element={
    <ProtectedDoctorRoute>
      <VideoCallPage />
    </ProtectedDoctorRoute>
  }
/>


      <Route
  path="/doctor-decision"
  element={
    <ProtectedDoctorRoute>
      <DoctorDecisionPage />
    </ProtectedDoctorRoute>
  }
/>


        <Route
  path="/doctor-final-report"
  element={
    <ProtectedDoctorRoute>
      <DoctorFinalReport />
    </ProtectedDoctorRoute>
  }
/>




        {/* CASE */}

       


      </Routes>
      <ChatBot />
      <IncomingCallModal />
      <CallingModal />


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
  <SocketProvider>
    <CallingProvider>
      <IncomingCallProvider>
        <Layout />
      </IncomingCallProvider>
    </CallingProvider>
  </SocketProvider>
</Router>

  );

}


