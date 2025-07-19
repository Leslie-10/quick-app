"use client";

import { ReactNode } from "react";
import { withAuth } from "@/hooks/HOC";

function ProfilLayout({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

export default withAuth(ProfilLayout, "AUTHORIZED", [
  "client",
  "prestataire",
  "les_deux",
]);
