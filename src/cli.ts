#!/usr/bin/env node

import { readFileSync, writeFileSync, existsSync } from "fs";
import { homedir } from "os";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import * as readline from "readline/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const CLAUDE_CONFIG_PATH = join(homedir(), ".claude.json");

function getVersion(): string {
  const packagePath = join(__dirname, "..", "package.json");
  const packageJson = JSON.parse(readFileSync(packagePath, "utf-8"));
  return packageJson.version;
}

async function login() {
  console.log("Dinq Autopilot Login\n");

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    console.log("Press ENTER to open browser and get your Dinq API token...");
    await rl.question("");

    // Open browser
    const url = "https://dinq.me/autopilot";
    const { exec } = await import("child_process");
    const openCommand = process.platform === "darwin" ? "open" : process.platform === "win32" ? "start" : "xdg-open";
    exec(`${openCommand} ${url}`);

    console.log(`Browser opened: ${url}\n`);
    const token = await rl.question("Enter your Dinq API token: ");

    if (!token.trim()) {
      console.error("Error: Token cannot be empty");
      process.exit(1);
    }

    // Read existing config or create new one
    let config: any = {};
    if (existsSync(CLAUDE_CONFIG_PATH)) {
      const content = readFileSync(CLAUDE_CONFIG_PATH, "utf-8");
      config = JSON.parse(content);
    }

    // Add or update dinq-autopilot server
    if (!config.mcpServers) {
      config.mcpServers = {};
    }

    config.mcpServers["dinq-autopilot"] = {
      command: "npx",
      args: ["-y", "dinq-autopilot"],
      env: {
        DINQ_USER_TOKEN: token.trim(),
        DINQ_API_ENDPOINT: "https://api.dinq.me",
      },
    };

    // Write config
    writeFileSync(CLAUDE_CONFIG_PATH, JSON.stringify(config, null, 2));

    console.log("\nLogin complete!");
    console.log(`\nConfiguration saved to: ${CLAUDE_CONFIG_PATH}`);
    console.log("\nYou can now use dinq-autopilot in Claude Code:");
    console.log("  claude");
    console.log('  > Create a token stats card\n');
  } catch (error) {
    console.error("Error: Login failed:", error);
    process.exit(1);
  } finally {
    rl.close();
  }
}

const command = process.argv[2];

if (command === "login") {
  login();
} else if (command === "--version" || command === "-v") {
  console.log(getVersion());
} else {
  console.log("Dinq Autopilot CLI\n");
  console.log("Available commands:");
  console.log("  login            Login and configure dinq-autopilot");
  console.log("  -v, --version    Show version number");
  console.log("\nUsage:");
  console.log("  dinq-autopilot login");
  console.log("  dinq-autopilot --version");
}
