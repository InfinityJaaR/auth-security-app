import Link from "next/link";
import { signOut } from "@/app/actions/auth";
import { createClient } from "@/lib/supabase/server";

export default async function ProtectedLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return <div className="shell"><header className="topbar"><Link className="brand" href="/dashboard">SecureDesk</Link><nav className="nav"><Link href="/dashboard">Dashboard</Link><Link href="/profile">Perfil</Link><form action={signOut}><button className="logout" type="submit">Cerrar sesión</button></form></nav></header><div className="dashboard"><p className="eyebrow">Sesión verificada</p>{user && <p>Conectado como <strong>{user.email}</strong></p>}{children}</div></div>;
}
