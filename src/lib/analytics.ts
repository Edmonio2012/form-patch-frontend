/**
 * Space One — Analytics Tracking Utility
 * Tracks user interactions: form submissions, button clicks, page views
 * Sends data to VITE_ANALYTICS_ENDPOINT
 */

interface AnalyticsEvent {
  event: string;
  category: string;
  label?: string;
  value?: number | string;
  timestamp: string;
  url: string;
  userAgent: string;
}

/**
 * Send analytics event to tracking endpoint
 */
export const trackEvent = async (
  event: string,
  category: string,
  label?: string,
  value?: number | string
) => {
  try {
    const endpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT;
    const websiteId = import.meta.env.VITE_ANALYTICS_WEBSITE_ID;

    if (!endpoint || !websiteId) {
      console.warn("Analytics endpoint or website ID not configured");
      return;
    }

    const analyticsData: AnalyticsEvent = {
      event,
      category,
      label,
      value,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
    };

    // Send as beacon for reliability (even if page unloads)
    const payload = JSON.stringify({
      ...analyticsData,
      websiteId,
    });

    // Try using sendBeacon first (more reliable)
    if (navigator.sendBeacon) {
      navigator.sendBeacon(endpoint, payload);
    } else {
      // Fallback to fetch
      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      }).catch((err) => console.error("Analytics error:", err));
    }
  } catch (error) {
    console.error("Failed to track event:", error);
  }
};

/**
 * Track form submission
 */
export const trackFormSubmission = (formName: string, success: boolean = true) => {
  trackEvent(
    success ? "form_submit_success" : "form_submit_error",
    "form",
    formName,
    success ? 1 : 0
  );
};

/**
 * Track button click
 */
export const trackButtonClick = (buttonName: string, destination?: string) => {
  trackEvent("button_click", "cta", buttonName, destination);
};

/**
 * Track page view
 */
export const trackPageView = (pageName: string) => {
  trackEvent("page_view", "navigation", pageName);
};

/**
 * Track pricing calculator step
 */
export const trackCalculatorStep = (stepNumber: number, stepName: string) => {
  trackEvent("calculator_step", "calculator", `Step ${stepNumber}: ${stepName}`, stepNumber);
};

/**
 * Track feature selection
 */
export const trackFeatureSelection = (featureName: string, selected: boolean) => {
  trackEvent(
    selected ? "feature_selected" : "feature_deselected",
    "calculator",
    featureName,
    selected ? 1 : 0
  );
};

/**
 * Track external link click
 */
export const trackExternalLink = (linkName: string, url: string) => {
  trackEvent("external_link_click", "link", linkName, url);
};

/**
 * Track booking/call button click
 */
export const trackBookingClick = (buttonType: string = "book_call") => {
  trackEvent("booking_click", "cta", buttonType);
};

/**
 * Track pricing estimate view
 */
export const trackEstimateView = (estimatedPrice: number) => {
  trackEvent("estimate_viewed", "calculator", "price_estimate", estimatedPrice);
};
