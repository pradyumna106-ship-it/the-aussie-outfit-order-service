# the-aussie-outfit-order-service

A lightweight order service for The Aussie Outfit e-commerce platform. This repository contains the backend service responsible for processing orders, managing order state, and exposing order APIs using Node.js and Express.js.

## Features

- Create and manage customer orders
- Track order status and lifecycle
- MongoDB integration for data persistence
- RESTful API interface with Express.js
- CORS support for cross-origin requests
- File upload support with Multer
- Environment-based configuration with dotenv
- Development ready with hot-reload support

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js 5.2+
- **Database**: MongoDB with Mongoose ODM
- **Testing**: Vitest
- **Development**: Nodemon for hot-reload
- **File Handling**: Multer
- **CORS**: Enabled for cross-origin requests

## Getting Started

### Prerequisites

- Node.js 18+ or compatible runtime
- npm or yarn
- MongoDB instance (local or cloud)

### Installation

```bash
# Clone the repository
git clone https://github.com/pradyumna106-ship-it/the-aussie-outfit-order-service.git
cd the-aussie-outfit-order-service

# Install dependencies
npm install
```

### Environment Setup

Create a `.env` file in the project root with the following variables:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/aussie-orders
NODE_ENV=development
```

### Running Locally

#### Development mode (with hot-reload):
```bash
npm run dev
```

#### Production mode:
```bash
npm start
```

### Running Tests

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch
```

## Usage

Use the available REST endpoints to create, update, and query orders. Example:

```bash
curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{"customerId":"123","items":[{"sku":"A123","quantity":2}]}'
```

## Project Structure

```
├── src/
│   ├── index.js          # Application entry point
│   └── ...               # Additional source files
├── package.json          # Project dependencies and scripts
├── .env                  # Environment variables (create locally)
├── .gitignore           # Git ignore rules
└── README.md            # This file
```

## Configuration

Update the `.env` file or environment variables as needed for:
- Database connections (MongoDB URI)
- Server port
- Node environment (development/production)
- CORS settings
- Other service integrations

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a pull request

## Development Guidelines

- Use `npm run dev` for local development
- Write tests using Vitest
- Follow Express.js best practices
- Ensure CORS and security headers are properly configured

## License

Licensed under the ISC License - see the package.json for details.

## Support

For issues, questions, or contributions, please open an issue on this repository.
