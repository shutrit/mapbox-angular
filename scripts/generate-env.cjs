const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
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

// Without it, process.env only contains system-level environment variables.
//  On GitHub CI you don't need it because the secrets are already
//  in process.env — dotenv.config() simply finds no .env file and silently does nothing.
