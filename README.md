<p align="center">
  <a href="https://vibekanban.com">
    <picture>
      <source srcset="frontend/public/xgmi_dark_background.svg" media="(prefers-color-scheme: dark)">
      <source srcset="frontend/public/xgmi_light_background.svg" media="(prefers-color-scheme: light)">
      <img src="frontend/public/xgmi_logo.svg" alt="XGMI Logo">
    </picture>
  </a>
</p>

<p align="center">Together we GET IT DONE!</p>

## Overview

AI coding agents are increasingly writing the world's code and human engineers now spend the majority of their time planning, reviewing, and orchestrating tasks. Get-it-done streamlines this process, enabling you to:

- Suck in research spikes to spin up sub-tasks
- Orchestrate the execution of multiple coding agents in parallel or in sequence
- Quickly review work 
- Track the status of tasks that your coding agents are working on
- Centralise configuration of coding agent MCP configs
- Easily switch between different coding agents

## Installation

Make sure you have authenticated with your favourite coding agent. A full list of supported coding agents:
- Claude Code CLI
- OpenAI Codex CLI
- GitHub Copilot CLI
- Google Gemini CLI
- Amp Code
- Cursor Agent CLI
- SST OpenCode
- Factory Droid
- Claude Code Router - orchestrate multiple models
- Qwen Code CLI


In your terminal run:

```bash
npx vibe-kanban
```

## Development

### Prerequisites

- [Rust](https://rustup.rs/) (latest stable)
- [Node.js](https://nodejs.org/) (>=18)
- [pnpm](https://pnpm.io/) (>=8)

Additional development tools:
```bash
cargo install cargo-watch
cargo install sqlx-cli
```

Install dependencies:
```bash
pnpm i
```

### Running the dev server

```bash
pnpm run dev
```

This will start the backend. A blank DB will be copied from the `dev_assets_seed` folder.

### Building the frontend

To build just the frontend:

```bash
cd frontend
pnpm build
```

### Build from source (macOS)

1. Run `./local-build.sh`
2. Test with `cd npx-cli && node bin/cli.js`


### Environment Variables

The following environment variables can be configured at build time or runtime:

| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `POSTHOG_API_KEY` | Build-time | Empty | PostHog analytics API key (disables analytics if empty) |
| `POSTHOG_API_ENDPOINT` | Build-time | Empty | PostHog analytics endpoint (disables analytics if empty) |
| `PORT` | Runtime | Auto-assign | **Production**: Server port. **Dev**: Frontend port (backend uses PORT+1) |
| `BACKEND_PORT` | Runtime | `0` (auto-assign) | Backend server port (dev mode only, overrides PORT+1) |
| `FRONTEND_PORT` | Runtime | `3000` | Frontend dev server port (dev mode only, overrides PORT) |
| `HOST` | Runtime | `127.0.0.1` | Backend server host |
| `MCP_HOST` | Runtime | Value of `HOST` | MCP server connection host (use `127.0.0.1` when `HOST=0.0.0.0` on Windows) |
| `MCP_PORT` | Runtime | Value of `BACKEND_PORT` | MCP server connection port |
| `DISABLE_WORKTREE_ORPHAN_CLEANUP` | Runtime | Not set | Disable git worktree cleanup (for debugging) |

**Build-time variables** must be set when running `pnpm run build`. **Runtime variables** are read when the application starts.

### Remote Deployment

When running Vibe Kanban on a remote server (e.g., via systemctl, Docker, or cloud hosting), you can configure your editor to open projects via SSH:

1. **Access via tunnel**: Use Cloudflare Tunnel, ngrok, or similar to expose the web UI
2. **Configure remote SSH** in Settings → Editor Integration:
   - Set **Remote SSH Host** to your server hostname or IP
   - Set **Remote SSH User** to your SSH username (optional)
3. **Prerequisites**:
   - SSH access from your local machine to the remote server
   - SSH keys configured (passwordless authentication)
   - VSCode Remote-SSH extension

When configured, the "Open in VSCode" buttons will generate URLs like `vscode://vscode-remote/ssh-remote+user@host/path` that open your local editor and connect to the remote server.

See the [documentation](https://vibekanban.com/docs/configuration-customisation/global-settings#remote-ssh-configuration) for detailed setup instructions.
