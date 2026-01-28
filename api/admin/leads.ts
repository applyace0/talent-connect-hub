import type { IncomingMessage, ServerResponse } from "http";
import { supabaseAdmin } from "../supabaseAdminClient";

export default async function handler(req: IncomingMessage & { method?: string }, res: ServerResponse) {
  if (!supabaseAdmin) {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: "Supabase admin client not configured" }));
    return;
  }

  // Enable CORS / JSON
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,PUT,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.statusCode = 200;
    res.end();
    return;
  }

  if (req.method === "GET") {
    const [businessRes, internRes] = await Promise.all([
      supabaseAdmin.from("business_leads").select("*").order("created_at", { ascending: false }),
      supabaseAdmin.from("intern_applications").select("*").order("created_at", { ascending: false }),
    ]);

    if (businessRes.error || internRes.error) {
      res.statusCode = 500;
      res.end(
        JSON.stringify({
          error: businessRes.error?.message || internRes.error?.message || "Failed to load leads",
        })
      );
      return;
    }

    res.statusCode = 200;
    res.end(
      JSON.stringify({
        businessLeads: businessRes.data ?? [],
        internApplications: internRes.data ?? [],
      })
    );
    return;
  }

  if (req.method === "PUT") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", async () => {
      try {
        const parsed = JSON.parse(body || "{}") as { type?: string; id?: string; status?: string };
        const { type, id, status } = parsed;

        if (!type || !id || !status) {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: "Missing type, id, or status" }));
          return;
        }

        const tableName = type === "business" ? "business_leads" : "intern_applications";
        const { error } = await supabaseAdmin.from(tableName).update({ status }).eq("id", id);
        if (error) {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: error.message }));
          return;
        }

        res.statusCode = 200;
        res.end(JSON.stringify({ success: true }));
      } catch (err: any) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: err?.message ?? "Invalid JSON" }));
      }
    });
    return;
  }

  res.statusCode = 405;
  res.end(JSON.stringify({ error: "Method not allowed" }));
}

