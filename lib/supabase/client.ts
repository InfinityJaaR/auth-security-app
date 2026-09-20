import { createBrowserClient } from "@supabase/ssr";
import { env } from "@/lib/env";

// Use this client only for public, non-auth realtime/browser interactions.
// Protected auth operations stay in Server Actions so session tokens are never
// placed in localStorage or read by application JavaScript.
export function createClient() {
  return createBrowserClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}
