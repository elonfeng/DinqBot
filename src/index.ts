#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { DinqClient } from "./api/client.js";
import { tools } from "./tools/index.js";
import { handleToolCall } from "./tools/handler.js";

const API_ENDPOINT = process.env.DINQ_API_ENDPOINT || "https://api.dinq.me";
const USER_TOKEN = process.env.DINQ_USER_TOKEN;

if (!USER_TOKEN) {
  console.error("Error: DINQ_USER_TOKEN environment variable is required");
  console.error("Please set your Dinq API token:");
  console.error("  export DINQ_USER_TOKEN=your_token_here");
  console.error("\nOr configure it in your MCP client config file.");
  process.exit(1);
}

const server = new Server(
  {
    name: "dinqbot",
    version: "0.0.1",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Initialize Dinq API client
const dinqClient = new DinqClient(API_ENDPOINT, USER_TOKEN);

// Register tools list handler
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools,
  };
});

// Register tool call handler
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    return await handleToolCall(request.params.name, request.params.arguments, dinqClient);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      content: [
        {
          type: "text",
          text: `Error: ${message}`,
        },
      ],
      isError: true,
    };
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("DinqBot MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
