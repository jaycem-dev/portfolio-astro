# AGENTS.md

Guidelines for AI coding agents working on this Astro portfolio website.

## Build/Lint/Test Commands

```bash
# Development
bun run dev          # Start dev server
bun run build        # Type check + build for production
bun run preview      # Preview production build

# Code formatting
bunx prettier --write .   # Format all files
bunx prettier --write <file>  # Format single file

# Type checking
bunx astro check      # Run TypeScript checks
```

**Note:** No test framework is configured. No ESLint is configured.

## Project Structure

```
src/
  pages/           # File-based routing (Astro)
    index.astro    # Home page (default: en)
    es/            # Spanish locale pages
    projects/      # Project pages
    blog/          # Blog pages
  components/      # Reusable Astro components
    ui/            # UI primitives (Link, Button)
  layouts/         # Page layouts
  lib/             # Utilities, types, translations
    utils.ts       # cn() for class merging
    types.ts       # Shared TypeScript types
    translations.ts # i18n translations (en/es)
  data/            # Content collections
    projects/      # Project markdown files
    blog/          # Blog markdown files
  styles/          # Global CSS
  assets/          # Static assets (images, icons)
content.config.ts  # Content collection schemas
astro.config.mjs   # Astro configuration
```

## Import Conventions

Use path aliases (configured in tsconfig.json):

```typescript
// Components
import Navbar from "@components/Navbar.astro";
import Link from "@ui/Link.astro";

// Utilities
import { cn } from "@lib/utils";
import type { Locale } from "@lib/translations";

// Assets
import Logo from "@assets/icons/logo.svg";

// Astro built-ins
import { getCollection } from "astro:content";
import { getRelativeLocaleUrl } from "astro:i18n";
import type { CollectionEntry } from "astro:content";
```

## Code Style

### Formatting

- **Tab width:** 4 spaces (Prettier config)
- **Formatter:** Prettier with astro and tailwind plugins
- **Trailing commas:** Default (Prettier default)
- **Semicolons:** Default (Prettier default)

### TypeScript

- Strict mode enabled (`astro/tsconfigs/strict`)
- Always define component props with interfaces
- Use type imports: `import type { Foo } from "bar"`
- Export shared types from `@lib/types.ts`

### Astro Components

```astro
---
// 1. Imports first
import Link from "@ui/Link.astro";
import type { Locale } from "@lib/translations";

// 2. Props interface
export interface Props {
    title: string;
    lang: Locale;
}

// 3. Destructure props
const { title, lang } = Astro.props;
---

<!-- 4. Template -->
<div class="container">
    <slot />
</div>
```

### Naming Conventions

- **Components:** PascalCase (`Hero.astro`, `Link.astro`)
- **Files:** kebab-case for non-component files (`blog-collection.ts`)
- **Types:** PascalCase with descriptive names
- **Variables:** camelCase
- **Constants:** SCREAMING_SNAKE_CASE or camelCase

### Tailwind CSS

- Use utility classes exclusively (no custom CSS in components)
- Custom styles go in `src/styles/globals.css`
- Use `cn()` utility for conditional classes
- Theme tokens via CSS variables (see globals.css)
- Dark mode: use `dark:` prefix

```astro
<!-- Good -->
<div class="bg-background text-foreground dark:bg-card">
    <h1 class="text-4xl font-bold">Title</h1>
</div>

<!-- With cn() utility -->
<Link class={cn("base-classes", condition && "conditional-classes")} />
```

### Error Handling

- No specific error boundary pattern
- Use TypeScript strict mode to catch errors early
- Handle optional values with proper type guards

## Internationalization (i18n)

- **Locales:** English (default) and Spanish
- **Config:** In `astro.config.mjs`
- **Translations:** `src/lib/translations.ts`
- **Routing:** `src/pages/` (en) and `src/pages/es/` (es)
- **URL helper:** `getRelativeLocaleUrl(lang, path)`

```typescript
import { getTranslations, type Locale } from "@lib/translations";

const t = getTranslations(lang); // Access translations
t.nav.home; // "Home" or "Inicio"
```

## Content Collections

- **Projects:** `src/data/projects/*.md` with schema in `content.config.ts`
- **Blog:** `src/data/blog/*.md` with schema in `content.config.ts`
- Use `getCollection()` to fetch content
- Images referenced in frontmatter use `image()` schema helper

## Environment Variables

- Use `import.meta.env.VAR_NAME`
- Reference `.env.example` for required variables
- Common: `EMAIL` for contact links

## Key Dependencies

- **Framework:** Astro 5.x
- **Styling:** Tailwind CSS 4.x with Vite plugin
- **UI:** Custom components with Tailwind CSS
- **Icons:** SVG files in `src/assets/icons/`
- **Fonts:** Fontsource (Inter, JetBrains Mono)
- **Deployment:** Vercel adapter

## Common Patterns

### Page Component

```astro
---
import Layout from "@layouts/Layout.astro";
import type { Locale } from "@lib/translations";

const lang: Locale = "en"; // or from Astro.params
---

<Layout title="Page Title" lang={lang}>
    <!-- Content -->
</Layout>
```

### Content Collection Query

```typescript
import { getCollection } from "astro:content";

const projects = await getCollection("projects");
const sorted = projects.sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
);
```

## Notes

- This is a static site deployed to Vercel
- No database or API routes
- Content managed via Markdown files
- Dark mode implemented with CSS variables and localStorage
- Uses View Transitions for page navigation
