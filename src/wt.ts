const shellSuggestions: Fig.Suggestion[] = [
  { name: "bash", description: "Bash shell" },
  { name: "fish", description: "Fish shell" },
  { name: "zsh", description: "Zsh shell" },
  { name: "powershell", description: "PowerShell shell" },
];

const completionSpec: Fig.Spec = {
  name: "wt",
  description: "Git worktree management for parallel AI agent workflows",
  subcommands: [
    { name: "switch", description: "Switch to a worktree" },
    { name: "list", description: "List worktrees and their status" },
    { name: "remove", description: "Remove worktree; delete branch if merged" },
    { name: "merge", description: "Merge current branch into target" },
    { name: "step", description: "Run individual operations" },
    { name: "hook", description: "Run configured hooks" },
    {
      name: "config",
      description: "Manage user and project configs",
      subcommands: [
        {
          name: "shell",
          description: "Shell integration setup",
          subcommands: [
            {
              name: "init",
              description: "Generate shell integration code",
              args: {
                name: "shell",
                suggestions: shellSuggestions,
              },
              options: [
                {
                  name: "--cmd",
                  description:
                    "Command name for shell integration (defaults to binary name)",
                  args: { name: "command" },
                },
              ],
            },
            {
              name: "install",
              description: "Write shell integration to config files",
              args: {
                name: "shell",
                isOptional: true,
                suggestions: shellSuggestions,
              },
              options: [
                {
                  name: ["-y", "--yes"],
                  description: "Skip confirmation prompt",
                },
                {
                  name: "--dry-run",
                  description: "Show what would be changed",
                },
                {
                  name: "--cmd",
                  description:
                    "Command name for shell integration (defaults to binary name)",
                  args: { name: "command" },
                },
              ],
            },
            {
              name: "uninstall",
              description: "Remove shell integration from config files",
              args: {
                name: "shell",
                isOptional: true,
                suggestions: shellSuggestions,
              },
              options: [
                {
                  name: ["-y", "--yes"],
                  description: "Skip confirmation prompt",
                },
                {
                  name: "--dry-run",
                  description: "Show what would be changed",
                },
              ],
            },
            {
              name: "show-theme",
              description: "Show output theme samples",
            },
          ],
        },
        {
          name: "create",
          description: "Create configuration file",
          options: [
            {
              name: "--project",
              description: "Create project config (.config/wt.toml)",
            },
          ],
        },
        {
          name: "show",
          description: "Show configuration files and locations",
          options: [
            {
              name: "--full",
              description: "Run diagnostic checks (CI tools, commit generation)",
            },
          ],
        },
        {
          name: "state",
          description: "Manage internal data and cache",
          subcommands: [
            {
              name: "default-branch",
              description: "Default branch detection and override",
            },
            {
              name: "previous-branch",
              description: "Previous branch (for wt switch -)",
            },
            { name: "ci-status", description: "CI status cache" },
            { name: "marker", description: "Branch markers" },
            { name: "logs", description: "Background operation logs" },
            { name: "hints", description: "One-time hints shown in this repo" },
            { name: "get", description: "Get all stored state" },
            { name: "clear", description: "Clear all stored state" },
          ],
        },
      ],
    },
  ],
  options: [
    {
      name: ["-h", "--help"],
      description: "Print help",
      isPersistent: true,
    },
    {
      name: "-C",
      description: "Working directory for this command",
      isPersistent: true,
      args: {
        name: "path",
        template: "folders",
      },
    },
    {
      name: "--config",
      description: "User config file path",
      isPersistent: true,
      args: {
        name: "path",
        template: "filepaths",
      },
    },
    {
      name: ["-v", "--verbose"],
      description: "Verbose output (repeatable)",
      isPersistent: true,
      isRepeatable: true,
    },
    {
      name: ["-V", "--version"],
      description: "Print version",
    },
  ],
};

export default completionSpec;
