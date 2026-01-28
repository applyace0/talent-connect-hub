import { createClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase Admin Client
 * 
 * WARNING: This uses SUPABASE_SERVICE_ROLE_KEY which bypasses RLS.
 * NEVER import or use this in client-side code.
 * Only use in API routes or server-side code.
 */

// Read from environment variables (process.env for server-side Node.js context)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string | undefined;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string | undefined;

if (!supabaseUrl || !serviceRoleKey) {
  // eslint-disable-next-line no-console
  console.warn(
    "[Supabase Admin] NEXT_PUBLIC_SUPABASE_URL and/or SUPABASE_SERVICE_ROLE_KEY are not set. Admin APIs will fail."
  );
}

export const supabaseAdmin = supabaseUrl && serviceRoleKey
  ? createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    })
  : (null as any);

