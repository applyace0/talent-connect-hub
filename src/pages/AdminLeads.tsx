import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/lib/supabaseClient";

type BusinessLead = {
  id: string;
  created_at: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string | null;
  role_title: string;
  department: string | null;
  skills_required: string | null;
  duration: string | null;
  location: string | null;
  start_date: string | null;
  notes: string | null;
  status: string;
};

type InternApplication = {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string | null;
  area_of_interest: string;
  education_level: string | null;
  cv_url: string | null;
  motivation: string;
  status: string;
};

const statusOptions = ["new", "contacted", "shortlisted", "placed", "hired", "rejected"] as const;

const AdminLeads = () => {
  const [businessLeads, setBusinessLeads] = useState<BusinessLead[]>([]);
  const [internApps, setInternApps] = useState<InternApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"business" | "intern">("business");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedLead, setSelectedLead] = useState<BusinessLead | InternApplication | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!supabase) return;

      setLoading(true);

      const [businessRes, internRes] = await Promise.all([
        supabase.from("business_leads").select("*").order("created_at", { ascending: false }),
        supabase.from("intern_applications").select("*").order("created_at", { ascending: false }),
      ]);

      if (!businessRes.error && businessRes.data) {
        setBusinessLeads(businessRes.data as BusinessLead[]);
      }
      if (!internRes.error && internRes.data) {
        setInternApps(internRes.data as InternApplication[]);
      }

      setLoading(false);
    };

    load();
  }, []);

  const filteredBusiness = businessLeads.filter((lead) => {
    const matchesSearch =
      lead.company_name.toLowerCase().includes(search.toLowerCase()) ||
      lead.contact_name.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredInterns = internApps.filter((app) => {
    const matchesSearch =
      app.full_name.toLowerCase().includes(search.toLowerCase()) ||
      app.email.toLowerCase().includes(search.toLowerCase()) ||
      app.area_of_interest.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateStatus = async (type: "business" | "intern", id: string, status: string) => {
    if (!supabase) return;

    const tableName = type === "business" ? "business_leads" : "intern_applications";
    const { error } = await supabase.from(tableName).update({ status }).eq("id", id);
    if (error) {
      // eslint-disable-next-line no-console
      console.error("Failed to update status", error);
      return;
    }

    if (type === "business") {
      setBusinessLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    } else {
      setInternApps((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    }
  };

  const currentList = activeTab === "business" ? filteredBusiness : filteredInterns;

  return (
    <main className="min-h-screen bg-background">
      <div className="section-container py-10">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Leads Inbox</h1>
            <p className="text-sm text-muted-foreground">
              View and manage business requests and intern applications.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Input
              placeholder="Search name, company, email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-64"
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                {statusOptions.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "business" | "intern")}>
          <TabsList>
            <TabsTrigger value="business">Business Requests</TabsTrigger>
            <TabsTrigger value="intern">Intern Applications</TabsTrigger>
          </TabsList>

          <TabsContent value="business" className="mt-6">
            <LeadsTable
              type="business"
              loading={loading}
              rows={filteredBusiness}
              onRowClick={setSelectedLead}
              onStatusChange={updateStatus}
            />
          </TabsContent>

          <TabsContent value="intern" className="mt-6">
            <LeadsTable
              type="intern"
              loading={loading}
              rows={filteredInterns}
              onRowClick={setSelectedLead}
              onStatusChange={updateStatus}
            />
          </TabsContent>
        </Tabs>

        <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
          <DialogContent className="max-w-lg">
            {selectedLead && (
              <>
                <DialogHeader>
                  <DialogTitle>
                    {"company_name" in selectedLead ? selectedLead.company_name : selectedLead.full_name}
                  </DialogTitle>
                </DialogHeader>
                <div className="mt-4 space-y-2 text-sm">
                  {Object.entries(selectedLead).map(([key, value]) => {
                    if (["id", "created_at"].includes(key)) return null;
                    return (
                      <div key={key} className="flex justify-between gap-4">
                        <span className="font-medium capitalize text-muted-foreground">
                          {key.replace(/_/g, " ")}
                        </span>
                        <span className="text-right break-words">{value ?? "-"}</span>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
};

type LeadsTableProps = {
  type: "business" | "intern";
  loading: boolean;
  rows: (BusinessLead | InternApplication)[];
  onRowClick: (row: BusinessLead | InternApplication) => void;
  onStatusChange: (type: "business" | "intern", id: string, status: string) => void;
};

const LeadsTable = ({ type, loading, rows, onRowClick, onStatusChange }: LeadsTableProps) => {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-32">Created</TableHead>
            <TableHead>{type === "business" ? "Company / Contact" : "Name"}</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>{type === "business" ? "Role" : "Interest"}</TableHead>
            <TableHead className="w-40">Status</TableHead>
            <TableHead className="w-24 text-right">Actions</TableHead>
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

          {!loading && rows.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center text-sm text-muted-foreground">
                No leads found.
              </TableCell>
            </TableRow>
          )}

          {!loading &&
            rows.map((row) => {
              const isBusiness = type === "business" && "company_name" in row;
              const created = new Date(row.created_at).toLocaleString();
              const name = isBusiness
                ? `${(row as BusinessLead).company_name} · ${(row as BusinessLead).contact_name}`
                : (row as InternApplication).full_name;
              const email = row.email;
              const role = isBusiness
                ? (row as BusinessLead).role_title
                : (row as InternApplication).area_of_interest;

              return (
                <TableRow key={row.id} className="cursor-pointer" onClick={() => onRowClick(row)}>
                  <TableCell className="whitespace-nowrap text-xs text-muted-foreground">{created}</TableCell>
                  <TableCell className="font-medium">{name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{email}</TableCell>
                  <TableCell className="text-sm">{role}</TableCell>
                  <TableCell>
                    <Select
                      value={row.status}
                      onValueChange={(value) => onStatusChange(type, row.id, value)}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue>
                          <Badge variant="outline" className="capitalize">
                            {row.status}
                          </Badge>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); onRowClick(row); }}>
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminLeads;

