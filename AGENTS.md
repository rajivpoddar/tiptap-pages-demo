# AGENTS.md

## Project Overview
This is a paginated document editor built with a custom fork of the `tiptap-extension-pagination` module. It mimics Google Docs/Microsoft Word's A4 layout and is meant for transcription-focused applications.

## Repository Structure
- Main app root: `/`
- Submodule: `packages/tiptap-extension-pagination`

## Code Style
- Follow default Prettier formatting.
- Prefer full words in variable names; avoid cryptic abbreviations.
- Use modern JavaScript/TypeScript (ESNext).

## Installation Instructions
1. Clone with submodules:

git clone –recurse-submodules https://github.com/rajivpoddar/tiptap-pages-demo.git

2. Run from root:

npm install

## Submodule Build Steps
### One-time change:
```bash
npm run dev:submodule
```
### Continuous development:
	•	Terminal 1:
```bash
npm run watch:submodule
```

	•	Terminal 2:
```bash
npm run dev
```

## Test Instructions

There are no formal tests. To verify:
	•	Confirm the demo editor renders A4 pages.
	•	Make changes to the submodule and ensure hot reload reflects updates.

## Editor Instructions
	•	Use the packages/tiptap-extension-pagination submodule for editing core logic.
	•	Restart Vite dev server when prompted by rebuild scripts.

## Expected Agent Behavior
	•	Modify code only in the correct layer (main app vs submodule).
	•	Reinstall and rebuild the submodule when changes are made.
	•	Restart dev server when necessary.
	•	Preserve A4 pagination logic and editor behavior.

## Known Limitations
	•	No formal CI/CD or test framework in place.
	•	Changes to submodule require manual/automated rebuild workflows.

This format allows Codex (and other AI agents) to:
- Understand the layered structure (main app + submodule),
- Follow correct workflows,
- Respect formatting and code hygiene,
- Avoid unnecessary or incorrect edits.

Let me know if you'd like to add test automation or PR protocols. 