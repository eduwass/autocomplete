const completionSpec: Fig.Spec = {
  name: "wt",
  description: "Git worktree management for parallel AI agent workflows",
  options: [
    {
      name: ["-h", "--help"],
      description: "Print help (see a summary with '-h')",
      isPersistent: true,
    },
    {
      name: ["-V", "--version"],
      description: "Print version",
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
      description: "Verbose output",
      isPersistent: true,
      isRepeatable: true,
    },
  ],
  subcommands: [
    {
      name: "switch",
      description: "Switch to a worktree",
      options: [
        {
          name: "--branches",
          description:
            "Include branches without worktrees (interactive picker)",
        },
        {
          name: "--remotes",
          description: "Include remote branches (interactive picker)",
        },
        {
          name: ["-c", "--create"],
          description: "Create a new branch",
        },
        {
          name: ["-b", "--base"],
          description: "Base branch Defaults to default branch",
          args: {
            name: "base",
          },
        },
        {
          name: ["-x", "--execute"],
          description:
            "Command to run after switch Replaces the wt process with the command after switching, giving it full terminal control. Useful for launching editors, AI agents, or other interactive tools. Supports hook template variables ({{ branch }}, {{ worktree_path }}, etc.) and filters. {{ base }} and {{ base_worktree_path }} require --create. Especially useful with shell aliases: alias wsc='wt switch --create -x claude' wsc feature-branch -- 'Fix GH #322' Then wsc feature-branch creates the worktree and launches Claude Code. Arguments after -- are passed to the command, so wsc feature -- 'Fix GH #322' runs claude 'Fix GH #322', starting Claude with a prompt. Template example: -x 'code {{ worktree_path }}' opens VS Code at the worktree, -x 'tmux new -s {{ branch | sanitize }}' starts a tmux session named after the branch",
          args: {
            name: "execute",
          },
        },
        {
          name: ["-y", "--yes"],
          description: "Skip approval prompts",
        },
        {
          name: "--clobber",
          description: "Remove stale paths at target",
        },
        {
          name: "--no-cd",
          description:
            "Skip directory change after switching Hooks still run normally. Useful when hooks handle navigation (e.g., tmux workflows) or for CI/automation",
        },
        {
          name: "--no-verify",
          description: "Skip hooks",
        },
        {
          name: ["-h", "--help"],
          description: "Print help (see a summary with '-h')",
        },
      ],
      args: [
        {
          name: "branch",
          isOptional: true,
          description:
            "Branch name or shortcut Opens interactive picker if omitted. Shortcuts: '^' (default branch), '-' (previous), '@' (current), 'pr:{N}' (GitHub PR), 'mr:{N}' (GitLab MR)",
        },
        {
          name: "execute_args",
          isOptional: true,
          isVariadic: true,
          description:
            "Additional arguments for --execute command (after --) Arguments after -- are appended to the execute command. Each argument is expanded for templates, then POSIX shell-escaped",
        },
      ],
    },
    {
      name: "list",
      description: "List worktrees and their status",
      options: [
        {
          name: "--format",
          description: "Output format (table, json) [default: table]",
          args: {
            name: "format",
          },
        },
        {
          name: "--branches",
          description: "Include branches without worktrees",
        },
        {
          name: "--remotes",
          description: "Include remote branches",
        },
        {
          name: "--full",
          description: "Include CI status and diff analysis (slower)",
        },
        {
          name: "--progressive",
          description: "Show fast info immediately, update with slow info",
        },
        {
          name: ["-h", "--help"],
          description: "Print help (see more with '--help')",
        },
      ],
      subcommands: [
        {
          name: "statusline",
          description: "Single-line status for shell prompts",
          options: [
            {
              name: "--format",
              description:
                "Output format (table, json, claude-code) Possible values:",
              args: {
                name: "format",
              },
            },
            {
              name: ["-h", "--help"],
              description: "Print help (see a summary with '-h')",
            },
          ],
        },
      ],
    },
    {
      name: "remove",
      description: "Remove worktree; delete branch if merged",
      options: [
        {
          name: "--no-delete-branch",
          description: "Keep branch after removal",
        },
        {
          name: ["-D", "--force-delete"],
          description: "Delete unmerged branches",
        },
        {
          name: "--foreground",
          description: "Run removal in foreground (block until complete)",
        },
        {
          name: "--no-verify",
          description: "Skip hooks",
        },
        {
          name: ["-y", "--yes"],
          description: "Skip approval prompts",
        },
        {
          name: ["-f", "--force"],
          description:
            "Force worktree removal Remove worktrees even if they contain untracked files (like build artifacts). Without this flag, removal fails if untracked files exist",
        },
        {
          name: ["-h", "--help"],
          description: "Print help (see a summary with '-h')",
        },
      ],
      args: {
        name: "branches",
        isOptional: true,
        isVariadic: true,
        description: "Branch name [default: current]",
      },
    },
    {
      name: "merge",
      description: "Merge current branch into target",
      options: [
        {
          name: "--no-squash",
          description: "Skip commit squashing",
        },
        {
          name: "--no-commit",
          description: "Skip commit and squash",
        },
        {
          name: "--no-rebase",
          description: "Skip rebase (fail if not already rebased)",
        },
        {
          name: "--no-remove",
          description: "Keep worktree after merge",
        },
        {
          name: "--no-verify",
          description: "Skip hooks",
        },
        {
          name: ["-y", "--yes"],
          description: "Skip approval prompts",
        },
        {
          name: "--stage",
          description:
            "What to stage before committing [default: all] Possible values:",
          args: {
            name: "stage",
          },
        },
        {
          name: ["-h", "--help"],
          description: "Print help (see a summary with '-h')",
        },
      ],
      args: {
        name: "target",
        isOptional: true,
        description: "Target branch Defaults to default branch",
      },
    },
    {
      name: "step",
      description: "Run individual operations",
      options: [
        {
          name: ["-h", "--help"],
          description: "Print help (see a summary with '-h')",
        },
      ],
      subcommands: [
        {
          name: "commit",
          description: "Stage and commit with LLM-generated message",
          options: [
            {
              name: ["-y", "--yes"],
              description: "Skip approval prompts",
            },
            {
              name: "--no-verify",
              description: "Skip hooks",
            },
            {
              name: "--stage",
              description:
                "What to stage before committing [default: all] Possible values:",
              args: {
                name: "stage",
              },
            },
            {
              name: "--show-prompt",
              description:
                "Show prompt without running LLM Outputs the rendered prompt to stdout for debugging or manual piping",
            },
            {
              name: ["-h", "--help"],
              description: "Print help (see a summary with '-h')",
            },
          ],
        },
        {
          name: "squash",
          description: "Squash commits since branching",
          options: [
            {
              name: ["-y", "--yes"],
              description: "Skip approval prompts",
            },
            {
              name: "--no-verify",
              description: "Skip hooks",
            },
            {
              name: "--stage",
              description:
                "What to stage before committing [default: all] Possible values:",
              args: {
                name: "stage",
              },
            },
            {
              name: "--show-prompt",
              description:
                "Show prompt without running LLM Outputs the rendered prompt to stdout for debugging or manual piping",
            },
            {
              name: ["-h", "--help"],
              description: "Print help (see a summary with '-h')",
            },
          ],
          args: {
            name: "target",
            isOptional: true,
            description: "Target branch Defaults to default branch",
          },
        },
        {
          name: "push",
          description: "Fast-forward target to current branch",
          options: [
            {
              name: ["-h", "--help"],
              description: "Print help (see a summary with '-h')",
            },
          ],
          args: {
            name: "target",
            isOptional: true,
            description: "Target branch Defaults to default branch",
          },
        },
        {
          name: "rebase",
          description: "Rebase onto target",
          options: [
            {
              name: ["-h", "--help"],
              description: "Print help (see a summary with '-h')",
            },
          ],
          args: {
            name: "target",
            isOptional: true,
            description: "Target branch Defaults to default branch",
          },
        },
        {
          name: "copy-ignored",
          description: "Copy gitignored files to another worktree",
          options: [
            {
              name: "--from",
              description: "Source worktree branch Defaults to main worktree",
              args: {
                name: "from",
              },
            },
            {
              name: "--to",
              description:
                "Destination worktree branch Defaults to current worktree",
              args: {
                name: "to",
              },
            },
            {
              name: "--dry-run",
              description: "Show what would be copied",
            },
            {
              name: "--force",
              description: "Overwrite existing files in destination",
            },
            {
              name: ["-h", "--help"],
              description: "Print help (see a summary with '-h')",
            },
          ],
        },
        {
          name: "for-each",
          description: "[experimental] Run command in each worktree",
          options: [
            {
              name: ["-h", "--help"],
              description: "Print help (see a summary with '-h')",
            },
          ],
          args: {
            name: "args>",
            isVariadic: true,
            description: "Command template (see --help for all variables)",
          },
        },
        {
          name: "relocate",
          description: "[experimental] Move worktrees to expected paths",
          options: [
            {
              name: "--dry-run",
              description: "Show what would be moved",
            },
            {
              name: "--commit",
              description: "Commit uncommitted changes before relocating",
            },
            {
              name: "--clobber",
              description:
                "Backup non-worktree paths at target locations Moves blocking paths to <path>.bak-<timestamp>",
            },
            {
              name: ["-h", "--help"],
              description: "Print help (see a summary with '-h')",
            },
          ],
          args: {
            name: "branches",
            isOptional: true,
            isVariadic: true,
            description: "Worktrees to relocate (defaults to all mismatched)",
          },
        },
      ],
    },
    {
      name: "hook",
      description: "Run configured hooks",
      options: [
        {
          name: ["-h", "--help"],
          description: "Print help (see a summary with '-h')",
        },
      ],
      subcommands: [
        {
          name: "show",
          description: "Show configured hooks",
          options: [
            {
              name: "--expanded",
              description: "Show expanded commands with current variables",
            },
            {
              name: ["-h", "--help"],
              description: "Print help (see a summary with '-h')",
            },
          ],
          args: [
            {
              name: "hook_type",
              isOptional: true,
              description: "Hook type to show (default: all)",
            },
            {
              name: "possible values: post-create, post-start, post-switch, pre-commit, pre-merge, post-merge, pre-remove, post-remove",
              isOptional: true,
            },
          ],
        },
        {
          name: "post-create",
          description: "Run post-create hooks",
          options: [
            {
              name: ["-y", "--yes"],
              description: "Skip approval prompts",
            },
            {
              name: "--var",
              description: "Override built-in template variable (KEY=VALUE)",
              args: {
                name: "key=value",
              },
            },
            {
              name: ["-h", "--help"],
              description: "Print help (see a summary with '-h')",
            },
          ],
          args: {
            name: "name",
            isOptional: true,
            description:
              "Filter by command name Supports user:name or project:name to filter by source. user: alone runs all user hooks; project: alone runs all project hooks",
          },
        },
        {
          name: "post-start",
          description: "Run post-start hooks",
          options: [
            {
              name: ["-y", "--yes"],
              description: "Skip approval prompts",
            },
            {
              name: "--foreground",
              description: "Run in foreground (block until complete)",
            },
            {
              name: "--var",
              description: "Override built-in template variable (KEY=VALUE)",
              args: {
                name: "key=value",
              },
            },
            {
              name: ["-h", "--help"],
              description: "Print help (see a summary with '-h')",
            },
          ],
          args: {
            name: "name",
            isOptional: true,
            description:
              "Filter by command name Supports user:name or project:name to filter by source. user: alone runs all user hooks; project: alone runs all project hooks",
          },
        },
        {
          name: "post-switch",
          description: "Run post-switch hooks",
          options: [
            {
              name: ["-y", "--yes"],
              description: "Skip approval prompts",
            },
            {
              name: "--foreground",
              description: "Run in foreground (block until complete)",
            },
            {
              name: "--var",
              description: "Override built-in template variable (KEY=VALUE)",
              args: {
                name: "key=value",
              },
            },
            {
              name: ["-h", "--help"],
              description: "Print help (see a summary with '-h')",
            },
          ],
          args: {
            name: "name",
            isOptional: true,
            description:
              "Filter by command name Supports user:name or project:name to filter by source. user: alone runs all user hooks; project: alone runs all project hooks",
          },
        },
        {
          name: "pre-commit",
          description: "Run pre-commit hooks",
          options: [
            {
              name: ["-y", "--yes"],
              description: "Skip approval prompts",
            },
            {
              name: "--var",
              description: "Override built-in template variable (KEY=VALUE)",
              args: {
                name: "key=value",
              },
            },
            {
              name: ["-h", "--help"],
              description: "Print help (see a summary with '-h')",
            },
          ],
          args: {
            name: "name",
            isOptional: true,
            description:
              "Filter by command name Supports user:name or project:name to filter by source. user: alone runs all user hooks; project: alone runs all project hooks",
          },
        },
        {
          name: "pre-merge",
          description: "Run pre-merge hooks",
          options: [
            {
              name: ["-y", "--yes"],
              description: "Skip approval prompts",
            },
            {
              name: "--var",
              description: "Override built-in template variable (KEY=VALUE)",
              args: {
                name: "key=value",
              },
            },
            {
              name: ["-h", "--help"],
              description: "Print help (see a summary with '-h')",
            },
          ],
          args: {
            name: "name",
            isOptional: true,
            description:
              "Filter by command name Supports user:name or project:name to filter by source. user: alone runs all user hooks; project: alone runs all project hooks",
          },
        },
        {
          name: "post-merge",
          description: "Run post-merge hooks",
          options: [
            {
              name: ["-y", "--yes"],
              description: "Skip approval prompts",
            },
            {
              name: "--var",
              description: "Override built-in template variable (KEY=VALUE)",
              args: {
                name: "key=value",
              },
            },
            {
              name: ["-h", "--help"],
              description: "Print help (see a summary with '-h')",
            },
          ],
          args: {
            name: "name",
            isOptional: true,
            description:
              "Filter by command name Supports user:name or project:name to filter by source. user: alone runs all user hooks; project: alone runs all project hooks",
          },
        },
        {
          name: "pre-remove",
          description: "Run pre-remove hooks",
          options: [
            {
              name: ["-y", "--yes"],
              description: "Skip approval prompts",
            },
            {
              name: "--var",
              description: "Override built-in template variable (KEY=VALUE)",
              args: {
                name: "key=value",
              },
            },
            {
              name: ["-h", "--help"],
              description: "Print help (see a summary with '-h')",
            },
          ],
          args: {
            name: "name",
            isOptional: true,
            description:
              "Filter by command name Supports user:name or project:name to filter by source. user: alone runs all user hooks; project: alone runs all project hooks",
          },
        },
        {
          name: "post-remove",
          description: "Run post-remove hooks",
          options: [
            {
              name: ["-y", "--yes"],
              description: "Skip approval prompts",
            },
            {
              name: "--foreground",
              description: "Run in foreground (block until complete)",
            },
            {
              name: "--var",
              description: "Override built-in template variable (KEY=VALUE)",
              args: {
                name: "key=value",
              },
            },
            {
              name: ["-h", "--help"],
              description: "Print help (see a summary with '-h')",
            },
          ],
          args: {
            name: "name",
            isOptional: true,
            description:
              "Filter by command name Supports user:name or project:name to filter by source. user: alone runs all user hooks; project: alone runs all project hooks",
          },
        },
        {
          name: "approvals",
          description: "Manage command approvals",
          options: [
            {
              name: ["-h", "--help"],
              description: "Print help (see a summary with '-h')",
            },
          ],
          subcommands: [
            {
              name: "add",
              description: "Store approvals in config",
              options: [
                {
                  name: "--all",
                  description: "Show all commands",
                },
                {
                  name: ["-h", "--help"],
                  description: "Print help (see a summary with '-h')",
                },
              ],
            },
            {
              name: "clear",
              description: "Clear approved commands from config",
              options: [
                {
                  name: ["-g", "--global"],
                  description: "Clear global approvals",
                },
                {
                  name: ["-h", "--help"],
                  description: "Print help (see a summary with '-h')",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "config",
      description: "Manage user & project configs",
      options: [
        {
          name: ["-h", "--help"],
          description: "Print help (see a summary with '-h')",
        },
      ],
      subcommands: [
        {
          name: "shell",
          description: "Shell integration setup",
          options: [
            {
              name: ["-h", "--help"],
              description: "Print help",
            },
          ],
          subcommands: [
            {
              name: "init",
              description: "Generate shell integration code",
              options: [
                {
                  name: "--cmd",
                  description:
                    "Command name for shell integration (defaults to binary name) Use this to create shell integration for an alternate command name. For example, --cmd=git-wt creates a git-wt shell function instead of wt, useful on Windows where wt conflicts with Windows Terminal",
                  args: {
                    name: "cmd",
                  },
                },
                {
                  name: ["-h", "--help"],
                  description: "Print help (see a summary with '-h')",
                },
              ],
              args: [
                {
                  name: "value",
                  description: "Shell to generate code for",
                  suggestions: ["bash", "fish", "zsh", "powershell"],
                },
                {
                  name: "possible values: bash, fish, zsh, powershell",
                  isOptional: true,
                },
              ],
            },
            {
              name: "install",
              description: "Write shell integration to config files",
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
                    "Command name for shell integration (defaults to binary name) Use this to create shell integration for an alternate command name. For example, --cmd=git-wt creates a git-wt shell function instead of wt, useful on Windows where wt conflicts with Windows Terminal",
                  args: {
                    name: "cmd",
                  },
                },
                {
                  name: ["-h", "--help"],
                  description: "Print help (see a summary with '-h')",
                },
              ],
              args: [
                {
                  name: "value",
                  isOptional: true,
                  description: "Shell to install (default: all)",
                  suggestions: ["bash", "fish", "zsh", "powershell"],
                },
                {
                  name: "possible values: bash, fish, zsh, powershell",
                  isOptional: true,
                },
              ],
            },
            {
              name: "uninstall",
              description: "Remove shell integration from config files",
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
                  name: ["-h", "--help"],
                  description: "Print help (see a summary with '-h')",
                },
              ],
              args: [
                {
                  name: "value",
                  isOptional: true,
                  description: "Shell to uninstall (default: all)",
                  suggestions: ["bash", "fish", "zsh", "powershell"],
                },
                {
                  name: "possible values: bash, fish, zsh, powershell",
                  isOptional: true,
                },
              ],
            },
            {
              name: "show-theme",
              description: "Show output theme samples",
              options: [
                {
                  name: ["-h", "--help"],
                  description: "Print help (see a summary with '-h')",
                },
              ],
            },
          ],
        },
        {
          name: "create",
          description: "Create configuration file",
          options: [
            {
              name: "--project",
              description:
                "Create project config (.config/wt.toml) instead of user config",
            },
            {
              name: ["-h", "--help"],
              description: "Print help (see a summary with '-h')",
            },
          ],
        },
        {
          name: "show",
          description: "Show configuration files & locations",
          options: [
            {
              name: "--full",
              description:
                "Run diagnostic checks (CI tools, commit generation)",
            },
            {
              name: ["-h", "--help"],
              description: "Print help (see a summary with '-h')",
            },
          ],
        },
        {
          name: "state",
          description: "Manage internal data and cache",
          options: [
            {
              name: ["-h", "--help"],
              description: "Print help (see a summary with '-h')",
            },
          ],
          subcommands: [
            {
              name: "default-branch",
              description: "Default branch detection and override",
              options: [
                {
                  name: ["-h", "--help"],
                  description: "Print help (see a summary with '-h')",
                },
              ],
              subcommands: [
                {
                  name: "get",
                  description: "Get the default branch",
                  options: [
                    {
                      name: ["-h", "--help"],
                      description: "Print help (see a summary with '-h')",
                    },
                  ],
                },
                {
                  name: "set",
                  description: "Set the default branch",
                  options: [
                    {
                      name: ["-h", "--help"],
                      description: "Print help (see a summary with '-h')",
                    },
                  ],
                  args: {
                    name: "branch",
                    description: "Branch name to set as default",
                  },
                },
                {
                  name: "clear",
                  description: "Clear the default branch cache",
                  options: [
                    {
                      name: ["-h", "--help"],
                      description: "Print help",
                    },
                  ],
                },
              ],
            },
            {
              name: "previous-branch",
              description: "Previous branch (for wt switch -)",
              options: [
                {
                  name: ["-h", "--help"],
                  description: "Print help (see a summary with '-h')",
                },
              ],
              subcommands: [
                {
                  name: "get",
                  description: "Get the previous branch",
                  options: [
                    {
                      name: ["-h", "--help"],
                      description: "Print help (see a summary with '-h')",
                    },
                  ],
                },
                {
                  name: "set",
                  description: "Set the previous branch",
                  options: [
                    {
                      name: ["-h", "--help"],
                      description: "Print help (see a summary with '-h')",
                    },
                  ],
                  args: {
                    name: "branch",
                    description: "Branch name to set as previous",
                  },
                },
                {
                  name: "clear",
                  description: "Clear the previous branch",
                  options: [
                    {
                      name: ["-h", "--help"],
                      description: "Print help",
                    },
                  ],
                },
              ],
            },
            {
              name: "ci-status",
              description: "CI status cache",
              options: [
                {
                  name: ["-h", "--help"],
                  description: "Print help (see a summary with '-h')",
                },
              ],
              subcommands: [
                {
                  name: "get",
                  description: "Get CI status for a branch",
                  options: [
                    {
                      name: "--branch",
                      description: "Target branch (defaults to current)",
                      args: {
                        name: "branch",
                      },
                    },
                    {
                      name: ["-h", "--help"],
                      description: "Print help (see a summary with '-h')",
                    },
                  ],
                },
                {
                  name: "clear",
                  description: "Clear CI status cache",
                  options: [
                    {
                      name: "--branch",
                      description: "Target branch (defaults to current)",
                      args: {
                        name: "branch",
                      },
                    },
                    {
                      name: "--all",
                      description: "Clear all CI status cache",
                    },
                    {
                      name: ["-h", "--help"],
                      description: "Print help (see a summary with '-h')",
                    },
                  ],
                },
              ],
            },
            {
              name: "marker",
              description: "Branch markers",
              options: [
                {
                  name: ["-h", "--help"],
                  description: "Print help (see a summary with '-h')",
                },
              ],
              subcommands: [
                {
                  name: "get",
                  description: "Get marker for a branch",
                  options: [
                    {
                      name: "--branch",
                      description: "Target branch (defaults to current)",
                      args: {
                        name: "branch",
                      },
                    },
                    {
                      name: ["-h", "--help"],
                      description: "Print help (see a summary with '-h')",
                    },
                  ],
                },
                {
                  name: "set",
                  description: "Set marker for a branch",
                  options: [
                    {
                      name: "--branch",
                      description: "Target branch (defaults to current)",
                      args: {
                        name: "branch",
                      },
                    },
                    {
                      name: ["-h", "--help"],
                      description: "Print help (see a summary with '-h')",
                    },
                  ],
                  args: {
                    name: "value",
                    description: "Marker text (shown in wt list output)",
                  },
                },
                {
                  name: "clear",
                  description: "Clear marker for a branch",
                  options: [
                    {
                      name: "--branch",
                      description: "Target branch (defaults to current)",
                      args: {
                        name: "branch",
                      },
                    },
                    {
                      name: "--all",
                      description: "Clear all markers",
                    },
                    {
                      name: ["-h", "--help"],
                      description: "Print help (see a summary with '-h')",
                    },
                  ],
                },
              ],
            },
            {
              name: "logs",
              description: "Background operation logs",
              options: [
                {
                  name: ["-h", "--help"],
                  description: "Print help (see a summary with '-h')",
                },
              ],
              subcommands: [
                {
                  name: "get",
                  description: "Get log file paths",
                  options: [
                    {
                      name: "--hook",
                      description:
                        "Get path for a specific log file Format: source:hook-type:name (e.g., user:post-start:server) for hook commands, or internal:op (e.g., internal:remove) for internal operations",
                      args: {
                        name: "hook",
                      },
                    },
                    {
                      name: "--branch",
                      description: "Target branch (defaults to current)",
                      args: {
                        name: "branch",
                      },
                    },
                    {
                      name: ["-h", "--help"],
                      description: "Print help (see a summary with '-h')",
                    },
                  ],
                },
                {
                  name: "clear",
                  description: "Clear background operation logs",
                  options: [
                    {
                      name: ["-h", "--help"],
                      description: "Print help",
                    },
                  ],
                },
              ],
            },
            {
              name: "hints",
              description: "One-time hints shown in this repo",
              options: [
                {
                  name: ["-h", "--help"],
                  description: "Print help (see a summary with '-h')",
                },
              ],
              subcommands: [
                {
                  name: "get",
                  description: "List hints that have been shown",
                  options: [
                    {
                      name: ["-h", "--help"],
                      description: "Print help (see a summary with '-h')",
                    },
                  ],
                },
                {
                  name: "clear",
                  description: "Clear hints (re-show on next trigger)",
                  options: [
                    {
                      name: ["-h", "--help"],
                      description: "Print help (see a summary with '-h')",
                    },
                  ],
                  args: {
                    name: "name",
                    isOptional: true,
                    description:
                      "Specific hint to clear (clears all if not specified)",
                  },
                },
              ],
            },
            {
              name: "get",
              description: "Get all stored state",
              options: [
                {
                  name: "--format",
                  description: "Output format (table, json) [default: table]",
                  args: {
                    name: "format",
                  },
                },
                {
                  name: ["-h", "--help"],
                  description: "Print help (see a summary with '-h')",
                },
              ],
            },
            {
              name: "clear",
              description: "Clear all stored state",
              options: [
                {
                  name: ["-h", "--help"],
                  description: "Print help (see a summary with '-h')",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default completionSpec;
