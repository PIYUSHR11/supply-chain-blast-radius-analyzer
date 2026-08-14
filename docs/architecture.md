# System Architecture

## High-Level Architecture

```text
User
 │
 ▼
Next.js Dashboard
 │
 ▼
API Routes
 │
 ▼
Graph Service
 │
 ▼
Graph Repository
 │
 ▼
CognoDB / Neo4j
```

---

## Layer Responsibilities

### Dashboard Layer

Responsible for:

- Visualizations
- User interactions
- Data presentation

Components:

- DashboardHeader
- StatsCards
- SpofPanel
- BlastRadiusPanel
- CountryRiskPanel

---

### API Layer

Provides REST endpoints.

Routes:

- /api/spof
- /api/blast-radius/[supplierId]
- /api/country-risk/[countryCode]
- /api/metadata

---

### Service Layer

Encapsulates graph business logic.

Queries:

- SPOF Detection
- Blast Radius Analysis
- Country Risk Analysis

---

### Repository Layer

Provides database access abstraction.

Responsibilities:

- Cypher execution
- Session management
- Query parameter binding

---

### Graph Database

Stores supply chain entities and relationships.

Benefits:

- Efficient traversal
- Dependency analysis
- Impact propagation
- Relationship-first modeling