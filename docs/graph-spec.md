# Supply Chain Blast Radius & SPOF Analyzer

## Purpose

This application models a manufacturing supply chain as a graph to analyze:

- Supplier failure impact (Blast Radius)
- Single Points of Failure (SPOF)
- Product dependency chains
- Alternative sourcing options
- Critical component risks

The graph database is the primary source of truth.

---

# Node Types

## Supplier

Represents a company that supplies components.

### Label

```cypher
:Supplier
```

### Properties

| Property | Type | Required | Example |
|----------|------|----------|----------|
| id | string | Yes | SUP001 |
| name | string | Yes | Samsung SDI |
| tier | integer | Yes | 1 |
| riskLevel | string | No | High |

### Constraints

- id must be unique
- riskLevel values: Low, Medium, High

---

## Component

Represents a physical component used in manufacturing.

### Label

```cypher
:Component
```

### Properties

| Property | Type | Required | Example |
|----------|------|----------|----------|
| id | string | Yes | CMP001 |
| name | string | Yes | Battery Cell |
| category | string | Yes | Battery |
| criticality | integer | Yes | 9 |

### Constraints

- id must be unique
- criticality range 1-10

---

## Factory

Represents a manufacturing or assembly facility.

### Label

```cypher
:Factory
```

### Properties

| Property | Type | Required | Example |
|----------|------|----------|----------|
| id | string | Yes | FAC001 |
| name | string | Yes | Pune Assembly Plant |
| city | string | Yes | Pune |

### Constraints

- id must be unique

---

## Product

Represents a finished product sold to customers.

### Label

```cypher
:Product
```

### Properties

| Property | Type | Required | Example |
|----------|------|----------|----------|
| id | string | Yes | PROD001 |
| name | string | Yes | Electric Scooter X1 |
| category | string | Yes | Vehicle |

### Constraints

- id must be unique

---

## Country

Represents a country where suppliers or factories operate.

### Label

```cypher
:Country
```

### Properties

| Property | Type | Required | Example |
|----------|------|----------|----------|
| code | string | Yes | IN |
| name | string | Yes | India |

### Constraints

- code must be unique

---

# Relationships

## SUPPLIES

Supplier provides a component.

### Direction

```text
(Supplier)-[:SUPPLIES]->(Component)
```

### Example

```text
Samsung SDI
      |
      | SUPPLIES
      v
Battery Cell
```

---

## DEPENDS_ON

Component depends on another component.

Used to model multi-level supply chains.

### Direction

```text
(Component)-[:DEPENDS_ON]->(Component)
```

### Example

```text
Battery Pack
      |
      | DEPENDS_ON
      v
Battery Cell
```

---

## ASSEMBLES

Factory assembles products.

### Direction

```text
(Factory)-[:ASSEMBLES]->(Product)
```

---

## USED_IN

Component is used in a product.

### Direction

```text
(Component)-[:USED_IN]->(Product)
```

### Example

```text
Battery Pack
      |
      | USED_IN
      v
Electric Scooter X1
```

---

## LOCATED_IN

Supplier or Factory operates in a country.

### Direction

```text
(Supplier)-[:LOCATED_IN]->(Country)

(Factory)-[:LOCATED_IN]->(Country)
```

---

## ALTERNATIVE_SUPPLIER

Supplier can replace another supplier.

### Direction

```text
(Supplier)-[:ALTERNATIVE_SUPPLIER]->(Supplier)
```

### Example

```text
Samsung SDI
      |
      | ALTERNATIVE_SUPPLIER
      v
LG Energy
```

---

# Graph Traversal Use Cases

## Blast Radius

Question:

What products are affected if Supplier X fails?

Traversal:

```text
Supplier
  ↓
Component
  ↓
Product
```

---

## SPOF Detection

Question:

Which suppliers have no alternatives?

Traversal:

```text
Supplier
  ↓
Alternative Supplier
```

---

## Dependency Chain

Question:

What components are required to build Product X?

Traversal:

```text
Product
  ↑
Component
  ↑
Component
```

---

## Alternative Supplier Discovery

Question:

What alternative suppliers exist for a component?

Traversal:

```text
Component
  ↑
Supplier
  ↓
Alternative Supplier
```

---

# Dataset Targets

## Nodes

| Type | Count |
|--------|--------:|
| Supplier | 20 |
| Component | 30 |
| Factory | 8 |
| Product | 15 |
| Country | 10 |

Expected Total:

```text
~83 Nodes
```

---

## Relationships

Target:

```text
150 - 250 relationships
```

This provides sufficient graph complexity for traversal demonstrations.

---

# Naming Conventions

## Supplier IDs

```text
SUP001
SUP002
SUP003
```

## Component IDs

```text
CMP001
CMP002
CMP003
```

## Factory IDs

```text
FAC001
FAC002
```

## Product IDs

```text
PROD001
PROD002
```

---

# Query Performance Assumptions

The graph size is intentionally small.

Target:

- Under 100 nodes
- Under 300 relationships

This is sufficient for demonstrating graph database capabilities while remaining easy to understand and maintain.

---

# Future Enhancements

Not part of MVP.

Potential future additions:

- Shipment nodes
- Warehouse nodes
- Risk events
- Geographic disruption analysis
- Cost optimization analysis
- Interactive graph visualization