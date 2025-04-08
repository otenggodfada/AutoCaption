/** @format */

const fs = require("fs");
const sharp = require("sharp");

// Ensure the public directory exists
if (!fs.existsSync("public")) {
  fs.mkdirSync("public");
}

const sizes = [
  { size: 16, name: "favicon-16x16.png" },
  { size: 32, name: "favicon-32x32.png" },
  { size: 180, name: "apple-touch-icon.png" },
  { size: 192, name: "android-chrome-192x192.png" },
  { size: 512, name: "android-chrome-512x512.png" },
];

async function generateFavicons() {
  try {
    const svgBuffer = fs.readFileSync("public/favicon.svg");

    // Generate PNGs
    for (const { size, name } of sizes) {
      await sharp(svgBuffer).resize(size, size).png().toFile(`public/${name}`);
      console.log(`Generated ${name}`);
    }

    // Generate Safari pinned tab icon (monochrome SVG)
    await sharp(svgBuffer)
      .resize(512, 512)
      .grayscale()
      .toFile("public/safari-pinned-tab.svg");
    console.log("Generated safari-pinned-tab.svg");

    console.log("All favicons generated successfully!");
  } catch (error) {
    console.error("Error generating favicons:", error);
  }
}

generateFavicons();
