# alp-ui — Full Project Context
> Read this entire file before writing any code, creating any file, or making any decisions.
> This is the single source of truth for the alp-ui project.

---

## What Is alp-ui

alp-ui is a framework-agnostic UI component library built on Alpine.js and Tailwind CSS. It brings shadcn/ui quality and design system to the non-React world — no build step required for users, no framework opinions, no headless library dependencies.

It is an open source project by **Novaspand** (novaspand.com).

**The install story is the whole point.** A user adds two lines to their HTML and starts pasting components. That's it. Works in plain HTML, Django templates, Rails ERB, PHP without Laravel, HTMX projects, or any server-rendered stack.

```html
<!-- 1. Base styles + design tokens -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/novaspand/alp-ui@main/dist/ui.css">

<!-- 2. Alpine.js -->
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
```

Optional theme override (add after ui.css):
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/novaspand/alp-ui@main/dist/themes/rose.css">
```

---

## Two Products, One Foundation

### Product 1 — alp-ui (build this first)
Pure Alpine.js + Tailwind + HTML. Framework-agnostic. This is what we are building now.

### Product 2 — tall-shadcn (built later on top of alp-ui)
Blade/Livewire wrapper layer over alp-ui for the TALL stack (Tailwind, Alpine, Livewire, Laravel). Same design tokens, same component logic, just wrapped in Blade syntax with Livewire integration for server-driven components. This is a separate repo built after alp-ui is stable.

> Do not mix these two products. alp-ui has zero Laravel or PHP dependency. Keep it that way.

---

## Repository Structure

```
alp-ui/                         ← github.com/novaspand/alp-ui
│
├── src/
│   ├── input.css               ← Tailwind import + all CSS design tokens (written once)
│   └── themes/
│       ├── rose.css            ← variable overrides only (written once)
│       ├── blue.css
│       ├── green.css
│       └── orange.css
│
├── components/                 ← source component HTML files (Tailwind scans these)
│   ├── button.html
│   ├── badge.html
│   ├── card.html
│   ├── input.html
│   ├── textarea.html
│   ├── label.html
│   ├── separator.html
│   ├── avatar.html
│   ├── skeleton.html
│   ├── alert.html
│   ├── collapsible.html
│   ├── accordion.html
│   ├── tabs.html
│   ├── progress.html
│   ├── switch.html
│   ├── checkbox.html
│   ├── dialog.html
│   ├── dropdown.html
│   ├── tooltip.html
│   ├── popover.html
│   └── select.html
│
├── dist/                       ← GENERATED — committed to repo, served via jsDelivr
│   ├── ui.css                  ← built by Tailwind CLI, contains all used utility classes
│   └── themes/
│       ├── rose.css            ← copied as-is from src/themes/
│       ├── blue.css
│       ├── green.css
│       └── orange.css
│
├── docs/                       ← GitHub Pages docs site (dogfoods alp-ui itself)
│   ├── index.html              ← landing page + install instructions
│   ├── themes.html             ← live theme switcher demo
│   └── components/
│       ├── button.html         ← live preview + copy-paste snippet
│       ├── badge.html
│       ├── card.html
│       └── ...
│
├── package.json                ← devDependency: tailwindcss only
├── tailwind.config.js          ← content: ["./components/**/*.html", "./docs/**/*.html"]
└── README.md
```

---

## The Build Flow

This section explains exactly how everything connects from source to the user's browser.

### Step 1 — You author components in `components/`

Each file in `components/` is a plain HTML file containing one or more variants of a component. These files use Tailwind utility classes freely — `bg-primary`, `rounded-md`, `px-4`, `text-muted-foreground` etc. Alpine directives live here too — `x-data`, `x-show`, `@click`, `x-transition`.

Example `components/button.html`:
```html
<!-- Default variant -->
<button class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
  Button
</button>

<!-- Outline variant -->
<button class="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground">
  Outline
</button>
```

### Step 2 — Tailwind CLI scans and builds `dist/ui.css`

```bash
npx tailwindcss -i ./src/input.css -o ./dist/ui.css --minify
```

Tailwind reads `src/input.css` (which has `@import "tailwindcss"` and all the CSS token variables), scans every file in `components/` and `docs/`, finds every utility class used, and outputs them into `dist/ui.css`. This file also contains the CSS design tokens from `src/input.css`.

The result is a single self-contained CSS file. **Users never run Tailwind themselves.** They just link to this pre-built file.

### Step 3 — `dist/ui.css` is committed to the repo

This is intentional. jsDelivr serves files directly from GitHub. For it to work, the built file must exist in the repo. Do not gitignore `dist/`.

### Step 4 — jsDelivr serves it via CDN

jsDelivr automatically serves any file from a public GitHub repo:
```
https://cdn.jsdelivr.net/gh/novaspand/alp-ui@main/dist/ui.css
```

Users can also pin to a specific release tag:
```
https://cdn.jsdelivr.net/gh/novaspand/alp-ui@v1.0.0/dist/ui.css
```

### Step 5 — Theme files are copied separately

Theme files in `src/themes/` contain only CSS variable overrides. They need no build step — copy them as-is to `dist/themes/` when building. A simple copy command in `package.json` scripts handles this.

### Step 6 — Docs site dogfoods the library

Every page in `docs/` links to `dist/ui.css` and imports Alpine. Component pages show live interactive previews using the actual built components. The docs site is deployed to GitHub Pages automatically.

### Build script summary (`package.json`)

```json
{
  "scripts": {
    "build": "tailwindcss -i ./src/input.css -o ./dist/ui.css --minify && cp -r src/themes dist/themes",
    "dev": "tailwindcss -i ./src/input.css -o ./dist/ui.css --watch"
  },
  "devDependencies": {
    "tailwindcss": "^4.x.x"
  }
}
```

---

## CSS Design Token System

`src/input.css` is written **once** and rarely touched after that. It contains:

1. The Tailwind import
2. The `@theme inline` block that maps Tailwind utility class names to CSS variables
3. The `:root` block with light mode token values (OKLCH color space, mirrors shadcn v4 exactly)
4. The `.dark` block with dark mode token values

```css
@import "tailwindcss";

@theme inline {
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);

  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
}

:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.556 0 0);
}

@layer base {
  * { @apply border-border outline-ring/50; }
  body { @apply bg-background text-foreground; }
}
```

### Why two layers (`@theme inline` + `:root`)

`:root` holds the actual color values as real CSS custom properties — accessible anywhere in CSS or JS.

`@theme inline` maps Tailwind utility class names to those variables — so `bg-primary` in a class attribute resolves to `var(--primary)`.

This gives access to each token three ways:
- In CSS: `color: var(--primary)`
- In Tailwind class: `class="text-primary"`
- In JavaScript: `getComputedStyle(el).getPropertyValue('--primary')`

---

## Theming System

Theme files live in `src/themes/` and `dist/themes/`. They are written **once per theme** and contain only CSS variable overrides for `:root` and `.dark`. Nothing else.

Example `src/themes/rose.css`:
```css
:root {
  --primary: oklch(0.645 0.246 16.439);
  --primary-foreground: oklch(0.985 0 0);
  --ring: oklch(0.645 0.246 16.439);
}

.dark {
  --primary: oklch(0.704 0.191 22.216);
  --primary-foreground: oklch(0.985 0 0);
}
```

### How dark mode works

Dark mode is class-based on the `<html>` element. Add `.dark` to `<html>` to activate dark mode. Toggle with Alpine:

```html
<html x-data>
  ...
  <button @click="$el.closest('html').classList.toggle('dark')">Toggle dark</button>
```

Or manage it at the root:
```html
<html x-data="{ dark: false }" :class="{ dark: dark }">
```

### Planned themes for v1
- Default (neutral, ships inside ui.css)
- Rose
- Blue
- Green
- Orange

---

## Component Architecture

### No headless library needed

shadcn/ui uses Radix UI (or Base UI) as headless primitives because React requires it — managing focus trapping, keyboard navigation, and ARIA in React is complex and needs abstraction.

Alpine.js works directly on the DOM. The browser platform handles much of this natively. Alpine's Focus plugin (`x-trap`) handles focus trapping. `@keydown` handles keyboard navigation. `@click.outside` handles dismissal. No Radix, no Base UI, no extra dependencies.

### Radix → Alpine mapping (for porting shadcn components)

| Radix Primitive    | Alpine Equivalent                                           |
|--------------------|-------------------------------------------------------------|
| Dialog             | `x-data="{open:false}"`, `x-show`, `x-trap` (Focus plugin) |
| DropdownMenu       | `x-data="{open:false}"`, `x-show`, `@click.outside`        |
| Tooltip            | `x-data="{open:false}"`, `@mouseenter`, `@mouseleave`       |
| Collapsible        | `x-data="{open:false}"`, `x-show`, `x-transition`          |
| Accordion          | `x-data` with open state per item                           |
| Tabs               | `x-data="{active:'tab1'}"`, `x-show`                        |
| Select             | `x-data="{open:false}"`, `x-show`, `@click.outside`        |
| Popover            | `x-data="{open:false}"`, `x-show`                          |
| Switch / Checkbox  | `x-data="{checked:false}"`, `@click`, `:class` binding     |

### Variant system

shadcn uses `cva()` (class variance authority) from npm for managing component variants. We have no npm dependency so variants are handled with data attributes and Alpine `:class` bindings or just documented as separate HTML snippets per variant.

Simple approach — document each variant as its own copy-paste block:
```html
<!-- Button: default -->
<button class="...default classes...">Button</button>

<!-- Button: outline -->
<button class="...outline classes...">Button</button>

<!-- Button: destructive -->
<button class="...destructive classes...">Button</button>
```

No runtime variant logic needed. Users copy the variant they want.

---

## Component Build Order

### Phase 1 — Static (no Alpine, ship at launch)
`Button` `Badge` `Card` `Input` `Textarea` `Label` `Separator` `Avatar` `Skeleton`

These have no interactive state. Pure HTML + Tailwind classes. Start here to verify the entire build pipeline and CDN delivery works before touching Alpine.

### Phase 2 — Simple Alpine (ship at launch)
`Alert` `Collapsible` `Accordion` `Tabs` `Progress` `Switch` `Checkbox`

Basic show/hide, open/close state. `x-data`, `x-show`, `x-transition`. No positioning logic needed.

### Phase 3 — Complex Alpine (shortly after launch)
`Dialog/Modal` `Dropdown` `Tooltip` `Popover` `Select`

Requires focus trapping (`x-trap`), keyboard handling, and careful accessibility work.

### Phase 4 — Stretch / v2
`Toast/Notifications` `Command/Combobox` `DataTable`

These are more complex and may require additional Alpine plugins or Floating UI for positioning.

---

## Sourcing Components from shadcn

Component TSX source lives at:
```
github.com/shadcn-ui/ui
└── apps/v4/registry/new-york-v4/ui/
    ├── button.tsx
    ├── dialog.tsx
    ├── card.tsx
    └── ...
```

The globals.css (token reference):
```
apps/v4/app/globals.css
```

### Porting process per component

1. Find the TSX file on shadcn GitHub
2. Copy all Tailwind classes exactly — do not change, rename, or remove any class
3. Identify what Radix primitive is doing and map to Alpine equivalent (see table above)
4. Rebuild as plain HTML with Alpine directives
5. Test light mode, dark mode, keyboard interaction
6. Add to `components/` directory
7. Run build to update `dist/ui.css`
8. Add docs page

---

## Docs Site

The docs site lives in `docs/` and is deployed on GitHub Pages. It is built using alp-ui itself — dogfooding from day one.

### Structure
```
docs/
├── index.html              ← landing, install snippet, quick start
├── themes.html             ← live theme switcher showing all themes
└── components/
    ├── button.html
    ├── card.html
    └── ...
```

### Each component page contains
- Live interactive preview (real Alpine running in the browser)
- Copy-paste HTML snippet per variant
- Props / variants reference table
- Dark mode toggle
- Link to the source in `components/`

### Hosting
GitHub Pages, deployed from the `docs/` folder on the `main` branch. Zero cost. No CI needed initially — push to main, GitHub Pages picks it up.

---

## What Does NOT Belong in alp-ui

- Any PHP, Laravel, Livewire, or Blade syntax — that is tall-shadcn territory
- npm component packages as runtime dependencies
- React, Vue, or any JS framework runtime
- Build step requirements for the end user
- Hardcoded color values — always use CSS variable tokens

---

## Competitors and Positioning

| Library     | Stack              | shadcn design? | No build step? | Open source? |
|-------------|-------------------|----------------|----------------|--------------|
| Preline UI  | Tailwind + Alpine  | No             | Yes            | Freemium     |
| Flowbite    | Tailwind + Alpine  | No             | Yes            | Freemium     |
| daisyUI     | Tailwind only      | No             | Yes            | Yes          |
| shadcn/ui   | React + Radix      | Yes            | No             | Yes          |
| **alp-ui**  | Alpine + Tailwind  | **Yes**        | **Yes**        | **Yes**      |

The gap alp-ui fills: nobody has ported the shadcn design system faithfully to a truly framework-agnostic, no-build-step, fully open source library. Preline and Flowbite are in the neighbourhood but use their own design systems. That distinction matters to a growing crowd of developers who want shadcn aesthetics without React.

---

## Novaspand Brand Context

alp-ui is a Novaspand open source project. The goal is to build Novaspand's reputation as a serious open source contributor in the Alpine/Tailwind/Laravel ecosystem before Novaspand's paid products launch. This mirrors how studios like Spatie built name recognition — open source first, paid products benefit from the trust.

- GitHub: github.com/novaspand/alp-ui
- Docs: deployed to GitHub Pages initially
- CDN: jsDelivr from the GitHub repo

---

## Unresolved / Later Decisions

- npm package eventually (for users who do have a build step and want tree-shaking)
- Floating UI integration for Tooltip and Popover positioning
- tall-shadcn repo setup (after alp-ui Phase 2 is stable)
- Contribution guide and component request process
- Discord or GitHub Discussions for community
