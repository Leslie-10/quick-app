"use client";
import React, { useState } from "react";
import Link from "next/link";
import styles from "@/styles/form.module.css";
import ErrorTooltip from "@/components/ErrorTooltip";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [ville, setVille] = useState("");
  const [quartier, setQuartier] = useState("");
  const [telephone, setTelephone] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [sexe, setSexe] = useState("");
  const [erreurSexe, setErreurSexe] = useState("");
  const [erreurDate, setErreurDate] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [confirmMotDePasse, setConfirmMotDePasse] = useState("");
  const [touched, setTouched] = useState(false);
  const router = useRouter();

  const getDateLimite18ans = () => {
    const aujourdHui = new Date();
    aujourdHui.setFullYear(aujourdHui.getFullYear() - 18);
    const yyyy = aujourdHui.getFullYear();
    const mm = String(aujourdHui.getMonth() + 1).padStart(2, "0");
    const dd = String(aujourdHui.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const getDateMinimale120ans = () => {
    const aujourdHui = new Date();
    aujourdHui.setFullYear(aujourdHui.getFullYear() - 120);
    const yyyy = aujourdHui.getFullYear();
    const mm = String(aujourdHui.getMonth() + 1).padStart(2, "0");
    const dd = String(aujourdHui.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const numeroValide = /^6[25789]\d{7}$/;
  const telephoneValide = numeroValide.test(telephone);
  const nomValide = nom.length >= 2 && !/^\d+$/.test(nom);
  const emailValide = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const villeValide = ville.length >= 2 && !/^\d+$/.test(ville);
  const quartierValide = quartier.length >= 2 && !/^\d+$/.test(quartier);
  const motDePasseValide = motDePasse.length >= 6 && (motDePasse.match(/\d/g)?.length ?? 0) >= 2;
  const passwordsMatch = motDePasse === confirmMotDePasse && confirmMotDePasse.length > 0;

  const formComplet =
    nomValide &&
    emailValide &&
    villeValide &&
    quartierValide &&
    telephoneValide &&
    motDePasseValide &&
    passwordsMatch;

  const calculerAge = (dateString: string) => {
    const aujourdHui = new Date();
    const naissance = new Date(dateString);
    let age = aujourdHui.getFullYear() - naissance.getFullYear();
    const m = aujourdHui.getMonth() - naissance.getMonth();
    if (m < 0 || (m === 0 && aujourdHui.getDate() < naissance.getDate())) {
      age--;
    }
    return age;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    let erreur = false;

    if (!dateNaissance) {
      setErreurDate("La date de naissance est requise.");
      erreur = true;
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(dateNaissance)) {
      setErreurDate("Format de date invalide.");
      erreur = true;
    } else if (calculerAge(dateNaissance) < 18) {
      setErreurDate("Vous devez avoir au moins 18 ans pour vous inscrire.");
      erreur = true;
    } else {
      setErreurDate("");
    }

    if (!sexe) {
      setErreurSexe("Le sexe est requis.");
      erreur = true;
    } else {
      setErreurSexe("");
    }

    if (!formComplet || erreur) return;

    try {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: nom,
        email,
        password: motDePasse,
        phone: telephone,
        birthDate: dateNaissance,
        gender: sexe === 'femme' ? 'F' : 'M',
        city: ville,
        neighborhood: quartier,
      })
    });
    const data = await res.json();

    if (res.ok) {
      router.push("/login"); // Redirige vers la page de connexion avec message de succès
    } else {
      alert(data.error || "Une erreur s’est produite");
    }
  } catch (error) {
    alert("Erreur de connexion au serveur."+error);
  }
  };


  return (
    <div className={styles.registerContainer}>
      <div className={styles.imageSide}></div>
      <form className={styles.formSide} onSubmit={handleSubmit}>
        <div className={styles.header}>
          <h1 className={styles.title}>S'inscrire!</h1>
          <p className={styles.loginText}>
            Avez-vous déjà un compte ?{" "}
            <Link href="/login" className={styles.link}>
              Se connecter
            </Link>
          </p>
        </div>
        {/* Nom */}
        <div className={styles.formGroup} style={{ position: "relative" }}>
          <label className={styles.label} htmlFor="nom">Nom</label>
          <input
            type="text"
            id="nom"
            placeholder="Entrez votre nom  "
            className={styles.input}
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
          <ErrorTooltip
            visible={touched && (!nom || !nomValide)}
            message={!nom ? "Le nom complet est requis." : "Entrez un nom valide (au moins 2 lettres)."}
          />
        </div>

        {/* Email */}
        <div className={styles.formGroup} style={{ position: "relative" }}>
          <label className={styles.label} htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Entrez votre adresse email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <ErrorTooltip
            visible={touched && (!email || !emailValide)}
            message={!email ? "Votre adresse email est requise." : "Entrez une adresse email valide (exemple: nom@gmail.com)."}
          />
        </div>

        {/* Date de naissance */}
        <div className={styles.formGroup} style={{ position: "relative" }}>
          <label className={styles.label} htmlFor="dateNaissance">Date de naissance</label>
          <input
            id="dateNaissance"
            type="date"
            value={dateNaissance}
            onChange={(e) => setDateNaissance(e.target.value)}
            className={styles.input}
            min={getDateMinimale120ans()}
            max={getDateLimite18ans()}
          />
          <ErrorTooltip visible={!!erreurDate} message={erreurDate} />
        </div>

        {/* Téléphone */}
        <div className={styles.formGroup} style={{ position: "relative" }}>
          <label className={styles.label} htmlFor="numero">Numéro de téléphone</label>
          <div className={styles.phoneRow}>
            <div className="flex w-8">
              <img src="/cameroun.jpg" className="w-full" alt="" />
            </div>
            <input
              type="tel"
              id="numero"
              placeholder="6XX-XXX-XXX"
              className={styles.input}
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
            />
          </div>
          <ErrorTooltip
            visible={touched && (!telephone || !telephoneValide)}
            message={
              !telephone
                ? "Le numéro est requis."
                : "Numéro invalide. Il doit commencer par 62, 65, 67, 68 ou 69 et avoir 9 chiffres."
            }
          />
        </div>

        {/* Sexe */}
        <div className={styles.formGroup} style={{ position: "relative" }}>
          <label className={styles.label}>Sexe</label>
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="sexe"
                value="homme"
                checked={sexe === "homme"}
                onChange={(e) => setSexe(e.target.value)}
              /> Homme
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="sexe"
                value="femme"
                checked={sexe === "femme"}
                onChange={(e) => setSexe(e.target.value)}
              /> Femme
            </label>
          </div>
          <ErrorTooltip visible={!!erreurSexe} message={erreurSexe} />
        </div>

        {/* Ville & Quartier */}
        <div className={styles.row}>
          <div style={{ flex: 1, position: "relative" }}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="ville">Adresse</label>
              <input
                type="text"
                id="ville"
                placeholder="Ville de résidence"
                className={styles.input}
                value={ville}
                onChange={(e) => setVille(e.target.value)}
              />
              <ErrorTooltip
                visible={touched && (!ville || !villeValide)}
                message={!ville ? "La ville est requise." : "Entrez une ville valide."}
              />
            </div>
          </div>
          <div style={{ flex: 1, position: "relative" }}>
            <input
              type="text"
              id="quartier"
              placeholder="Quartier de résidence"
              className={styles.input}
              value={quartier}
              onChange={(e) => setQuartier(e.target.value)}
            />
            <ErrorTooltip
              visible={touched && (!quartier || !quartierValide)}
              message={!quartier ? "Le quartier est requis." : "Entrez un quartier valide."}
            />
          </div>
        </div>

        {/* Mot de passe */}
        <div className={styles.passwordWrapper} style={{ position: "relative" }}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="motDePasse">Mot de passe</label>
            <input
              id="motDePasse"
              type="password"
              placeholder="Mot de passe (Au moins 6 caractères et 2 chiffres)"
              className={`${styles.input} ${
                touched && !motDePasseValide ? styles.inputError : ""
              }`}
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
            />
            <ErrorTooltip
              visible={touched && (!motDePasse || !motDePasseValide)}
              message={
                !motDePasse
                  ? "Le mot de passe est requis."
                  : "Au moins 6 caractères et 2 chiffres."
              }
            />
          </div>
        </div>

        {/* Confirmation */}
        <div className={styles.passwordWrapper} style={{ position: "relative" }}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="confirmMotDePasse">Confirmation du mot de passe</label>
            <input
              id="confirmMotDePasse"
              type="password"
              placeholder="Confirmez votre mot de passe"
              className={`${styles.input} ${
                touched && !passwordsMatch ? styles.inputError : ""
              }`}
              value={confirmMotDePasse}
              onChange={(e) => setConfirmMotDePasse(e.target.value)}
            />
            <ErrorTooltip
              visible={touched && (!confirmMotDePasse || !passwordsMatch)}
              message={
                !confirmMotDePasse
                  ? "Veuillez confirmer le mot de passe."
                  : "Les mots de passe ne correspondent pas."
              }
            />
          </div>
        </div>

        <button type="submit" className={styles.submitBtn}>
          Créer un compte
        </button>
      </form>
    </div>
  );
};


export default RegisterForm;