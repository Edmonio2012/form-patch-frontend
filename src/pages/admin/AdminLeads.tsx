import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

interface Lead {
  id: string;
  leads: { name: string; email: string };
  business_type: string;
  estimated_price: number;
  timeline: string;
  created_at: string;
}

export default function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    businessType: "",
    priceMin: 0,
    priceMax: 999999,
  });

  useEffect(() => {
    fetchLeads();
  }, [filters]);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const sessionToken = localStorage.getItem("adminSessionToken");
      const params = new URLSearchParams({
        search,
        businessType: filters.businessType,
        priceMin: String(filters.priceMin),
        priceMax: String(filters.priceMax),
      });

      const response = await fetch(`/api/admin/leads?${params}`, {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      });

      const result = await response.json();
      if (result.success) {
        setLeads(result.data.leads);
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLeads();
  };

  return (
    <AdminLayout>
      <div className="p-4 md:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Submitted Requests</h1>
          <p className="text-muted-foreground">
            View and manage all pricing requests from leads.
          </p>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-6 bg-card border border-border">
          <div className="space-y-4">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 text-muted-foreground" size={18} />
                <Input
                  type="text"
                  placeholder="Search by email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button type="submit">Search</Button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Business Type</label>
                <Input
                  type="text"
                  placeholder="Filter by type..."
                  value={filters.businessType}
                  onChange={(e) =>
                    setFilters({ ...filters, businessType: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Min Price</label>
                <Input
                  type="number"
                  value={filters.priceMin}
                  onChange={(e) =>
                    setFilters({ ...filters, priceMin: Number(e.target.value) })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Max Price</label>
                <Input
                  type="number"
                  value={filters.priceMax}
                  onChange={(e) =>
                    setFilters({ ...filters, priceMax: Number(e.target.value) })
                  }
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Leads Table */}
        <Card className="bg-card border border-border overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
            </div>
          ) : leads.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">No requests found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left p-4 font-semibold">Email</th>
                    <th className="text-left p-4 font-semibold">Name</th>
                    <th className="text-left p-4 font-semibold">Business Type</th>
                    <th className="text-left p-4 font-semibold">Est. Price</th>
                    <th className="text-left p-4 font-semibold">Timeline</th>
                    <th className="text-left p-4 font-semibold">Submitted</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="border-b border-border hover:bg-muted/30 transition"
                    >
                      <td className="p-4 text-sm">{lead.leads?.email}</td>
                      <td className="p-4 text-sm">{lead.leads?.name}</td>
                      <td className="p-4 text-sm">{lead.business_type}</td>
                      <td className="p-4 text-sm font-bold">
                        ${lead.estimated_price?.toFixed(2)}
                      </td>
                      <td className="p-4 text-sm">{lead.timeline}</td>
                      <td className="p-4 text-sm text-muted-foreground">
                        {new Date(lead.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </AdminLayout>
  );
}
