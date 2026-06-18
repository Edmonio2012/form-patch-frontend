/**
 * API Client for Calculator
 * Calls Vercel serverless API routes with correct payload shapes
 * MUST match backend validation schemas exactly
 */

const API_BASE = "/api";

// ============================================================================
// PARSE REQUEST
// ============================================================================

export interface ParseRequestPayload {
  businessType: string;
  businessGoal: string;
  selectedFeatures: string[];
  timeline: string;
  complexity?: "low" | "medium" | "high";
}

export interface ParseRequestResponse {
  success: boolean;
  complexity?: "low" | "medium" | "high";
  projectType?: "low" | "medium" | "high";
  interpretation?: string;
  validatedFeatures?: string[];
  error?: string;
}

export async function callParseRequest(
  payload: ParseRequestPayload
): Promise<ParseRequestResponse> {
  try {
    const response = await fetch(`${API_BASE}/parse-request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const contentType = response.headers.get("content-type");
    if (contentType && !contentType.includes("application/json")) {
      throw new Error(`Invalid response type: ${contentType}`);
    }

    const responseData = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: responseData.error || responseData.message || "Failed to parse request",
      };
    }

    // Unwrap data object and map snake_case to camelCase
    const data = responseData.data || responseData;
    return {
      success: responseData.success,
      complexity: data.complexity,
      projectType: data.project_type,
      interpretation: data.interpretation,
      validatedFeatures: data.validated_features || data.selected_features,
    };
  } catch (error) {
    console.error("Error calling parse-request:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to parse request",
    };
  }
}

// ============================================================================
// CALCULATE PRICE
// ============================================================================

export interface CalculatePricePayload {
  featureIds: string[];
  timeline: string;
  complexity: "low" | "medium" | "high";
  projectComplexity: "low" | "medium" | "high";
}

export interface CalculatePriceResponse {
  success: boolean;
  totalPrice?: number;
  priceRange?: {
    min: number;
    max: number;
  };
  message?: string;
  error?: string;
}

export async function callCalculatePrice(
  payload: CalculatePricePayload
): Promise<CalculatePriceResponse> {
  try {
    const response = await fetch(`${API_BASE}/calculate-price`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const contentType = response.headers.get("content-type");
    if (contentType && !contentType.includes("application/json")) {
      throw new Error(`Invalid response type: ${contentType}`);
    }

    const responseData = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: responseData.error || responseData.message || "Failed to calculate price",
      };
    }

    // Unwrap data object and map snake_case to camelCase
    const data = responseData.data || responseData;
    return {
      success: responseData.success,
      totalPrice: data.total_price,
      message: data.message,
    };
  } catch (error) {
    console.error("Error calling calculate-price:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to calculate price",
    };
  }
}

// ============================================================================
// CREATE REQUEST
// ============================================================================

export interface CreateRequestPayload {
  businessType: string;
  businessGoal: string;
  featureIds: string[];
  timeline: string;
  complexity: "low" | "medium" | "high";
  projectComplexity: "low" | "medium" | "high";
  totalPrice: number;
  pricingSnapshot: {
    basePrice?: number;
    multipliers?: Record<string, number>;
    timestamp?: string;
  };
  email?: string;
  companyName?: string;
  phone?: string;
  subscribeToPromotions?: boolean;
}

export interface CreateRequestResponse {
  success: boolean;
  requestId?: string;
  totalPrice?: number;
  message?: string;
  error?: string;
}

export async function callCreateRequest(
  payload: CreateRequestPayload
): Promise<CreateRequestResponse> {
  try {
    const response = await fetch(`${API_BASE}/create-request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const contentType = response.headers.get("content-type");
    if (contentType && !contentType.includes("application/json")) {
      throw new Error(`Invalid response type: ${contentType}`);
    }

    const responseData = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: responseData.error || responseData.message || "Failed to create request",
      };
    }

    // Unwrap data object and map snake_case to camelCase
    const data = responseData.data || responseData;
    return {
      success: responseData.success,
      requestId: data.request_id,
      totalPrice: data.total_price,
      message: data.message,
    };
  } catch (error) {
    console.error("Error calling create-request:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create request",
    };
  }
}
