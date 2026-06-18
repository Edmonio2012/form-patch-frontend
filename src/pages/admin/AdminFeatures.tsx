import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, X, Edit2 } from "lucide-react";

interface Feature {
  id: string;
  name: string;
  base_price: number;
  complexity_level: string;
  description: string;
}

export default function AdminFeatures() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingPrice, setEditingPrice] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchFeatures();
  }, []);

  const fetchFeatures = async () => {
    try {
      setLoading(true);
      const sessionToken = localStorage.getItem("adminSessionToken");
      const response = await fetch("/api/admin/features", {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      });

      const result = await response.json();
      if (result.success) {
        setFeatures(result.data.features);
      }
    } catch (error) {
      console.error("Error fetching features:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePrice = async (featureId: string) => {
    if (editingPrice === null) return;

    try {
      setSaving(true);
      const sessionToken = localStorage.getItem("adminSessionToken");
      const response = await fetch(`/api/admin/features/${featureId}/price`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${sessionToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newPrice: editingPrice,
          reason: "Admin price update",
        }),
      });

      const result = await response.json();
      if (result.success) {
        setEditingId(null);
        setEditingPrice(null);
        fetchFeatures();
      }
    } catch (error) {
      console.error("Error updating price:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-4 md:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Feature Price Management</h1>
          <p className="text-muted-foreground">
            Edit feature prices and manage availability.
          </p>
        </div>

        <Card className="bg-card border border-border overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
            </div>
          ) : features.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">No features found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left p-4 font-semibold">Feature Name</th>
                    <th className="text-left p-4 font-semibold">Description</th>
                    <th className="text-left p-4 font-semibold">Base Price</th>
                    <th className="text-left p-4 font-semibold">Complexity</th>
                    <th className="text-left p-4 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature) => (
                    <tr
                      key={feature.id}
                      className="border-b border-border hover:bg-muted/30 transition"
                    >
                      <td className="p-4 text-sm font-medium">{feature.name}</td>
                      <td className="p-4 text-sm text-muted-foreground">
                        {feature.description?.substring(0, 40)}...
                      </td>
                      <td className="p-4 text-sm">
                        {editingId === feature.id ? (
                          <div className="flex gap-2">
                            <Input
                              type="number"
                              value={editingPrice ?? 0}
                              onChange={(e) => setEditingPrice(Number(e.target.value))}
                              className="w-24"
                            />
                          </div>
                        ) : (
                          <span className="font-bold">${(feature.base_price || 0).toFixed(2)}</span>
                        )}
                      </td>
                      <td className="p-4 text-sm">
                        <span className="px-2 py-1 bg-accent/10 rounded text-xs">
                          {feature.complexity_level}
                        </span>
                      </td>
                      <td className="p-4 text-sm">
                        {editingId === feature.id ? (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleUpdatePrice(feature.id)}
                              disabled={saving}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <Check size={16} />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setEditingId(null)}
                              disabled={saving}
                            >
                              <X size={16} />
                            </Button>
                          </div>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingId(feature.id);
                              setEditingPrice(feature.base_price);
                            }}
                          >
                            <Edit2 size={16} />
                          </Button>
                        )}
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
