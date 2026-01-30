const completionSpec: Fig.Spec = {
  name: "claude",
  description:
    "Claude Code - starts an interactive session by default, use -p/--print for non-interactive output",
  subcommands: [
    {
      name: "doctor",
      description: "Check the health of your Claude Code auto-updater",
    },
    {
      name: "install",
      description: "Install Claude Code native build. Use [target] to specify version (stable, latest, or specific version)",
      args: {
        name: "target",
        description: "Version target (stable, latest, or specific version)",
        isOptional: true,
        suggestions: ["stable", "latest"],
      },
      options: [
        {
          name: ["-h", "--help"],
          description: "Display help for command",
        },
      ],
    },
    {
      name: "mcp",
      description: "Configure and manage MCP servers",
    },
    {
      name: "plugin",
      description: "Manage Claude Code plugins",
    },
    {
      name: "setup-token",
      description: "Set up a long-lived authentication token (requires Claude subscription)",
    },
    {
      name: "update",
      description: "Check for updates and install if available",
    },
  ],
  options: [
    {
      name: ["-h", "--help"],
      description: "Display help for command",
      isPersistent: true,
    },
    {
      name: ["-v", "--version"],
      description: "Output the version number",
    },
    {
      name: ["-p", "--print"],
      description:
        "Print response and exit (useful for pipes). Note: The workspace trust dialog is skipped when Claude is run with the -p mode. Only use this flag in directories you trust",
    },
    {
      name: ["-c", "--continue"],
      description: "Continue the most recent conversation in the current directory",
    },
    {
      name: ["-r", "--resume"],
      description:
        "Resume a conversation by session ID, or open interactive picker with optional search term",
      args: {
        name: "session-id",
        description: "Session ID or search term",
        isOptional: true,
      },
    },
    {
      name: ["-d", "--debug"],
      description:
        'Enable debug mode with optional category filtering (e.g., "api,hooks" or "!statsig,!file")',
      args: {
        name: "filter",
        description: "Category filter",
        isOptional: true,
      },
    },
    {
      name: "--add-dir",
      description: "Additional directories to allow tool access to",
      args: {
        name: "directories",
        isVariadic: true,
        template: "folders",
      },
    },
    {
      name: "--agent",
      description:
        "Agent for the current session. Overrides the 'agent' setting",
      args: {
        name: "agent",
        description: "Agent name",
      },
    },
    {
      name: "--agents",
      description:
        'JSON object defining custom agents (e.g. \'{"reviewer": {"description": "Reviews code", "prompt": "You are a code reviewer"}}\')',
      args: {
        name: "json",
        description: "JSON object defining custom agents",
      },
    },
    {
      name: "--allow-dangerously-skip-permissions",
      description:
        "Enable bypassing all permission checks as an option, without it being enabled by default. Recommended only for sandboxes with no internet access",
    },
    {
      name: ["--allowedTools", "--allowed-tools"],
      description:
        'Comma or space-separated list of tool names to allow (e.g. "Bash(git:*) Edit")',
      args: {
        name: "tools",
        description: "Tool names to allow",
        isVariadic: true,
      },
    },
    {
      name: "--append-system-prompt",
      description: "Append a system prompt to the default system prompt",
      args: {
        name: "prompt",
        description: "System prompt to append",
      },
    },
    {
      name: "--betas",
      description: "Beta headers to include in API requests (API key users only)",
      args: {
        name: "betas",
        description: "Beta headers",
        isVariadic: true,
      },
    },
    {
      name: "--chrome",
      description: "Enable Claude in Chrome integration",
    },
    {
      name: "--dangerously-skip-permissions",
      description:
        "Bypass all permission checks. Recommended only for sandboxes with no internet access",
    },
    {
      name: "--debug-file",
      description:
        "Write debug logs to a specific file path (implicitly enables debug mode)",
      args: {
        name: "path",
        description: "Debug log file path",
        template: "filepaths",
      },
    },
    {
      name: "--disable-slash-commands",
      description: "Disable all skills",
    },
    {
      name: ["--disallowedTools", "--disallowed-tools"],
      description:
        'Comma or space-separated list of tool names to deny (e.g. "Bash(git:*) Edit")',
      args: {
        name: "tools",
        description: "Tool names to deny",
        isVariadic: true,
      },
    },
    {
      name: "--fallback-model",
      description:
        "Enable automatic fallback to specified model when default model is overloaded (only works with --print)",
      args: {
        name: "model",
        description: "Fallback model name",
      },
    },
    {
      name: "--file",
      description:
        "File resources to download at startup. Format: file_id:relative_path (e.g., --file file_abc:doc.txt file_def:img.png)",
      args: {
        name: "specs",
        description: "File specs (file_id:relative_path)",
        isVariadic: true,
      },
    },
    {
      name: "--fork-session",
      description:
        "When resuming, create a new session ID instead of reusing the original (use with --resume or --continue)",
    },
    {
      name: "--ide",
      description:
        "Automatically connect to IDE on startup if exactly one valid IDE is available",
    },
    {
      name: "--include-partial-messages",
      description:
        "Include partial message chunks as they arrive (only works with --print and --output-format=stream-json)",
    },
    {
      name: "--input-format",
      description:
        'Input format (only works with --print): "text" (default), or "stream-json" (realtime streaming input)',
      args: {
        name: "format",
        suggestions: ["text", "stream-json"],
      },
    },
    {
      name: "--json-schema",
      description:
        'JSON Schema for structured output validation. Example: {"type":"object","properties":{"name":{"type":"string"}},"required":["name"]}',
      args: {
        name: "schema",
        description: "JSON Schema",
      },
    },
    {
      name: "--max-budget-usd",
      description:
        "Maximum dollar amount to spend on API calls (only works with --print)",
      args: {
        name: "amount",
        description: "Maximum budget in USD",
      },
    },
    {
      name: "--mcp-config",
      description:
        "Load MCP servers from JSON files or strings (space-separated)",
      args: {
        name: "configs",
        description: "MCP config files or JSON strings",
        isVariadic: true,
        template: "filepaths",
      },
    },
    {
      name: "--mcp-debug",
      description:
        "[DEPRECATED. Use --debug instead] Enable MCP debug mode (shows MCP server errors)",
    },
    {
      name: "--model",
      description:
        "Model for the current session. Provide an alias for the latest model (e.g. 'sonnet' or 'opus') or a model's full name (e.g. 'claude-sonnet-4-5-20250929')",
      args: {
        name: "model",
        description: "Model name or alias",
        suggestions: ["sonnet", "opus"],
      },
    },
    {
      name: "--no-chrome",
      description: "Disable Claude in Chrome integration",
    },
    {
      name: "--no-session-persistence",
      description:
        "Disable session persistence - sessions will not be saved to disk and cannot be resumed (only works with --print)",
    },
    {
      name: "--output-format",
      description:
        'Output format (only works with --print): "text" (default), "json" (single result), or "stream-json" (realtime streaming)',
      args: {
        name: "format",
        suggestions: ["text", "json", "stream-json"],
      },
    },
    {
      name: "--permission-mode",
      description: "Permission mode to use for the session",
      args: {
        name: "mode",
        suggestions: [
          "acceptEdits",
          "bypassPermissions",
          "default",
          "delegate",
          "dontAsk",
          "plan",
        ],
      },
    },
    {
      name: "--plugin-dir",
      description: "Load plugins from directories for this session only (repeatable)",
      args: {
        name: "paths",
        description: "Plugin directory paths",
        isVariadic: true,
        template: "folders",
      },
    },
    {
      name: "--replay-user-messages",
      description:
        "Re-emit user messages from stdin back on stdout for acknowledgment (only works with --input-format=stream-json and --output-format=stream-json)",
    },
    {
      name: "--session-id",
      description:
        "Use a specific session ID for the conversation (must be a valid UUID)",
      args: {
        name: "uuid",
        description: "Session UUID",
      },
    },
    {
      name: "--setting-sources",
      description:
        "Comma-separated list of setting sources to load (user, project, local)",
      args: {
        name: "sources",
        description: "Setting sources",
        suggestions: ["user", "project", "local"],
      },
    },
    {
      name: "--settings",
      description:
        "Path to a settings JSON file or a JSON string to load additional settings from",
      args: {
        name: "file-or-json",
        description: "Settings file path or JSON string",
        template: "filepaths",
      },
    },
    {
      name: "--strict-mcp-config",
      description:
        "Only use MCP servers from --mcp-config, ignoring all other MCP configurations",
    },
    {
      name: "--system-prompt",
      description: "System prompt to use for the session",
      args: {
        name: "prompt",
        description: "System prompt",
      },
    },
    {
      name: "--tools",
      description:
        'Specify the list of available tools from the built-in set. Use "" to disable all tools, "default" to use all tools, or specify tool names (e.g. "Bash,Edit,Read")',
      args: {
        name: "tools",
        description: "Tool names or 'default' or ''",
        suggestions: ["default", ""],
      },
    },
    {
      name: "--verbose",
      description: "Override verbose mode setting from config",
    },
  ],
  args: {
    name: "prompt",
    description: "Your prompt",
    isOptional: true,
  },
};

export default completionSpec;
