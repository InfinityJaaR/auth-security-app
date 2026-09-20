import Link from "next/link";
import { requestPasswordReset } from "@/app/actions/auth";
import { AuthForm, Field } from "@/components/auth-form";

export default function ForgotPasswordPage() {
  return <main className="auth-page"><div className="auth-wrap"><Link className="brand" href="/">SecureDesk</Link><h1>Recupera el acceso.</h1><p>Te enviaremos instrucciones si existe una cuenta asociada.</p><AuthForm action={requestPasswordReset} submitLabel="Enviar instrucciones"><Field name="email" label="Email" type="email" autoComplete="email" /></AuthForm><p><Link className="text-link" href="/login">Volver al inicio de sesión</Link></p></div></main>;
}
