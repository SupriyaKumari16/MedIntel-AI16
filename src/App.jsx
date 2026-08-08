import React, {
  useEffect,
  lazy,
  Suspense,
} from "react";

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
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useInView } from "react-intersection-observer";

/* COMPONENTS */

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Stats from "./components/Stats";
import Services from "./components/Services";
const Facilities = lazy(() =>import("./components/Facilities"));
const DoctorSection = lazy(() => import("./components/DoctorSection"));
const Testimonial = lazy(() => import("./components/Testimonial"));
const Support = lazy(() =>import("./components/Support"));
const Newsletter = lazy(() =>import("./components/Newsletter"));
const Footer = lazy(() =>import("./components/Footer"));


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

  const location = useLocation();
  

  const { ref: preloadRef, inView } = useInView({
    triggerOnce: true,
    rootMargin: "600px",
  });

  useEffect(() => {
    initLenis();

    return () => {
      destroyLenis();
    };
  }, []);

  useEffect(() => {
    if (inView) {
      import("./components/DoctorSection");
      import("./components/Testimonial");
      import("./components/Facilities");
      import("./components/Support");
      import("./components/Newsletter");
      import("./components/Footer");
    }
  }, [inView]);

  useEffect(() => {
    const refresh = () => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    };

    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
    };
  }, []);



 const hideNavbar =
  location.pathname.startsWith("/doctor-dashboard") ||
  location.pathname.startsWith("/video-call") ||
  location.pathname.startsWith("/doctor-decision") ||
  location.pathname.startsWith("/doctor-final-report") ||
  location.pathname.startsWith("/patient-case");


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

      {/* Prefetch Trigger */}
      <div ref={preloadRef} className="h-1" />

      <Suspense fallback={<div className="h-[500px]" />}>
        <Facilities />
      </Suspense>

      <Suspense fallback={<div className="h-[500px]" />}>
        <DoctorSection />
      </Suspense>

      <Suspense fallback={<div className="h-[500px]" />}>
        <Testimonial />
      </Suspense>

      <Suspense fallback={<div className="h-[500px]" />}>
        <Support />
      </Suspense>

      <Suspense fallback={<div className="h-[500px]" />}>
        <Newsletter />
      </Suspense>

      <Suspense fallback={<div className="h-[500px]" />}>
        <Footer />
      </Suspense>
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
<Route path="/doctors" element={<DoctorSection />} />


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


