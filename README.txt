RAISIN CHALLAN CALCULATOR — AUTOMATIC AI READING

Target workflow: choose/upload one image; the app automatically sends it to the private AI Worker, extracts rows, calculates and displays editable results. No API key is stored in the public GitHub Pages app.

IMPORTANT PRIVACY: The selected register photo is sent through your Cloudflare Worker to Google's Gemini API. This is not fully offline. Do not use if you cannot accept this transfer. The Worker holds the Gemini key as a server-side secret.

ONE-TIME SETUP
A. Deploy worker.js as a Cloudflare Worker:
  1. Sign in/create a Cloudflare account and create a Worker.
  2. Paste worker.js into the Worker editor and deploy.
  3. In Worker Settings > Variables and Secrets, add secret GEMINI_API_KEY with your Gemini key. Do not put the key in GitHub.
  4. Configure CORS to allow only your GitHub Pages origin if possible (the current simple sample uses Access-Control-Allow-Origin: *; restrict this in production).
  5. Copy the deployed Worker URL.
B. In index.html, replace PASTE_YOUR_PRIVATE_AI_WORKER_URL_HERE with that Worker URL. Commit the file.
C. Replace sw.js too so the app cache version updates. Commit both files.
D. Open the GitHub Pages URL in Safari while online and refresh. Uploading a photo now starts AI reading automatically.

FILES
- index.html: iPhone web app, auto-uploads selected photo to configured Worker, shows editable draft rows and totals.
- worker.js: server-side proxy; keep Gemini key as a Worker secret.
- sw.js, manifest.json, icons: PWA setup.

AI results can be wrong. Verify marks, counts, fractions, and rates before relying on totals. A single blank numerator is resolved by app calculation rules; multiple blanks are flagged for manual review. API use may have quotas/charges under Google's current terms.
