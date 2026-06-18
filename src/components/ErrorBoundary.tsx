import { RotateCcw } from "lucide-react";
import { Component, ReactNode } from "react";
import ServerUnavailable from "@/pages/ServerUnavailable";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  isServerError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, isServerError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Check if it's a server/network error
    const isServerError =
      error.message.includes("Failed to fetch") ||
      error.message.includes("Network") ||
      error.message.includes("500") ||
      error.message.includes("503") ||
      error.message.includes("timeout");

    return { hasError: true, error, isServerError };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError && this.state.isServerError) {
      return <ServerUnavailable />;
    }

    if (this.state.hasError) {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            padding: "32px",
            background: "linear-gradient(135deg, #001d2e 0%, #00324a 100%)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              maxWidth: "500px",
              padding: "32px",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "24px",
                fontWeight: 700,
                color: "#fbf8f0",
                marginBottom: "24px",
              }}
            >
              Something went wrong
            </h2>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "14px",
                color: "rgba(251, 248, 240, 0.65)",
                marginBottom: "32px",
                lineHeight: 1.6,
              }}
            >
              We encountered an unexpected error. Please try reloading the page.
            </p>

            <button
              onClick={() => window.location.reload()}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 32px",
                borderRadius: "10px",
                background: "#00c2f2",
                color: "#001d2e",
                border: "none",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "15px",
                fontFamily: "var(--font-display)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.02) translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1) translateY(0)";
              }}
            >
              <RotateCcw size={16} />
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
