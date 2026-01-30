import { DinqClient } from "../api/client.js";
import { randomUUID } from "crypto";

// Card size configurations
const CARD_SIZES: Record<string, { desktop: string; mobile: string }> = {
  GITHUB: { desktop: "4x4", mobile: "4x4" },
  VIBE: { desktop: "4x4", mobile: "4x4" },
  NOTE: { desktop: "4x2", mobile: "4x2" },
  DEFAULT: { desktop: "4x2", mobile: "4x2" },
};

// Add card to cardboard and trigger generation
async function addCardWithLayout(
  client: DinqClient,
  params: {
    type: string;
    metadata: Record<string, any>;
    data?: Record<string, any>; // Custom data fields (e.g., title, content for NOTE)
    generateParams?: {
      type: string;
      url?: string;
      bio?: string;
    };
    size?: { desktop: string; mobile: string };
  }
): Promise<void> {
  const size = params.size || CARD_SIZES[params.type] || CARD_SIZES.DEFAULT;

  // Step 1: Add to cardboard first to get the data.id
  // Note: Backend expects layout INSIDE data object, position defaults to (0,0)
  const addBoardResponse: any = await client.addBoard({
    type: params.type,
    data: {
      ...params.data, // Custom data fields (title, content, etc.)
      metadata: params.metadata,
      layout: {
        desktop: { size: size.desktop, position: { x: 0, y: 0 } },
        mobile: { size: size.mobile, position: { x: 0, y: 0 } },
      },
    },
  });

  // Step 2: Trigger generation using the data.id from addBoard response
  if (params.generateParams) {
    // Get the datasource_id from addBoard response (data.board.data.id)
    const datasourceId = addBoardResponse.data?.board?.data?.id;
    if (datasourceId) {
      await client.generateCard({
        ...params.generateParams,
        datasource_id: datasourceId,
      });
    }
  }
}

export async function handleToolCall(
  name: string,
  args: any,
  client: DinqClient
): Promise<any> {
  switch (name) {
    case "create_token_stats_card":
      return await createTokenStatsCard(args, client);

    case "create_github_card":
      return await createGitHubCard(args, client);

    case "create_note_card":
      return await createNoteCard(args, client);

    case "create_social_cards":
      return await createSocialCards(args, client);

    case "create_career_trajectory":
      return await createCareerTrajectory(args, client);

    case "list_cards":
      return await listCards(args, client);

    case "delete_card":
      return await deleteCard(args, client);

    case "create_vibe_heatmap_card":
      return await createVibeHeatmapCard(args, client);

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

async function createTokenStatsCard(args: any, client: DinqClient) {
  const { period = "week", input_tokens, output_tokens } = args;

  const statsData = {
    period,
    input_tokens,
    output_tokens,
    total_tokens: input_tokens + output_tokens,
    timestamp: new Date().toISOString(),
  };

  await client.generateCard({
    type: "TOKEN_STATS",
    datasource_id: randomUUID(),
    bio: JSON.stringify(statsData),
  });

  return {
    content: [
      {
        type: "text",
        text: `✅ Token statistics card created!\n\n📊 ${period.toUpperCase()} Stats:\n• Input tokens: ${input_tokens.toLocaleString()}\n• Output tokens: ${output_tokens.toLocaleString()}\n• Total: ${(input_tokens + output_tokens).toLocaleString()}`,
      },
    ],
  };
}

async function createGitHubCard(args: any, client: DinqClient) {
  const { url } = args;

  await addCardWithLayout(client, {
    type: "GITHUB",
    metadata: { url },
    generateParams: { type: "GITHUB", url },
  });

  return {
    content: [
      {
        type: "text",
        text: `GitHub card created!\n\nProfile: ${url}\n\nThe card is being generated. Check your Dinq profile in a few moments.`,
      },
    ],
  };
}

async function createNoteCard(args: any, client: DinqClient) {
  const { title, content } = args;

  await addCardWithLayout(client, {
    type: "NOTE",
    data: {
      title,
      content,
      type: "NOTE",
    },
    metadata: {
      created_at: new Date().toISOString(),
    },
  });

  return {
    content: [
      {
        type: "text",
        text: `Note card "${title}" created!\n\nContent preview:\n${content.substring(0, 100)}${content.length > 100 ? "..." : ""}`,
      },
    ],
  };
}

async function createSocialCards(args: any, client: DinqClient) {
  const { platforms } = args;

  const results: string[] = [];

  for (const platform of platforms) {
    try {
      await addCardWithLayout(client, {
        type: platform.type,
        metadata: { url: platform.url },
        generateParams: { type: platform.type, url: platform.url },
      });
      results.push(`✅ ${platform.type}: ${platform.url}`);
    } catch (error) {
      results.push(`❌ ${platform.type}: ${error instanceof Error ? error.message : "Failed"}`);
    }
  }

  return {
    content: [
      {
        type: "text",
        text: `🚀 Batch card creation completed!\n\n${results.join("\n")}\n\nCards are being generated. Check your Dinq profile in a few moments.`,
      },
    ],
  };
}

async function createCareerTrajectory(args: any, client: DinqClient) {
  const { bio } = args;

  await client.generateCard({
    type: "CAREER_TRAJECTORY",
    datasource_id: randomUUID(),
    bio,
  });

  return {
    content: [
      {
        type: "text",
        text: `✅ Career trajectory card is being generated!\n\n📈 Based on your bio:\n${bio.substring(0, 150)}${bio.length > 150 ? "..." : ""}\n\nThe AI is analyzing your background and creating a professional timeline. Check your Dinq profile in a few moments.`,
      },
    ],
  };
}

async function createVibeHeatmapCard(args: any, client: DinqClient) {
  const { total_days, total_tokens, daily, platform = "claude" } = args;

  await addCardWithLayout(client, {
    type: "VIBE",
    data: {
      type: "VIBE",
    },
    metadata: {
      total_days,
      total_tokens,
      daily,
      platform,
    },
    size: CARD_SIZES.VIBE,
  });

  return {
    content: [
      {
        type: "text",
        text: `Vibe heatmap card created!\n\n${platform.toUpperCase()} Coding Stats:\n- Active days: ${total_days}\n- Total tokens: ${total_tokens.toLocaleString()}\n- Date range: ${daily[0]?.date} - ${daily[daily.length - 1]?.date}\n\nCheck your Dinq profile to see the card.`,
      },
    ],
  };
}

async function listCards(args: any, client: DinqClient) {
  const response: any = await client.getCardBoard();
  const cards = response.data?.board || response.board || [];

  if (cards.length === 0) {
    return {
      content: [
        {
          type: "text",
          text: "📋 You don't have any cards yet.\n\nUse `create_*` commands to create your first card!",
        },
      ],
    };
  }

  const cardList = cards
    .map((card: any, index: number) => {
      const cardType = card.data?.metadata?.card_type || card.data?.metadata?.type || card.data?.type || "UNKNOWN";
      const title = card.data?.title || card.data?.content?.substring(0, 30) || "Untitled";
      return `${index + 1}. [${cardType}] ${title}`;
    })
    .join("\n");

  return {
    content: [
      {
        type: "text",
        text: `📋 Your Dinq Cards (${cards.length} total):\n\n${cardList}`,
      },
    ],
  };
}

async function deleteCard(args: any, client: DinqClient) {
  const { card_id } = args;

  await client.deleteBoard(card_id);

  return {
    content: [
      {
        type: "text",
        text: `✅ Card deleted successfully!\n\n🗑️ Card ID: ${card_id}`,
      },
    ],
  };
}
