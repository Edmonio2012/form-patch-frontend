import { createClient } from '@supabase/supabase-js';
import { parseDemoRequest, calculateDemoPrice, createDemoRequest } from './demo-pricing';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create Supabase client if credentials are available
let supabase: any = null;
let isDemoMode = false;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
  console.log('Supabase configured. Using production Edge Functions.');
} else {
  isDemoMode = true;
  console.warn('Supabase environment variables not configured. Running in demo mode with fallback pricing.');
}

export { supabase, isDemoMode };

/**
 * Call Edge Function for parsing request
 */
export async function callParseRequest(data: {
  businessType: string;
  goal: string;
  pages: string;
  timeline: string;
  designStyle: string;
  featureIds: string[];
}) {
  // Use demo mode if Supabase not configured
  if (isDemoMode) {
    console.log('Demo mode: Using fallback parser');
    return parseDemoRequest(data);
  }

  if (!supabase) {
    console.error('Supabase not configured');
    return {
      success: false,
      error: 'Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.',
    };
  }

  try {
    const response = await supabase.functions.invoke('parse-request', {
      body: data,
    });

    if (response.error) {
      console.error('Edge Function error:', response.error);
      return {
        success: false,
        error: response.error?.message || 'Edge Function returned an error. Make sure parse-request is deployed.',
      };
    }

    return response.data;
  } catch (error: any) {
    console.error('Error calling parse-request:', error);
    return {
      success: false,
      error: error?.message || 'Failed to call parse-request Edge Function. Make sure it is deployed and Supabase is configured.',
    };
  }
}

/**
 * Call Edge Function for calculating price
 */
export async function callCalculatePrice(data: {
  requestData: {
    businessType: string;
    complexity: 'low' | 'medium' | 'high';
    timeline: string;
    projectType: 'low' | 'medium' | 'high';
  };
  selectedFeatureIds: string[];
}) {
  // Use demo mode if Supabase not configured
  if (isDemoMode) {
    console.log('Demo mode: Using fallback pricing engine');
    const result = calculateDemoPrice({
      businessType: data.requestData.businessType,
      complexity: data.requestData.complexity,
      timeline: data.requestData.timeline,
      projectType: data.requestData.projectType,
      featureCount: data.selectedFeatureIds.length,
    });
    return {
      success: true,
      ...result,
    };
  }

  if (!supabase) {
    console.error('Supabase not configured');
    return {
      success: false,
      error: 'Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.',
    };
  }

  try {
    const response = await supabase.functions.invoke('calculate-price', {
      body: data,
    });

    if (response.error) {
      console.error('Edge Function error:', response.error);
      return {
        success: false,
        error: response.error?.message || 'Edge Function returned an error. Make sure calculate-price is deployed.',
      };
    }

    return response.data;
  } catch (error: any) {
    console.error('Error calling calculate-price:', error);
    return {
      success: false,
      error: error?.message || 'Failed to call calculate-price Edge Function. Make sure it is deployed and Supabase is configured.',
    };
  }
}

/**
 * Call Edge Function for creating request
 */
export async function callCreateRequest(data: {
  sessionId: string;
  requestData: {
    businessType: string;
    goal: string;
    pages: string;
    timeline: string;
    designStyle: string;
    complexity: 'low' | 'medium' | 'high';
  };
  selectedFeatureIds: string[];
  leadData: {
    name: string;
    email: string;
    phone: string;
    message?: string;
  };
  pricingData: {
    totalPrice: number;
    priceRange: {
      min: number;
      max: number;
    };
  };
}) {
  // Use demo mode if Supabase not configured
  if (isDemoMode) {
    console.log('Demo mode: Using fallback request creation');
    return createDemoRequest(data);
  }

  if (!supabase) {
    console.error('Supabase not configured');
    return {
      success: false,
      error: 'Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.',
    };
  }

  try {
    const response = await supabase.functions.invoke('create-request', {
      body: data,
    });

    if (response.error) {
      console.error('Edge Function error:', response.error);
      return {
        success: false,
        error: response.error?.message || 'Edge Function returned an error. Make sure create-request is deployed.',
      };
    }

    return response.data;
  } catch (error: any) {
    console.error('Error calling create-request:', error);
    return {
      success: false,
      error: error?.message || 'Failed to call create-request Edge Function. Make sure it is deployed and Supabase is configured.',
    };
  }
}

/**
 * Fetch all active features
 */
export async function fetchFeatures() {
  if (!supabase) {
    console.error('Supabase not configured');
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('features')
      .select('*')
      .eq('is_active', true)
      .order('category');

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error fetching features:', error);
    throw error;
  }
}

/**
 * Get feature by ID
 */
export async function getFeature(id: string) {
  if (!supabase) {
    console.error('Supabase not configured');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('features')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error fetching feature:', error);
    throw error;
  }
}

/**
 * Get request by ID
 */
export async function getRequest(id: string) {
  if (!supabase) {
    console.error('Supabase not configured');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('requests')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error fetching request:', error);
    throw error;
  }
}

/**
 * Get request features
 */
export async function getRequestFeatures(requestId: string) {
  if (!supabase) {
    console.error('Supabase not configured');
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('request_features')
      .select('feature_id, features(*)')
      .eq('request_id', requestId);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error fetching request features:', error);
    throw error;
  }
}

/**
 * Get lead by ID
 */
export async function getLead(id: string) {
  if (!supabase) {
    console.error('Supabase not configured');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error fetching lead:', error);
    throw error;
  }
}
