#!/usr/bin/env node

import { readFileSync, writeFileSync, existsSync } from "fs";
import { homedir } from "os";
import { join } from "path";
import * as readline from "readline/promises";

const CLAUDE_CONFIG_PATH = join(homedir(), ".claude.json");

async function setup() {
  console.log("🚀 Dinq Autopilot Setup\n");

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    console.log("Press ENTER to open browser and get your Dinq API token...");
    await rl.question("");

    // Open browser
    const url = "https://dinq.me/settings/api";
    const { exec } = await import("child_process");
    const openCommand = process.platform === "darwin" ? "open" : process.platform === "win32" ? "start" : "xdg-open";
    exec(`${openCommand} ${url}`);

    console.log(`✅ Browser opened: ${url}\n`);
    const token = await rl.question("Enter your Dinq API token: ");

    if (!token.trim()) {
      console.error("❌ Token cannot be empty");
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

    console.log("\n✅ Setup complete!");
    console.log(`\nConfiguration saved to: ${CLAUDE_CONFIG_PATH}`);
    console.log("\nYou can now use dinq-autopilot in Claude Code:");
    console.log("  claude");
    console.log('  > Create a token stats card\n');
  } catch (error) {
    console.error("❌ Setup failed:", error);
    process.exit(1);
  } finally {
    rl.close();
  }
}

const command = process.argv[2];

if (command === "setup") {
  setup();
} else {
  console.log("Dinq Autopilot CLI\n");
  console.log("Available commands:");
  console.log("  setup    Configure dinq-autopilot for Claude Code");
  console.log("\nUsage:");
  console.log("  dinq-autopilot setup");
}
