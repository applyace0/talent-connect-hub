import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabaseClient";

type BusinessLead = {
  id: string;
  created_at: string;
  company_name: string;
  contact_name: string;
  email: string;
  seen: boolean;
  seen_at: string | null;
};

const AdminLeadsPage = () => {
  const [leads, setLeads] = useState<BusinessLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "new">("all");
  const [search, setSearch] = useState("");
  const { toast } = useToast();

  const loadLeads = async () => {
    try {
      setLoading(true);
      const adminPassword = import.meta.env.VITE_ADMIN_DASHBOARD_PASSWORD || import.meta.env.NEXT_PUBLIC_ADMIN_DASHBOARD_PASSWORD;
      
      if (!adminPassword) {
        toast({
          title: "Configuration Error",
          description: "Admin password not configured.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      const response = await fetch("/api/admin/business-leads", {
        headers: {
          "x-admin-password": adminPassword,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to load leads");
      }

      const data = await response.json();
      setLeads(data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to load business leads.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();

    // Subscribe to realtime updates
    if (!supabase) return;

    const channel = supabase
      .channel("business_leads_changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "business_leads",
        },
        (payload) => {
          toast({
            title: "New Lead Received",
            description: `New business lead from ${payload.new.company_name}`,
          });
          
          // Request browser notification if permission granted
          if (Notification.permission === "granted") {
            new Notification("New Business Lead", {
              body: `New lead from ${payload.new.company_name}`,
              icon: "/favicon.ico",
            });
          }
          
          loadLeads();
        }
      )
      .subscribe();

    // Request notification permission
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  const markAsSeen = async (id: string) => {
    try {
      const adminPassword = import.meta.env.VITE_ADMIN_DASHBOARD_PASSWORD || import.meta.env.NEXT_PUBLIC_ADMIN_DASHBOARD_PASSWORD;
      
      if (!adminPassword) {
        toast({
          title: "Configuration Error",
          description: "Admin password not configured.",
          variant: "destructive",
        });
        return;
      }

      const response = await fetch("/api/admin/mark-seen", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": adminPassword,
        },
        body: JSON.stringify({
          table: "business_leads",
          id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to mark as seen");
      }

      setLeads((prev) =>
        prev.map((lead) =>
          lead.id === id ? { ...lead, seen: true, seen_at: new Date().toISOString() } : lead
        )
      );

      toast({
        title: "Marked as seen",
        description: "Lead has been marked as seen.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to mark lead as seen.",
        variant: "destructive",
      });
    }
  };

  const exportCSV = () => {
    const filtered = filteredLeads;
    const headers = ["Created At", "Company Name", "Contact Name", "Email", "Seen"];
    const rows = filtered.map((lead) => [
      new Date(lead.created_at).toLocaleString(),
      lead.company_name,
      lead.contact_name,
      lead.email,
      lead.seen ? "Yes" : "No",
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `business-leads-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: "Business leads exported to CSV.",
    });
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesFilter = filter === "all" || !lead.seen;
    const matchesSearch =
      lead.company_name.toLowerCase().includes(search.toLowerCase()) ||
      lead.contact_name.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="section-container py-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Business Leads</h1>
          <p className="text-sm text-muted-foreground">Manage and review business lead requests</p>
        </div>
        <Button onClick={exportCSV} variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Input
          placeholder="Search company, contact, email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-64"
        />
        <Select value={filter} onValueChange={(v) => setFilter(v as "all" | "new")}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Leads</SelectItem>
            <SelectItem value="new">New Only</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-hidden rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-32">Created</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="w-24">Seen</TableHead>
              <TableHead className="w-32 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-sm text-muted-foreground">
                  Loading leads...
                </TableCell>
              </TableRow>
            )}

            {!loading && filteredLeads.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-sm text-muted-foreground">
                  No leads found.
                </TableCell>
              </TableRow>
            )}

            {!loading &&
              filteredLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                    {new Date(lead.created_at).toLocaleString()}
                  </TableCell>
                  <TableCell className="font-medium">{lead.company_name}</TableCell>
                  <TableCell>{lead.contact_name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{lead.email}</TableCell>
                  <TableCell>
                    {lead.seen ? (
                      <Badge variant="outline" className="flex w-fit items-center gap-1">
                        <Eye className="h-3 w-3" />
                        Seen
                      </Badge>
                    ) : (
                      <Badge variant="default" className="flex w-fit items-center gap-1">
                        <EyeOff className="h-3 w-3" />
                        New
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {!lead.seen && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => markAsSeen(lead.id)}
                      >
                        Mark as Seen
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminLeadsPage;
