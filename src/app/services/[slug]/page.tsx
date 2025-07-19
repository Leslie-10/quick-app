"use client";

import { notFound } from 'next/navigation';
import Link from 'next/link';
import styles from '@/styles/ServiceDetail.module.css';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { withAuth } from '@/hooks/HOC';

const electriciens = [
  { id:'electricien-1' , name: "Jean Dupont",image: "",  },
  { id: 'electricien-2', name: "Marie Lambert", image: "",  },
  { id: 'electricien-3', name: "Jacques Toko", image: "",  },
  { id: 'electricien-4', name: "Jean Dupont", image: "",  },
  { id: 'electricien-5', name: "Jean Dupont", image: "",  },
  { id: 'electricien-6', name: "Jean Dupont", image: "",  },
  // ... 
];

const servicesData: Record<string, { title: string; description: string; options: number; image: string }> = {
  electricite: {
    title: 'Électricité',
    description: 'Retrouvez les meilleurs électriciens près de chez vous pour vos installations, dépannages et entretiens.',
    options: 30,
    image: '/images/services/electricite.jpg',
  },
  
   gardeEnfants: {
    title: "Garde d’enfants",
    description: "Des nounous fiables et attentionnées pour s'occuper de vos enfants à domicile ou à la sortie d'école.",
    options: 40,
     image:"",
  },

  plomberie: {
    title: "Plomberie",
    description: "Des plombiers qualifiés pour vos fuites d’eau, débouchages, installations de sanitaires et bien plus.",
    options: 17,
     image:"",
  },
  entretien: {
    title: "Service d’entretien",
    description: "Ménage, repassage, nettoyage à domicile ou en entreprise. Trouvez du personnel qualifié rapidement.",
    options: 21,
     image:"",
  },

  bricolage: {
    title: "Bricolage",
    description: "Pour tous vos petits travaux de réparation ou d’installation, nos bricoleurs sont à votre disposition.",
    options: 19,
     image:"",
  },

  demenagement: {
    title: "Déménagement",
    description: "Besoin d'aide pour déménager ? Des aides proches de chez vous et disponibles rapidement.",
    options: 27,
     image:"",
  },

  coursParticuliers: {
    title: "Cours particuliers",
    description: "Des professeurs et étudiants qualifiés pour aider vos enfants dans toutes les matières, à domicile ou en ligne.",
    options: 21,
    image:"",
  },

};

type Props = {
  params: { slug: string };
};

function ServiceDetailPage({ params }: Props) {
  const service = servicesData[params.slug];
  const sliderRef = useRef<HTMLDivElement>(null);
  const autoScrollInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  if (!service) return notFound();

  useEffect(() => {
  const startAutoScroll = () => {
    autoScrollInterval.current = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.scrollBy({ left: 200, behavior: 'smooth' });
        
        // Revenir au début si on arrive à la fin
        if (sliderRef.current.scrollLeft + sliderRef.current.clientWidth >= 
            sliderRef.current.scrollWidth - 10) {
          sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        }
      }
    }, 3000); // Défile toutes les 3 secondes
  };

  startAutoScroll();

  // Nettoyage obligatoire pour éviter les fuites mémoire
  return () => {
    if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current);
    }
  };
}, []); 

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <main className={styles.page} style={{ backgroundColor: 'white' }}>
      {/* Moitié supérieure */}
      <div className={styles.topSection}>
        <div className={styles.imageContainer}>
          <Image
            src={service.image}
            alt={service.title}
            className={styles.serviceImage}
            width={220}
            height={220}
            priority
          />
        </div>
        <div className={styles.detailsContainer}>
          <h1 className={styles.title}>{service.title}</h1>
          <p className={styles.description}>{service.description}</p>
          <p className={styles.options}>{service.options} options disponibles</p>
          <Link href="/services" className={styles.backButton}>
             Retour
          </Link>
        </div>
      </div>

      {/* Moitié inférieure */}
      <div className={styles.bottomSection}>
        <h2 className={styles.subtitle}>Électriciens</h2>
        <div className={styles.sliderContainer}>
          <button className={styles.navButton} onClick={() => scroll('left')}>
            &lt;
          </button>

            <div className={styles.slider} ref={sliderRef}>
          {electriciens.map((electricien) => (
        <Link
             key={electricien.id}
             href={`/prestataires/${electricien.id}`}
              className={styles.card}
        >
          <div className={styles.cardImage}>
        <Image
          src={electricien.image}
          alt={`Photo de ${electricien.name}`}
          width={180}
          height={180}
          className={styles.providerImage}
        />
         </div>
          <div className={styles.cardBody}>
            <p className={styles.cardTitle}>
                 <h3>{electricien.name}</h3>
            </p>
          </div>
       </Link>
     ))}
   </div>
          
          <button className={styles.navButton} onClick={() => scroll('right')}>
            &gt;
          </button>
        </div>
      </div>
    </main>
  );
}

export default withAuth(ServiceDetailPage, "AUTHORIZED", ["client", "prestataire", "les_deux"]);