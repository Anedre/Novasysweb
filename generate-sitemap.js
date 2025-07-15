import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const baseUrl = "https://novasys.com.pe";

// Rutas personalizadas
const routes = [
  "/",
  "/nosotros",
  "/contacto",
  "/servicios/oracle",
  "/servicios/bi",
  "/servicios/elo",
  "/soluciones"
];

// Para poder usar `__dirname` en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((route) => {
    return `
  <url>
    <loc>${baseUrl}${route}</loc>
  </url>`;
  })
  .join("")}
</urlset>
`;

fs.writeFileSync(path.resolve(__dirname, "public", "sitemap.xml"), sitemap);

console.log("✅ Sitemap generado correctamente.");
