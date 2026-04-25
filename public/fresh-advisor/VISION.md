# Fresh Advisor — Product Vision

## The Problem

A produce buyer at a grocery retailer makes dozens of ordering decisions every day — days in advance, on product that has a 3–7 day shelf life. They're betting on what customers will want, how product will arrive, and what the market will do. When they're wrong, crates of strawberries get thrown out. When they're really wrong, the banana rack is empty on Sunday afternoon.

Waste is the enemy. It's also a company-wide metric with a target — and right now, the buyer is flying mostly blind. They toggle between a vendor portal, a spreadsheet, maybe a legacy inventory system, and their own gut. No single tool shows them the full picture, and nothing tells them what to *do* about it.

## The Vision

**Fresh Advisor is the first thing a produce buyer opens every morning.**

It's a single dashboard that puts internal reality (their stores' inventory, sales velocity, incoming shipments, supplier quality scores) next to the external landscape (weather events, USDA crop reports, commodity price shifts, seasonal demand patterns) — and then tells them, in plain language, what actions to take today.

The core loop:

1. **See** — what's happening across all my stores right now
2. **Understand** — why it's happening and what's coming
3. **Act** — AI-generated recommendations with one-click execution or approval

The north star metric, always visible: **waste % vs. target.** Every recommendation traces back to it.

## Who It's For

**Primary user: the produce buyer at a grocery retailer.**

They manage relationships with suppliers, set order quantities, respond to quality issues, and are held accountable for both availability (no stockouts) and waste (no spoilage). They know their categories deeply but don't have time to synthesize signals from a dozen sources. Fresh Advisor does the synthesis for them.

> The demo focuses on produce. The architecture is designed to extend to other fresh departments: meat, seafood, deli, dairy, bakery. Each department gets its own category context, supplier relationships, and spoilage curves — same dashboard, different lens.

## What It Shows

### Today's Snapshot
- Waste % across all stores vs. target — the headline number
- Active alerts: shipments at risk, quality flags, overstock situations, stockout warnings
- Weather or market events affecting supply in the next 7 days

### Supply Chain Status
- Incoming shipments by supplier: quantity, expected arrival, quality history
- Supplier scorecards: on-time %, quality %, relationship health
- Any open issues (late delivery, rejected lot, price dispute)

### Inventory & Sales
- Current inventory by store and SKU
- Sales velocity vs. forecast — where are we trending toward waste? toward a stockout?
- Days-of-supply by item: simple visual showing how many days before you run out or before it spoils

### Market Landscape
- USDA crop reports and forecast data for key commodities
- Weather events affecting growing regions
- Commodity spot prices vs. what you're paying
- Seasonal demand patterns: what's about to spike or cool off

### AI Recommendations
Plain-language, prioritized action cards. Examples:
- *"Reduce strawberry order from Supplier A by 20% this week — current velocity is tracking 3 days short of shelf life and a heat event is forecast for the growing region."*
- *"Renegotiate blueberry price with Supplier B — USDA forecast shows 15% oversupply this quarter; spot price has dropped 12%."*
- *"Flag Store #7 for attention — waste % is 2.3x target this week, driven by bagged salads. Consider a markdown promotion before Thursday."*

Each recommendation shows the reasoning, the expected impact on waste %, and an action button.

## The Business Case

Fresh produces among the highest margins in grocery — and the highest waste. Industry average shrink (waste/theft/damage) in produce runs 8–12% of sales. For a mid-size regional chain doing $500M in produce annually, dropping shrink by 2 points is $10M recovered. That's before accounting for better availability driving incremental sales.

No tool today does this holistically. Buyers use legacy systems for ordering, separate portals for supplier data, and their own judgment for market signals. Fresh Advisor unifies the signal and adds the AI layer.

## Phase Approach

**Phase 1 — Vaporware demo (now)**
Hard-coded mock data for a fictional regional chain. Shows the full dashboard, all feature areas, realistic-looking numbers. Goal: attract domain collaborators who can validate and sharpen the feature set.

**Phase 2 — Investor demo**
Refined based on collaborator feedback. Tighter narrative, sharper recommendations, more realistic mock data. Goal: seed funding.

**Phase 3 — Real product**
Each feature area in the demo becomes a roadmap item. The advantage of this path: 100% alignment between investors, collaborators, and developers. The demo *is* the spec — we just have to deliver the quality.

## Design Principles

- **Waste % is always visible.** It's in the header. Every recommendation references it. The buyer never loses sight of the number they're accountable for.
- **External signals, not just internal data.** A tool that only shows you your own inventory is a report. Fresh Advisor adds the "why" and the "what's coming."
- **Recommendations, not alerts.** Alerts tell you something happened. Recommendations tell you what to do. Fresh Advisor biases toward action.
- **Produce first, fresh always.** The UI is built around produce today. Department switching is a first-class concept in the architecture — the data model and UI patterns generalize across fresh categories.
- **Plain language.** The AI output is readable by a buyer, not a data scientist. No jargon, no probability distributions — just: here's the situation, here's what I'd do.
