# Tarot MCP Server

A Model Context Protocol (MCP) server that provides tarot card reading capabilities to AI assistants like Claude, Cursor, and other MCP-compatible tools.

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
**Linux**: `~/.config/Claude/claude_desktop_config.json`

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

### Cursor

Add to your Cursor settings:

1. Open Cursor Settings (`Cmd+,` on macOS, `Ctrl+,` on Windows/Linux)
2. Navigate to the "Features" tab
3. Look for "Model Context Protocol" or "MCP" section
4. Add the tarot server configuration:

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

### VSCode with Continue Extension

If using the Continue extension for VSCode:

1. Open Continue settings (`~/.continue/config.json`)
2. Add the MCP server to the `mcpServers` section:

```json
{
  "mcpServers": [
    {
      "name": "tarot",
      "command": "npx",
      "args": ["tarot-mcp"]
    }
  ]
}
```

### Other MCP-Compatible Tools

For any tool that supports MCP servers, you generally need:

- **Command**: `npx tarot-mcp` (if installed from npm) or `node /path/to/dist/index.js` (if local)
- **Transport**: stdio (standard input/output)
- **Server Name**: tarot

Check your tool's documentation for specific configuration format.

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

## Example Usage

### In Claude Desktop

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

### In Cursor

The tarot tools will be available to the AI assistant. You can use them in:

1. **Chat Panel**: Ask the AI to perform readings or explain cards
2. **Inline Code Generation**: Request tarot-related functionality
3. **Terminal Commands**: Use the AI to help interpret readings

Example prompts:
- "Use the tarot MCP server to draw a card for today"
- "Perform a relationship spread reading"
- "List all available tarot spreads"

### In VSCode with Continue

After configuration, use commands like:
- Type `@tarot` to specifically use the tarot server
- Ask questions like "Draw a Celtic Cross spread"
- Request interpretations: "What does the Three of Swords mean?"

### Programmatic Usage

You can also interact with the MCP server programmatically:

```typescript
// Example of calling the MCP server from your application
const reading = await mcp.call('tarot', 'perform_reading', {
  spreadId: 'celtic-cross',
  question: 'What should I focus on this month?'
});

const interpretation = await mcp.call('tarot', 'interpret_reading', {
  reading: reading
});
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

## Troubleshooting

### Common Issues

1. **Server not connecting**
   - Ensure the path to the server is correct
   - Check that Node.js is installed and accessible
   - Verify the configuration file is properly formatted JSON

2. **Commands not working**
   - Restart your AI tool after adding the configuration
   - Check the tool's logs for MCP connection errors
   - Ensure you've built the project if running from source

3. **"Tool not found" errors**
   - The AI tool might need explicit prompting to use the MCP server
   - Try prefixing requests with "Use the tarot MCP server to..."

### Getting Help

- Check the [GitHub Issues](https://github.com/abdul-hamid-achik/tarot-mcp/issues)
- Verify your configuration matches the examples above
- Ensure you're using the latest version

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Ideas for Contribution

- Add more tarot spreads
- Enhance card interpretations
- Add support for different tarot deck traditions
- Implement card combination meanings
- Add journaling features
- Create visualization tools

## License

MIT

## Author

Abdul Hamid Achik

## Acknowledgments

- Tarot card meanings based on traditional Rider-Waite-Smith interpretations
- Built with the [Model Context Protocol SDK](https://github.com/anthropics/model-context-protocol)
- Inspired by centuries of tarot tradition and modern digital divination tools

## Resources

- [MCP Documentation](https://modelcontextprotocol.io/)
- [Tarot History and Meanings](https://www.tarot.com/)
- [GitHub Repository](https://github.com/abdul-hamid-achik/tarot-mcp)