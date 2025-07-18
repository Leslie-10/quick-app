"use client";
import styles from "@/styles/services.module.css";
import Link from "next/link";

import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import PlumbingIcon from "@mui/icons-material/Plumbing";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import BuildIcon from "@mui/icons-material/Build";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SchoolIcon from "@mui/icons-material/School";
import  ComputerIcon  from "@mui/icons-material/Computer";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";


const services = [
  { name: "Électricité", slug:"electricite", options: 30, icon: <ElectricalServicesIcon style={{ fontSize: 24, color: "#0CB2D4" }} /> },
  { name: "Garde d’enfants", slug:"gardeEnfants", options: 40, icon: <ChildCareIcon style={{ fontSize: 24, color:  "#0CB2D4"  }} /> },
  { name: "Plomberie", slug:"plomberie", options: 17, icon: <PlumbingIcon style={{ fontSize: 24, color:  "#0CB2D4"  }} /> },
  { name: "Service d’entretien", slug:"entretien" ,options: 21, icon: <CleaningServicesIcon style={{ fontSize: 24, color:  "#0CB2D4"  }} /> },
  { name: "Bricolage", slug:"bricolage" ,options: 19, icon: <BuildIcon style={{ fontSize: 24, color:  "#0CB2D4"  }} /> },
  { name: "Déménagement", slug:"demenagement", options: 27, icon: <LocalShippingIcon style={{ fontSize: 24, color:  "#0CB2D4"  }} /> },
  { name: "Cours particuliers", slug:"coursParticuliers",options: 21, icon: <SchoolIcon style={{ fontSize: 24, color:  "#0CB2D4"  }} /> },
  { name: "Informatique & depanage", slug: "informatique", options:24, icon: <ComputerIcon style={{ fontSize: 24, color:  "#0CB2D4"  }}/>}
];

export default function ServicesCard() {
  return (
    <section className={styles.section}>
      <h3 className={styles.subheading}>NOS SERVICES</h3>
      <h2 className={styles.heading}>
         "DES SERVICES PRÈS DE CHEZ VOUS,<br />
          DES TALENTS À PORTÉE DE MAIN"
      </h2>

      <div className={styles.grid}>
        {services.map((service) => (
            <div className={styles.card}  key={service.name}>
            <div className={styles.iconBox}>{service.icon}</div>
            <h4 className={styles.serviceName}>{service.name}</h4>
            <p>{service.options} Prestataires disponibles</p>
           </div>

        ))}
        {/* <div className={`${styles.card} ${styles.moreCard}`}>
          <span>Autres services …</span>
        </div> */}
      </div> 

    <div className="flex justify-end mt-6">
    <Link
    href="/besoins/annonces"
    className="bg-[#0CB2D4] text-white px-6 py-2 rounded-full shadow-md hover:bg-[#0AA0C0] transition duration-300"
    >
    Suivant <ArrowForwardIcon style={{ fontSize: 18, color: "white" }} />
   </Link>
   </div>

    </section>
  );
}