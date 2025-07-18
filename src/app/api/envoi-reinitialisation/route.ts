// src/app/api/envoi-reinitialisation/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import twilio from "twilio";

const resend = new Resend(process.env.RESEND_API_KEY);
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function POST(request: Request) {
  try {
    const { email, numero } = await request.json();

    // Vérification qu'au moins un champ est fourni
    if (!email && !numero) {
      return NextResponse.json(
        { message: "Email ou numéro de téléphone requis" },
        { status: 400 }
      );
    }
          let emailId = null;

    // Envoi d'email si l'email est fourni
    if (email) {
      const {data, error} = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Réinitialisation de votre mot de passe",
        html:`
          <div style="font-family: sans-serif; padding: 20px;">
            <h2 style="color: #2563eb;">Réinitialisation de mot de passe</h2>
            <p>Cliquez sur le lien ci-dessous pour réinitialiser votre mot de passe :</p>
            <a href="https://votre-site.com/reset-password" 
               style="display: inline-block; padding: 10px 20px; background-color: #2563eb; 
                      color: white; text-decoration: none; border-radius: 5px; margin: 15px 0;">
              Réinitialiser mon mot de passe
            </a>
            <p style="margin-top: 20px; font-size: 0.9em; color: #666;">
              Ce lien est valide pendant 1 heure.<br>
              Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.
            </p>
          </div>
        `,
      });

         if (error) {
        console.error("Erreur Resend:", error);
        throw new Error(`Erreur Resend: ${error.message}`);
      }
      console.log("Email envoyé. ID:", emailId);
    }

    // Envoi de SMS si le numéro est fourni
    if (numero) {
      // Formatage international du numéro (ajoute le + si nécessaire)
      const formattedNumber = numero.startsWith('+') ? numero : `+${numero}`;
      
      // Envoi réel avec Twilio (décommentez pour activer)
      
      // const smsResponse = await twilioClient.messages.create({
      //   body: "Réinitialisation mot de passe: https://votre-site.com/reset-password",
      //   from: process.env.TWILIO_PHONE_NUMBER,
      //   to: formattedNumber
      // });
      // console.log("SMS envoyé. SID:", smsResponse.sid);
      

      // Simulation d'envoi SMS (pour le développement)
    

      const smsResponse = await twilioClient.messages.create({
      body: "Réinitialisation mot de passe: https://votre-site.com/reset-password",
      from: process.env.TWILIO_PHONE_NUMBER!,
      to: formattedNumber,
});

console.log("✅ SMS envoyé. SID:", smsResponse.sid);
      console.log("Contenu: Réinitialisation mot de passe: https://votre-site.com/reset-password");
    }

    return NextResponse.json({
      message: "Lien de réinitialisation envoyé avec succès",
    });
  } catch (error: any) {
    console.error("Erreur:", error);
    return NextResponse.json(
      { 
        message: "Erreur lors de l'envoi",
        error: error.message || "Erreur inconnue" 
      },
      { status: 500 }
    );
  }
}
