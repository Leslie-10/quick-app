"use client";
import { useState } from "react";
import styles from "@/styles/forgot.module.css";

export default function MotDePasseOublie() {
  const [email, setEmail] = useState("");
  const [numero, setNumero] = useState("");
  const [envoye, setEnvoye] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Ajout pour l'état de chargement

  const [errors, setErrors] = useState({
    email: "",
    numero: "",
    general: "",
  });

  const validateEmail = (val: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const validatePhone = (val: string) =>
    /^6[25789]\d{7}$/.test(val);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const hasEmail = email.trim() !== "";
    const hasNumero = numero.trim() !== "";
    const emailValid = hasEmail && validateEmail(email);
    const numeroValid = hasNumero && validatePhone(numero);

    const newErrors = {
      email: "",
      numero: "",
      general: "",
    };

    if (!hasEmail && !hasNumero) {
      newErrors.general = "Veuillez remplir au moins un des deux champs.";
    }

    if (hasEmail && !emailValid) {
      newErrors.email = "Email invalide.";
    }

    if (hasNumero && !numeroValid) {
      newErrors.numero = "Numéro invalide. Il doit commencer par 62, 65, 67, 68 ou 69 et avoir 9 chiffres.";
    }

    setErrors(newErrors);

    const noError =
      !newErrors.general && !newErrors.email && !newErrors.numero;

    if (noError) {
      setIsLoading(true); // Activer le chargement
      
      fetch("/api/envoi-reinitialisation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, numero }),
      })
      .then(async (res) => {
        // Vérifier si la réponse est JSON
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          return res.json();
        } else {
          // Si ce n'est pas du JSON, lire comme texte
          const text = await res.text();
          return { message: text };
        }
      })
      .then((data) => {
        console.log("✅ Réponse du serveur:", data);
        setEnvoye(true);
      })
      .catch((err) => {
        console.error("❌ Erreur d'envoi :", err);
        setErrors(prev => ({
          ...prev,
          general: "Erreur lors de la communication avec le serveur"
        }));
      })
      .finally(() => {
        setIsLoading(false); // Désactiver le chargement
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Récupération du mot de passe</h1>

        {!envoye ? (
          <form className={styles.form} onSubmit={handleSubmit}>
            <p className={styles.subtitle}>
              Veuillez entrer votre email ou votre numéro de téléphone pour réinitialiser votre mot de passe.
            </p>

            {errors.general && (
              <p className={styles.error}>{errors.general}</p>
            )}

            <label className={styles.label}>Email</label>
            <input
              type="email"
              placeholder="ex: nom@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}

            <label className={styles.label}>Numéro de téléphone</label>
            <input
              type="tel"
              placeholder="ex: 6XXXXXXXX"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              className={styles.input}
            />
            {errors.numero && <p className={styles.error}>{errors.numero}</p>}
            <div className={styles.buttonRow}>
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={() => window.history.back()}
              >
                Retour
              </button>

              <button 
                type="submit" 
                className={styles.primaryButton}
                disabled={isLoading} // Désactiver pendant le chargement
              >
                {isLoading ? "Envoi en cours..." : "Réinitialiser"}
              </button>
            </div>
          </form>
        ) : (
          <p className={styles.success}>
            ✅ Si les informations sont valides, un lien de réinitialisation vous a été envoyé par email ou SMS.
          </p>
        )}
      </div>
    </div>
  );
}