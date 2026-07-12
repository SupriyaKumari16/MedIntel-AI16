import { useContext } from "react";
import { CallingContext } from "../context/CallingContext";

export default function useCalling() {
  return useContext(CallingContext);
}