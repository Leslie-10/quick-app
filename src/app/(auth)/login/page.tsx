"use client";
import { useSearchParams } from "next/navigation";
import LoginForm from "@/components/LoginForm";
import { withNoAuth } from "@/hooks/HOC";

function LoginPage() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success");

  return (
    <div>
      {success === "1" && (
        <div style={{
          backgroundColor: "#d4edda",
          color: "#155724",
          padding: "12px",
          borderRadius: "6px",
          marginBottom: "20px",
          width: "80%",
          margin: "20px auto",
          textAlign: "center"
        }}>
          ✅ Compte créé avec succès ! Vous pouvez maintenant vous connecter.
        </div>
      )}
      <LoginForm />
    </div>
  );
}

export default withNoAuth(LoginPage);