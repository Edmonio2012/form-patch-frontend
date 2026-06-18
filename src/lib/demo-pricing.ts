/**
 * Demo/Fallback Pricing Engine
 * 
 * Used when Supabase is not configured, allowing full calculator testing
 * without backend setup. Implements the same pricing logic as Edge Functions.
 */

export interface DemoPricingRequest {
  businessType: string;
  complexity: 'low' | 'medium' | 'high';
  timeline: string;
  projectType: 'low' | 'medium' | 'high';
  featureCount: number;
}

// Base pricing in cents ($2500 = 250000 cents)
const BASE_PRICE = 250000;

// Feature prices in cents
const FEATURE_PRICES: Record<string, number> = {
  'responsive-design': 50000,
  'custom-ui-design': 80000,
  'design-system': 100000,
  'animations': 60000,
  'dark-mode': 30000,
  'multi-page': 40000,
  'advanced-pages': 80000,
  'cms-system': 120000,
  'blog-system': 70000,
  'media-gallery': 40000,
  'seo-optimization': 50000,
  'analytics': 30000,
  'conversion-optimization': 60000,
  'lead-forms': 40000,
  'social-integration': 30000,
  'product-listings': 70000,
  'shopping-cart': 100000,
  'payment-integration': 120000,
  'inventory-system': 150000,
  'order-dashboard': 100000,
  'user-auth': 100000,
  'user-profiles': 70000,
  'role-permissions': 100000,
  'dashboard-ui': 120000,
  'api-integration': 80000,
  'ai-integration': 150000,
  'realtime-features': 120000,
  'file-upload': 70000,
  'global-search': 80000,
  'realtime-chat': 150000,
  'media-sharing': 100000,
  'admin-panel': 120000,
  'advanced-admin': 150000,
  'subscription-system': 150000,
  'billing-logic': 120000,
  'notification-system': 80000,
  'audit-logs': 70000,
  'security-enhancements': 100000,
  'performance-optimization': 80000,
  'custom-integrations': 150000,
  'accessibility': 60000,
  'mobile-optimization': 70000,
  'cross-browser': 50000,
  'documentation': 60000,
  'deployment': 50000,
  'maintenance': 70000,
  'backup-recovery': 80000,
  'monitoring': 70000,
  'custom-features': 200000,
  'third-party': 100000,
  'workflow-automation': 150000,
  'white-label': 200000,
  'api-access': 150000,
};

// Complexity multipliers
const COMPLEXITY_MULTIPLIERS: Record<string, number> = {
  low: 1.0,
  medium: 1.3,
  high: 1.6,
};

// Timeline multipliers
const TIMELINE_MULTIPLIERS: Record<string, number> = {
  normal: 1.0,
  fast: 1.4,
  urgent: 1.8,
};

// Project type multipliers
const PROJECT_MULTIPLIERS: Record<string, number> = {
  low: 1.0,
  medium: 1.2,
  high: 1.5,
};

/**
 * Calculate demo price using same logic as Edge Functions
 */
export function calculateDemoPrice(request: DemoPricingRequest): {
  totalPrice: number;
  priceRange: { min: number; max: number };
  message: string;
  breakdown: {
    basePrice: number;
    featureCount: number;
    complexityMultiplier: number;
    timelineMultiplier: number;
    projectMultiplier: number;
  };
} {
  // Get multipliers
  const complexityMultiplier = COMPLEXITY_MULTIPLIERS[request.complexity] || 1.3;
  const timelineMultiplier = TIMELINE_MULTIPLIERS[request.timeline] || 1.0;
  const projectMultiplier = PROJECT_MULTIPLIERS[request.projectType] || 1.0;

  // Calculate feature prices (average price per feature)
  const avgFeaturePrice = 80000; // $800 average
  const featureTotal = request.featureCount * avgFeaturePrice;

  // Calculate total
  const subtotal = BASE_PRICE + featureTotal;
  const totalPrice = Math.round(
    subtotal * complexityMultiplier * timelineMultiplier * projectMultiplier
  );

  // Calculate price range (±10%)
  const variance = Math.round(totalPrice * 0.1);
  const priceRange = {
    min: totalPrice - variance,
    max: totalPrice + variance,
  };

  // Format message
  const priceInDollars = (totalPrice / 100).toFixed(0);
  const varianceInDollars = (variance / 100).toFixed(0);
  const message = `Your estimated project cost is $${priceInDollars} (±$${varianceInDollars})`;

  return {
    totalPrice,
    priceRange,
    message,
    breakdown: {
      basePrice: BASE_PRICE,
      featureCount: request.featureCount,
      complexityMultiplier,
      timelineMultiplier,
      projectMultiplier,
    },
  };
}

/**
 * Parse request with demo AI (rule-based fallback)
 */
export function parseDemoRequest(data: {
  businessType: string;
  goal: string;
  pages: string;
  timeline: string;
  designStyle: string;
  featureIds: string[];
}): {
  complexity: 'low' | 'medium' | 'high';
  projectType: 'low' | 'medium' | 'high';
  interpretation: string;
  validatedFeatures: string[];
  success: boolean;
} {
  // Determine complexity based on features and timeline
  let complexity: 'low' | 'medium' | 'high' = 'medium';
  let projectType: 'low' | 'medium' | 'high' = 'medium';

  // Feature count affects complexity
  if (data.featureIds.length <= 3) {
    complexity = 'low';
  } else if (data.featureIds.length <= 8) {
    complexity = 'medium';
  } else {
    complexity = 'high';
  }

  // Timeline affects complexity
  if (data.timeline === 'urgent') {
    complexity = complexity === 'low' ? 'medium' : 'high';
  }

  // Business type affects project type
  if (
    data.businessType === 'landing-page' ||
    data.businessType === 'portfolio' ||
    data.businessType === 'blog'
  ) {
    projectType = 'low';
  } else if (
    data.businessType === 'business-website' ||
    data.businessType === 'ecommerce'
  ) {
    projectType = 'medium';
  } else if (
    data.businessType === 'saas' ||
    data.businessType === 'marketplace' ||
    data.businessType === 'platform' ||
    data.businessType === 'custom'
  ) {
    projectType = 'high';
  }

  // Generate interpretation
  const interpretation = `Demo mode: Analyzing ${data.businessType} with ${data.featureIds.length} features on ${data.timeline} timeline. Estimated complexity: ${complexity}. (Note: This is a demo calculation. Real pricing will be calculated by AI when Supabase is configured.)`;

  return {
    complexity,
    projectType,
    interpretation,
    validatedFeatures: data.featureIds,
    success: true,
  };
}

/**
 * Create demo request (simulates database insertion)
 */
export function createDemoRequest(data: any): {
  success: boolean;
  requestId: string;
  message: string;
} {
  const requestId = `demo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  return {
    success: true,
    requestId,
    message: `Demo mode: Your request has been recorded locally. In production, this would be saved to the database and you would receive a confirmation email. Request ID: ${requestId}`,
  };
}
