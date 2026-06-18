import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";
import { TrendingUp, Users, DollarSign, Zap } from "lucide-react";

interface DashboardData {
  totalRequests: number;
  totalPageViews: number;
  totalLeads: number;
  conversionRate: string;
  averageProjectPrice: string;
  mostUsedFeatures: Array<{ name: string; count: number }>;
  aiUsagePercentage: string;
}

function MetricCard({
  icon: Icon,
  label,
  value,
  change,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  change?: string;
}) {
  return (
    <Card className="p-6 bg-card border border-border">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{label}</p>
          <p className="text-3xl font-bold">{value}</p>
          {change && <p className="text-xs text-green-600 mt-2">{change}</p>}
        </div>
        <div className="p-3 bg-accent/10 rounded-lg">{Icon}</div>
      </div>
    </Card>
  );
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  useEffect(() => {
    fetchDashboard();
    
    // Set up polling to refresh every 30 seconds
    const interval = setInterval(() => {
      fetchDashboard();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const fetchDashboard = async () => {
    try {
      const sessionToken = localStorage.getItem("adminSessionToken");
      const response = await fetch("/api/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      });

      const result = await response.json();
      if (result.success) {
        setData(result.data);
        setLastUpdated(new Date().toLocaleTimeString());
      }
    } catch (error) {
      console.error("Error fetching dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-4 md:p-8">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's your business overview.
            </p>
          </div>
          {lastUpdated && (
            <div className="text-xs text-muted-foreground">
              <p>Last updated: {lastUpdated}</p>
              <p className="text-green-600 mt-1">Auto-refresh: every 30s</p>
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard
                icon={<Users className="text-accent" size={24} />}
                label="Total Requests"
                value={data?.totalRequests || 0}
              />
              <MetricCard
                icon={<TrendingUp className="text-accent" size={24} />}
                label="Conversion Rate"
                value={`${data?.conversionRate || 0}%`}
              />
              <MetricCard
                icon={<DollarSign className="text-accent" size={24} />}
                label="Avg Project Price"
                value={`$${data?.averageProjectPrice || 0}`}
              />
              <MetricCard
                icon={<Zap className="text-accent" size={24} />}
                label="AI Usage"
                value={`${data?.aiUsagePercentage || 0}%`}
              />
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-6 bg-card border border-border">
                <h2 className="text-lg font-bold mb-4">Page Views & Leads</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total Page Views</span>
                    <span className="font-bold">{data?.totalPageViews || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total Leads</span>
                    <span className="font-bold">{data?.totalLeads || 0}</span>
                  </div>
                </div>
              </Card>

              {/* Most Used Features */}
              <Card className="p-6 bg-card border border-border">
                <h2 className="text-lg font-bold mb-4">Most Used Features</h2>
                <div className="space-y-3">
                  {data?.mostUsedFeatures && data.mostUsedFeatures.length > 0 ? (
                    data.mostUsedFeatures.map((feature, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <span className="text-sm">{feature.name}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-accent"
                              style={{
                                width: `${(feature.count / (data.mostUsedFeatures[0]?.count || 1)) * 100}%`,
                              }}
                            />
                          </div>
                          <span className="text-sm font-bold w-8">{feature.count}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No data available</p>
                  )}
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
