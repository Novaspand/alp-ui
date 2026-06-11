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

## Phase 2 — Docs Site (DONE ✓)

- [x] `docs/index.html` — landing + install snippet + component grid + dark mode
- [x] `docs/themes.html` — live theme switcher demo with cards/badges/input preview
- [x] `docs/components/index.html` — component listing page
- [x] `docs/components/button.html` — live preview all variants + sizes + states + snippet
- [x] `docs/components/badge.html` — live preview all variants + snippet
- [x] `docs/components/card.html` — live preview + snippet
- [x] `docs/components/input.html` — states (default, disabled, error) + snippet
- [x] `docs/components/textarea.html` — states + snippet
- [x] `docs/components/label.html` — live preview with form pairing + snippet
- [x] `docs/components/separator.html` — live preview + snippet
- [x] `docs/components/avatar.html` — image, initials, sizes + snippet
- [x] `docs/components/skeleton.html` — text line, avatar+text, card skeleton

## Phase 3 — Simple Alpine Components (CURRENT)

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
