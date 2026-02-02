import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

// Helper to get Supabase admin client
function getSupabaseAdmin() {
  const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || "").trim();
  const serviceRoleKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim();

  if (!supabaseUrl || !serviceRoleKey) {
    return null;
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });
}

// Helper to check admin authentication
function requireAdmin(req: VercelRequest): { error?: string } {
  const adminPassword = (
    process.env.ADMIN_DASHBOARD_PASSWORD ||
    process.env.VITE_ADMIN_DASHBOARD_PASSWORD ||
    process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_PASSWORD ||
    ""
  ).trim();

  if (!adminPassword) {
    return { error: "Admin password not configured" };
  }

  const providedPassword = req.headers["x-admin-password"] as string;
  if (providedPassword !== adminPassword) {
    return { error: "Unauthorized" };
  }

  return {};
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-admin-password");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Check admin authentication
  const authCheck = requireAdmin(req);
  if (authCheck.error) {
    return res.status(authCheck.error === "Unauthorized" ? 401 : 500).json({ error: authCheck.error });
  }

  // Get Supabase client
  const supabaseAdmin = getSupabaseAdmin();
  if (!supabaseAdmin) {
    return res.status(500).json({ error: "Supabase not configured" });
  }

  try {
    const { data, error } = await supabaseAdmin
      .from("business_leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return res.status(200).json(data || []);
  } catch (error: any) {
    console.error("[Business Leads API]", error);
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
}
