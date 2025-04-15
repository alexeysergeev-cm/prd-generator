# PRD Generator

A comprehensive application for creating, managing, and collaborating on Product Requirements Documents. Built with Next.js for the frontend and Node.js/Express for the backend, this application streamlines the PRD creation process for product teams.

## Features

- **Template Library**: Choose from a variety of industry-standard templates
- **Real-time Collaboration**: Work together with your team on PRDs
- **AI-powered Suggestions**: Get intelligent recommendations for improving your PRDs
- **Integration with External Tools**: Connect with tools like Jira, Slack, and Confluence
- **User-friendly Interface**: Intuitive UI with drag-and-drop functionality

## Technology Stack

### Frontend
- Next.js 13
- React 18
- Material UI
- React Query
- Zustand (state management)

### Backend
- Node.js
- Express
- PostgreSQL
- Sequelize ORM
- JWT Authentication

## Project Structure

```
├── components/         # React components
├── pages/              # Next.js pages
├── public/             # Static assets
├── server/             # Backend Node.js/Express server
│   ├── controllers/    # Request handlers
│   ├── middleware/     # Express middleware
│   ├── models/         # Sequelize models
│   ├── routes/         # API routes
│   └── services/       # Business logic
├── styles/             # CSS styles
└── config/             # Configuration files
```

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 14+

### Installation

1. Clone the repository
```bash
git clone https://github.com/alexeysergeev-cm/prd-generator.git
cd prd-generator
```

2. Install dependencies
```bash
npm install
```

3. Create a .env file based on .env.example
```bash
cp .env.example .env
# Edit the .env file with your configuration
```

4. Set up the database
```bash
npm run setup-db  # This will be implemented later
```

5. Start development servers
```bash
# Start both frontend and backend in development mode
npm run dev

# Start only the backend server
npm run server
```

## Available Scripts

- `npm run dev` - Start Next.js development server
- `npm run build` - Build the Next.js application
- `npm run start` - Start the Next.js production server
- `npm run server` - Start the backend Node.js server
- `npm run test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Contributing

Please read the [CONTRIBUTING.md](CONTRIBUTING.md) file for details on our code of conduct and the process for submitting pull requests.

## Security

This project adheres to security best practices as outlined in [SECURITY.md](SECURITY.md).
