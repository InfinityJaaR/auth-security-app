import Link from "next/link";
import { signUp } from "@/app/actions/auth";
import { AuthForm, Field } from "@/components/auth-form";

export default function RegisterPage() {
  return <main className="auth-page"><div className="auth-wrap"><Link className="brand" href="/">SecureDesk</Link><h1>Empieza con una cuenta.</h1><p>Tu contraseña se valida y procesa exclusivamente en el servidor.</p><AuthForm action={signUp} submitLabel="Crear cuenta"><Field name="email" label="Email" type="email" autoComplete="email" /><Field name="password" label="Contraseña" type="password" autoComplete="new-password" /></AuthForm><p>¿Ya tienes cuenta? <Link className="text-link" href="/login">Inicia sesión</Link></p></div></main>;
}
