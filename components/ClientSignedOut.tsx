"use client";

import { useAuth } from "@/context/AuthContext";

const ClientSignedOut = ({ children }: { children: React.ReactNode }) => {
  const {authenticated} = useAuth();
  if (!authenticated) {
    return children;
  }
  return null;
};

export default ClientSignedOut;
