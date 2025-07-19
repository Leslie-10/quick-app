"use client";

import RegisterForm from "@/components/RegisterForm";
import { withNoAuth } from "@/hooks/HOC";

function RegisterPage() {
  return <RegisterForm />;
}

export default withNoAuth(RegisterPage);