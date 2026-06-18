import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";
import { TrendingDown } from "lucide-react";

interface AnalyticsData {
  pageViews: number;
  buttonClicks: number;
  formSubmissions: number;
  bookingClicks: number;
  conversionRate: number;
}

export default function AdminAnalytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const sessionToken = localStorage.getItem("adminSessionToken");
      const response = await fetch("/api/admin/analytics", {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      });

      const result = await response.json();
      if (result.success) {
        setData(result.data);
      }
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  const funnelStages = [
    { name: "Page Views", value: data?.pageViews || 0, color: "bg-blue-500" },
    { name: "Button Clicks", value: data?.buttonClicks || 0, color: "bg-purple-500" },
    { name: "Form Submissions", value: data?.formSubmissions || 0, color: "bg-orange-500" },
    { name: "Booking Clicks", value: data?.bookingClicks || 0, color: "bg-green-500" },
  ];

  const maxValue = Math.max(...funnelStages.map((s) => s.value), 1);

  return (
    <AdminLayout>
      <div className="p-4 md:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Analytics & Conversion Funnel</h1>
          <p className="text-muted-foreground">
            Track user behavior and conversion metrics.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Conversion Funnel */}
            <Card className="p-8 bg-card border border-border">
              <h2 className="text-2xl font-bold mb-8">Conversion Funnel</h2>

              <div className="space-y-6">
                {funnelStages.map((stage, idx) => {
                  const percentage = (stage.value / maxValue) * 100;
                  const dropoff =
                    idx > 0
                      ? (
                          ((funnelStages[idx - 1].value - stage.value) /
                            funnelStages[idx - 1].value) *
                          100
                        ).toFixed(1)
                      : null;

                  return (
                    <div key={stage.name}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="font-semibold">{stage.name}</span>
                          <span className="text-2xl font-bold text-accent">
                            {stage.value.toLocaleString()}
                          </span>
                        </div>
                        {dropoff && (
                          <div className="flex items-center gap-1 text-red-600 text-sm">
                            <TrendingDown size={16} />
                            {dropoff}% drop-off
                          </div>
                        )}
                      </div>

                      <div className="w-full h-12 bg-muted rounded-lg overflow-hidden">
                        <div
                          className={`h-full ${stage.color} transition-all duration-500 flex items-center justify-end pr-4`}
                          style={{ width: `${percentage}%` }}
                        >
                          {percentage > 10 && (
                            <span className="text-white text-sm font-bold">
                              {percentage.toFixed(0)}%
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Conversion Rate */}
            <Card className="p-8 bg-card border border-border">
              <h2 className="text-2xl font-bold mb-4">Overall Conversion Rate</h2>
              <div className="flex items-end gap-4">
                <div className="text-6xl font-bold text-accent">
                  {data?.conversionRate?.toFixed(2)}%
                </div>
                <p className="text-muted-foreground mb-2">
                  of page visitors submit a request
                </p>
              </div>
            </Card>

            {/* Detailed Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-6 bg-card border border-border">
                <h3 className="font-semibold mb-4">Engagement Metrics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Avg. Clicks per Visitor</span>
                    <span className="font-bold">
                      {data?.pageViews
                        ? (data.buttonClicks / data.pageViews).toFixed(2)
                        : 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Form Submission Rate</span>
                    <span className="font-bold">
                      {data?.buttonClicks
                        ? ((data.formSubmissions / data.buttonClicks) * 100).toFixed(1)
                        : 0}
                      %
                    </span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card border border-border">
                <h3 className="font-semibold mb-4">CTA Performance</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Booking Click Rate</span>
                    <span className="font-bold">
                      {data?.buttonClicks
                        ? ((data.bookingClicks / data.buttonClicks) * 100).toFixed(1)
                        : 0}
                      %
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Booking Clicks</span>
                    <span className="font-bold">{data?.bookingClicks || 0}</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
