/** @format */

import { promises as fs } from "fs";
import sharp from "sharp";

// Ensure the public directory exists
try {
  await fs.access("public");
} catch {
  await fs.mkdir("public");
}

const sizes = [
  { size: 16, name: "favicon-16x16.png" },
  { size: 32, name: "favicon-32x32.png" },
  { size: 180, name: "apple-touch-icon.png" },
  { size: 192, name: "android-chrome-192x192.png" },
  { size: 512, name: "android-chrome-512x512.png" },
];

try {
  const svgBuffer = await fs.readFile("public/favicon.svg");

  // Generate PNGs
  for (const { size, name } of sizes) {
    await sharp(svgBuffer, { density: 300 })
      .resize(size, size, {
        fit: "contain",
        background: { r: 255, g: 255, b: 255, alpha: 0 },
      })
      .png()
      .toFile(`public/${name}`);
    console.log(`Generated ${name}`);
  }

  // Generate Safari pinned tab icon (monochrome SVG)
  await sharp(svgBuffer, { density: 300 })
    .resize(512, 512)
    .grayscale()
    .toFile("public/safari-pinned-tab.svg");
  console.log("Generated safari-pinned-tab.svg");

  console.log("All favicons generated successfully!");
} catch (error) {
  console.error("Error generating favicons:", error.message);
  console.error(error.stack);
}
