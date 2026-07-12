import { useState } from "react";
import { CallingContext } from "../context/CallingContext";

export function CallingProvider({ children }) {
  const [callingPatient, setCallingPatient] = useState(null);
  const [isCalling, setIsCalling] = useState(false);

  const startCalling = (patient) => {
    setCallingPatient(patient);
    setIsCalling(true);
  };

  const stopCalling = () => {
    setCallingPatient(null);
    setIsCalling(false);
  };

  return (
    <CallingContext.Provider
      value={{
        callingPatient,
        isCalling,
        startCalling,
        stopCalling,
      }}
    >
      {children}
    </CallingContext.Provider>
  );
}