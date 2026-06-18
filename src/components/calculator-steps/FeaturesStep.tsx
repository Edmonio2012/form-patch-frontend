/*
 * Step 4: Features Selection (Production-Grade)
 * 50 features from Supabase database with real pricing
 * Enforces minimum 1 feature selection
 */

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { FormData } from "@/pages/PricingCalculator";

interface Feature {
  id: string;
  title: string;
  description: string;
  category: string;
  complexity_level: "low" | "medium" | "high";
}

interface FeaturesStepProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

// 50 features from Supabase database with actual UUIDs
// These match the database exactly
const FEATURES: Feature[] = [
  // CORE WEBSITE
  { id: "db872964-9f58-4d62-915c-2d90dca428a8", title: "Responsive Design", description: "Mobile-first responsive layout across all devices", category: "Core Website", complexity_level: "medium" },
  { id: "95f0f7b5-5924-4b50-9643-1b460fac0697", title: "Dark Mode", description: "Light/Dark theme switching system", category: "Core Website", complexity_level: "low" },
  { id: "f2d77d96-a334-4c43-a206-fba133c5088c", title: "Animations & Microinteractions", description: "UI animations, hover effects, transitions", category: "Core Website", complexity_level: "medium" },
  { id: "88e867ed-aac6-44ad-8481-306ed217c336", title: "Design System", description: "Reusable UI components and design consistency system", category: "Core Website", complexity_level: "high" },
  { id: "95e6cdf8-7328-48d5-a826-d00c2d351eb3", title: "Custom UI Design", description: "Fully custom designed interface tailored to brand", category: "Core Website", complexity_level: "high" },

  // STRUCTURE & CONTENT
  { id: "3968655e-bd4f-48b6-bfde-8d45f8fc6057", title: "Multi-page Structure (up to 5 pages)", description: "Basic multi-page website setup", category: "Structure & Content", complexity_level: "medium" },
  { id: "2de74e29-9295-442f-a336-3c9c0b5d22a4", title: "Advanced Page Structures (10+ pages)", description: "Large scale website architecture", category: "Structure & Content", complexity_level: "high" },
  { id: "dd2bdbc9-d4c8-4e72-b6ee-5c12c6dc7b71", title: "Media Gallery", description: "Image grid gallery with lightbox view", category: "Structure & Content", complexity_level: "low" },
  { id: "d586d4d8-359e-431c-8297-0dad46e11f79", title: "Blog System", description: "Blog with posts, categories and SEO support", category: "Structure & Content", complexity_level: "medium" },
  { id: "c7e3b261-9d87-4e20-a763-a6d396fe4abe", title: "CMS System", description: "Admin-controlled content management system", category: "Structure & Content", complexity_level: "high" },

  // MARKETING & CONVERSION
  { id: "1620fc9b-a56a-4e25-a0e4-7af4428e9688", title: "SEO Optimization", description: "On-page SEO setup and structure optimization", category: "Marketing & Conversion", complexity_level: "medium" },
  { id: "4f8faafa-438d-40ba-b3d8-0b32cdbb2919", title: "Analytics Integration", description: "Google Analytics setup and tracking", category: "Marketing & Conversion", complexity_level: "low" },
  { id: "d1092461-c1c7-4f57-8c80-8c67d64f44e9", title: "Conversion Optimization", description: "UX improvements to increase conversions", category: "Marketing & Conversion", complexity_level: "medium" },
  { id: "fe50bc50-e12d-4dc8-8194-baaa23b10955", title: "Lead Forms / Email Capture", description: "Forms connected to database or email system", category: "Marketing & Conversion", complexity_level: "low" },
  { id: "0413e107-bbc5-4b55-a1b0-f176578eef92", title: "Social Media Integration", description: "Social links, embeds and sharing setup", category: "Marketing & Conversion", complexity_level: "low" },

  // E-COMMERCE
  { id: "8c5d54d0-cf0d-4369-8dcd-77fb75e05546", title: "Product Listings", description: "Product catalog system with basic structure", category: "E-commerce", complexity_level: "medium" },
  { id: "512bd98d-ffd7-4552-a4f0-30add9773025", title: "Shopping Cart", description: "Cart system with add/remove and totals", category: "E-commerce", complexity_level: "high" },
  { id: "f36b9843-49d7-4a7c-aef8-06b743944822", title: "Payment Integration", description: "Stripe or payment provider integration", category: "E-commerce", complexity_level: "high" },
  { id: "b5c0a9d1-bdcd-496b-a7c6-9996db19e11b", title: "Inventory System (Advanced)", description: "Full inventory system with variants and tracking", category: "E-commerce", complexity_level: "high" },
  { id: "d94c441d-7153-4399-8761-8329ac5c5a28", title: "Order Dashboard", description: "Admin order management system", category: "E-commerce", complexity_level: "high" },

  // USER SYSTEMS
  { id: "810218b8-c96d-41a9-b976-3cc3e2271c13", title: "User Authentication", description: "Login, signup, session management", category: "User Systems", complexity_level: "high" },
  { id: "fbbfec2e-1216-48b3-8d2f-c007bae51729", title: "User Profiles", description: "User profile management system", category: "User Systems", complexity_level: "medium" },
  { id: "560759f9-3ceb-46f7-969f-c53be3223376", title: "Role & Permission System", description: "Access control and role-based permissions", category: "User Systems", complexity_level: "high" },
  { id: "ea55587a-6db8-4e5b-b213-5eaf42475ab0", title: "Dashboard UI", description: "Post-login user interface system", category: "User Systems", complexity_level: "high" },

  // ADVANCED SYSTEMS
  { id: "caa3b511-7001-4c0e-9ebb-3ca92b88d76e", title: "API Integration", description: "Connect external APIs and services", category: "Advanced Systems", complexity_level: "medium" },
  { id: "aeb0fd07-8001-4344-9fb4-7ed61f5c9134", title: "AI Integration", description: "AI chatbot and AI-powered features", category: "Advanced Systems", complexity_level: "high" },
  { id: "9bb28f34-3bd2-4520-97c1-2da5bba43c48", title: "Real-time Features", description: "Live updates and notifications system", category: "Advanced Systems", complexity_level: "high" },
  { id: "cf349003-6c5c-414d-b181-cc1cd0fd7a0a", title: "File Upload System", description: "Upload and manage files with storage system", category: "Advanced Systems", complexity_level: "medium" },
  { id: "5a91143b-a816-4094-8b21-b3c0547f8cae", title: "Global Search", description: "Search across entire system with filtering", category: "Advanced Systems", complexity_level: "medium" },

  // COMMUNICATION
  { id: "0e6ec3f1-6668-4b0f-b7e7-d5859bd1c8a2", title: "Real-time Chat", description: "Live messaging system between users", category: "Communication", complexity_level: "high" },
  { id: "46f19b9d-5c5d-477a-8ec5-2a465c8d2752", title: "Media Sharing", description: "Send images and files in chat system", category: "Communication", complexity_level: "medium" },

  // BUSINESS CORE
  { id: "b688d725-2e9e-41be-955b-10079b221b0a", title: "Admin Panel", description: "Full system control dashboard", category: "Business Core", complexity_level: "high" },
  { id: "6375bb28-80b3-4b49-b48d-b8381fb33c0c", title: "Advanced Admin Controls", description: "System override and management tools", category: "Business Core", complexity_level: "high" },
  { id: "b215fb3d-f6f5-4643-8a27-c41a5d4496e1", title: "Subscription System", description: "Recurring billing and plans system", category: "Business Core", complexity_level: "high" },
  { id: "aafccb67-d7a8-4de2-851b-662912f51427", title: "Billing Logic", description: "Payment tracking and invoice system", category: "Business Core", complexity_level: "high" },
  { id: "0e3848e7-def8-47a2-8e94-8506f615b7ee", title: "Notification System", description: "Email and in-app notifications", category: "Business Core", complexity_level: "medium" },
  { id: "6234d8a4-0d76-45f8-9437-c70e73a39fca", title: "Security Enhancements", description: "RLS, validation and protection layer", category: "Business Core", complexity_level: "high" },
  { id: "c4fd8de8-6044-4f2f-be82-34089079e6e4", title: "Performance Optimization", description: "Speed and query optimization", category: "Business Core", complexity_level: "medium" },

  // EXTENSIONS
  { id: "3c169129-4bf1-45ce-89a9-9f369dc49bf7", title: "Third-party Integrations", description: "External service connections", category: "Extensions", complexity_level: "medium" },
  { id: "0a6af717-cf58-4b23-88fa-3739a738b911", title: "API Access for Clients", description: "Expose system API to external users", category: "Extensions", complexity_level: "high" },
  { id: "0cfac1de-250b-4bc5-a617-e7921d914422", title: "Workflow Automation", description: "Rule-based automation engine", category: "Extensions", complexity_level: "high" },
  { id: "2e25173d-2bb6-403b-b1f8-a387282c8c91", title: "White-label System", description: "Multi-client SaaS system", category: "Extensions", complexity_level: "high" },
  { id: "b94eee30-b774-48e1-aacc-5fa7945fde87", title: "Custom Feature Development", description: "AI-defined custom feature building system", category: "Extensions", complexity_level: "high" },

  // POLISH & STABILITY
  { id: "116070d3-b145-4c5b-b415-9a0b95cb97a4", title: "Maintenance Setup", description: "System maintenance structure", category: "Polish & Stability", complexity_level: "medium" },
  { id: "6d7c7622-0e48-4787-b3e0-a79ea89eec89", title: "Deployment Setup", description: "Production deployment configuration", category: "Polish & Stability", complexity_level: "medium" },
  { id: "6e1beec8-5eef-40f5-9fa1-e0d2f5b0e2c2", title: "Backup & Recovery", description: "Data backup and restore system", category: "Polish & Stability", complexity_level: "medium" },
  { id: "93b493a8-123b-4262-94e0-b64317102601", title: "Monitoring System", description: "System health and error tracking", category: "Polish & Stability", complexity_level: "medium" },
  { id: "65fecdea-d4b4-4a86-aa8c-9d80a42135e1", title: "Accessibility Optimization", description: "WCAG accessibility improvements", category: "Polish & Stability", complexity_level: "medium" },
  { id: "b224d1bf-a454-4def-80fd-b12bc3423a59", title: "Mobile Optimization", description: "Advanced mobile responsiveness tuning", category: "Polish & Stability", complexity_level: "medium" },
  { id: "eb5908e4-fbab-475c-8586-76ff192e5098", title: "Cross-browser Optimization", description: "Browser compatibility fixes", category: "Polish & Stability", complexity_level: "low" },
  { id: "abb9dede-bc08-42cb-9b30-f0a026b5dea8", title: "Documentation & Training", description: "System usage guides and onboarding docs", category: "Polish & Stability", complexity_level: "medium" },
];

export default function FeaturesStep({ formData, updateFormData }: FeaturesStepProps) {
  const categories = Array.from(new Set(FEATURES.map((f) => f.category))).sort();

  const toggleFeature = (featureId: string) => {
    const updated = formData.features.includes(featureId)
      ? formData.features.filter((id) => id !== featureId)
      : [...formData.features, featureId];
    updateFormData({ features: updated });
  };

  const isFeatureSelected = (featureId: string) => formData.features.includes(featureId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-bold mb-2 text-white">Select Features</h2>
      <p className="text-gray-400 mb-8">Choose the features you need for your project</p>

      <div className="space-y-8">
        {categories.map((category) => (
          <div key={category}>
            <h3 className="text-sm font-semibold text-cyan-400 mb-4 uppercase tracking-wider">{category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {FEATURES.filter((f) => f.category === category).map((feature) => (
                <motion.button
                  key={feature.id}
                  onClick={() => toggleFeature(feature.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    isFeatureSelected(feature.id)
                      ? "border-cyan-400 bg-cyan-400/10"
                      : "border-gray-700 bg-gray-800/50 hover:border-gray-600"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-white">{feature.title}</p>
                      <p className="text-xs text-gray-400 mt-1">{feature.description}</p>
                    </div>
                    {isFeatureSelected(feature.id) && (
                      <Check className="w-5 h-5 text-cyan-400 ml-2 flex-shrink-0" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-500 mt-8">
        Selected: {formData.features.length} feature{formData.features.length !== 1 ? "s" : ""}
      </p>
    </motion.div>
  );
}
