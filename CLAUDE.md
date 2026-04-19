# Claude Instructions for This Repo

## Who you're talking to

**Default: assume Allison.** Allison is not a developer. When discussing technical topics, use plain language and analogies — for example, explain a git commit as "saving a named snapshot of your work," explain a static site as "a printed flyer — looks the same for everyone, no moving parts."

If the person says they're Michael, switch to developer-level communication. Michael is a professional software developer.

## Project structure

- `claude_code_projects/` is the repo root and a uv workspace.
- **Use plain directories by default** for new projects. Only upgrade to a uv package (with `pyproject.toml`) when a project needs Python dependencies.
- Each project lives in its own subdirectory: `project_name/`

To add a Python project as a uv package when needed:
```bash
/Users/Allison/.local/bin/uv init --package project_name
/Users/Allison/.local/bin/uv add --package project-name some-dependency
```

## Public site (GitHub Pages)

The repo publishes to `https://thundercat1.github.io/allison-public-code/` as a plain static site (no Jekyll).

**The rule is simple: if it's inside `public/`, it's on the website. If it's outside `public/`, it's not.**

**Before adding anything to `public/`**, confirm with the user that it's intended to be publicly visible on the site.

**Before every `git push`**, remind Allison that pushing will update the live public website within ~60 seconds. For major visual changes, suggest running a local preview first (see below).

> **IMPORTANT: The repo is fully public on GitHub.** Everything pushed to it — inside or outside `public/` — is visible to anyone on GitHub. `public/` only controls what appears on the website. If something is sensitive (API keys, personal data, private work), it must never be committed to this repo at all. Use `.gitignore` to prevent accidental commits, and confirm with the user before pushing anything that could contain sensitive content.

## Static vs. interactive

**Default: static HTML + JS.** At the start of any new project, confirm with the user:
- Static = HTML + JS files, no server needed, can be hosted on GitHub Pages. Good for demos, displays, tools that don't need to save data.
- Interactive = needs a Flask backend (Python), a database (SQLite), and a server to run. Necessary when the app needs to store data, handle logins, process forms, etc.

Only reach for Flask + SQLite when static genuinely won't work.

## Safety rails

- **Never commit secrets.** Always add `.env` files, API keys, and credentials to `.gitignore` before touching them.
- **Always warn before `git push`** that it will update the live public site.
- **Suggest a local preview** before pushing if: (a) the user asks, (b) something looks broken, or (c) the change is a major visual update.

## Local preview

Use this to preview the site locally without pushing. Only run when debugging or when the user asks.

```bash
cd public && python3 -m http.server 8000
# Site will be at http://localhost:8000
```

No dependencies needed — Python is already installed.

## Running Python projects

The Bash tool runs non-interactively and doesn't load `.zshrc`, so `uv` won't be on PATH. Always use the full path:
```bash
/Users/Allison/.local/bin/uv run --package package-name entry-point
```

In Allison's own terminal, `uv` works normally.

## Git

**Branch strategy: commit and push directly to `main` by default.** Only create a branch or PR if Allison explicitly asks for one.

Credentials are stored in macOS Keychain via `git credential-osxkeychain`. Pushes should work without prompting.

If a push fails with auth errors, check that the remote URL doesn't have a token embedded:
```bash
git remote -v
# Should show: https://github.com/thundercat1/allison-public-code.git
# NOT: https://oauth2:token@github.com/...
```

## Teaching approach for Allison

When explaining concepts, lead with an analogy before the technical detail:
- Git push → "like uploading your saved document so others (and the website) can see the latest version"
- Virtual environment → "like a separate toolbox for each project so tools don't clash"
- Flask → "the waiter between the webpage and the database — takes requests and brings back answers"

Keep explanations brief. One analogy, one sentence of detail. Offer to go deeper if asked.
