#!/usr/bin/env node
/**
 * Brand image generation via Nano Banana Pro (Gemini 3 Pro Image).
 *
 * Usage:
 *   npm run generate:images                          # all missing images
 *   npm run generate:images -- --force               # regenerate everything
 *   npm run generate:images -- --only=<name> --force # one specific image
 *
 * Requires GEMINI_API_KEY (shell-env in ~/.zshrc, or local .env).
 */

import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.join(__dirname, "..");
const OUTPUT_DIR = path.join(PROJECT_ROOT, "public", "photos", "generated");

if (!process.env.GEMINI_API_KEY) {
  console.error("\x1b[31mGEMINI_API_KEY is not set.\x1b[0m  Add to ~/.zshrc: export GEMINI_API_KEY=AIza...");
  process.exit(1);
}

const args = process.argv.slice(2);
const FORCE = args.includes("--force");
const ONLY = args.find((a) => a.startsWith("--only="))?.split("=")[1];

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const BRAND = [
  "Photorealistic editorial photography for Het Packhuys, a fine-dining restaurant inside a centuries-old brick-and-timber warehouse at the small yacht harbor of Middelburg in the Netherlands.",
  "Visual language: cinematic, refined and atmospheric, architectural composition, magazine-quality finish (think Cereal magazine, Kinfolk, Magazine F).",
  "Muted maritime palette of deep petrol-green, warm brass and parchment cream, with warm candlelit accents.",
  "Natural Northern-European light or a warm dusk glow.",
  "No people in frame. No text, no logos, no watermarks, no captions, no signage, no readable lettering.",
  "Shot on a medium-format camera, shallow depth of field where appropriate. Aspect ratio 16:9 (wide landscape).",
].join(" ");

const IMAGES = [
  {
    name: "hero-haven",
    prompt:
      "Wide cinematic landscape at blue hour. A characterful old brick-and-timber harbor warehouse seen from across the calm water of a small Dutch yacht harbor, its tall windows glowing warm amber from within. " +
      "Moored wooden sailboats with bare masts in the foreground, their silhouettes and the warehouse lights mirrored in the still dark water. " +
      "Deep twilight petrol-blue sky, a few soft brass dock lanterns. Tranquil, inviting, fine architectural detail in the weathered facade.",
  },
  {
    name: "hero-interieur",
    prompt:
      "Wide cinematic landscape. Interior of an intimate fine-dining restaurant inside a historic warehouse: exposed dark timber beam ceiling, white-clothed tables set with glassware catching candlelight, " +
      "a row of tall windows along one wall looking out onto a dusk harbor with moored boats. Warm brass pendant lights, deep soft shadows, parchment and petrol-green tones. " +
      "Empty elegant room before service, the foreground table gently out of focus.",
  },
  {
    name: "homarium",
    prompt:
      "Moody cinematic close-up. A live European lobster and a cluster of fresh oysters inside a clean glass seawater aquarium, cool clear water with subtle caustic light ripples against a dark petrol-green background, " +
      "a brushed brass frame edge catching warm light, faint condensation on the glass. Dramatic low-key lighting, glistening shells, pristine water clarity. Refined seafood atmosphere.",
  },
];

const filtered = ONLY ? IMAGES.filter((i) => i.name === ONLY) : IMAGES;
if (ONLY && filtered.length === 0) {
  console.error(`No image named "${ONLY}". Available: ${IMAGES.map((i) => i.name).join(", ")}`);
  process.exit(1);
}

async function generateOne({ name, prompt }) {
  const outPath = path.join(OUTPUT_DIR, `${name}.png`);
  if (fs.existsSync(outPath) && !FORCE) {
    console.log(`\x1b[90mskip (exists): ${name}.png\x1b[0m`);
    return { name, status: "skip" };
  }
  console.log(`\x1b[36mgenerating: ${name}\x1b[0m`);
  const t0 = Date.now();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-image-preview",
      contents: `${BRAND}\n\n${prompt}`,
    });
    const part = response.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);
    if (!part) {
      console.warn(`\x1b[33m  no image data for ${name}\x1b[0m`);
      return { name, status: "empty" };
    }
    const buffer = Buffer.from(part.inlineData.data, "base64");
    fs.writeFileSync(outPath, buffer);
    console.log(`\x1b[32msaved: ${name}.png  (${(buffer.length / 1024).toFixed(0)} KB, ${((Date.now() - t0) / 1000).toFixed(1)}s)\x1b[0m`);
    return { name, status: "ok" };
  } catch (err) {
    console.error(`\x1b[31mfailed: ${name}  ${err.message}\x1b[0m`);
    return { name, status: "error" };
  }
}

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  console.log(`\nGenerating ${filtered.length} image(s) into public/photos/generated/\n`);
  const results = [];
  for (const img of filtered) results.push(await generateOne(img));
  const ok = results.filter((r) => r.status === "ok").length;
  const skip = results.filter((r) => r.status === "skip").length;
  const fail = results.filter((r) => r.status !== "ok" && r.status !== "skip").length;
  console.log(`\n\x1b[1mDone:\x1b[0m ${ok} generated, ${skip} skipped, ${fail} failed.\n`);
  if (fail > 0) process.exit(1);
}

main();
