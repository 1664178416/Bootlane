# Security Policy

Last updated: 2026-06-08

Bootlane is a local-first setup-readiness CLI. It can warn about committed env files and high-signal secret patterns, but it is not a vulnerability scanner and does not replace dedicated security tools.

## Supported Versions

Bootlane is pre-1.0.

| Version | Security support |
| --- | --- |
| `0.1.x` | Supported after first public release |
| Unreleased `main` | Best-effort before first public release |

## Reporting a Security Issue

Before the final Bootlane repository is confirmed, do not publish sensitive security details in public issues.

After the final repository and maintainer contact are confirmed, this section must be updated with the private security reporting channel.

For the first public release checklist:

- Confirm the final Bootlane repository URL.
- Confirm the private security contact or GitHub private vulnerability reporting path.
- Replace this placeholder section before announcing the release broadly.

Use private reporting for:

- Bootlane printing an unredacted secret value.
- Bootlane mutating analyzed repository files during `bootlane check`.
- Bootlane executing project scripts during `bootlane check`.
- A package provenance, npm ownership, or release artifact concern.
- A vulnerability in Bootlane itself or its distributed packages.

Use public issue forms for:

- False positives.
- Missing detections.
- Docs confusion.
- Feature requests.

## Secret Handling Policy

Bootlane secret findings must not print full secret values.

Allowed output:

- File path.
- Line number when available.
- Secret pattern label.
- Redacted preview such as `abcd...wxyz`.

Disallowed output:

- Full token values.
- Full private key material.
- Full `.env` file contents.
- Secrets copied into fix proposals, Markdown reports, JSON reports, logs, or issue examples.

If a report includes an unredacted secret, treat it as security-sensitive and rotate the exposed secret immediately.

Regression tests cover JSON, Markdown, and terminal output so full matched secret values do not appear in rendered reports.
Focused scanner tests cover GitHub token, AWS access key ID, OpenAI API key, and private key block previews.

## Scope of Secret Checks

Current high-signal checks include:

- Committed `.env` files other than `.env.example`.
- PEM private key block markers.
- GitHub token patterns.
- AWS access key ID patterns.
- OpenAI-style API key patterns.

Bootlane does not currently perform full dependency vulnerability analysis, software composition analysis, license compliance review, container scanning, infrastructure scanning, or dynamic application testing.

Use dedicated tools such as `npm audit`, Dependabot, Snyk, GitHub Advanced Security, secret scanning, or cloud security tools for those jobs.

## Read-Only Security Boundary

`bootlane check` must not:

- Mutate analyzed repository files.
- Install dependencies.
- Execute project scripts.
- Upload repository contents.
- Require cloud accounts or telemetry.

The built CLI smoke gate verifies read-only behavior. Future write-capable behavior must use explicit commands or flags, diff previews, and separate test coverage.

## Maintainer Response

For confirmed security-sensitive reports:

1. Acknowledge receipt privately when a private channel exists.
2. Reproduce without sharing sensitive data publicly.
3. Patch with a fixture or focused test when possible.
4. Run `pnpm verify:release`.
5. Publish a patched version if already released.
6. Credit the reporter if they want credit.
7. Document any user action needed, such as rotating exposed secrets.

## Public Discussion Guidelines

When opening public issues or pull requests:

- Redact secrets, tokens, private repository URLs, and private package names.
- Prefer minimal fixtures over copied production repositories.
- Do not paste full `.env` files or private keys.
- Use the false-positive or missing-detection issue forms for scanner accuracy problems.

When recording first-release evidence, follow the Evidence Redaction Examples in `docs/RELEASE_EVIDENCE.md` before copying npm auth checks, CI logs, security contact notes, or scanner output into public release records.
