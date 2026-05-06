const fs = require("fs");
const path = require("path");

const projectRoot = process.cwd();

const settingsPath = path.join(projectRoot, "settings.json");
const outputDir = path.join(projectRoot, "src/environments");
const outputPath = path.join(outputDir, "app-settings.ts");

if (!fs.existsSync(settingsPath)) {
  throw new Error("❌ settings.json not found at project root");
}

fs.mkdirSync(outputDir, { recursive: true });

const settings = JSON.parse(fs.readFileSync(settingsPath, "utf-8"));

const content = `
export const AppSettings = ${JSON.stringify(settings, null, 2)} as const;
`;

fs.writeFileSync(outputPath, content);

console.log("✅ AppSettings generated at:", outputPath);
