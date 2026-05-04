# MCP Expert Skill

This skill provides expertise in managing Model Context Protocol (MCP) servers and integrating them with Gemini CLI. It includes workflows for searching, installing, and troubleshooting MCP servers from registries like Smithery.

## Metadata
- **Name:** MCP Expert
- **Description:** Expertise in Model Context Protocol (MCP) and Smithery integration.
- **Version:** 1.0.0

## Instructions

### Searching for MCP Servers
- Use [Smithery](https://smithery.ai) to find available MCP servers.
- Common servers include:
    - `@modelcontextprotocol/server-github`: GitHub integration.
    - `@modelcontextprotocol/server-google-search`: Google Search integration.
    - `@modelcontextprotocol/server-postgres`: PostgreSQL database access.
    - `smithery-mcp-server`: A server for interacting with the Smithery registry.

### Installing MCP Servers
To install an MCP server, use the `gemini mcp add` command.

#### Example: Adding a Stdio Server (Local)
```bash
gemini mcp add <server-name> <command> [args...] --scope project
```

#### Example: Adding a Smithery Server
```bash
gemini mcp add smithery npx -y @smithery/cli mcp start
```

### Managing MCP Servers
- **List servers:** `/mcp list`
- **Reload servers:** `/mcp reload`
- **Remove a server:** `gemini mcp remove <server-name> --scope project`

### Troubleshooting
- Check the logs if a server fails to connect.
- Ensure all required environment variables are set using the `-e` flag during `gemini mcp add`.
- Verify the transport type (default is `stdio`).
