---
name: Skills Web Interface Design
description: Design for a Next.js web interface that displays Superpowers skills and their usage flow through an interactive story
type: design
---

# Superpowers Skills Web Interface Design

## Goal

Build a Next.js web interface in the `web/` directory that displays all Superpowers skills and demonstrates their usage flow through an interactive story-driven learning experience.

## Architecture

### Tech Stack
- **Next.js 15** with App Router
- **React Server Components (RSC)** as default
- **Tailwind CSS** for styling
- **Static generation** - all content pre-rendered at build time

### Directory Structure

```
web/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (sidebar + main content)
│   ├── page.tsx                  # Home page: welcome + start story
│   ├── story/
│   │   ├── [step]/
│   │   │   └── page.tsx          # Story step page
│   │   └── layout.tsx            # Story layout (with progress bar)
│   └── skills/
│       ├── [skill]/
│       │   └── page.tsx          # Skill detail page
│       └── page.tsx              # All skills list
├── lib/
│   ├── skills.ts                 # Skill data loading and parsing
│   ├── story.ts                  # Story flow definition
│   └── types.ts                  # TypeScript type definitions
├── components/
│   ├── Sidebar.tsx               # Sidebar navigation (RSC)
│   ├── StoryProgress.tsx         # Story progress indicator (Client)
│   ├── SkillCard.tsx             # Skill card component (RSC)
│   ├── StoryStep.tsx             # Story step content (RSC)
│   └── MarkdownRenderer.tsx      # Markdown renderer (RSC)
├── scripts/
│   └── load-skills.mjs           # Build script: load ../skills/ content
├── public/
│   └── skills-data.json          # Static skill data (generated at build)
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Data Flow

### Build Time
1. `scripts/load-skills.mjs` runs before `next build`
2. Reads all `../skills/*/SKILL.md` files
3. Parses YAML frontmatter and Markdown content
4. Writes `public/skills-data.json` with all skill data

### Runtime
1. Pages load static data from `skills-data.json`
2. Story flow defined in `lib/story.ts`
3. All rendering happens server-side (RSC)

## Data Types

```typescript
// lib/types.ts
interface SkillFrontmatter {
  name: string;
  description: string;
}

interface Skill {
  id: string;           // Directory name, e.g., "brainstorming"
  name: string;         // From frontmatter
  description: string;  // From frontmatter
  content: string;      // Markdown content (without frontmatter)
}

interface StoryStep {
  id: string;           // e.g., "intro", "brainstorming"
  title: string;
  skillId?: string;     // Associated skill (optional)
  storyContent: string; // Story description (Markdown)
  whatHappened: string[]; // Bullet points of what occurs
}
```

## Story Flow

**Story Title**: "Adding a New Skill to Superpowers"

7 story steps:

| Step | ID | Title | Skill |
|------|----|-------|-------|
| 1 | intro | The Idea | - |
| 2 | brainstorming | Brainstorming | brainstorming |
| 3 | worktree | Git Worktree | using-git-worktrees |
| 4 | planning | Writing Plans | writing-plans |
| 5 | implementation | Subagent Development | subagent-driven-development + test-driven-development |
| 6 | review | Code Review | requesting-code-review |
| 7 | finish | Finishing Up | finishing-a-development-branch |

## Page Designs

### Home Page (`app/page.tsx`)
- Welcome message explaining what this site is
- "Start the Story" button leading to `/story/intro`
- "Browse All Skills" link leading to `/skills`
- Brief description of Superpowers

### Story Layout (`app/story/layout.tsx`)
- Wraps all story pages
- Shows progress bar at top: "Step X/7" + visual progress indicator
- Previous/Next navigation buttons at bottom

### Story Step Page (`app/story/[step]/page.tsx`)
- Story title and progress
- Story content in a "storybook" style
- Skill card (if this step has an associated skill)
  - Skill name and description
  - Expandable section showing full skill content
- "What happened in this step?" bullet points
- Navigation buttons

### Skills List Page (`app/skills/page.tsx`)
- Grid of skill cards
- Each card shows skill name + description
- Click to go to skill detail page

### Skill Detail Page (`app/skills/[skill]/page.tsx`)
- Full skill content rendered as Markdown
- Link back to skills list
- If skill appears in story, link to relevant story step

### Root Layout (`app/layout.tsx`)
- Two-column layout:
  - Left: Sidebar (fixed width, scrollable)
  - Right: Main content (flexible)
- Sidebar sections:
  - Story navigation (collapsible, shows current step)
  - Skills list (collapsible, all skills)
- Top nav bar with logo and GitHub link

## Components

### Sidebar (RSC)
- Props: currentPath
- Renders story steps with indicators
- Renders skill list
- Highlights current story step or skill

### StoryProgress (Client Component)
- Shows animated progress bar
- Displays "Step X/7"
- Props: currentStep, totalSteps

### SkillCard (RSC)
- Displays skill name and description
- Optional "Show Details" button to expand full content
- Props: skill, showDetails?: boolean

### StoryStep (RSC)
- Renders story content
- Renders skill card (if applicable)
- Renders "what happened" section
- Props: step

### MarkdownRenderer (RSC)
- Renders Markdown to HTML with Tailwind styling
- Handles code blocks, lists, links, etc.
- Props: content

## Build Script (`scripts/load-skills.mjs`)

- Reads `../skills/` directory
- For each skill directory:
  - Reads `SKILL.md`
  - Parses YAML frontmatter
  - Extracts Markdown content
- Writes `public/skills-data.json` with array of Skill objects
- Runs as `prebuild` script in package.json

## Styling Approach

- **Tailwind CSS** utility-first
- Clean, readable typography
- Professional color scheme (no bright/harsh colors)
- Consistent spacing and sizing
- Responsive design (mobile-friendly collapse sidebar)

## Success Criteria

1. All skills are loaded and displayed correctly
2. Story flows smoothly from step to step
3. Navigation works correctly (sidebar, previous/next)
4. Markdown renders properly (code blocks, lists, headings)
5. Build completes without errors
6. No runtime JavaScript required for core functionality (progress bar can be client-side enhancement)
