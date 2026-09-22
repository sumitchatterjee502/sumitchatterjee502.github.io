import { writeFileSync, existsSync } from "node:fs";

if (!existsSync("out/index.html")) {
  console.error("Static export failed: out/index.html was not generated.");
  process.exit(1);
}

writeFileSync("out/.nojekyll", "");
console.log("Added out/.nojekyll for GitHub Pages");
