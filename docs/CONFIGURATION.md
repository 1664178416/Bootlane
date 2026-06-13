# Bootlane Configuration

Last updated: 2026-06-08

Bootlane automatically loads `bootlane.config.json` from the target repository root.

## Example

```json
{
  "ignore": ["generated/**"],
  "failOn": "warning",
  "checks": {
    "ci.github-actions.missing": "off",
    "runtime.node-version.missing": "error"
  }
}
```

See also: [examples/bootlane.config.example.json](../examples/bootlane.config.example.json).

## Fields

| Field | Type | Default | Meaning |
| --- | --- | --- | --- |
| `ignore` | `string[]` | `[]` | Extra glob patterns to ignore during scanning |
| `failOn` | `"critical" \| "warning" \| "info"` | `"critical"` | CI failure threshold |
| `checks` | object | `{}` | Per-finding severity overrides |

## Default Ignore Patterns

Bootlane always ignores common generated directories:

```json
[
  "**/node_modules/**",
  "**/.git/**",
  "**/dist/**",
  "**/build/**",
  "**/coverage/**",
  "**/.next/**",
  "**/.turbo/**",
  "**/.cache/**"
]
```

Config `ignore` entries are appended to these defaults. They do not replace the defaults.

Example:

```json
{
  "ignore": ["generated/**", "fixtures/**"]
}
```

Use `--print-config` to inspect the merged config:

```bash
bootlane check . --print-config
```

## Check Overrides

Each `checks` key is a stable finding ID. Values:

| Value | Meaning |
| --- | --- |
| `off` | Hide this finding |
| `info` | Treat this finding as info |
| `warn` | Treat this finding as warning |
| `error` | Treat this finding as critical |

Examples:

```json
{
  "checks": {
    "ci.github-actions.missing": "off",
    "readme.test.missing": "info",
    "runtime.node-version.missing": "error"
  }
}
```

## CLI Overrides

Use `--config` to load a specific config file:

```bash
bootlane check . --config ./config/bootlane.json
```

CLI flags override config file values where applicable:

```bash
bootlane check . --ci --fail-on critical
```
