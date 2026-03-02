// import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// const corsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
// };

// const products = [
//   { id: "1", name: "Nova Pro Laptop", category: "Laptops", price: 1299, tags: ["premium", "ultrabook", "professional"] },
//   { id: "2", name: "BudgetBook 15", category: "Laptops", price: 449, tags: ["budget", "value", "everyday"] },
//   { id: "3", name: "Titan Gaming Rig", category: "Laptops", price: 2199, tags: ["gaming", "high-performance", "premium"] },
//   { id: "4", name: "AirPods Max Ultra", category: "Audio", price: 549, tags: ["premium", "audio", "noise-cancelling"] },
//   { id: "5", name: "SmartWatch X200", category: "Wearables", price: 399, tags: ["fitness", "health", "smart"] },
//   { id: "6", name: "ProTab 12.9", category: "Tablets", price: 899, tags: ["creative", "professional", "stylus"] },
//   { id: "7", name: "MechKey Pro", category: "Accessories", price: 159, tags: ["mechanical", "wireless", "rgb"] },
//   { id: "8", name: "UltraCam 4K", category: "Cameras", price: 799, tags: ["camera", "4k", "content-creation"] },
// ];

// serve(async (req) => {
//   if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

//   try {
//     const { query } = await req.json();
//     if (!query || typeof query !== "string") {
//       return new Response(JSON.stringify({ error: "Missing 'query' field" }), {
//         status: 400,
//         headers: { ...corsHeaders, "Content-Type": "application/json" },
//       });
//     }

//     const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
//     if (!LOVABLE_API_KEY) {
//       throw new Error("LOVABLE_API_KEY is not configured");
//     }

//     const productContext = products.map(p => `ID:${p.id} | ${p.name} | ${p.category} | $${p.price} | tags: ${p.tags.join(", ")}`).join("\n");

//     const systemPrompt = `You are a product discovery assistant. You have access to the following product catalog:

// ${productContext}

// When the user asks a question, you must respond with a JSON object using this EXACT tool call. Analyze the user's intent and return relevant product IDs and a helpful summary.

// Consider price ranges, categories, tags, and use cases when matching products. If no products match, return an empty array with a helpful message.`;

//     const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${LOVABLE_API_KEY}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         model: "google/gemini-3-flash-preview",
//         messages: [
//           { role: "system", content: systemPrompt },
//           { role: "user", content: query },
//         ],
//         tools: [
//           {
//             type: "function",
//             function: {
//               name: "return_product_results",
//               description: "Return matching product IDs and a summary for the user query.",
//               parameters: {
//                 type: "object",
//                 properties: {
//                   productIds: {
//                     type: "array",
//                     items: { type: "string" },
//                     description: "Array of matching product IDs from the catalog",
//                   },
//                   summary: {
//                     type: "string",
//                     description: "A helpful 1-3 sentence summary explaining why these products match the query",
//                   },
//                 },
//                 required: ["productIds", "summary"],
//                 additionalProperties: false,
//               },
//             },
//           },
//         ],
//         tool_choice: { type: "function", function: { name: "return_product_results" } },
//       }),
//     });

//     if (!response.ok) {
//       const status = response.status;
//       if (status === 429) {
//         return new Response(JSON.stringify({ error: "AI service rate limited. Please try again in a moment." }), {
//           status: 429,
//           headers: { ...corsHeaders, "Content-Type": "application/json" },
//         });
//       }
//       if (status === 402) {
//         return new Response(JSON.stringify({ error: "AI service payment required." }), {
//           status: 402,
//           headers: { ...corsHeaders, "Content-Type": "application/json" },
//         });
//       }
//       const text = await response.text();
//       console.error("AI gateway error:", status, text);
//       return new Response(JSON.stringify({ error: "AI service unavailable. Please try again later." }), {
//         status: 502,
//         headers: { ...corsHeaders, "Content-Type": "application/json" },
//       });
//     }

//     const data = await response.json();
//     const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];

//     if (!toolCall?.function?.arguments) {
//       console.error("Unexpected AI response:", JSON.stringify(data));
//       return new Response(JSON.stringify({ error: "Failed to parse AI response" }), {
//         status: 500,
//         headers: { ...corsHeaders, "Content-Type": "application/json" },
//       });
//     }

//     const result = JSON.parse(toolCall.function.arguments);
//     const matchedProducts = products.filter(p => result.productIds.includes(p.id));

//     return new Response(JSON.stringify({
//       productIds: result.productIds,
//       summary: result.summary,
//       products: matchedProducts,
//     }), {
//       headers: { ...corsHeaders, "Content-Type": "application/json" },
//     });
//   } catch (e) {
//     console.error("ask error:", e);
//     return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
//       status: 500,
//       headers: { ...corsHeaders, "Content-Type": "application/json" },
//     });
//   }
// });








import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const products = [
  { id: "1", name: "Nova Pro Laptop", category: "Laptops", price: 1299 },
  { id: "2", name: "BudgetBook 15", category: "Laptops", price: 449 },
  { id: "3", name: "Titan Gaming Rig", category: "Laptops", price: 2199 },
  { id: "4", name: "AirPods Max Ultra", category: "Audio", price: 549 },
  { id: "5", name: "SmartWatch X200", category: "Wearables", price: 399 },
  { id: "6", name: "ProTab 12.9", category: "Tablets", price: 899 },
  { id: "7", name: "MechKey Pro", category: "Accessories", price: 159 },
  { id: "8", name: "UltraCam 4K", category: "Cameras", price: 799 },
];

serve(async (req) => {
  if (req.method === "OPTIONS")
    return new Response(null, { headers: corsHeaders });

  try {
    const { query } = await req.json();
    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");

    const prompt = `
User query: "${query}"

Available products:
${JSON.stringify(products)}

Return ONLY valid JSON in this format:
{
  "productIds": ["1","2"],
  "summary": "Short explanation why these match"
}
`;

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.3,
        }),
      }
    );

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch {
      return new Response(
        JSON.stringify({
          productIds: [],
          summary: "AI response format error.",
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        productIds: parsed.productIds || [],
        summary: parsed.summary || "",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        productIds: [],
        summary: "AI service unavailable.",
      }),
      {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});