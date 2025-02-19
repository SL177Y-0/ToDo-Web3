# Backend

A NestJS backend service handling authentication, task management, and AI integration using Google's Flan T5 Large Model for the decentralized task management application.

## Features

- JWT-based authentication with wallet address verification
- Task management with blockchain state synchronization
- AI-powered task analysis using Flan T5 Large Model
- MySQL database with Prisma ORM
- Smart contract interaction using ethers.js

## Prerequisites

- Node.js v16 or later
- MySQL database
- Hugging Face API key (FlanT5Large)
- MetaMask wallet
- Smart contract deployed on Sepolia testnet

## Installation & Setup

1. Clone the repository

```bash
git clone <repository-url>
cd backend-server
```

2. Install dependencies

```bash
npm install
```

3. Create .env file

```bash
# Database
DATABASE_URL=your_database_url
# JWT
JWT_SECRET=your-jwt-secret

# Contract
CONTRACT_ADDRESS=your-contract-address
SEPOLIA_RPC_URL=your-sepolia-rpc-url

# AI
HUGGINGFACE_API_KEY=your-huggingface-api-key

#PORT
PORT=3000

#FRONTEND
FRONTEND_URL=http://localhost:5173
```

4. Run database migrations

```bash
npx prisma migrate dev
```

5. Start the server

```bash
# Development
npm run start:dev
```

## Project Structure

```bash
src/
├── auth/                # Authentication module
├── task/                # Task management module
├── contract/            # Blockchain interaction
├── ai/                  # AI integration
├── common/              # Shared utilities
└── database/            # Database configuration
```

## Architecture

- NestJS modules organized by feature
- Repository pattern for database access
- Service layer for business logic
- Controller layer for HTTP endpoints
- Blockchain interaction via ethers.js
- AI integration using MistralAI7b
