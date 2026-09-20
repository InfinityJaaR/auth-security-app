import Link from "next/link";

export default function DashboardPage() {
  return <><h1>Todo en orden.</h1><p>Este es tu panel privado. La sesión se valida en servidor antes de renderizar esta ruta.</p><div className="grid"><section className="panel metric"><span className="eyebrow">01 · Sesión</span><h2>Protegida</h2><p>Cookie httpOnly, secure en producción y SameSite Lax.</p></section><section className="panel metric"><span className="eyebrow">02 · Acceso</span><h2>RLS activo</h2><p>Los datos deben pertenecer al usuario autenticado.</p></section><section className="panel metric"><span className="eyebrow">03 · Cuenta</span><h2><Link className="text-link" href="/profile">Ver perfil →</Link></h2><p>Consulta la identidad asociada a esta sesión.</p></section></div></>;
}
