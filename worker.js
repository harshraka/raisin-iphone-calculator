export default {
  async fetch(request, env) {
    const cors = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    };
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
    if (request.method !== "POST") return new Response(JSON.stringify({error:"Use POST"}), {status:405,headers:cors});
    try {
      if (!env.GEMINI_API_KEY) return new Response(JSON.stringify({error:"Server AI key is not configured"}), {status:500,headers:cors});
      const body = await request.json();
      if (!body.base64 || !body.mimeType) return new Response(JSON.stringify({error:"Missing image"}), {status:400,headers:cors});
      const prompt = `Read this raisin delivery register/challan image carefully. Extract every visible lot row top-to-bottom. Return ONLY JSON with schema {"lots":[{"original_mark":"exact mark","lot_identity":"identity without trailing /actual-count suffix where appropriate","actual_boxes":integer|null,"fractions":[{"boxes":integer|null,"kg_per_box":number}],"rate_per_kg":number|null,"notes":"uncertainty"}]}. Rules: 63/15 means 63 boxes at 15 kg each. Blank numerator such as /15 must have boxes=null unless there is exactly one blank numerator in a lot and the actual box count is clear; when one blank numerator exists, it may remain null for the app to resolve using remaining boxes. For HCR-55/50 preserve original_mark HCR-55/50, identity HCR-55, actual_boxes 50 if supported. Preserve multiple fractions per lot. Rate is per kg. Never invent unreadable values; use null and explain uncertainty.`;
      const model = "gemini-2.5-flash";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(env.GEMINI_API_KEY)}`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
          contents: [{parts:[{text:prompt},{inline_data:{mime_type:body.mimeType,data:body.base64}}]}],
          generationConfig: {responseMimeType:"application/json",temperature:0}
        })
      });
      const result = await response.json();
      if (!response.ok) return new Response(JSON.stringify({error:result.error?.message || "Gemini request failed"}), {status:502,headers:cors});
      const text = result.candidates?.[0]?.content?.parts?.map(p=>p.text||"").join("") || "";
      const parsed = JSON.parse(text.replace(/^```(?:json)?\s*/i,"").replace(/\s*```$/,""));
      if (!Array.isArray(parsed.lots)) throw new Error("AI response did not contain lots");
      return new Response(JSON.stringify({lots:parsed.lots}), {status:200,headers:cors});
    } catch (e) {
      return new Response(JSON.stringify({error:String(e.message || e)}), {status:500,headers:cors});
    }
  }
};
