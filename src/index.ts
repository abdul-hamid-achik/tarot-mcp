#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';
import { TarotTools } from './tools/tarot-tools.js';

const tarotTools = new TarotTools();

const server = new Server(
  {
    name: 'tarot-mcp',
    version: '0.1.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define available tools
const TOOLS: Tool[] = [
  {
    name: 'draw_cards',
    description: 'Draw a specified number of tarot cards',
    inputSchema: {
      type: 'object',
      properties: {
        count: {
          type: 'number',
          description: 'Number of cards to draw (1-78)',
          minimum: 1,
          maximum: 78,
        },
      },
      required: ['count'],
    },
  },
  {
    name: 'perform_reading',
    description: 'Perform a tarot reading with a specific spread',
    inputSchema: {
      type: 'object',
      properties: {
        spreadId: {
          type: 'string',
          description: 'ID of the spread to use (e.g., "celtic-cross", "past-present-future")',
        },
        question: {
          type: 'string',
          description: 'Optional question for the reading',
        },
      },
      required: ['spreadId'],
    },
  },
  {
    name: 'interpret_reading',
    description: 'Get a detailed interpretation of a tarot reading',
    inputSchema: {
      type: 'object',
      properties: {
        reading: {
          type: 'object',
          description: 'The reading object returned from perform_reading',
        },
      },
      required: ['reading'],
    },
  },
  {
    name: 'get_card_meaning',
    description: 'Get detailed information about a specific tarot card',
    inputSchema: {
      type: 'object',
      properties: {
        cardName: {
          type: 'string',
          description: 'Name of the card (e.g., "The Fool", "Three of Cups")',
        },
      },
      required: ['cardName'],
    },
  },
  {
    name: 'list_spreads',
    description: 'List all available tarot spreads',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'get_spread_info',
    description: 'Get detailed information about a specific spread',
    inputSchema: {
      type: 'object',
      properties: {
        spreadId: {
          type: 'string',
          description: 'ID of the spread',
        },
      },
      required: ['spreadId'],
    },
  },
  {
    name: 'daily_card',
    description: 'Draw a single card for daily guidance',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'search_cards',
    description: 'Search for tarot cards by keyword',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Search query (searches names, keywords, and descriptions)',
        },
      },
      required: ['query'],
    },
  },
  {
    name: 'list_all_cards',
    description: 'List all 78 tarot cards',
    inputSchema: {
      type: 'object',
      properties: {
        arcana: {
          type: 'string',
          enum: ['major', 'minor', 'all'],
          description: 'Filter by arcana type (default: all)',
        },
      },
    },
  },
];

// Handle tool listing
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: TOOLS,
  };
});

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (!args) {
    throw new Error('No arguments provided');
  }

  try {
    switch (name) {
      case 'draw_cards': {
        const count = args.count as number;
        const cards = tarotTools.drawCards(count);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(cards, null, 2),
            },
          ],
        };
      }

      case 'perform_reading': {
        const spreadId = args.spreadId as string;
        const question = args.question as string | undefined;
        const reading = tarotTools.performReading(spreadId, question);
        
        if (!reading) {
          throw new Error(`Spread with ID "${spreadId}" not found`);
        }

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(reading, null, 2),
            },
          ],
        };
      }

      case 'interpret_reading': {
        const reading = args.reading as any;
        const interpretation = tarotTools.interpretReading(reading);
        return {
          content: [
            {
              type: 'text',
              text: interpretation,
            },
          ],
        };
      }

      case 'get_card_meaning': {
        const cardName = args.cardName as string;
        const card = tarotTools.getCardMeaning(cardName);
        
        if (!card) {
          throw new Error(`Card "${cardName}" not found`);
        }

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(card, null, 2),
            },
          ],
        };
      }

      case 'list_spreads': {
        const spreads = tarotTools.getAllSpreads();
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(spreads.map(s => ({
                id: s.id,
                name: s.name,
                description: s.description,
                cardCount: s.positions.length
              })), null, 2),
            },
          ],
        };
      }

      case 'get_spread_info': {
        const spreadId = args.spreadId as string;
        const spread = tarotTools.getSpreadInfo(spreadId);
        
        if (!spread) {
          throw new Error(`Spread with ID "${spreadId}" not found`);
        }

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(spread, null, 2),
            },
          ],
        };
      }

      case 'daily_card': {
        const card = tarotTools.getDailyCard();
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(card, null, 2),
            },
          ],
        };
      }

      case 'search_cards': {
        const query = args.query as string;
        const cards = tarotTools.searchCards(query);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(cards.map(c => ({
                name: c.name,
                arcana: c.arcana,
                keywords: c.keywords,
                id: c.id
              })), null, 2),
            },
          ],
        };
      }

      case 'list_all_cards': {
        const arcanaFilter = args.arcana as string || 'all';
        let cards = tarotTools.getAllCards();
        
        if (arcanaFilter !== 'all') {
          cards = cards.filter(c => c.arcana === arcanaFilter);
        }

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(cards.map(c => ({
                name: c.name,
                arcana: c.arcana,
                suit: c.suit,
                number: c.number,
                id: c.id
              })), null, 2),
            },
          ],
        };
      }

      default:
        throw new Error(`Tool "${name}" not found`);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${errorMessage}`,
        },
      ],
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Tarot MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});