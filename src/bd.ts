const completionSpec: Fig.Spec = {
  name: "bd",
  description:
    "Issues chained together like beads - A lightweight issue tracker with first-class dependency support",
  subcommands: [
    // Working With Issues
    {
      name: "create",
      description: "Create a new issue (or multiple issues from markdown file)",
      args: {
        name: "title",
        description: "Issue title",
      },
      options: [
        {
          name: ["-p", "--priority"],
          description: "Priority (0=highest)",
          args: { name: "priority", suggestions: ["0", "1", "2", "3"] },
        },
        {
          name: ["-t", "--type"],
          description: "Issue type",
          args: {
            name: "type",
            suggestions: ["task", "bug", "feature", "epic", "story"],
          },
        },
        {
          name: ["-l", "--label"],
          description: "Add label(s)",
          args: { name: "label" },
          isRepeatable: true,
        },
        {
          name: ["-b", "--body"],
          description: "Issue body/description",
          args: { name: "body" },
        },
        {
          name: "--parent",
          description: "Parent issue ID",
          args: { name: "parent-id" },
        },
        {
          name: "--blocks",
          description: "Issue(s) this blocks",
          args: { name: "issue-id" },
        },
        {
          name: "--blocked-by",
          description: "Issue(s) blocking this",
          args: { name: "issue-id" },
        },
      ],
    },
    {
      name: "q",
      description: "Quick capture: create issue and output only ID",
      args: { name: "title", description: "Issue title" },
      options: [
        {
          name: ["-p", "--priority"],
          description: "Priority",
          args: { name: "priority", suggestions: ["0", "1", "2", "3"] },
        },
      ],
    },
    {
      name: "list",
      description: "List issues",
      options: [
        {
          name: ["-s", "--state"],
          description: "Filter by state",
          args: {
            name: "state",
            suggestions: ["open", "closed", "in_progress", "all"],
          },
        },
        {
          name: ["-t", "--type"],
          description: "Filter by type",
          args: { name: "type" },
        },
        {
          name: ["-l", "--label"],
          description: "Filter by label",
          args: { name: "label" },
        },
        {
          name: ["-p", "--priority"],
          description: "Filter by priority",
          args: { name: "priority", suggestions: ["0", "1", "2", "3"] },
        },
        { name: "--all", description: "Show all issues including closed" },
      ],
    },
    {
      name: "show",
      description: "Show issue details",
      args: { name: "issue-id", description: "Issue ID (e.g., bd-a1b2)" },
    },
    {
      name: "ready",
      description: "Show ready work (no blockers, open or in_progress)",
      options: [
        {
          name: ["-l", "--limit"],
          description: "Max issues to show",
          args: { name: "limit" },
        },
      ],
    },
    {
      name: "blocked",
      description: "Show blocked issues",
    },
    {
      name: "close",
      description: "Close one or more issues",
      args: {
        name: "issue-id",
        description: "Issue ID(s) to close",
        isVariadic: true,
      },
    },
    {
      name: "reopen",
      description: "Reopen one or more closed issues",
      args: {
        name: "issue-id",
        description: "Issue ID(s) to reopen",
        isVariadic: true,
      },
    },
    {
      name: "update",
      description: "Update one or more issues",
      args: { name: "issue-id", description: "Issue ID" },
      options: [
        {
          name: ["-t", "--title"],
          description: "New title",
          args: { name: "title" },
        },
        {
          name: ["-b", "--body"],
          description: "New body",
          args: { name: "body" },
        },
        {
          name: ["-p", "--priority"],
          description: "New priority",
          args: { name: "priority", suggestions: ["0", "1", "2", "3"] },
        },
        {
          name: ["-s", "--state"],
          description: "New state",
          args: {
            name: "state",
            suggestions: ["open", "closed", "in_progress"],
          },
        },
      ],
    },
    {
      name: "edit",
      description: "Edit an issue field in $EDITOR",
      args: { name: "issue-id", description: "Issue ID" },
    },
    {
      name: "delete",
      description: "Delete one or more issues and clean up references",
      args: {
        name: "issue-id",
        description: "Issue ID(s) to delete",
        isVariadic: true,
      },
      isDangerous: true,
    },
    {
      name: "search",
      description: "Search issues by text query",
      args: { name: "query", description: "Search query" },
    },
    {
      name: "children",
      description: "List child beads of a parent",
      args: { name: "parent-id", description: "Parent issue ID" },
    },
    {
      name: "comments",
      description: "View or manage comments on an issue",
      args: { name: "issue-id", description: "Issue ID" },
      subcommands: [
        {
          name: "add",
          description: "Add a comment",
          args: { name: "comment", description: "Comment text" },
        },
        { name: "list", description: "List comments" },
      ],
    },

    // Dependencies & Structure
    {
      name: "dep",
      description: "Manage dependencies",
      subcommands: [
        {
          name: "add",
          description: "Add a dependency",
          args: [
            { name: "child", description: "Child issue (blocked)" },
            { name: "parent", description: "Parent issue (blocker)" },
          ],
        },
        {
          name: "remove",
          description: "Remove a dependency",
          args: [
            { name: "child", description: "Child issue" },
            { name: "parent", description: "Parent issue" },
          ],
        },
        {
          name: "list",
          description: "List dependencies for an issue",
          args: { name: "issue-id", description: "Issue ID" },
        },
      ],
    },
    {
      name: "graph",
      description: "Display issue dependency graph",
      args: {
        name: "issue-id",
        description: "Root issue ID (optional)",
        isOptional: true,
      },
      options: [
        { name: "--dot", description: "Output in DOT format" },
        { name: "--mermaid", description: "Output in Mermaid format" },
      ],
    },
    {
      name: "epic",
      description: "Epic management commands",
      subcommands: [
        {
          name: "create",
          description: "Create an epic",
          args: { name: "title", description: "Epic title" },
        },
        { name: "list", description: "List epics" },
        {
          name: "show",
          description: "Show epic details",
          args: { name: "epic-id", description: "Epic ID" },
        },
      ],
    },
    {
      name: "duplicate",
      description: "Mark an issue as a duplicate of another",
      args: [
        { name: "issue", description: "Issue to mark as duplicate" },
        { name: "original", description: "Original issue" },
      ],
    },
    {
      name: "supersede",
      description: "Mark an issue as superseded by a newer one",
      args: [
        { name: "old-issue", description: "Issue being superseded" },
        { name: "new-issue", description: "New issue" },
      ],
    },

    // Labels
    {
      name: "label",
      description: "Manage issue labels",
      subcommands: [
        {
          name: "add",
          description: "Add label to issue",
          args: [
            { name: "issue-id", description: "Issue ID" },
            { name: "label", description: "Label name" },
          ],
        },
        {
          name: "remove",
          description: "Remove label from issue",
          args: [
            { name: "issue-id", description: "Issue ID" },
            { name: "label", description: "Label name" },
          ],
        },
        { name: "list", description: "List all labels" },
      ],
    },

    // Views & Reports
    {
      name: "status",
      description: "Show issue database overview and statistics",
    },
    {
      name: "count",
      description: "Count issues matching filters",
      options: [
        {
          name: ["-s", "--state"],
          description: "Filter by state",
          args: { name: "state" },
        },
        {
          name: ["-t", "--type"],
          description: "Filter by type",
          args: { name: "type" },
        },
      ],
    },
    {
      name: "stale",
      description: "Show stale issues (not updated recently)",
      options: [
        {
          name: ["-d", "--days"],
          description: "Days threshold",
          args: { name: "days" },
        },
      ],
    },
    {
      name: "activity",
      description: "Show real-time molecule state feed",
    },
    {
      name: "types",
      description: "List valid issue types",
    },

    // Sync & Data
    {
      name: "sync",
      description: "Export database to JSONL (sync with git)",
    },
    {
      name: "export",
      description: "Export issues to JSONL or Obsidian format",
      options: [
        { name: "--jsonl", description: "Export as JSONL" },
        { name: "--obsidian", description: "Export for Obsidian" },
        {
          name: ["-o", "--output"],
          description: "Output path",
          args: { name: "path", template: "filepaths" },
        },
      ],
    },
    {
      name: "import",
      description: "Import issues from JSONL format",
      args: { name: "file", description: "JSONL file", template: "filepaths" },
    },
    {
      name: "daemon",
      description: "Manage background sync daemon",
      subcommands: [
        { name: "start", description: "Start the daemon" },
        { name: "stop", description: "Stop the daemon" },
        { name: "status", description: "Check daemon status" },
        { name: "restart", description: "Restart the daemon" },
      ],
    },

    // Setup & Configuration
    {
      name: "init",
      description: "Initialize bd in the current directory",
      options: [
        {
          name: "--backend",
          description: "Database backend",
          args: { name: "backend", suggestions: ["sqlite", "dolt"] },
        },
      ],
    },
    {
      name: "config",
      description: "Manage configuration settings",
      subcommands: [
        {
          name: "get",
          description: "Get a config value",
          args: { name: "key", description: "Config key" },
        },
        {
          name: "set",
          description: "Set a config value",
          args: [
            { name: "key", description: "Config key" },
            { name: "value", description: "Config value" },
          ],
        },
        { name: "list", description: "List all config values" },
      ],
    },
    {
      name: "setup",
      description: "Setup integration with AI editors",
      subcommands: [
        { name: "claude", description: "Setup Claude Code integration" },
        { name: "cursor", description: "Setup Cursor integration" },
        { name: "gemini", description: "Setup Gemini CLI integration" },
      ],
    },
    {
      name: "hooks",
      description: "Manage git hooks for bd auto-sync",
      subcommands: [
        { name: "install", description: "Install git hooks" },
        { name: "uninstall", description: "Uninstall git hooks" },
        { name: "status", description: "Check hooks status" },
      ],
    },
    {
      name: "doctor",
      description: "Check and fix beads installation health",
      options: [{ name: "--fix", description: "Attempt to fix issues" }],
    },
    {
      name: "info",
      description: "Show database and daemon information",
    },
    {
      name: "where",
      description: "Show active beads location",
    },
    {
      name: "quickstart",
      description: "Quick start guide for bd",
    },
    {
      name: "prime",
      description: "Output AI-optimized workflow context",
    },
    {
      name: "onboard",
      description: "Display minimal snippet for AGENTS.md",
    },
    {
      name: "human",
      description: "Show essential commands for human users",
    },

    // Maintenance
    {
      name: "migrate",
      description: "Database migration commands",
      subcommands: [
        { name: "sync", description: "Configure sync branch" },
        { name: "status", description: "Check migration status" },
      ],
    },
    {
      name: "upgrade",
      description: "Check and manage bd version upgrades",
    },
    {
      name: "preflight",
      description: "Show PR readiness checklist",
    },
    {
      name: "repair",
      description: "Repair corrupted database by cleaning orphaned references",
    },
    {
      name: "resolve-conflicts",
      description: "Resolve git merge conflicts in JSONL files",
    },
    {
      name: "rename-prefix",
      description: "Rename the issue prefix for all issues",
      args: { name: "new-prefix", description: "New prefix" },
    },

    // Workflow
    {
      name: "defer",
      description: "Defer one or more issues for later",
      args: {
        name: "issue-id",
        description: "Issue ID(s) to defer",
        isVariadic: true,
      },
    },
    {
      name: "undefer",
      description: "Undefer one or more issues",
      args: {
        name: "issue-id",
        description: "Issue ID(s) to undefer",
        isVariadic: true,
      },
    },

    // Agent commands
    {
      name: "agent",
      description: "Manage agent bead state",
    },
    {
      name: "slot",
      description: "Manage agent bead slots",
    },
    {
      name: "audit",
      description: "Record and label agent interactions",
    },
    {
      name: "mol",
      description: "Molecule commands (work templates)",
    },
    {
      name: "formula",
      description: "Manage workflow formulas",
    },

    // Version
    {
      name: "version",
      description: "Print version information",
    },
    {
      name: "completion",
      description: "Generate shell completion scripts",
      subcommands: [
        { name: "bash", description: "Generate bash completions" },
        { name: "zsh", description: "Generate zsh completions" },
        { name: "fish", description: "Generate fish completions" },
        { name: "powershell", description: "Generate PowerShell completions" },
      ],
    },
    {
      name: "help",
      description: "Help about any command",
      args: {
        name: "command",
        description: "Command to get help for",
        isOptional: true,
      },
    },
  ],
  options: [
    { name: ["-h", "--help"], description: "Show help", isPersistent: true },
    {
      name: ["-v", "--verbose"],
      description: "Enable verbose output",
      isPersistent: true,
    },
    {
      name: ["-q", "--quiet"],
      description: "Suppress non-essential output",
      isPersistent: true,
    },
    { name: "--json", description: "Output in JSON format", isPersistent: true },
    {
      name: ["-V", "--version"],
      description: "Print version information",
    },
    {
      name: "--db",
      description: "Database path",
      args: { name: "path", template: "filepaths" },
      isPersistent: true,
    },
    {
      name: "--actor",
      description: "Actor name for audit trail",
      args: { name: "actor" },
      isPersistent: true,
    },
    {
      name: "--no-daemon",
      description: "Force direct storage mode",
      isPersistent: true,
    },
    {
      name: "--sandbox",
      description: "Sandbox mode: disables daemon and auto-sync",
      isPersistent: true,
    },
    {
      name: "--readonly",
      description: "Read-only mode",
      isPersistent: true,
    },
  ],
};

export default completionSpec;
