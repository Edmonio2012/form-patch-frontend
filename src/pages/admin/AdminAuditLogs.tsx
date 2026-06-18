import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";
import { AlertCircle, CheckCircle, Edit2, Trash2 } from "lucide-react";

interface AuditLog {
  id: string;
  admin_email: string;
  admin_name: string;
  action_type: string;
  resource_type: string;
  description: string;
  created_at: string;
}

function getActionIcon(actionType: string) {
  switch (actionType) {
    case "update":
      return <Edit2 className="text-blue-500" size={18} />;
    case "delete":
      return <Trash2 className="text-red-500" size={18} />;
    case "create":
      return <CheckCircle className="text-green-500" size={18} />;
    default:
      return <AlertCircle className="text-yellow-500" size={18} />;
  }
}

export default function AdminAuditLogs() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAuditLogs();
  }, []);

  const fetchAuditLogs = async () => {
    try {
      setLoading(true);
      const sessionToken = localStorage.getItem("adminSessionToken");
      const response = await fetch("/api/admin/audit-logs", {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      });

      const result = await response.json();
      if (result.success) {
        setLogs(result.data.logs);
      }
    } catch (error) {
      console.error("Error fetching audit logs:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-4 md:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Audit Logs</h1>
          <p className="text-muted-foreground">
            Complete history of all admin actions and changes.
          </p>
        </div>

        <Card className="bg-card border border-border overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
            </div>
          ) : logs.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">No audit logs found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left p-4 font-semibold">Admin</th>
                    <th className="text-left p-4 font-semibold">Action</th>
                    <th className="text-left p-4 font-semibold">Resource</th>
                    <th className="text-left p-4 font-semibold">Description</th>
                    <th className="text-left p-4 font-semibold">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr
                      key={log.id}
                      className="border-b border-border hover:bg-muted/30 transition"
                    >
                      <td className="p-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{log.admin_name}</span>
                          <span className="text-xs text-muted-foreground">
                            {log.admin_email}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {getActionIcon(log.action_type)}
                          <span className="text-sm font-semibold capitalize">
                            {log.action_type}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-sm px-2 py-1 bg-accent/10 rounded capitalize">
                          {log.resource_type}
                        </span>
                      </td>
                      <td className="p-4 text-sm max-w-xs truncate">
                        {log.description}
                      </td>
                      <td className="p-4 text-sm text-muted-foreground whitespace-nowrap">
                        {new Date(log.created_at).toLocaleString()}
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
