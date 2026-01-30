export const tools = [
  {
    name: "create_token_stats_card",
    description: "Create a card displaying Claude Code token usage statistics for a given period (today, week, or month)",
    inputSchema: {
      type: "object",
      properties: {
        period: {
          type: "string",
          description: "Statistics period",
          enum: ["today", "week", "month"],
          default: "week",
        },
        input_tokens: {
          type: "number",
          description: "Number of input tokens used",
        },
        output_tokens: {
          type: "number",
          description: "Number of output tokens generated",
        },
      },
      required: ["input_tokens", "output_tokens"],
    },
  },
  {
    name: "create_github_card",
    description: "Create a GitHub profile card with your activity and repositories",
    inputSchema: {
      type: "object",
      properties: {
        url: {
          type: "string",
          description: "GitHub profile URL (e.g., https://github.com/username)",
        },
      },
      required: ["url"],
    },
  },
  {
    name: "create_note_card",
    description: "Create a custom note card with title and markdown content",
    inputSchema: {
      type: "object",
      properties: {
        title: {
          type: "string",
          description: "Note title",
        },
        content: {
          type: "string",
          description: "Note content (supports Markdown)",
        },
      },
      required: ["title", "content"],
    },
  },
  {
    name: "create_social_cards",
    description: "Batch create social media cards (GitHub, LinkedIn, Twitter, Spotify, etc.)",
    inputSchema: {
      type: "object",
      properties: {
        platforms: {
          type: "array",
          description: "List of social media platforms to create cards for",
          items: {
            type: "object",
            properties: {
              type: {
                type: "string",
                description: "Platform type",
                enum: ["GITHUB", "LINKEDIN", "TWITTER", "SPOTIFY", "INSTAGRAM", "YOUTUBE"],
              },
              url: {
                type: "string",
                description: "Profile URL",
              },
            },
            required: ["type", "url"],
          },
        },
      },
      required: ["platforms"],
    },
  },
  {
    name: "create_career_trajectory",
    description: "Generate a career trajectory card from your professional bio",
    inputSchema: {
      type: "object",
      properties: {
        bio: {
          type: "string",
          description: "Your professional bio or career description",
        },
      },
      required: ["bio"],
    },
  },
  {
    name: "list_cards",
    description: "List all your Dinq cards",
    inputSchema: {
      type: "object",
      properties: {
        filter: {
          type: "string",
          description: "Filter cards by type",
          enum: ["all", "social", "custom"],
          default: "all",
        },
      },
    },
  },
  {
    name: "delete_card",
    description: "Delete a specific card by its ID",
    inputSchema: {
      type: "object",
      properties: {
        card_id: {
          type: "string",
          description: "The ID of the card to delete",
        },
      },
      required: ["card_id"],
    },
  },
  {
    name: "create_vibe_heatmap_card",
    description: "Create a vibe coding heatmap card showing daily token usage statistics. The AI agent should first collect the usage data by running the stats script, then pass the results to this tool.",
    inputSchema: {
      type: "object",
      properties: {
        total_days: {
          type: "number",
          description: "Total number of days with activity",
        },
        total_tokens: {
          type: "number",
          description: "Total tokens used across all days",
        },
        daily: {
          type: "array",
          description: "Daily token usage breakdown",
          items: {
            type: "object",
            properties: {
              date: {
                type: "string",
                description: "Date in YYYY-MM-DD format",
              },
              tokens: {
                type: "number",
                description: "Tokens used on this day",
              },
            },
            required: ["date", "tokens"],
          },
        },
        platform: {
          type: "string",
          description: "Platform name (e.g., 'claude', 'cursor')",
          default: "claude",
        },
      },
      required: ["total_days", "total_tokens", "daily"],
    },
  },
];
