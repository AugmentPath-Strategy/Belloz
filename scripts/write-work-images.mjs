import fs from "fs";

const files = fs
  .readdirSync("public/images/home")
  .filter((f) => /\.jpe?g$/i.test(f) && !f.startsWith("001-"))
  .sort()
  .map((f) => `/images/home/${f}`);

fs.writeFileSync(
  "src/data/workImages.ts",
  `export const workImages = ${JSON.stringify(files, null, 2)} as const;\n`,
);
console.log("wrote", files.length);
