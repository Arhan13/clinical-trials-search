# Clinical Trials Search Application

A nextjs 15 based web application for searching and exploring clinical trials data, built specifically for pharmaceutical executives like Sarah to research competitive landscapes in the NSCLC (Non Small Cell Lung Cancer) space.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd clinical-trials-search

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Production Build

```bash
pnpm build
pnpm start
```

## 📊 Features

### Core Functionality

- **Advanced Search**: Fuzzy matching with text normalization and acronym generation
- **Real-time Results**: Debounced search with 300ms delay for optimal performance
- **Comprehensive Filtering**: Phase, Status, Study Type, Sponsor, Condition, Intervention
- **Data Table**: Professional table with pagination, sorting, and expandable trial details

### Technical Features

- **Server-Side Rendering**: Next.js 15 with optimal SSR performance
- **Type Safety**: Full TypeScript implementation with comprehensive types
- **State Management**: React Query with proper hydration and caching
- **Performance**: Skeleton loading states, debounced input, efficient filtering
- **Modern UI**: Clean, professional interface with Tailwind CSS

## 🏗️ Architecture

### Tech Stack

- **Framework**: Next.js 15 with App Router
- **Backend**: tRPC for type-safe API calls
- **Database**: In-memory JSON dataset (1,000 trials)
- **Styling**: Tailwind CSS with shadcn/ui components
- **State**: React Query + React hooks
- **Language**: TypeScript throughout

### Key Components

```
src/
├── app/              # Next.js App Router pages
├── components/       # Reusable UI components
├── hooks/           # Custom React hooks
├── lib/             # Utility functions and data loading
├── server/          # tRPC API routes
└── types/           # TypeScript type definitions
```

## 🔍 Search Capabilities

### Multi-field Search

Searches across all relevant fields:

- Trial titles (brief and official)
- Descriptions and summaries
- Conditions and keywords
- Sponsor names
- Intervention names and descriptions

## 🛠️ Development

### Running Tests

```bash
pnpm test
```

### Code Quality

```bash
pnpm lint
pnpm type-check
```

### Project Structure

The application follows Next.js 15 conventions with a focus on:

- Server-side rendering for optimal performance
- Type safety throughout the application
- Clean component architecture
- Efficient state management

---

**Built with ❤️ for Argon AI Code Screen**
