import { useContext } from "react";

import { IncomingCallContext } from "../providers/IncomingCallProvider";

export default function useIncomingCall() {
  return useContext(IncomingCallContext);
}