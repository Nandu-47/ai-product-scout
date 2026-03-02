import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const products = [
  { id: "1", name: "Nova Pro Laptop", category: "Laptops", price: 1299, description: "Ultra-thin 14\" laptop with M3 chip, 16GB RAM, 512GB SSD. Perfect for professionals who need power on the go.", tags: ["premium", "ultrabook", "professional"], rating: 4.8 },
  { id: "2", name: "BudgetBook 15", category: "Laptops", price: 449, description: "Affordable 15.6\" laptop with Intel i5, 8GB RAM, 256GB SSD. Great value for everyday computing and light work.", tags: ["budget", "value", "everyday"], rating: 4.2 },
  { id: "3", name: "Titan Gaming Rig", category: "Laptops", price: 2199, description: "17\" gaming powerhouse with RTX 4080, 32GB RAM, 1TB SSD, 240Hz display. Dominate every game.", tags: ["gaming", "high-performance", "premium"], rating: 4.9 },
  { id: "4", name: "AirPods Max Ultra", category: "Audio", price: 549, description: "Premium over-ear headphones with spatial audio, active noise cancellation, and 30-hour battery life.", tags: ["premium", "audio", "noise-cancelling"], rating: 4.7 },
  { id: "5", name: "SmartWatch X200", category: "Wearables", price: 399, description: "Advanced fitness tracker with ECG, blood oxygen monitoring, GPS, and 5-day battery. Water resistant to 50m.", tags: ["fitness", "health", "smart"], rating: 4.5 },
  { id: "6", name: "ProTab 12.9", category: "Tablets", price: 899, description: "12.9\" tablet with stylus support, 256GB storage, perfect for digital artists and note-takers.", tags: ["creative", "professional", "stylus"], rating: 4.6 },
  { id: "7", name: "MechKey Pro", category: "Accessories", price: 159, description: "Wireless mechanical keyboard with hot-swappable switches, RGB backlighting, and USB-C charging.", tags: ["mechanical", "wireless", "rgb"], rating: 4.4 },
  { id: "8", name: "UltraCam 4K", category: "Cameras", price: 799, description: "Compact mirrorless camera with 4K video, 26MP sensor, and in-body stabilization. Perfect for content creators.", tags: ["camera", "4k", "content-creation"], rating: 4.7 },
];

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const url = new URL(req.url);
    const category = url.searchParams.get("category");
    const query = url.searchParams.get("q");

    let filtered = [...products];

    if (category) {
      filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    if (query) {
      const q = query.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some(t => t.includes(q)) ||
        p.category.toLowerCase().includes(q)
      );
    }

    return new Response(JSON.stringify({ products: filtered }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("products error:", e);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
