import Link from "next/link";
import { updatePassword } from "@/app/actions/auth";
import { AuthForm, Field } from "@/components/auth-form";

export default function ResetPasswordPage() {
  return <main className="auth-page"><div className="auth-wrap"><Link className="brand" href="/">SecureDesk</Link><h1>Nueva contraseña.</h1><p>Elige una contraseña de al menos 8 caracteres.</p><AuthForm action={updatePassword} submitLabel="Actualizar contraseña"><Field name="password" label="Nueva contraseña" type="password" autoComplete="new-password" /></AuthForm></div></main>;
}
