# Core Ledger

A backend‑first, multi‑tenant financial ledger designed to demonstrate production‑grade backend engineering practices rather than rapid feature prototyping.

The project intentionally prioritizes correctness, data integrity, and architecture discipline over speed of UI development.

---

## Project Goals

Core Ledger exists to model **how a real financial system should be built**, not just what it should do.

Key objectives:

- Enforce data correctness at the database level
- Prevent cross‑tenant data leaks by design
- Model financial events instead of mutable balances
- Ensure reproducible environments via migrations and CI
- Demonstrate backend architectural maturity

---

## Non‑Goals (For Now)

To keep architectural clarity, the following are intentionally deferred:

- Fancy UI / dashboards
- Real‑time sync
- Bank integrations
- Budget forecasting
- Mobile‑first design
- Complex auth providers

The backend must be correct before the system becomes convenient.

---

## Architectural Principles

### 1. Ledger‑First Design
Money is never stored as a balance.

Balances are derived from immutable transactions.

This guarantees:
- auditability
- correction capability
- historical accuracy

### 2. Multi‑Tenant by Construction
Every domain entity belongs to a tenant.

Isolation is enforced in the schema — not only in application logic.

### 3. Invariants Over Validation
The database prevents invalid states instead of relying on runtime checks.

### 4. Deterministic Builds
A clean clone + install + migrate must produce a working system.

---

## Core Domain Concepts

| Concept | Meaning |
|------|------|
Tenant | Legal owner of financial records |
User | Actor inside a tenant |
Account | Where money lives |
Category | Why money moved |
Transaction | Financial event |

---

## Current Features (Session 1)

### Data Model
- Multi‑tenant schema
- Immutable transaction model
- Enum‑driven financial classification
- No stored balances

### Infrastructure
- Prisma migrations
- Adapter‑based runtime database connection
- CI schema validation
- Seeded system records

### System Guarantees
- Transactions cannot exist without tenant
- Accounts cannot cross tenants
- Categories define financial meaning
- Database rejects invalid data

---

## Planned Features

### Session 2 — Safe Data Access Layer
- Tenant context propagation
- Scoped query enforcement
- Repository pattern

### Session 3 — Transaction Engine
- Create transaction
- Transfer between accounts
- Derived balance queries

### Session 4 — API Layer
- Controllers
- Validation
- Error mapping

### Session 5 — Frontend Integration
- Angular client
- Account views
- Transaction timeline

### Session 6 — Extended Capabilities
- Imports
- Reconciliation
- Snapshots

---

## Development Setup

### Install

```bash
npm install
```

### Generate Prisma Client

```bash
npx prisma generate
```

### Run Migrations

```bash
npx prisma migrate dev
```

### Seed Database

```bash
npx prisma db seed
```

### Start Backend

```bash
npm run start:dev
```

---

## Project Structure

```
backend/core-ledger-api
  prisma/        Database schema and migrations
  src/           NestJS application
  prisma.config.ts
frontend/core-ledger-web
```

---

## Continuous Integration Guarantees

Every pull request must:

- Build successfully
- Pass lint rules
- Validate schema
- Compile migrations

This prevents schema drift and runtime failures.

---

## Contributing Philosophy

This project prefers:

- Small intentional commits
- Architecture discussion before implementation
- Explicit tradeoff documentation

Correctness > cleverness

---

## Why This Project Exists

Many portfolio projects demonstrate feature development.

Core Ledger demonstrates **system design discipline**:

Designing software so that incorrect behavior becomes impossible instead of merely unlikely.
