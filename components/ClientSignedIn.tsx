"use client";

import { useAuth } from "@/context/AuthContext";

const ClientSignedIn = ({ children }: { children: React.ReactNode }) => {
  const {authenticated} = useAuth();
  if (authenticated) {
    return children;
  }
  return null;
};

export default ClientSignedIn;
