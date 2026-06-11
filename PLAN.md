# alp-ui Build Plan

## Mission
Framework-agnostic shadcn/ui component library on Alpine.js + Tailwind CSS. No build step for users.

---

## Phase 0 — Project Skeleton (DONE ✓)

- [x] `package.json` with tailwindcss v4 dependency and build scripts
- [x] `src/input.css` with `@import "tailwindcss"`, `@theme inline` block, `:root` and `.dark` tokens
- [x] `src/themes/rose.css`, `blue.css`, `green.css`, `orange.css` — variable overrides only
- [x] Verify `npm run build` produces `dist/ui.css` and `dist/themes/`
- [x] `README.md` — minimal, focused on install story

## Phase 1 — Static Components (DONE ✓)

- [x] Button (default, secondary, destructive, outline, ghost, link, icon + sizes)
- [x] Badge
- [x] Card
- [x] Input
- [x] Textarea
- [x] Label
- [x] Separator
- [x] Avatar
- [x] Skeleton

## Phase 2 — Docs Site (CURRENT)

## Phase 2 — Docs Site (dogfoods alp-ui)

- [ ] `docs/index.html` — landing + install snippet + quick start
- [ ] `docs/themes.html` — live theme switcher demo
- [ ] `docs/components/` — one page per component with live preview + snippet

## Phase 3 — Simple Alpine Components

- [ ] Alert
- [ ] Collapsible
- [ ] Accordion
- [ ] Tabs
- [ ] Progress
- [ ] Switch
- [ ] Checkbox

## Phase 4 — Complex Alpine Components

- [ ] Dialog/Modal
- [ ] Dropdown
- [ ] Tooltip
- [ ] Popover
- [ ] Select

## Phase 5 — Stretch / v2

- [ ] Toast/Notifications
- [ ] Command/Combobox
- [ ] DataTable
- [ ] npm package
- [ ] Contribution guide

---

## Build Flow Reminder

1. Author components in `components/` (plain HTML + Tailwind + Alpine)
2. Run `npm run build` — Tailwind CLI scans components/docs, outputs `dist/ui.css`
3. Theme files copied as-is from `src/themes/` to `dist/themes/`
4. `dist/` is committed — jsDelivr serves directly from GitHub
