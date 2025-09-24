# Personal Finance App

This is a **personal finance management application** built with **.NET Aspire** (backend) and **React** (frontend).  
The app allows users to manage income/expense accounts, record transactions, set budgets, define saving goals, and view analytics.

---

## 📦 Project Structure

The solution is organized as a **monorepo**:

- **ApiService** → Backend service that exposes APIs for accounts, categories, transactions, budgets, and goals.
- **AppHost** → The Aspire orchestrator that runs all services and defines dependencies.
- **ServiceDefaults** → Shared defaults such as logging, health checks, configuration, and resilience policies.
- **Web** → React frontend application (Vite-based) that consumes the APIs.

---

## 🚀 Getting Started

### 1. Prerequisites

Make sure you have installed:

- [.NET 9 SDK](https://dotnet.microsoft.com/en-us/download)
- [Node.js (LTS)](https://nodejs.org/) + npm or yarn
- [Aspire workload](https://learn.microsoft.com/en-us/dotnet/aspire/)
- (Optional) Docker Desktop → if you plan to use containerized dependencies (DB, cache, etc.)

---

## 2. Install Frontend Package

```bash
cd .\Fintrack.Web\
pnpm install
```

## 3. Install Backend Package

```bash
dotnet restore
```

## 4. Start Aspired project

Start everything (backend + frontend) using Aspire:

```bash
dotnet run --project .\Fintrack.AppHost\
```
