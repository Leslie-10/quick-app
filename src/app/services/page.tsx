"use client";

import ServicesCard from "@/components/ServicesCard";
import { withAuth } from "@/hooks/HOC";

function ServicesPage() {
  return <ServicesCard />;
}

export default withAuth(ServicesPage, "AUTHORIZED", ["client", "prestataire", "les_deux"]);