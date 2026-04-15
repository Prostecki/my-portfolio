---
name: add-project
description: Adds a new project to the portfolio. Invoke when user 
  wants to add, create or insert a new project into the portfolio.
---

# Add Project to Portfolio

## Your task
Add a new project entry to the portfolio projects data.

## Steps
1. Find the file containing the projects array (look for files 
   with `title`, `description`, `image`, `tags`, `link`, `github` fields)
2. Locate the existing projects array
3. Study the exact structure and formatting of existing entries
4. Add the new project following the EXACT same structure
5. Place it at the beginning of the array (newest first)
6. Confirm what was added and in which file

## Project structure to follow
Match exactly what exists in the codebase. Fields:
- title: string — project name
- description: string — 1-2 sentences, what it does and why it matters
- image: string — path to image (ask user if not provided)
- tags: string[] — tech stack used, max 5 tags
- link: string — live demo URL (use "" if none)
- github: string — repository URL (use "" if none)

## Rules
- Never change existing projects
- Match code style, quotes, indentation of existing entries
- If image is not provided, use placeholder and notify user
- If any field is missing, ask before proceeding