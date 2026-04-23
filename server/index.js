// Load environment variables from .env.local or .env
require("dotenv").config({ path: require("path").resolve(__dirname, "../.env.local") });
require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });

const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");
const { Resend } = require("resend");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Supabase Admin Client
const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || "").trim();
const serviceRoleKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim();
const adminPassword = (process.env.ADMIN_DASHBOARD_PASSWORD || process.env.VITE_ADMIN_DASHBOARD_PASSWORD || process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_PASSWORD || "").trim();
const resendApiKey = (process.env.RESEND_API_KEY || "").trim();
const formsToEmail = (process.env.FORMS_TO_EMAIL || "applyace0@gmail.com").trim();
const formsFromEmail = (process.env.FORMS_FROM_EMAIL || "ApplyAce Forms <onboarding@resend.dev>").trim();

console.log("[Server] Environment check:", {
  hasSupabaseUrl: !!supabaseUrl,
  hasServiceRoleKey: !!serviceRoleKey,
  hasAdminPassword: !!adminPassword,
  hasResendApiKey: !!resendApiKey,
  supabaseUrlLength: supabaseUrl.length,
  serviceRoleKeyLength: serviceRoleKey.length,
});

let supabaseAdmin = null;
let resend = null;

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

if (resendApiKey) {
  resend = new Resend(resendApiKey);
} else {
  console.warn("[Server] Missing RESEND_API_KEY. Form email notifications are disabled.");
}

function safeString(value, maxLen = 5000) {
  if (value === null || value === undefined) return "";
  return String(value).slice(0, maxLen);
}

function buildHtml(title, payload) {
  const rows = Object.entries(payload || {})
    .map(([k, v]) => {
      const key = safeString(k, 200);
      const val = safeString(v, 8000).replace(/</g, "&lt;").replace(/>/g, "&gt;");
      return `<tr><td style="padding:10px 12px;border:1px solid #e2e8f0;background:#f8fafc;font-weight:600;">${key}</td><td style="padding:10px 12px;border:1px solid #e2e8f0;background:#ffffff;">${val}</td></tr>`;
    })
    .join("");

  return `<!doctype html>
  <html>
    <body style="margin:0;padding:24px;background:#0b1220;">
      <div style="max-width:720px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid rgba(226,232,240,0.9);">
        <div style="padding:16px 18px;background:linear-gradient(135deg, rgba(250,204,21,0.16), rgba(34,211,238,0.10));border-bottom:1px solid rgba(226,232,240,0.9);">
          <div style="font-size:14px;letter-spacing:.14em;text-transform:uppercase;color:#0f172a;opacity:.75;">ApplyAce</div>
          <div style="font-size:22px;font-weight:800;color:#0b1220;margin-top:4px;">${safeString(title, 120)}</div>
        </div>
        <div style="padding:18px;">
          <table style="border-collapse:collapse;width:100%;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;">
            ${rows}
          </table>
          <div style="margin-top:14px;font-size:12px;color:#475569;">Sent by your website form notifier.</div>
        </div>
      </div>
    </body>
  </html>`;
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

// POST /api/forms/notify
// Sends form details to configured inbox (Resend).
app.post("/api/forms/notify", async (req, res) => {
  try {
    if (!resend) {
      return res.status(503).json({ error: "Email service not configured" });
    }

    const { kind, payload } = req.body || {};
    const kindSafe = safeString(kind, 80) || "Form submission";
    const payloadObj = payload && typeof payload === "object" ? payload : {};

    const subject = `New submission: ${kindSafe}`;

    const result = await resend.emails.send({
      from: formsFromEmail,
      to: formsToEmail,
      subject,
      html: buildHtml(subject, payloadObj),
    });

    res.json({ ok: true, id: result?.data?.id || null });
  } catch (error) {
    console.error("[Forms Notify API]", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`[Server] Admin API server running on port ${PORT}`);
});
