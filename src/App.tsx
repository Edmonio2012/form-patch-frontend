import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import PricingCalculator from "./pages/PricingCalculator";
import TermsOfUse from "./pages/TermsOfUse";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";

import AdminLoginEnhanced from "./pages/admin/AdminLoginEnhanced";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLeads from "./pages/admin/AdminLeads";
import AdminFeatures from "./pages/admin/AdminFeatures";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminAuditLogs from "./pages/admin/AdminAuditLogs";


function ScrollToTop() {
  const [location] = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Scroll to top on page load/refresh
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/pricing-calculator"} component={PricingCalculator} />
      <Route path={"/terms"} component={TermsOfUse} />
      <Route path={"/privacy"} component={PrivacyPolicy} />
      <Route path={"/faq"} component={FAQ} />
      <Route path={"/contact"} component={Contact} />

      <Route path={"/admin/login"} component={AdminLoginEnhanced} />
      <Route path={"/admin/login-enhanced"} component={AdminLoginEnhanced} />
      <Route path={"/admin/dashboard"} component={AdminDashboard} />
      <Route path={"/admin/leads"} component={AdminLeads} />
      <Route path={"/admin/features"} component={AdminFeatures} />
      <Route path={"/admin/analytics"} component={AdminAnalytics} />
      <Route path={"/admin/audit-logs"} component={AdminAuditLogs} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <ScrollToTop />
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
