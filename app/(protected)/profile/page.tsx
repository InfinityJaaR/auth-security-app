import { createClient } from "@/lib/supabase/server";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return <><h1>Tu perfil.</h1><section className="panel"><p><strong>Email</strong></p><p>{user?.email}</p><p><strong>ID interno</strong></p><p>{user?.id}</p><p className="message success">Esta información procede de la sesión validada en el servidor.</p></section></>;
}
