// Load environment variables from .env.local or .env
require("dotenv").config({ path: require("path").resolve(__dirname, "../.env.local") });
require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });

const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Supabase Admin Client
const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || "").trim();
const serviceRoleKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim();
const adminPassword = (process.env.ADMIN_DASHBOARD_PASSWORD || process.env.VITE_ADMIN_DASHBOARD_PASSWORD || process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_PASSWORD || "").trim();

console.log("[Server] Environment check:", {
  hasSupabaseUrl: !!supabaseUrl,
  hasServiceRoleKey: !!serviceRoleKey,
  hasAdminPassword: !!adminPassword,
  supabaseUrlLength: supabaseUrl.length,
  serviceRoleKeyLength: serviceRoleKey.length
});

let supabaseAdmin = null;

if (supabaseUrl && serviceRoleKey && supabaseUrl.length > 0 && serviceRoleKey.length > 0) {
  try {
    supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    });
    console.log("[Server] Supabase admin client initialized");
  } catch (error) {
    console.error("[Server] Failed to create Supabase client:", error.message);
    supabaseAdmin = null;
  }
} else {
  console.warn("[Server] Missing Supabase configuration. API endpoints will not work.");
  console.warn("[Server] Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local");
}

// Admin authentication middleware
const requireAdmin = (req, res, next) => {
  const providedPassword = req.headers["x-admin-password"];
  
  if (!adminPassword) {
    return res.status(500).json({ error: "Admin password not configured" });
  }
  
  if (providedPassword !== adminPassword) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  
  next();
};

// GET /api/admin/stats
app.get("/api/admin/stats", requireAdmin, async (req, res) => {
  if (!supabaseAdmin) {
    return res.status(500).json({ error: "Supabase not configured" });
  }
  try {
    // Get total counts
    const [businessLeadsTotal, businessLeadsNew, internAppsTotal, internAppsNew] = await Promise.all([
      supabaseAdmin.from("business_leads").select("id", { count: "exact", head: true }),
      supabaseAdmin.from("business_leads").select("id", { count: "exact", head: true }).eq("seen", false),
      supabaseAdmin.from("intern_applications").select("id", { count: "exact", head: true }),
      supabaseAdmin.from("intern_applications").select("id", { count: "exact", head: true }).eq("seen", false),
    ]);

    res.json({
      totalBusinessLeads: businessLeadsTotal.count || 0,
      newBusinessLeads: businessLeadsNew.count || 0,
      totalInternApplications: internAppsTotal.count || 0,
      newInternApplications: internAppsNew.count || 0,
    });
  } catch (error) {
    console.error("[Stats API]", error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/admin/business-leads
app.get("/api/admin/business-leads", requireAdmin, async (req, res) => {
  if (!supabaseAdmin) {
    return res.status(500).json({ error: "Supabase not configured" });
  }
  try {
    const { data, error } = await supabaseAdmin
      .from("business_leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    res.json(data || []);
  } catch (error) {
    console.error("[Business Leads API]", error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/admin/intern-applications
app.get("/api/admin/intern-applications", requireAdmin, async (req, res) => {
  if (!supabaseAdmin) {
    return res.status(500).json({ error: "Supabase not configured" });
  }
  try {
    const { data, error } = await supabaseAdmin
      .from("intern_applications")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    res.json(data || []);
  } catch (error) {
    console.error("[Intern Applications API]", error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/admin/mark-seen
app.post("/api/admin/mark-seen", requireAdmin, async (req, res) => {
  if (!supabaseAdmin) {
    return res.status(500).json({ error: "Supabase not configured" });
  }
  try {
    const { table, id } = req.body;

    if (!table || !id) {
      return res.status(400).json({ error: "Missing table or id" });
    }

    if (table !== "business_leads" && table !== "intern_applications") {
      return res.status(400).json({ error: "Invalid table name" });
    }

    const { error } = await supabaseAdmin
      .from(table)
      .update({ seen: true, seen_at: new Date().toISOString() })
      .eq("id", id);

    if (error) throw error;
    res.json({ success: true });
  } catch (error) {
    console.error("[Mark Seen API]", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`[Server] Admin API server running on port ${PORT}`);
});
