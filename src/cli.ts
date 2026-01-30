#!/usr/bin/env node

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { homedir } from "os";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import * as readline from "readline/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration paths for different platforms
const CONFIG_PATHS = {
  claude: join(homedir(), ".claude.json"),
  cursor: join(homedir(), ".cursor", "mcp.json"),
  windsurf: join(homedir(), ".windsurf", "mcp_settings.json"),
};

function getVersion(): string {
  const packagePath = join(__dirname, "..", "package.json");
  const packageJson = JSON.parse(readFileSync(packagePath, "utf-8"));
  return packageJson.version;
}

async function getTokenFromBrowser(): Promise<string> {
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

    return token.trim();
  } finally {
    rl.close();
  }
}

async function setupClaude(token: string) {
  const { execSync } = await import("child_process");

  // Use Claude Code's official CLI to add MCP server with user scope
  const mcpConfig = {
    command: "npx",
    args: ["-y", "dinq-autopilot-mcp"],
    env: {
      DINQ_USER_TOKEN: token,
      DINQ_API_ENDPOINT: "https://api.dinq.me",
    },
  };

  try {
    // Remove existing config first (ignore errors if not exists)
    try {
      execSync("claude mcp remove dinq-autopilot --scope user", { stdio: "ignore" });
    } catch {
      // Ignore if not exists
    }

    // Add using official CLI with user scope
    const configJson = JSON.stringify(mcpConfig);
    execSync(`claude mcp add-json dinq-autopilot '${configJson}' --scope user`, {
      stdio: "inherit",
    });

    console.log("\nSetup complete!");
    console.log("\nPlease restart Claude Code to load the new configuration:");
    console.log("  1. Exit current Claude Code session");
    console.log("  2. Run 'claude' to start a new session");
    console.log("  3. Try: 'Create a GitHub card for my profile'\n");
  } catch (error) {
    // Fallback to manual config if claude CLI is not available
    console.log("Claude CLI not found, falling back to manual configuration...");
    await setupClaudeFallback(token);
  }
}

async function setupClaudeFallback(token: string) {
  const configPath = CONFIG_PATHS.claude;

  let config: any = {};
  if (existsSync(configPath)) {
    const content = readFileSync(configPath, "utf-8");
    config = JSON.parse(content);
  }

  if (!config.mcpServers) {
    config.mcpServers = {};
  }

  config.mcpServers["dinq-autopilot"] = {
    command: "npx",
    args: ["-y", "dinq-autopilot-mcp"],
    env: {
      DINQ_USER_TOKEN: token,
      DINQ_API_ENDPOINT: "https://api.dinq.me",
    },
  };

  // Clean empty project-level mcpServers
  let cleanedProjects = 0;
  if (config.projects) {
    for (const projectPath of Object.keys(config.projects)) {
      const project = config.projects[projectPath];
      if (project.mcpServers && Object.keys(project.mcpServers).length === 0) {
        delete project.mcpServers;
        cleanedProjects++;
      }
    }
  }

  writeFileSync(configPath, JSON.stringify(config, null, 2));

  console.log("\nSetup complete!");
  console.log(`\nConfiguration saved to: ${configPath}`);
  if (cleanedProjects > 0) {
    console.log(`Cleaned ${cleanedProjects} project-level empty configs for global inheritance.`);
  }
  console.log("\nPlease restart Claude Code to load the new configuration:");
  console.log("  1. Exit current Claude Code session");
  console.log("  2. Run 'claude' to start a new session");
  console.log("  3. Try: 'Create a GitHub card for my profile'\n");
}

async function setupCursor(token: string) {
  const configPath = CONFIG_PATHS.cursor;
  const configDir = dirname(configPath);

  // Create directory if not exists
  if (!existsSync(configDir)) {
    mkdirSync(configDir, { recursive: true });
  }

  // Read existing config or create new one
  let config: any = { mcpServers: {} };
  if (existsSync(configPath)) {
    const content = readFileSync(configPath, "utf-8");
    config = JSON.parse(content);
  }

  if (!config.mcpServers) {
    config.mcpServers = {};
  }

  config.mcpServers["dinq-autopilot"] = {
    command: "npx",
    args: ["-y", "dinq-autopilot-mcp"],
    env: {
      DINQ_USER_TOKEN: token,
      DINQ_API_ENDPOINT: "https://api.dinq.me",
    },
  };

  // Write config
  writeFileSync(configPath, JSON.stringify(config, null, 2));

  console.log("\nSetup complete!");
  console.log(`\nConfiguration saved to: ${configPath}`);
  console.log("\nPlease restart Cursor to load the new configuration:");
  console.log("  1. Exit Cursor");
  console.log("  2. Reopen Cursor");
  console.log("  3. Try using Dinq autopilot in Composer\n");
}

async function setupWindsurf(token: string) {
  const configPath = CONFIG_PATHS.windsurf;
  const configDir = dirname(configPath);

  // Create directory if not exists
  if (!existsSync(configDir)) {
    mkdirSync(configDir, { recursive: true });
  }

  // Read existing config or create new one
  let config: any = { mcpServers: {} };
  if (existsSync(configPath)) {
    const content = readFileSync(configPath, "utf-8");
    config = JSON.parse(content);
  }

  if (!config.mcpServers) {
    config.mcpServers = {};
  }

  config.mcpServers["dinq-autopilot"] = {
    command: "npx",
    args: ["-y", "dinq-autopilot-mcp"],
    env: {
      DINQ_USER_TOKEN: token,
      DINQ_API_ENDPOINT: "https://api.dinq.me",
    },
  };

  // Write config
  writeFileSync(configPath, JSON.stringify(config, null, 2));

  console.log("\nSetup complete!");
  console.log(`\nConfiguration saved to: ${configPath}`);
  console.log("\nPlease restart Windsurf to load the new configuration:");
  console.log("  1. Exit Windsurf");
  console.log("  2. Reopen Windsurf");
  console.log("  3. Try using Dinq autopilot in Cascade\n");
}

async function setup(platform: string) {
  console.log(`Dinq Autopilot Setup - ${platform.charAt(0).toUpperCase() + platform.slice(1)}\n`);

  const token = await getTokenFromBrowser();

  switch (platform) {
    case "claude":
      await setupClaude(token);
      break;
    case "cursor":
      await setupCursor(token);
      break;
    case "windsurf":
      await setupWindsurf(token);
      break;
    default:
      console.error(`Error: Unknown platform '${platform}'`);
      console.error("Supported platforms: claude, cursor, windsurf");
      process.exit(1);
  }
}

// Main
const command = process.argv[2];
const platform = process.argv[3];

if (command === "setup") {
  if (!platform) {
    console.error("Error: Platform is required\n");
    console.log("Usage:");
    console.log("  dinq-autopilot setup claude");
    console.log("  dinq-autopilot setup cursor");
    console.log("  dinq-autopilot setup windsurf");
    process.exit(1);
  }
  setup(platform);
} else if (command === "--version" || command === "-v") {
  console.log(getVersion());
} else {
  console.log("Dinq Autopilot CLI\n");
  console.log("Available commands:");
  console.log("  setup <platform>    Configure dinq-autopilot for a specific platform");
  console.log("  -v, --version       Show version number");
  console.log("\nSupported platforms:");
  console.log("  claude              Claude Code");
  console.log("  cursor              Cursor");
  console.log("  windsurf            Windsurf");
  console.log("\nUsage:");
  console.log("  dinq-autopilot setup claude");
  console.log("  dinq-autopilot setup cursor");
  console.log("  dinq-autopilot setup windsurf");
  console.log("  dinq-autopilot --version");
}
