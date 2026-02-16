Create a Fig/Kiro autocomplete spec for the CLI tool: $ARGUMENTS

## Steps

1. **Check if the CLI is installed** by running `<tool> --help` or `<tool> -h`. If not installed, tell the user and stop.

2. **Gather the full command structure** using multiple sources in parallel:
   - Run `<tool> --help` for the top-level overview
   - Check if the tool has a completions subcommand (e.g., `<tool> completions zsh`) - zsh completions are the richest source of flag/arg details
   - Fetch the tool's GitHub README if a repo URL is known or easily found
   - Run `<tool> <subcommand> --help` for each subcommand discovered

3. **Study an existing spec** in `src/` for style reference (e.g., `src/wt.ts` or `src/linear.ts`).

4. **Write the spec** to `src/<tool>.ts` following these conventions:

### File structure
```typescript
const completionSpec: Fig.Spec = {
  name: "<tool>",
  description: "<one-line description>",
  options: [...],
  subcommands: [...],
};

export default completionSpec;
```

### Key conventions
- Every command/subcommand should include a `{ name: ["-h", "--help"], description: "..." }` option
- Use `isPersistent: true` for flags that apply to all subcommands (like `--help`, `--verbose`)
- Use `isRepeatable: true` for flags that can be specified multiple times (like `-l label1 -l label2`)
- Aliases go in arrays: `name: ["issue", "i"]` or `name: ["-v", "--verbose"]`
- Args that accept file paths should use `template: "filepaths"` or `template: "folders"`
- Add `suggestions: [...]` arrays for enum-style arguments (e.g., status values, format options)
- Use `isOptional: true` for optional positional arguments
- Use `isVariadic: true` for arguments that accept multiple values
- Extract shared/repeated options into `const` variables at the top of the file to reduce duplication (e.g., a `helpOption` or `workspaceOption` that appears on every subcommand)
- Args object shape: `{ name: "argName", isOptional?: boolean, isVariadic?: boolean, template?: string, suggestions?: string[], description?: string }`

### Types reference (no imports needed, Fig types are global)
- `Fig.Spec` - top-level completion spec
- `Fig.Option` - for shared option constants
- `Fig.Subcommand` - for shared subcommand constants

5. **Verify** the file has no TypeScript syntax errors by reviewing the structure.
