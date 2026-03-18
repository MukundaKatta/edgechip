# EdgeChip

> Edge AI Hardware Comparison and Selection Platform

EdgeChip is a comprehensive dashboard for comparing edge AI accelerators, NPUs, and SoCs. Evaluate chips by TOPS, power efficiency, price, and process node to make optimal hardware deployment decisions.

## Features

- **Hardware Dashboard** -- Overview of tracked chips, best efficiency, and max performance
- **Efficiency Ranking** -- TOPS/Watt leaderboard across all tracked accelerators
- **Performance Ranking** -- Raw TOPS comparison with visual bar charts
- **Detailed Specifications** -- Full table with TOPS, TDP, price, process node, and form factor
- **Chip Catalog** -- Browse all available edge AI chips with filtering
- **Side-by-Side Comparison** -- Compare two or more chips across all dimensions
- **Compatibility Checker** -- Verify chip compatibility with your target platform
- **Chip Matcher** -- Get recommendations based on workload requirements
- **Design Wizard** -- Step-by-step guide for selecting the right accelerator
- **Thermal Analysis** -- Power and thermal envelope estimation

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Charts:** Recharts
- **Icons:** Lucide React

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your SUPABASE_URL and SUPABASE_ANON_KEY

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
  app/
    page.tsx          # Main dashboard with rankings and specs table
    catalog/          # Full chip catalog browser
    comparison/       # Side-by-side comparison tool
    compatibility/    # Platform compatibility checker
    matcher/          # Workload-based chip recommender
    wizard/           # Step-by-step selection wizard
    thermal/          # Thermal and power analysis
  components/
    Sidebar.tsx       # Navigation sidebar
  lib/                # Supabase client, utilities
```

## License

MIT
