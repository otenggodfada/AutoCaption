#!/bin/bash

# Create the public directory if it doesn't exist
mkdir -p public

# Generate PNG favicons from SVG
convert public/favicon.svg -resize 16x16 public/favicon-16x16.png
convert public/favicon.svg -resize 32x32 public/favicon-32x32.png
convert public/favicon.svg -resize 180x180 public/apple-touch-icon.png
convert public/favicon.svg -resize 192x192 public/android-chrome-192x192.png
convert public/favicon.svg -resize 512x512 public/android-chrome-512x512.png

# Generate Safari pinned tab icon (monochrome)
convert public/favicon.svg -resize 512x512 -colorspace gray -separate -average public/safari-pinned-tab.svg

echo "Favicons generated successfully!" 