"use client";
import React, { useState } from "react";
import Link from "next/link";
import styles from "@/styles/login.module.css";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [touched, setTouched] = useState(false);
  const [option, setOption] = useState ("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const motDePasseValide = motDePasse.length >= 6;

  const formComplet = emailRegex && motDePasseValide;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);

    if (formComplet) {
     try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        motDePasse: motDePasse,
      })
    });

    const data = await res.json();

    if (res.ok) {
      router.push("/services"); // Redirige vers la page de services
    } else {
      alert(data.message || "Une erreur s’est produite");
    }
  } catch (error) {
    alert("Erreur de connexion au serveur."+error);
  }           
                    
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.formSection} onSubmit={handleSubmit}>
        <h1 className={styles.title}>HELLO!</h1>
        <p className={styles.subtitle}>Welcome back! Veuillez entrer vos informations.</p>

        <label className={styles.label}>Email</label>
        <input
          type="text"
          placeholder="Entrez votre email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`${styles.input} ${touched && !emailRegex ? styles.inputError : ""}`}
        />
          {touched && !email && <p className={styles.errorText}>L'email est requis</p>}
        {touched && email && !emailRegex && (
          <p className={styles.errorText}>Email invalide.</p>
        )}

        <label className={styles.label}>Mot de passe</label>
        <input
          type="Mot de passe"
          placeholder="******"
          value={motDePasse}
          onChange={(e) => setMotDePasse(e.target.value)}
          className={`${styles.input} ${touched && !motDePasseValide ? styles.inputError : ""}`}
        />
           {touched && !motDePasse && (
          <p className={styles.errorText}>Le mot de passe est requis.</p>
        )}
        {touched && motDePasse && !motDePasseValide && (
          <p className={styles.errorText}>Mot de passe trop court (Au moins 6 caractères et 2 chiffres).</p>
        )}
         
        <div
        className={styles.forgotPasswordContainer}>
        <Link href="/mot-de-passe-oublie" 
        className={styles.forgotPasswordLink}>
          Mot de passe oublié ?
        </Link>
        </div>
  

        <button className={styles.signInBtn}>Se connecter</button>

        <p className={styles.footerText}>
          Vous n'avez pas de compte ? 
          <Link href="/register"
           className={styles.link}>S'inscrire !
         </Link>
        </p>
      </form>
 
      <div className={styles.imageSection}>
        <div className={styles.circle}></div>
      </div>
    </div>
  );
};

export default LoginForm;