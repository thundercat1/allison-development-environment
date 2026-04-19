# Allison's Development Environment

Prototypes and projects built with Claude Code.

Live site: [thundercat1.github.io/allison-development-environment](https://thundercat1.github.io/allison-development-environment/)

---

## Projects

| Project | Type | Published |
|---|---|---|
| [Supply Chain Marketplace](supply_chain_marketplace/) | Static demo (HTML + JS) | Yes |
| [Recipes](recipes/) | Static (Jekyll) | Yes |
| [Hello World](hello_world/) | Python (uv package) | No |

---

## How this works

This repo has two layers:

**1. A public website** hosted on GitHub Pages. Any time changes are pushed to `main`, the site updates automatically within about 60 seconds. Not everything in the repo is published — only what's linked from the site.

**2. Python projects** managed with `uv`. These run locally and aren't part of the website.

---

## Adding a new project

1. Create a folder: `my_project/`
2. Tell Claude what you want to build
3. Claude will confirm: static site or interactive app?
4. Claude will ask before publishing it to the public site

---

## Tech stack

- **Frontend**: Plain HTML + JavaScript (no build step)
- **Backend** (when needed): Python + Flask
- **Database** (when needed): SQLite
- **Package manager**: [uv](https://docs.astral.sh/uv/)
- **Hosting**: GitHub Pages (static) / local server (Flask apps)

---

## Local site preview

To preview the Jekyll site on your own machine before pushing:

```bash
gem install bundler jekyll   # one-time setup
bundle exec jekyll serve     # then visit http://localhost:4000
```
