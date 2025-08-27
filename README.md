# Tarot MCP Server

A Model Context Protocol (MCP) server that provides tarot card reading capabilities to AI assistants.

## Features

- **Complete 78-card Tarot deck** with Major and Minor Arcana
- **Multiple spread layouts** including Celtic Cross, Past-Present-Future, and more
- **Card interpretations** with upright and reversed meanings
- **Intelligent readings** with contextual interpretation
- **Search functionality** to find cards by keywords
- **Daily card draws** for daily guidance

## Installation

### From npm

```bash
npm install -g tarot-mcp
```

### From source

```bash
git clone https://github.com/yourusername/tarot-mcp.git
cd tarot-mcp
npm install
npm run build
```

## Configuration

### Claude Desktop

Add the following to your Claude Desktop configuration file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "tarot": {
      "command": "npx",
      "args": ["tarot-mcp"]
    }
  }
}
```

If installed locally from source:

```json
{
  "mcpServers": {
    "tarot": {
      "command": "node",
      "args": ["/path/to/tarot-mcp/dist/index.js"]
    }
  }
}
```

## Available Tools

### 1. `draw_cards`
Draw a specified number of tarot cards.
- **Parameters:**
  - `count` (number): Number of cards to draw (1-78)

### 2. `perform_reading`
Perform a complete tarot reading with a specific spread.
- **Parameters:**
  - `spreadId` (string): ID of the spread to use
  - `question` (string, optional): Question for the reading

### 3. `interpret_reading`
Get a detailed interpretation of a tarot reading.
- **Parameters:**
  - `reading` (object): The reading object from `perform_reading`

### 4. `get_card_meaning`
Get detailed information about a specific tarot card.
- **Parameters:**
  - `cardName` (string): Name of the card (e.g., "The Fool", "Three of Cups")

### 5. `list_spreads`
List all available tarot spreads with descriptions.

### 6. `get_spread_info`
Get detailed information about a specific spread.
- **Parameters:**
  - `spreadId` (string): ID of the spread

### 7. `daily_card`
Draw a single card for daily guidance.

### 8. `search_cards`
Search for tarot cards by keyword.
- **Parameters:**
  - `query` (string): Search query

### 9. `list_all_cards`
List all 78 tarot cards.
- **Parameters:**
  - `arcana` (string, optional): Filter by "major", "minor", or "all"

## Available Spreads

- `single-card`: Single Card - Quick insight or daily guidance
- `past-present-future`: Past, Present, Future - Temporal progression
- `situation-action-outcome`: Situation, Action, Outcome - Decision making
- `mind-body-spirit`: Mind, Body, Spirit - Holistic self-reflection
- `celtic-cross`: Celtic Cross - Comprehensive 10-card analysis
- `relationship-spread`: Relationship Spread - 7-card relationship dynamics
- `career-spread`: Career Path - 5-card career guidance
- `horseshoe`: Horseshoe - 7-card general guidance
- `year-ahead`: Year Ahead - 12 cards for each month
- `decision-making`: Decision Making - 5-card decision analysis

## Example Usage in Claude

Once configured, you can ask Claude to use the tarot tools:

```
"Draw three tarot cards for me"

"Perform a Celtic Cross reading about my career"

"What does The Fool card mean?"

"Show me all available tarot spreads"

"Do a past-present-future reading about my relationship"

"Search for cards related to 'love'"

"Give me a daily tarot card"
```

## Development

### Building

```bash
npm run build
```

### Testing locally

```bash
npm run dev
```

### Project Structure

```
tarot-mcp/
├── src/
│   ├── index.ts          # MCP server implementation
│   ├── types/            # TypeScript type definitions
│   │   └── tarot.ts
│   ├── data/            # Tarot card and spread data
│   │   ├── cards.ts
│   │   └── spreads.ts
│   └── tools/           # Tool implementations
│       └── tarot-tools.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Author

Your Name

## Acknowledgments

- Tarot card meanings based on traditional Rider-Waite-Smith interpretations
- Built with the Model Context Protocol SDK