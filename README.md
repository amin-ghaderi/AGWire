# AGWire

AGWire is a modern full-stack news aggregation platform built with React and ASP.NET Core Minimal API.

## Overview

AGWire aggregates articles from external news providers and presents them through a responsive public website and an admin console. Articles are fetched live from provider APIs — they are not stored in a local database. Provider configuration and admin settings are persisted as JSON in Phase 1.

The project is designed as a portfolio-grade application: clean architecture, maintainable structure, and room to grow without unnecessary enterprise complexity.

## Architecture

AGWire follows a **Clean Architecture Lite** approach with a **DDD-inspired modular design**:

- **Presentation** — React frontend and ASP.NET Core Minimal API endpoints
- **Application** — use-case services that orchestrate domain operations
- **Domain** — core entities (`Article`, `Provider`) and abstractions
- **Infrastructure** — external news providers and JSON persistence

A **provider-based architecture** sits at the center of the backend. All news sources implement a common `INewsProvider` abstraction. The application depends only on interfaces, never on concrete provider implementations. Adding a new provider (e.g. Guardian, BBC) requires minimal changes.

## Tech Stack

### Frontend

- React
- Vite
- TypeScript
- Tailwind CSS
- shadcn/ui
- TanStack Query
- React Router
- Lucide Icons

### Backend

- C#
- ASP.NET Core Minimal API
- JSON persistence (Phase 1)

## Features

### Public

- Browse top headlines
- Search news
- Filter by category
- View article details

### Admin

- Manage news providers
- Enable / disable providers
- Configure provider priorities
- Add and update provider API keys

## Project Structure

```
AGWire/
├── frontend/          # React + Vite client
│   └── src/
│       ├── app/       # Router, providers, app shell
│       ├── pages/     # Route-level pages
│       ├── features/  # Feature modules (news, search, admin)
│       ├── components/# Shared UI components
│       └── shared/    # API client, types, utilities
│
└── backend/           # ASP.NET Core API
    └── AGWire.Api/
        ├── Endpoints/       # Minimal API route definitions
        ├── Domain/          # Entities and interfaces
        ├── Application/     # Application services
        ├── Infrastructure/  # Providers and persistence
        └── Data/            # JSON data files
```

The frontend and backend are independent projects that communicate over HTTP. The backend hides external API keys and normalizes provider responses into a consistent internal model.

## Getting Started

### Prerequisites

- Node.js 18+
- .NET 8 SDK

### Environment

Copy the example env files and fill in your values:

```bash
# Frontend
cp frontend/.env.example frontend/.env

# Backend
cp backend/AGWire.Api/.env.example backend/AGWire.Api/.env
```

### Run

```bash
# Backend (from backend/AGWire.Api)
dotnet run

# Frontend (from frontend)
npm install
npm run dev
```

## Future Enhancements

- **SQLite + EF Core** — replace JSON file persistence without changing domain or application logic
- **More providers** — Guardian API, Reuters, BBC, and others via the `INewsProvider` abstraction
- **Authentication** — secure admin endpoints with proper auth
