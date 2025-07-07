# Bulk Order Form Application

A full-stack web application that streamlines the bulk ordering process for B2B customers. Users can browse products, search by name and brand, add multiple items to a cart at once, and manage cart contents with quantity updates and item removal.

Built for a client to simplify wholesale orders for her B2B customers. This application will eventually integrate with the client's BigCommerce storefront.

## Features

- **Product Browsing**: View a list of products with images, names, brands, and prices
- **Search Functionality**: Filter products by name and brand
- **Bulk Ordering**: Add multiple products to cart at once with quantity selection
- **Cart Management**: Update quantities or remove items from your cart
- **Real-time Price Calculation**: See line totals and subtotals as you adjust quantities
- **Responsive Design**: Works seamlessly on both desktop and mobile devices

## Technology Stack

- **Frontend**: React 18 with TypeScript, React Query for data fetching, React Router v7 for navigation
- **UI Components**: Custom UI components with Tailwind CSS v4 styling, Radix UI primitives
- **Backend**: Express.js server with RESTful API endpoints
- **Database**: SQLite with Knex.js query builder
- **State Management**: React Query for server state, React Hook Form for form management
- **Build Tools**: Vite, ESBuild, TypeScript

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd bulkform

# Install dependencies
npm install

# Set up the database
npm run knex migrate:latest
npm run knex seed:run
```

## Development

```bash
# Start development server (both client and server)
npm run dev

# Start client only
npm run dev:client

# Start server only
npm run dev:server
```

## Project Structure

```
bulkform/
├── client/               # Frontend React application
│   ├── apis/             # API client functions
│   ├── components/       # React components
│   ├── styles/           # CSS and styling files
│   └── index.tsx         # Client entry point
├── models/               # Shared type definitions
├── server/               # Backend Express server
│   ├── db/               # Database configuration and migrations
│   ├── routes/           # API route handlers
│   ├── index.ts          # Server entry point
│   └── server.ts         # Express server configuration
└── src/                  # Additional source files
```

## Scripts

- `npm run dev` - Start development environment
