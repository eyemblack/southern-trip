# Markdown Viewer WebApp Design Document

A Next.js application designed to provide a visually rich, interactive online viewer for travel planning markdown files.

## Project Overview

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Package Manager**: `pnpm`
- **Styling**: Tailwind CSS
- **Markdown Processing**: `gray-matter` (frontmatter), `react-markdown` + `remark-gfm` (rich rendering)
- **Architecture**: Static Site Generation (SSG). Markdown files will be "synced" into the project structure to enable static building.

## Visual Design & Aesthetics

- **Aesthetics**: Clean, modern, and "Travel Journal" inspired.
- **Color Palette**:
  - **Primary**: Deep Blue/Teal (trust and travel vibes).
  - **Background**: Soft off-white (#F8FAFC) for readability.
  - **Typography**: Sans-serif for navigation, Serif (e.g., Lora or Playfair Display) for the markdown content to give it a "journal" feel.
- **Interactive Feedback**: Hover states on navigation links, smooth transitions between pages, and responsive design for mobile viewing.
- **Components**:
  - **Sidebar Navigation**: A tree-like structure to navigate the nested folders in `~/Desktop/PA/Travel-Planner`.
  - **Breadcrumbs**: Clear path indication.
  - **Content Area**: Centered, readable width (max-w-4xl) with rich typography for headers, lists, and tables.

## Technical Strategy

### 1. Data Sourcing
- A pre-build script (`scripts/sync-content.ts`) will copy files from `~/Desktop/PA/Travel-Planner` into a `content/` directory within the Next.js project.
- The build process will iterate through this `content/` directory to generate static routes.

### 2. File System Integration
- Use Node.js `fs` and `path` modules within server components to read file metadata and content.
- Support for nested directories: `/southern-thailand-trip-2026/itinerary/plan-overview` -> `content/southern-thailand-trip-2026/itinerary/plan-overview.md`.

### 3. Routing
- `app/[[...slug]]/page.tsx`: A catch-all route that handles both the directory listing (if slug is a folder) and the markdown rendering (if slug is a file).

## Development Roadmap

1. **Step 1**: Initialize Next.js project with `pnpm` and Tailwind CSS.
2. **Step 2**: Create the directory syncing script.
3. **Step 3**: Implement the File System utility to read markdown tree and content.
4. **Step 4**: Design and build the Layout (Sidebar + Main Content).
5. **Step 5**: Implement the Markdown rendering component with Tailwind Typography.
6. **Step 6**: Final polish (Animations, Responsive design).

## Success Criteria
- [ ] Users can navigate the full directory structure of the Travel-Planner.
- [ ] Markdown files are rendered beautifully with full GFM support (tables, checkboxes).
- [ ] The app is fully static and ready for deployment.
