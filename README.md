# Essence LMS - Learning Management System

A comprehensive Learning Management System built with modern web technologies, featuring separate admin panel, client-side application, and backend services.

## 🏗️ Project Structure

```
essence-lms/
├── admin-panel/          # React + TypeScript + MUI Admin Dashboard
├── client-side/          # Next.js Client Application
├── backend/              # Spring Boot Backend API
├── database/             # Database migrations and setup
├── shared/               # Shared configuration files
└── docker-compose.yml    # Development environment setup
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Java 17+ (for backend)
- Docker and Docker Compose
- PostgreSQL (or use Docker)

### Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/meygt/essence-lms.git
   cd essence-lms
   ```

2. **Start the development environment**
   ```bash
   ./start-dev.sh
   ```

   Or manually:
   ```bash
   # Start all services with Docker
   docker-compose up -d
   
   # Install and start admin panel
   cd admin-panel
   npm install
   npm run dev
   
   # Install and start client-side (in new terminal)
   cd client-side
   npm install
   npm run dev
   ```

3. **Access the applications**
   - Admin Panel: http://localhost:3001
   - Client Application: http://localhost:3000
   - Backend API: http://localhost:8080

## 📱 Applications

### Admin Panel
- **Technology**: React + TypeScript + Material-UI
- **Port**: 3001
- **Features**: User management, course administration, analytics, payments

### Client-Side
- **Technology**: Next.js + TypeScript + Tailwind CSS
- **Port**: 3000
- **Features**: Course catalog, student dashboard, enrollment, payments

### Backend
- **Technology**: Spring Boot + Java
- **Port**: 8080
- **Features**: REST API, authentication, database management

## 🗄️ Database

- **Database**: PostgreSQL
- **Migrations**: Located in `database/migrations/`
- **Test Data**: Use `create-test-accounts.sql` for development

## 🔧 Development Commands

### Admin Panel
```bash
cd admin-panel
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

### Client-Side
```bash
cd client-side
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Backend
```bash
cd backend
./gradlew bootRun    # Start development server
./gradlew build      # Build application
./gradlew test       # Run tests
```

## 🐳 Docker Deployment

### Development
```bash
docker-compose up -d
```

### Production
```bash
docker-compose -f docker-compose.production.yml up -d
```

## 📚 Documentation

- [Implementation Status](IMPLEMENTATION_STATUS.md)
- [Domain Strategy](DOMAIN-STRATEGY.md)
- [VPS Database Info](VPS-DATABASE-INFO.md)
- [Deployment Guide](render-deploy-guide.md)

## 🔐 Test Accounts

See [TEST_ACCOUNTS.md](admin-panel/TEST_ACCOUNTS.md) for development login credentials.

## 🛠️ Technology Stack

### Frontend
- **Admin Panel**: React 18, TypeScript, Material-UI, Vite
- **Client-Side**: Next.js 14, TypeScript, Tailwind CSS

### Backend
- **API**: Spring Boot 3, Java 17
- **Database**: PostgreSQL
- **Authentication**: JWT

### DevOps
- **Containerization**: Docker
- **Orchestration**: Docker Compose
- **CI/CD**: GitHub Actions (planned)

## 📄 License

This project is proprietary software. All rights reserved.

## 🤝 Contributing

This is a private project. Please contact the maintainers for contribution guidelines.

## 📞 Support

For support and questions, please contact the development team.