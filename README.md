# Clinical Trials Search Application

A sophisticated web application for searching and exploring clinical trials data, built specifically for pharmaceutical executives like Sarah to research competitive landscapes in the NSCLC (Non Small Cell Lung Cancer) space.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd pre-argon-ai

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

- **Advanced Search**: Fuzzy matching with disease variations (NSCLC, Non Small Cell Lung Cancer, etc.)
- **Real-time Results**: Debounced search with 300ms delay for optimal performance
- **Comprehensive Filtering**: Phase, Status, Study Type, Sponsor, Condition, Intervention
- **Data Table**: Professional table with pagination, sorting, and expandable trial details
- **Responsive Design**: Works seamlessly on desktop and mobile devices

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

### Disease Variations Handling

The application intelligently handles multiple representations of diseases:

- **NSCLC** variants: "non small cell lung cancer", "non small cell lung carcinoma", "NSCLC", "carcinoma of the lungs, non small cell"
- **Fuzzy matching**: Partial matches with 80% threshold
- **Text normalization**: Handles punctuation, case variations, and abbreviations

### Multi-field Search

Searches across all relevant fields:

- Trial titles (brief and official)
- Descriptions and summaries
- Conditions and keywords
- Sponsor names
- Intervention names and descriptions

## 📋 Required Questions Answered

### 1. How would you extend filtering by additional criteria?

**Implementation Strategy:**

1. **Add new filter types to types**: Update `SearchFilters` interface in `src/types/clinical-trials.ts`
2. **Extend filter options**: Add new filter extraction in `src/lib/data-loader.ts` `getFilterOptions()`
3. **Update filtering logic**: Extend `applyFilters()` function with new filter conditions
4. **Add UI components**: Create new filter sections in `src/components/filter-panel.tsx`
5. **Update API schema**: Add new parameters to tRPC input validation

**Example for Trial Phase sub-categories:**

```typescript
// Add to SearchFilters interface
interface SearchFilters {
  phase?: string[];
  phaseSubCategory?: string[]; // Early Phase 1, Phase 1/2, etc.
  // ... existing filters
}

// Extend filtering logic
if (filters.phaseSubCategory) {
  const hasMatchingSubPhase = trial.protocolSection.designModule?.phases?.some(
    (phase) => filters.phaseSubCategory!.includes(phase)
  );
  if (!hasMatchingSubPhase) return false;
}
```

### 2. What compromises were made and why?

**Key Compromises:**

1. **In-Memory Data Storage**

   - _Compromise_: Loading entire dataset into memory vs. database
   - _Why_: Rapid development, no database setup required, sufficient for 1,000 trials
   - _Trade-off_: Limited scalability but faster development and deployment

2. **Fuzzy Matching Algorithm**

   - _Compromise_: Simple text-based matching vs. advanced NLP/ML
   - _Why_: Time constraints, good enough for common disease variations
   - _Trade-off_: May miss complex medical terminology relationships

3. **Client-Side Filtering**

   - _Compromise_: Re-fetching data vs. client-side filtering after initial load
   - _Why_: Simpler implementation, better user experience for small dataset
   - _Trade-off_: Network overhead but more responsive filtering

4. **Single-File Component Architecture**
   - _Compromise_: Some larger components vs. extreme micro-components
   - _Why_: Balance between maintainability and over-engineering
   - _Trade-off_: Slightly larger files but easier to understand

### 3. User experience improvements and priorities

**Priority 1: Advanced Search Intelligence**

- Implement medical terminology synonyms (e.g., "cancer" ↔ "carcinoma")
- Add search suggestions and autocomplete
- Create saved searches and search history

**Priority 2: Enhanced Data Visualization**

- Add charts for trial distribution by phase, status, sponsor
- Geographic visualization of trial locations
- Timeline view of trial progression

**Priority 3: Comparative Analysis Tools**

- Side-by-side trial comparison
- Export functionality for competitive analysis
- Bookmark and note-taking features

**Priority 4: Performance Optimization**

- Implement virtual scrolling for large result sets
- Add progressive loading for trial details
- Optimize bundle size and loading times

**Priority 5: Mobile Experience**

- Improve mobile filtering experience
- Add swipe gestures for trial navigation
- Optimize table layout for small screens

## 🌟 Bonus Features Implemented

### 1. NSCLC Variations Handling ✅

- Comprehensive text normalization and fuzzy matching
- Handles common abbreviations and medical terminology
- Generates search variations automatically

### 2. Multi-condition Search ✅

- Search for "NSCLC" AND "immunotherapy" simultaneously
- Filters work in combination with search queries
- Advanced boolean logic support

### 3. Deployment Ready ✅

- Production build optimized and tested
- Environment-agnostic configuration
- Ready for deployment to Vercel, AWS, or similar platforms

### 4. Alternative Data Storage

**Current**: In-memory JSON file
**Alternatives**:

- **PostgreSQL**: Better for complex queries, ACID compliance
- **Elasticsearch**: Superior search capabilities, full-text search
- **MongoDB**: Flexible schema, good for nested clinical trial data
- **Redis**: Ultra-fast caching layer for frequently accessed data

**Why alternatives might be preferred**:

- **Scalability**: Handle millions of trials
- **Concurrent access**: Multiple users without memory duplication
- **Advanced querying**: Complex filters and analytics
- **Data persistence**: Survive server restarts

### 5. Completeness Evaluation

- **Search coverage**: Verify all relevant trials appear for key terms
- **Filter accuracy**: Ensure filter combinations work correctly
- **Performance monitoring**: Track search response times
- **User feedback**: Monitor search success rates and user satisfaction

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
