const workspaceOption: Fig.Option = {
  name: ["-w", "--workspace"],
  description: "Target workspace (uses credentials)",
  isPersistent: true,
  args: {
    name: "slug",
  },
};

const helpOption: Fig.Option = {
  name: ["-h", "--help"],
  description: "Show this help",
};

const completionSpec: Fig.Spec = {
  name: "linear",
  description: "Handy linear commands from the command line",
  options: [
    helpOption,
    {
      name: ["-V", "--version"],
      description: "Show the version number for this program",
    },
    workspaceOption,
  ],
  subcommands: [
    {
      name: "auth",
      description: "Manage Linear authentication",
      options: [helpOption, workspaceOption],
      subcommands: [
        {
          name: "login",
          description: "Add a workspace credential",
          options: [
            helpOption,
            workspaceOption,
            {
              name: ["-k", "--key"],
              description: "API key (prompted if not provided)",
              args: { name: "key" },
            },
          ],
        },
        {
          name: "logout",
          description: "Remove a workspace credential",
          options: [
            helpOption,
            workspaceOption,
            {
              name: ["-f", "--force"],
              description: "Skip confirmation prompt",
            },
          ],
          args: {
            name: "workspace",
            isOptional: true,
          },
        },
        {
          name: "list",
          description: "List configured workspaces",
          options: [helpOption, workspaceOption],
        },
        {
          name: "default",
          description: "Set the default workspace",
          options: [helpOption, workspaceOption],
          args: {
            name: "workspace",
            isOptional: true,
          },
        },
        {
          name: "token",
          description: "Print the configured API token",
          options: [helpOption, workspaceOption],
        },
        {
          name: "whoami",
          description: "Print information about the authenticated user",
          options: [helpOption, workspaceOption],
        },
      ],
    },
    {
      name: ["issue", "i"],
      description: "Manage Linear issues",
      options: [helpOption, workspaceOption],
      subcommands: [
        {
          name: "id",
          description: "Print the issue based on the current git branch",
          options: [helpOption, workspaceOption],
        },
        {
          name: "list",
          description: "List your issues",
          options: [
            helpOption,
            workspaceOption,
            {
              name: ["-s", "--state"],
              description:
                "Filter by issue state (can be repeated for multiple states)",
              isRepeatable: true,
              args: { name: "state" },
            },
            {
              name: "--all-states",
              description: "Show issues from all states",
            },
            {
              name: "--assignee",
              description: "Filter by assignee (username)",
              args: { name: "assignee" },
            },
            {
              name: ["-A", "--all-assignees"],
              description: "Show issues for all assignees",
            },
            {
              name: ["-U", "--unassigned"],
              description: "Show only unassigned issues",
            },
            {
              name: "--sort",
              description:
                "Sort order (can also be set via LINEAR_ISSUE_SORT)",
              args: { name: "sort" },
            },
            {
              name: "--team",
              description:
                "Team to list issues for (if not your default team)",
              args: { name: "team" },
            },
            {
              name: "--project",
              description: "Filter by project name",
              args: { name: "project" },
            },
            {
              name: "--limit",
              description:
                "Maximum number of issues to fetch (default: 50, use 0 for unlimited)",
              args: { name: "limit" },
            },
            {
              name: ["-w", "--web"],
              description: "Open in web browser",
            },
            {
              name: ["-a", "--app"],
              description: "Open in Linear.app",
            },
            {
              name: "--no-pager",
              description: "Disable automatic paging for long output",
            },
          ],
        },
        {
          name: "title",
          description: "Print the issue title",
          options: [helpOption, workspaceOption],
          args: {
            name: "issueId",
            isOptional: true,
          },
        },
        {
          name: "start",
          description: "Start working on an issue",
          options: [
            helpOption,
            workspaceOption,
            {
              name: ["-A", "--all-assignees"],
              description: "Show issues for all assignees",
            },
            {
              name: ["-U", "--unassigned"],
              description: "Show only unassigned issues",
            },
            {
              name: ["-f", "--from-ref"],
              description: "Git ref to create new branch from",
              args: { name: "fromRef" },
            },
            {
              name: ["-b", "--branch"],
              description:
                "Custom branch name to use instead of the issue identifier",
              args: { name: "branch" },
            },
          ],
          args: {
            name: "issueId",
            isOptional: true,
          },
        },
        {
          name: ["view", "v"],
          description:
            "View issue details (default) or open in browser/app",
          options: [
            helpOption,
            workspaceOption,
            {
              name: ["-w", "--web"],
              description: "Open in web browser",
            },
            {
              name: ["-a", "--app"],
              description: "Open in Linear.app",
            },
            {
              name: "--no-comments",
              description: "Exclude comments from the output",
            },
            {
              name: "--no-pager",
              description: "Disable automatic paging for long output",
            },
            {
              name: ["-j", "--json"],
              description: "Output issue data as JSON",
            },
            {
              name: "--no-download",
              description:
                "Keep remote URLs instead of downloading files",
            },
          ],
          args: {
            name: "issueId",
            isOptional: true,
          },
        },
        {
          name: "url",
          description: "Print the issue URL",
          options: [helpOption, workspaceOption],
          args: {
            name: "issueId",
            isOptional: true,
          },
        },
        {
          name: "describe",
          description:
            "Print the issue title and Linear-issue trailer",
          options: [
            helpOption,
            workspaceOption,
            {
              name: ["-r", "--references", "--ref"],
              description:
                "Use 'References' instead of 'Fixes' for the Linear issue link",
            },
          ],
          args: {
            name: "issueId",
            isOptional: true,
          },
        },
        {
          name: "commits",
          description:
            "Show all commits for a Linear issue (jj only)",
          options: [helpOption, workspaceOption],
          args: {
            name: "issueId",
            isOptional: true,
          },
        },
        {
          name: ["pull-request", "pr"],
          description:
            "Create a GitHub pull request with issue details",
          options: [
            helpOption,
            workspaceOption,
            {
              name: "--base",
              description:
                "The branch into which you want your code merged",
              args: { name: "branch" },
            },
            {
              name: "--draft",
              description: "Create the pull request as a draft",
            },
            {
              name: ["-t", "--title"],
              description:
                "Optional title for the pull request (Linear issue ID will be prefixed)",
              args: { name: "title" },
            },
            {
              name: "--web",
              description:
                "Open the pull request in the browser after creating it",
            },
            {
              name: "--head",
              description:
                "The branch that contains commits for your pull request",
              args: { name: "branch" },
            },
          ],
          args: {
            name: "issueId",
            isOptional: true,
          },
        },
        {
          name: ["delete", "d"],
          description: "Delete an issue",
          options: [
            helpOption,
            workspaceOption,
            {
              name: ["-y", "--confirm"],
              description: "Skip confirmation prompt",
            },
            {
              name: "--no-color",
              description: "Disable colored output",
            },
            {
              name: "--bulk",
              description:
                "Delete multiple issues by identifier (e.g., TC-123 TC-124)",
              args: { name: "ids" },
            },
            {
              name: "--bulk-file",
              description:
                "Read issue identifiers from a file (one per line)",
              args: { name: "file", template: "filepaths" },
            },
            {
              name: "--bulk-stdin",
              description: "Read issue identifiers from stdin",
            },
          ],
          args: {
            name: "issueId",
            isOptional: true,
          },
        },
        {
          name: "create",
          description: "Create a linear issue",
          options: [
            helpOption,
            workspaceOption,
            {
              name: "--start",
              description: "Start the issue after creation",
            },
            {
              name: ["-a", "--assignee"],
              description:
                "Assign the issue to 'self' or someone (by username or name)",
              args: { name: "assignee" },
            },
            {
              name: "--due-date",
              description: "Due date of the issue",
              args: { name: "dueDate" },
            },
            {
              name: ["-p", "--parent"],
              description:
                "Parent issue (if any) as a team_number code",
              args: { name: "parent" },
            },
            {
              name: "--priority",
              description:
                "Priority of the issue (1-4, descending priority)",
              args: { name: "priority" },
            },
            {
              name: "--estimate",
              description: "Points estimate of the issue",
              args: { name: "estimate" },
            },
            {
              name: ["-d", "--description"],
              description: "Description of the issue",
              args: { name: "description" },
            },
            {
              name: ["-l", "--label"],
              description:
                "Issue label associated with the issue. May be repeated",
              isRepeatable: true,
              args: { name: "label" },
            },
            {
              name: "--team",
              description:
                "Team associated with the issue (if not your default team)",
              args: { name: "team" },
            },
            {
              name: "--project",
              description: "Name of the project with the issue",
              args: { name: "project" },
            },
            {
              name: ["-s", "--state"],
              description:
                "Workflow state for the issue (by name or type)",
              args: { name: "state" },
            },
            {
              name: "--no-use-default-template",
              description:
                "Do not use default template for the issue",
            },
            {
              name: "--no-color",
              description: "Disable colored output",
            },
            {
              name: "--no-interactive",
              description: "Disable interactive prompts",
            },
            {
              name: ["-t", "--title"],
              description: "Title of the issue",
              args: { name: "title" },
            },
          ],
        },
        {
          name: "update",
          description: "Update a linear issue",
          options: [
            helpOption,
            workspaceOption,
            {
              name: ["-a", "--assignee"],
              description:
                "Assign the issue to 'self' or someone (by username or name)",
              args: { name: "assignee" },
            },
            {
              name: "--due-date",
              description: "Due date of the issue",
              args: { name: "dueDate" },
            },
            {
              name: ["-p", "--parent"],
              description:
                "Parent issue (if any) as a team_number code",
              args: { name: "parent" },
            },
            {
              name: "--priority",
              description:
                "Priority of the issue (1-4, descending priority)",
              args: { name: "priority" },
            },
            {
              name: "--estimate",
              description: "Points estimate of the issue",
              args: { name: "estimate" },
            },
            {
              name: ["-d", "--description"],
              description: "Description of the issue",
              args: { name: "description" },
            },
            {
              name: ["-l", "--label"],
              description:
                "Issue label associated with the issue. May be repeated",
              isRepeatable: true,
              args: { name: "label" },
            },
            {
              name: "--team",
              description:
                "Team associated with the issue (if not your default team)",
              args: { name: "team" },
            },
            {
              name: "--project",
              description: "Name of the project with the issue",
              args: { name: "project" },
            },
            {
              name: ["-s", "--state"],
              description:
                "Workflow state for the issue (by name or type)",
              args: { name: "state" },
            },
            {
              name: "--no-color",
              description: "Disable colored output",
            },
            {
              name: ["-t", "--title"],
              description: "Title of the issue",
              args: { name: "title" },
            },
          ],
          args: {
            name: "issueId",
            isOptional: true,
          },
        },
        {
          name: "comment",
          description: "Manage issue comments",
          options: [helpOption, workspaceOption],
          subcommands: [
            {
              name: "add",
              description:
                "Add a comment to an issue or reply to a comment",
              options: [
                helpOption,
                workspaceOption,
                {
                  name: ["-b", "--body"],
                  description: "Comment body text",
                  args: { name: "text" },
                },
                {
                  name: ["-p", "--parent"],
                  description: "Parent comment ID for replies",
                  args: { name: "id" },
                },
                {
                  name: ["-a", "--attach"],
                  description:
                    "Attach a file to the comment (can be used multiple times)",
                  isRepeatable: true,
                  args: {
                    name: "filepath",
                    template: "filepaths",
                  },
                },
              ],
            },
            {
              name: "update",
              description: "Update an existing comment",
              options: [
                helpOption,
                workspaceOption,
                {
                  name: ["-b", "--body"],
                  description: "New comment body text",
                  args: { name: "text" },
                },
              ],
              args: {
                name: "commentId",
              },
            },
            {
              name: "list",
              description: "List comments for an issue",
              options: [
                helpOption,
                workspaceOption,
                {
                  name: ["-j", "--json"],
                  description: "Output as JSON",
                },
              ],
            },
          ],
        },
        {
          name: "attach",
          description: "Attach a file to an issue",
          options: [
            helpOption,
            workspaceOption,
            {
              name: ["-t", "--title"],
              description: "Custom title for the attachment",
              args: { name: "title" },
            },
            {
              name: ["-c", "--comment"],
              description:
                "Add a comment body linked to the attachment",
              args: { name: "body" },
            },
          ],
          args: [
            {
              name: "issueId",
            },
            {
              name: "filepath",
              template: "filepaths",
            },
          ],
        },
      ],
    },
    {
      name: ["team", "t"],
      description: "Manage Linear teams",
      options: [helpOption, workspaceOption],
      subcommands: [
        {
          name: "create",
          description: "Create a linear team",
          options: [
            helpOption,
            workspaceOption,
            {
              name: ["-n", "--name"],
              description: "Name of the team",
              args: { name: "name" },
            },
            {
              name: ["-d", "--description"],
              description: "Description of the team",
              args: { name: "description" },
            },
            {
              name: ["-k", "--key"],
              description:
                "Team key (if not provided, will be generated from name)",
              args: { name: "key" },
            },
            {
              name: "--private",
              description: "Make the team private",
            },
            {
              name: "--no-color",
              description: "Disable colored output",
            },
            {
              name: "--no-interactive",
              description: "Disable interactive prompts",
            },
          ],
        },
        {
          name: "delete",
          description: "Delete a Linear team",
          options: [
            helpOption,
            workspaceOption,
            {
              name: "--move-issues",
              description:
                "Move all issues to another team before deletion",
              args: { name: "targetTeam" },
            },
            {
              name: ["-y", "--force"],
              description: "Skip confirmation prompt",
            },
          ],
          args: {
            name: "teamKey",
          },
        },
        {
          name: "list",
          description: "List teams",
          options: [
            helpOption,
            workspaceOption,
            {
              name: ["-w", "--web"],
              description: "Open in web browser",
            },
            {
              name: ["-a", "--app"],
              description: "Open in Linear.app",
            },
          ],
        },
        {
          name: "id",
          description: "Print the configured team id",
          options: [helpOption, workspaceOption],
        },
        {
          name: "autolinks",
          description:
            "Configure GitHub repository autolinks for Linear issues with this team prefix",
          options: [helpOption, workspaceOption],
        },
        {
          name: "members",
          description: "List team members",
          options: [
            helpOption,
            workspaceOption,
            {
              name: ["-a", "--all"],
              description: "Include inactive members",
            },
          ],
          args: {
            name: "teamKey",
            isOptional: true,
          },
        },
      ],
    },
    {
      name: ["project", "p"],
      description: "Manage Linear projects",
      options: [helpOption, workspaceOption],
      subcommands: [
        {
          name: "list",
          description: "List projects",
          options: [
            helpOption,
            workspaceOption,
            {
              name: "--team",
              description: "Filter by team key",
              args: { name: "team" },
            },
            {
              name: "--all-teams",
              description: "Show projects from all teams",
            },
            {
              name: "--status",
              description: "Filter by status name",
              args: { name: "status" },
            },
            {
              name: ["-w", "--web"],
              description: "Open in web browser",
            },
            {
              name: ["-a", "--app"],
              description: "Open in Linear.app",
            },
          ],
        },
        {
          name: ["view", "v"],
          description: "View project details",
          options: [
            helpOption,
            workspaceOption,
            {
              name: ["-w", "--web"],
              description: "Open in web browser",
            },
            {
              name: ["-a", "--app"],
              description: "Open in Linear.app",
            },
          ],
          args: {
            name: "projectId",
          },
        },
        {
          name: "create",
          description: "Create a new Linear project",
          options: [
            helpOption,
            workspaceOption,
            {
              name: ["-n", "--name"],
              description: "Project name (required)",
              args: { name: "name" },
            },
            {
              name: ["-d", "--description"],
              description: "Project description",
              args: { name: "description" },
            },
            {
              name: ["-t", "--team"],
              description:
                "Team key (required, can be repeated for multiple teams)",
              isRepeatable: true,
              args: { name: "team" },
            },
            {
              name: ["-l", "--lead"],
              description:
                "Project lead (username, email, or @me)",
              args: { name: "lead" },
            },
            {
              name: ["-s", "--status"],
              description:
                "Project status (planned, started, paused, completed, canceled, backlog)",
              args: {
                name: "status",
                suggestions: [
                  "planned",
                  "started",
                  "paused",
                  "completed",
                  "canceled",
                  "backlog",
                ],
              },
            },
            {
              name: "--start-date",
              description: "Start date (YYYY-MM-DD)",
              args: { name: "startDate" },
            },
            {
              name: "--target-date",
              description: "Target completion date (YYYY-MM-DD)",
              args: { name: "targetDate" },
            },
            {
              name: "--initiative",
              description:
                "Add to initiative immediately (ID, slug, or name)",
              args: { name: "initiative" },
            },
            {
              name: ["-i", "--interactive"],
              description:
                "Interactive mode (default if no flags provided)",
            },
            {
              name: "--no-color",
              description: "Disable colored output",
            },
          ],
        },
      ],
    },
    {
      name: ["project-update", "pu"],
      description: "Manage project status updates",
      options: [helpOption, workspaceOption],
      subcommands: [
        {
          name: ["create", "c"],
          description: "Create a new status update for a project",
          options: [
            helpOption,
            workspaceOption,
            {
              name: "--body",
              description: "Update content (inline)",
              args: { name: "body" },
            },
            {
              name: "--body-file",
              description: "Read content from file",
              args: { name: "path", template: "filepaths" },
            },
            {
              name: "--health",
              description:
                "Project health status (onTrack, atRisk, offTrack)",
              args: {
                name: "health",
                suggestions: ["onTrack", "atRisk", "offTrack"],
              },
            },
            {
              name: ["-i", "--interactive"],
              description: "Interactive mode with prompts",
            },
            {
              name: "--no-color",
              description: "Disable colored output",
            },
          ],
        },
        {
          name: ["list", "l"],
          description: "List status updates for a project",
          options: [
            helpOption,
            workspaceOption,
            {
              name: "--json",
              description: "Output as JSON",
            },
            {
              name: "--limit",
              description: "Limit results",
              args: { name: "limit" },
            },
          ],
        },
      ],
    },
    {
      name: ["milestone", "m"],
      description: "Manage Linear project milestones",
      options: [helpOption, workspaceOption],
      subcommands: [
        {
          name: "list",
          description: "List milestones for a project",
          options: [
            helpOption,
            workspaceOption,
            {
              name: "--project",
              description: "Project ID",
              args: { name: "projectId" },
            },
          ],
        },
        {
          name: ["view", "v"],
          description: "View milestone details",
          options: [helpOption, workspaceOption],
          args: {
            name: "milestoneId",
          },
        },
        {
          name: "create",
          description: "Create a new project milestone",
          options: [
            helpOption,
            workspaceOption,
            {
              name: "--project",
              description: "Project ID",
              args: { name: "projectId" },
            },
            {
              name: "--name",
              description: "Milestone name",
              args: { name: "name" },
            },
            {
              name: "--description",
              description: "Milestone description",
              args: { name: "description" },
            },
            {
              name: "--target-date",
              description: "Target date (YYYY-MM-DD)",
              args: { name: "date" },
            },
          ],
        },
        {
          name: "update",
          description: "Update an existing project milestone",
          options: [
            helpOption,
            workspaceOption,
            {
              name: "--name",
              description: "Milestone name",
              args: { name: "name" },
            },
            {
              name: "--description",
              description: "Milestone description",
              args: { name: "description" },
            },
            {
              name: "--target-date",
              description: "Target date (YYYY-MM-DD)",
              args: { name: "date" },
            },
            {
              name: "--project",
              description: "Move to a different project",
              args: { name: "projectId" },
            },
          ],
          args: {
            name: "id",
          },
        },
        {
          name: "delete",
          description: "Delete a project milestone",
          options: [
            helpOption,
            workspaceOption,
            {
              name: ["-f", "--force"],
              description: "Skip confirmation prompt",
            },
          ],
          args: {
            name: "id",
          },
        },
      ],
    },
    {
      name: ["initiative", "init"],
      description: "Manage Linear initiatives",
      options: [helpOption, workspaceOption],
      subcommands: [
        {
          name: ["list", "ls"],
          description: "List initiatives",
          options: [
            helpOption,
            workspaceOption,
            {
              name: ["-s", "--status"],
              description:
                "Filter by status (active, planned, completed)",
              args: {
                name: "status",
                suggestions: ["active", "planned", "completed"],
              },
            },
            {
              name: "--all-statuses",
              description: "Show all statuses (default: active only)",
            },
            {
              name: ["-o", "--owner"],
              description: "Filter by owner (username or email)",
              args: { name: "owner" },
            },
            {
              name: ["-w", "--web"],
              description: "Open initiatives page in web browser",
            },
            {
              name: ["-a", "--app"],
              description: "Open initiatives page in Linear.app",
            },
            {
              name: ["-j", "--json"],
              description: "Output as JSON",
            },
            {
              name: "--archived",
              description: "Include archived initiatives",
            },
          ],
        },
        {
          name: ["view", "v"],
          description: "View initiative details",
          options: [
            helpOption,
            workspaceOption,
            {
              name: ["-w", "--web"],
              description: "Open in web browser",
            },
            {
              name: ["-a", "--app"],
              description: "Open in Linear.app",
            },
            {
              name: ["-j", "--json"],
              description: "Output as JSON",
            },
          ],
          args: {
            name: "initiativeId",
          },
        },
        {
          name: "create",
          description: "Create a new Linear initiative",
          options: [
            helpOption,
            workspaceOption,
            {
              name: ["-n", "--name"],
              description: "Initiative name (required)",
              args: { name: "name" },
            },
            {
              name: ["-d", "--description"],
              description: "Initiative description",
              args: { name: "description" },
            },
            {
              name: ["-s", "--status"],
              description:
                "Status: planned, active, completed (default: planned)",
              args: {
                name: "status",
                suggestions: ["planned", "active", "completed"],
              },
            },
            {
              name: ["-o", "--owner"],
              description:
                "Owner (username, email, or @me for yourself)",
              args: { name: "owner" },
            },
            {
              name: "--target-date",
              description: "Target completion date (YYYY-MM-DD)",
              args: { name: "targetDate" },
            },
            {
              name: ["-c", "--color"],
              description: "Color hex code (e.g., #5E6AD2)",
              args: { name: "color" },
            },
            {
              name: "--icon",
              description: "Icon name",
              args: { name: "icon" },
            },
            {
              name: ["-i", "--interactive"],
              description:
                "Interactive mode (default if no flags provided)",
            },
            {
              name: "--no-color",
              description: "Disable colored output",
            },
          ],
        },
        {
          name: "archive",
          description: "Archive a Linear initiative",
          options: [
            helpOption,
            workspaceOption,
            {
              name: ["-y", "--force"],
              description: "Skip confirmation prompt",
            },
            {
              name: "--no-color",
              description: "Disable colored output",
            },
            {
              name: "--bulk",
              description:
                "Archive multiple initiatives by ID, slug, or name",
              args: { name: "ids" },
            },
            {
              name: "--bulk-file",
              description:
                "Read initiative IDs from a file (one per line)",
              args: { name: "file", template: "filepaths" },
            },
            {
              name: "--bulk-stdin",
              description: "Read initiative IDs from stdin",
            },
          ],
          args: {
            name: "initiativeId",
            isOptional: true,
          },
        },
        {
          name: "update",
          description: "Update a Linear initiative",
          options: [
            helpOption,
            workspaceOption,
            {
              name: ["-n", "--name"],
              description: "New name for the initiative",
              args: { name: "name" },
            },
            {
              name: ["-d", "--description"],
              description: "New description",
              args: { name: "description" },
            },
            {
              name: "--status",
              description:
                "New status (planned, active, completed, paused)",
              args: {
                name: "status",
                suggestions: [
                  "planned",
                  "active",
                  "completed",
                  "paused",
                ],
              },
            },
            {
              name: "--owner",
              description: "New owner (username, email, or @me)",
              args: { name: "owner" },
            },
            {
              name: "--target-date",
              description: "Target completion date (YYYY-MM-DD)",
              args: { name: "targetDate" },
            },
            {
              name: "--color",
              description: "Initiative color (hex, e.g., #5E6AD2)",
              args: { name: "color" },
            },
            {
              name: "--icon",
              description: "Initiative icon name",
              args: { name: "icon" },
            },
            {
              name: ["-i", "--interactive"],
              description: "Interactive mode for updates",
            },
            {
              name: "--no-color",
              description: "Disable colored output",
            },
          ],
          args: {
            name: "initiativeId",
          },
        },
        {
          name: "unarchive",
          description: "Unarchive a Linear initiative",
          options: [
            helpOption,
            workspaceOption,
            {
              name: ["-y", "--force"],
              description: "Skip confirmation prompt",
            },
            {
              name: "--no-color",
              description: "Disable colored output",
            },
          ],
          args: {
            name: "initiativeId",
          },
        },
        {
          name: "delete",
          description: "Permanently delete a Linear initiative",
          options: [
            helpOption,
            workspaceOption,
            {
              name: ["-y", "--force"],
              description: "Skip confirmation prompt",
            },
            {
              name: "--no-color",
              description: "Disable colored output",
            },
            {
              name: "--bulk",
              description:
                "Delete multiple initiatives by ID, slug, or name",
              args: { name: "ids" },
            },
            {
              name: "--bulk-file",
              description:
                "Read initiative IDs from a file (one per line)",
              args: { name: "file", template: "filepaths" },
            },
            {
              name: "--bulk-stdin",
              description: "Read initiative IDs from stdin",
            },
          ],
          args: {
            name: "initiativeId",
            isOptional: true,
          },
        },
        {
          name: "add-project",
          description: "Link a project to an initiative",
          options: [
            helpOption,
            workspaceOption,
            {
              name: "--sort-order",
              description: "Sort order within initiative",
              args: { name: "sortOrder" },
            },
            {
              name: "--no-color",
              description: "Disable colored output",
            },
          ],
          args: [
            {
              name: "initiativeId",
            },
            {
              name: "project",
            },
          ],
        },
        {
          name: "remove-project",
          description: "Unlink a project from an initiative",
          options: [
            helpOption,
            workspaceOption,
            {
              name: ["-y", "--force"],
              description: "Skip confirmation prompt",
            },
            {
              name: "--no-color",
              description: "Disable colored output",
            },
          ],
          args: [
            {
              name: "initiativeId",
            },
            {
              name: "project",
            },
          ],
        },
      ],
    },
    {
      name: ["initiative-update", "iu"],
      description:
        "Manage initiative status updates (timeline posts)",
      options: [helpOption, workspaceOption],
      subcommands: [
        {
          name: ["create", "c"],
          description:
            "Create a new status update for an initiative",
          options: [
            helpOption,
            workspaceOption,
            {
              name: "--body",
              description: "Update content (markdown)",
              args: { name: "body" },
            },
            {
              name: "--body-file",
              description: "Read content from file",
              args: { name: "path", template: "filepaths" },
            },
            {
              name: "--health",
              description:
                "Health status (onTrack, atRisk, offTrack)",
              args: {
                name: "health",
                suggestions: ["onTrack", "atRisk", "offTrack"],
              },
            },
            {
              name: ["-i", "--interactive"],
              description: "Interactive mode with prompts",
            },
            {
              name: "--no-color",
              description: "Disable colored output",
            },
          ],
        },
        {
          name: ["list", "l", "ls"],
          description: "List status updates for an initiative",
          options: [
            helpOption,
            workspaceOption,
            {
              name: ["-j", "--json"],
              description: "Output as JSON",
            },
            {
              name: "--limit",
              description: "Limit results",
              args: { name: "limit" },
            },
          ],
        },
      ],
    },
    {
      name: ["label", "l"],
      description: "Manage Linear issue labels",
      options: [helpOption, workspaceOption],
      subcommands: [
        {
          name: "list",
          description: "List issue labels",
          options: [
            helpOption,
            {
              name: "--team",
              description:
                "Filter by team (e.g., TC). Shows team-specific labels only",
              args: { name: "teamKey" },
            },
            {
              name: "--workspace",
              description:
                "Show only workspace-level labels (not team-specific)",
            },
            {
              name: "--all",
              description:
                "Show all labels (both workspace and team)",
            },
            {
              name: ["-j", "--json"],
              description: "Output as JSON",
            },
          ],
        },
        {
          name: "create",
          description: "Create a new issue label",
          options: [
            helpOption,
            workspaceOption,
            {
              name: ["-n", "--name"],
              description: "Label name (required)",
              args: { name: "name" },
            },
            {
              name: ["-c", "--color"],
              description: "Color hex code (e.g., #EB5757)",
              args: { name: "color" },
            },
            {
              name: ["-d", "--description"],
              description: "Label description",
              args: { name: "description" },
            },
            {
              name: ["-t", "--team"],
              description:
                "Team key for team-specific label (omit for workspace label)",
              args: { name: "teamKey" },
            },
            {
              name: ["-i", "--interactive"],
              description:
                "Interactive mode (default if no flags provided)",
            },
          ],
        },
        {
          name: "delete",
          description: "Delete an issue label",
          options: [
            helpOption,
            workspaceOption,
            {
              name: ["-t", "--team"],
              description:
                "Team key to disambiguate labels with same name",
              args: { name: "teamKey" },
            },
            {
              name: ["-f", "--force"],
              description: "Skip confirmation prompt",
            },
          ],
          args: {
            name: "labelName",
          },
        },
      ],
    },
    {
      name: ["document", "docs", "doc"],
      description: "Manage Linear documents",
      options: [helpOption, workspaceOption],
      subcommands: [
        {
          name: ["list", "l"],
          description: "List documents",
          options: [
            helpOption,
            workspaceOption,
            {
              name: "--project",
              description: "Filter by project (slug or name)",
              args: { name: "project" },
            },
            {
              name: "--issue",
              description:
                "Filter by issue (identifier like TC-123)",
              args: { name: "issue" },
            },
            {
              name: "--json",
              description: "Output as JSON",
            },
            {
              name: "--limit",
              description: "Limit results",
              args: { name: "limit" },
            },
          ],
        },
        {
          name: ["view", "v"],
          description: "View a document's content",
          options: [
            helpOption,
            workspaceOption,
            {
              name: "--raw",
              description:
                "Output raw markdown without rendering",
            },
            {
              name: ["-w", "--web"],
              description: "Open document in browser",
            },
            {
              name: "--json",
              description: "Output full document as JSON",
            },
          ],
          args: {
            name: "id",
          },
        },
        {
          name: ["create", "c"],
          description: "Create a new document",
          options: [
            helpOption,
            workspaceOption,
            {
              name: ["-t", "--title"],
              description: "Document title (required)",
              args: { name: "title" },
            },
            {
              name: ["-c", "--content"],
              description: "Markdown content (inline)",
              args: { name: "content" },
            },
            {
              name: ["-f", "--content-file"],
              description: "Read content from file",
              args: { name: "path", template: "filepaths" },
            },
            {
              name: "--project",
              description: "Attach to project (slug or ID)",
              args: { name: "project" },
            },
            {
              name: "--issue",
              description:
                "Attach to issue (identifier like TC-123)",
              args: { name: "issue" },
            },
            {
              name: "--icon",
              description: "Document icon (emoji)",
              args: { name: "icon" },
            },
            {
              name: ["-i", "--interactive"],
              description: "Interactive mode with prompts",
            },
            {
              name: "--no-color",
              description: "Disable colored output",
            },
          ],
        },
        {
          name: ["update", "u"],
          description: "Update an existing document",
          options: [
            helpOption,
            workspaceOption,
            {
              name: ["-t", "--title"],
              description: "New title for the document",
              args: { name: "title" },
            },
            {
              name: ["-c", "--content"],
              description: "New markdown content (inline)",
              args: { name: "content" },
            },
            {
              name: ["-f", "--content-file"],
              description: "Read new content from file",
              args: { name: "path", template: "filepaths" },
            },
            {
              name: "--icon",
              description: "New icon (emoji)",
              args: { name: "icon" },
            },
            {
              name: ["-e", "--edit"],
              description:
                "Open current content in $EDITOR for editing",
            },
            {
              name: "--no-color",
              description: "Disable colored output",
            },
          ],
          args: {
            name: "documentId",
          },
        },
        {
          name: ["delete", "d"],
          description: "Delete a document (moves to trash)",
          options: [
            helpOption,
            workspaceOption,
            {
              name: ["-y", "--yes"],
              description: "Skip confirmation prompt",
            },
            {
              name: "--no-color",
              description: "Disable colored output",
            },
            {
              name: "--bulk",
              description:
                "Delete multiple documents by slug or ID",
              args: { name: "ids" },
            },
            {
              name: "--bulk-file",
              description:
                "Read document slugs/IDs from a file (one per line)",
              args: { name: "file", template: "filepaths" },
            },
            {
              name: "--bulk-stdin",
              description: "Read document slugs/IDs from stdin",
            },
          ],
          args: {
            name: "documentId",
            isOptional: true,
          },
        },
      ],
    },
    {
      name: "completions",
      description: "Generate shell completions",
      options: [helpOption],
      subcommands: [
        {
          name: "bash",
          description: "Generate shell completions for bash",
          options: [
            helpOption,
            {
              name: ["-n", "--name"],
              description: "The name of the main command",
              args: { name: "command-name" },
            },
          ],
        },
        {
          name: "fish",
          description: "Generate shell completions for fish",
          options: [
            helpOption,
            {
              name: ["-n", "--name"],
              description: "The name of the main command",
              args: { name: "command-name" },
            },
          ],
        },
        {
          name: "zsh",
          description: "Generate shell completions for zsh",
          options: [
            helpOption,
            {
              name: ["-n", "--name"],
              description: "The name of the main command",
              args: { name: "command-name" },
            },
          ],
        },
      ],
    },
    {
      name: "config",
      description:
        "Interactively generate .linear.toml configuration",
      options: [helpOption, workspaceOption],
    },
    {
      name: "schema",
      description: "Print the GraphQL schema to stdout",
      options: [
        helpOption,
        workspaceOption,
        {
          name: "--json",
          description:
            "Output as JSON introspection result instead of SDL",
        },
        {
          name: ["-o", "--output"],
          description: "Write schema to file instead of stdout",
          args: { name: "file", template: "filepaths" },
        },
      ],
    },
  ],
};

export default completionSpec;
