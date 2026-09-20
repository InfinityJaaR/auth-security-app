import Link from "next/link";
import { signIn } from "@/app/actions/auth";
import { AuthForm, Field } from "@/components/auth-form";

export default function LoginPage() {
  return <main className="auth-page"><div className="auth-wrap"><Link className="brand" href="/">SecureDesk</Link><h1>Bienvenido de vuelta.</h1><p>Accede a tu espacio seguro.</p><AuthForm action={signIn} submitLabel="Iniciar sesión"><Field name="email" label="Email" type="email" autoComplete="email" /><Field name="password" label="Contraseña" type="password" autoComplete="current-password" /><Link className="text-link" href="/forgot-password">¿Olvidaste tu contraseña?</Link></AuthForm><p>¿No tienes cuenta? <Link className="text-link" href="/register">Regístrate</Link></p></div></main>;
}
