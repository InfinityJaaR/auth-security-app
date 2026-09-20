import Link from "next/link";

export default function Home() {
  return <main className="shell"><header className="topbar"><span className="brand">SecureDesk</span><nav className="nav"><Link href="/login">Iniciar sesión</Link><Link className="button" href="/register">Crear cuenta</Link></nav></header><section className="hero"><div><span className="eyebrow">Servidor primero · Privacidad por diseño</span><h1>Tu espacio digital, bajo control.</h1><p>Una base de autenticación profesional con sesiones protegidas, validación de servidor y una experiencia clara.</p></div><div className="panel"><span className="eyebrow">Seguridad activa</span><h2>Menos exposición. Más confianza.</h2><p>Las credenciales viajan por HTTPS y las sesiones se mantienen en cookies protegidas, sin tokens en localStorage.</p><Link className="text-link" href="/register">Comenzar ahora →</Link></div></section></main>;
}
