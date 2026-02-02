import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Users, TrendingUp, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type DashboardStats = {
  totalBusinessLeads: number;
  newBusinessLeads: number;
  totalInternApplications: number;
  newInternApplications: number;
};

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalBusinessLeads: 0,
    newBusinessLeads: 0,
    totalInternApplications: 0,
    newInternApplications: 0,
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadStats = async () => {
      try {
        const adminPassword = import.meta.env.VITE_ADMIN_DASHBOARD_PASSWORD || import.meta.env.NEXT_PUBLIC_ADMIN_DASHBOARD_PASSWORD;
        
        if (!adminPassword) {
          toast({
            title: "Configuration Error",
            description: "Admin password not configured. Please set ADMIN_DASHBOARD_PASSWORD.",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }

        const response = await fetch("/api/admin/stats", {
          headers: {
            "x-admin-password": adminPassword,
          },
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || "Failed to load stats");
        }

        const data = await response.json();
        setStats(data);
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to load dashboard statistics.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [toast]);

  const cards = [
    {
      title: "Total Business Leads",
      value: stats.totalBusinessLeads,
      newCount: stats.newBusinessLeads,
      icon: Building2,
      link: "/admin/leads",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Total Intern Applications",
      value: stats.totalInternApplications,
      newCount: stats.newInternApplications,
      icon: Users,
      link: "/admin/interns",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
  ];

  return (
    <div className="section-container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Overview of leads and applications</p>
      </div>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2">
          {[1, 2].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 w-32 bg-muted rounded"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 w-16 bg-muted rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Card key={card.title} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                  <div className={`rounded-full p-2 ${card.bgColor}`}>
                    <Icon className={`h-4 w-4 ${card.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline justify-between">
                    <div>
                      <div className="text-3xl font-bold">{card.value}</div>
                      {card.newCount > 0 && (
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-muted-foreground">New:</span>
                          <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                            {card.newCount}
                          </span>
                        </div>
                      )}
                    </div>
                    <Link to={card.link}>
                      <Button variant="outline" size="sm">
                        View
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Business Leads</CardTitle>
            <CardDescription>Manage and review business lead requests</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/admin/leads">
              <Button className="w-full">
                View Business Leads
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Intern Applications</CardTitle>
            <CardDescription>Review and manage intern applications</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/admin/interns">
              <Button className="w-full">
                View Intern Applications
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
