import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabaseClient";

type InternApplication = {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  area_of_interest: string;
  seen: boolean;
  seen_at: string | null;
};

const AdminInternsPage = () => {
  const [interns, setInterns] = useState<InternApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "new">("all");
  const [search, setSearch] = useState("");
  const { toast } = useToast();

  const loadInterns = async () => {
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

      const response = await fetch("/api/admin/intern-applications", {
        headers: {
          "x-admin-password": adminPassword,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to load applications");
      }

      const data = await response.json();
      setInterns(data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to load intern applications.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInterns();

    // Subscribe to realtime updates
    if (!supabase) return;

    const channel = supabase
      .channel("intern_applications_changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "intern_applications",
        },
        (payload) => {
          toast({
            title: "New Application Received",
            description: `New application from ${payload.new.full_name}`,
          });
          
          // Request browser notification if permission granted
          if (Notification.permission === "granted") {
            new Notification("New Intern Application", {
              body: `New application from ${payload.new.full_name}`,
              icon: "/favicon.ico",
            });
          }
          
          loadInterns();
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
          table: "intern_applications",
          id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to mark as seen");
      }

      setInterns((prev) =>
        prev.map((intern) =>
          intern.id === id ? { ...intern, seen: true, seen_at: new Date().toISOString() } : intern
        )
      );

      toast({
        title: "Marked as seen",
        description: "Application has been marked as seen.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to mark application as seen.",
        variant: "destructive",
      });
    }
  };

  const exportCSV = () => {
    const filtered = filteredInterns;
    const headers = ["Created At", "Full Name", "Email", "Area of Interest", "Seen"];
    const rows = filtered.map((intern) => [
      new Date(intern.created_at).toLocaleString(),
      intern.full_name,
      intern.email,
      intern.area_of_interest,
      intern.seen ? "Yes" : "No",
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `intern-applications-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: "Intern applications exported to CSV.",
    });
  };

  const filteredInterns = interns.filter((intern) => {
    const matchesFilter = filter === "all" || !intern.seen;
    const matchesSearch =
      intern.full_name.toLowerCase().includes(search.toLowerCase()) ||
      intern.email.toLowerCase().includes(search.toLowerCase()) ||
      intern.area_of_interest.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="section-container py-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Intern Applications</h1>
          <p className="text-sm text-muted-foreground">Review and manage intern applications</p>
        </div>
        <Button onClick={exportCSV} variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Input
          placeholder="Search name, email, interest..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-64"
        />
        <Select value={filter} onValueChange={(v) => setFilter(v as "all" | "new")}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Applications</SelectItem>
            <SelectItem value="new">New Only</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-hidden rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-32">Created</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Area of Interest</TableHead>
              <TableHead className="w-24">Seen</TableHead>
              <TableHead className="w-32 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-sm text-muted-foreground">
                  Loading applications...
                </TableCell>
              </TableRow>
            )}

            {!loading && filteredInterns.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-sm text-muted-foreground">
                  No applications found.
                </TableCell>
              </TableRow>
            )}

            {!loading &&
              filteredInterns.map((intern) => (
                <TableRow key={intern.id}>
                  <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                    {new Date(intern.created_at).toLocaleString()}
                  </TableCell>
                  <TableCell className="font-medium">{intern.full_name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{intern.email}</TableCell>
                  <TableCell>{intern.area_of_interest}</TableCell>
                  <TableCell>
                    {intern.seen ? (
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
                    {!intern.seen && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => markAsSeen(intern.id)}
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

export default AdminInternsPage;
