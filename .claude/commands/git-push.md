---
name: git-push
description: Commits and pushes all current changes to GitHub.
  Invoke when user wants to commit, push, save changes, or deploy.
---

## Your task
Commit and push all current changes to the remote repository.

## Steps
1. Run `git status` to see what changed
2. Run `git diff --stat` to understand the scope of changes
3. Analyze what was changed and generate a meaningful commit message
4. Run `git add .`
5. Run `git commit -m "[your generated message]"`
6. Run `git push`
7. Confirm success with branch name and commit hash

## Commit message format
Use conventional commits:
- `feat:` — new feature or content
- `fix:` — bug fix
- `style:` — visual/CSS changes  
- `content:` — text, bio, projects updated
- `refactor:` — code restructure

## Examples
- `feat: add BNB Application to projects section`
- `content: update bio and skills from resume`
- `fix: correct Monitor icon duplicate in Skills.tsx`

## Rules
- Never push to main if there are merge conflicts
- If push fails — report the error, don't retry automatically
- Always show the final commit message before executing