"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { env } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";

const credentialsSchema = z.object({
  email: z.string().trim().email("Introduce un email válido."),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres.").max(72),
});

const emailSchema = z.object({ email: z.string().trim().email("Introduce un email válido.") });

type ActionState = { error?: string; success?: string };

async function assertSameOrigin() {
  const requestHeaders = await headers();
  const origin = requestHeaders.get("origin");
  if (origin && origin !== env.NEXT_PUBLIC_SITE_URL) {
    throw new Error("Solicitud no permitida.");
  }
}

export async function signIn(_state: ActionState, formData: FormData): Promise<ActionState> {
  try {
    await assertSameOrigin();
    const result = credentialsSchema.safeParse(Object.fromEntries(formData));
    if (!result.success) return { error: result.error.issues[0]?.message ?? "Datos inválidos." };

    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword(result.data);
    if (error) return { error: "No se pudo iniciar sesión. Revisa tus credenciales." };
  } catch {
    return { error: "No se pudo completar la solicitud." };
  }
  redirect("/dashboard");
}

export async function signUp(_state: ActionState, formData: FormData): Promise<ActionState> {
  try {
    await assertSameOrigin();
    const result = credentialsSchema.safeParse(Object.fromEntries(formData));
    if (!result.success) return { error: result.error.issues[0]?.message ?? "Datos inválidos." };

    const supabase = await createClient();
    const { error } = await supabase.auth.signUp({
      ...result.data,
      options: { emailRedirectTo: `${env.NEXT_PUBLIC_SITE_URL}/auth/callback` },
    });
    if (error) return { error: "No se pudo crear la cuenta. Comprueba los datos e inténtalo de nuevo." };
    return { success: "Cuenta creada. Revisa tu email para verificarla antes de iniciar sesión." };
  } catch {
    return { error: "No se pudo completar la solicitud." };
  }
}

export async function signOut() {
  await assertSameOrigin();
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export async function requestPasswordReset(_state: ActionState, formData: FormData): Promise<ActionState> {
  try {
    await assertSameOrigin();
    const result = emailSchema.safeParse(Object.fromEntries(formData));
    if (!result.success) return { error: "Introduce un email válido." };
    const supabase = await createClient();
    await supabase.auth.resetPasswordForEmail(result.data.email, {
      redirectTo: `${env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/reset-password`,
    });
    return { success: "Si existe una cuenta con ese email, recibirás instrucciones para recuperar el acceso." };
  } catch {
    return { error: "No se pudo completar la solicitud." };
  }
}

export async function updatePassword(_state: ActionState, formData: FormData): Promise<ActionState> {
  try {
    await assertSameOrigin();
    const password = formData.get("password");
    const result = z.string().min(8).max(72).safeParse(password);
    if (!result.success) return { error: "La contraseña debe tener entre 8 y 72 caracteres." };
    const supabase = await createClient();
    const { error } = await supabase.auth.updateUser({ password: result.data });
    if (error) return { error: "No se pudo actualizar la contraseña." };
  } catch {
    return { error: "No se pudo completar la solicitud." };
  }
  redirect("/dashboard");
}
