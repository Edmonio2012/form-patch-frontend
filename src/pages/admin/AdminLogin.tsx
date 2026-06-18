import React, { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { AlertCircle, Loader } from "lucide-react";

export default function AdminLogin() {
  const [, navigate] = useLocation();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (!result.success) {
        setError(result.error || "Login failed");
        setLoading(false);
        return;
      }

      // Store session token
      localStorage.setItem("adminSessionToken", result.data.sessionToken);
      localStorage.setItem("adminEmail", result.data.admin.email);
      localStorage.setItem("adminName", result.data.admin.name);

      // Redirect to dashboard
      navigate("/admin/dashboard");
    } catch (err) {
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
          <p className="text-muted-foreground">
            Sign in to access the admin dashboard
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <AlertCircle className="text-destructive" size={20} />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="space1.agency@gmail.com"
              required
              disabled={loading}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading || !email}
          >
            {loading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        <p className="text-xs text-muted-foreground text-center mt-6">
          Only authorized admin emails can access this panel.
        </p>
      </Card>
    </div>
  );
}
