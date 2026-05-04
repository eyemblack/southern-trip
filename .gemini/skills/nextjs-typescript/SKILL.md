---
name: nextjs-typescript
description: Next.js development with TypeScript, including App Router, Server Components, and best practices. Use when building or refactoring Next.js applications, adding new features, or optimizing TypeScript types in a Next.js project.
---

# Next.js (TypeScript) Skill

## Overview

This skill provides expert guidance for building modern, scalable, and type-safe Next.js applications. It covers the App Router architecture, React Server Components (RSC), Client Components, Data Fetching, and advanced TypeScript patterns.

## Core Capabilities

### 1. App Router & Routing
- Guidance on `app/` directory structure.
- Implementation of layouts, templates, and nested routing.
- Using `generateStaticParams` for dynamic routes.
- Handling loading, error, and not-found states.

### 2. React Server Components (RSC)
- Best practices for Server vs. Client Components.
- Strategies for moving state to the client and keeping logic on the server.
- Using `use server` and `use client` directives appropriately.

### 3. Data Fetching & Mutations
- Implementing Server Actions for form submissions and data updates.
- Using `fetch` with cache and revalidation options (`revalidatePath`, `revalidateTag`).
- Handling streaming with Suspense.

### 4. TypeScript Integration
- Defining robust types for props, states, and API responses.
- Using `NextPage`, `Metadata`, and other Next.js-specific types.
- Type-safe routing and search params handling.

### 5. Performance & Optimization
- Image optimization using `next/image`.
- Font optimization with `next/font`.
- Optimizing scripts and third-party libraries.

## Workflow

1. **Research**: Analyze the current project structure and requirements.
2. **Design**: Propose a component architecture and data flow.
3. **Implementation**: Write type-safe code following Next.js best practices.
4. **Validation**: Verify with `next lint` and `tsc`.
