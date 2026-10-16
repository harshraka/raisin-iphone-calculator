RAISIN CHALLAN CALCULATOR — iPHONE HOME SCREEN VERSION

Files:
- index.html: app interface and calculations
- manifest.json: Home Screen app metadata
- sw.js: offline cache
- icon-192.png and icon-512.png: app icons

HOW TO PUBLISH FOR YOUR IPHONES
1. Create a GitHub repository (public is simplest for GitHub Pages; the source code contains no private business data or API keys).
2. Upload all files in this folder to the repository root.
3. In repository Settings > Pages, set deployment source to Deploy from a branch, branch main, folder /(root), then Save.
4. Wait for the Pages URL. Open that HTTPS URL in Safari on each iPhone.
5. Load the app once while online, then use Safari Share > Add to Home Screen.
6. Open it from the Home Screen. Test it once, then turn on Airplane Mode to verify offline operation.

PRIVACY
- No analytics, API keys, AI calls, external scripts, or data upload functions are included.
- On first visit, the static app files must download from GitHub Pages. After the service worker caches them, the app shell can load offline.
- Photos are previewed locally in the browser and not uploaded by the app. OCR is manual using iPhone Live Text; the app does not send photos to any OCR service.
- Each iPhone has its own separate local saved entries. Entries do not sync between devices.
- Hosting source code publicly makes the app code visible, but not the data entered into the app.
- For stronger isolation after installation, use Airplane Mode during use. Browser OS-level behavior is outside the app's control.
- CSV exports may be saved in Files; avoid iCloud Drive or other cloud-synced locations if you want strictly local storage.
