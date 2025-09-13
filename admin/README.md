# WebHub Admin Frontend

A modern, responsive admin dashboard for the WebHub e-commerce platform built with Next.js, Material-UI, and TypeScript.

## Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- Role-based access control (User, Admin, Super Admin)
- Protected routes and middleware
- Automatic token refresh

### 📊 Dashboard
- Real-time statistics and metrics
- Revenue and order analytics
- Shop performance overview
- Quick action buttons

### 👥 User Management (Admin Only)
- View all users
- Update user roles and status
- Search and filter users
- Pagination support

### 🏪 Shop Management
- View all shops (Admin) or user's shops
- Activate/deactivate shops
- Shop performance metrics
- Owner information

### 📦 Product Management
- Create, read, update, delete products
- Category assignment
- Inventory tracking
- Image upload support
- Bulk operations

### 🛒 Order Management
- View all orders (Admin) or shop orders
- Update order status
- Track order progress
- Payment status management
- Order analytics

### 🏷️ Category Management
- Hierarchical category structure
- Create, edit, delete categories
- Category tree visualization
- Sort order management

### 📈 Analytics & Reporting
- Revenue trends and charts
- Order statistics
- User activity metrics
- Shop performance analytics
- Export capabilities

### 🔔 Notifications
- Real-time notifications
- Order updates
- System alerts
- Notification management

## Tech Stack

- **Framework**: Next.js 13
- **UI Library**: Material-UI (MUI) v5
- **Charts**: Recharts
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Styling**: Material-UI + Tailwind CSS
- **Authentication**: JWT with cookies
- **Form Handling**: React Hook Form
- **Notifications**: React Hot Toast

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn
- WebHub Backend API running on port 8080

### Installation

1. **Navigate to the admin directory**
   ```bash
   cd WebHub-Frontend/admin
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the admin directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8080/api
   NEXT_PUBLIC_APP_NAME=WebHub Admin
   NEXT_PUBLIC_APP_VERSION=1.0.0
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Default Login Credentials

After seeding the backend database, you can use these credentials:

**Super Admin:**
- Email: `admin@webhub.com`
- Password: `admin123456`

## Project Structure

```
admin/
├── components/          # Reusable UI components
│   ├── AdminLayout.js   # Main layout component
│   ├── ProtectedRoute.js # Route protection
│   └── LoadingSpinner.js # Loading component
├── contexts/            # React contexts
│   └── AuthContext.js   # Authentication context
├── lib/                 # Utility libraries
│   └── api.js          # API service layer
├── pages/              # Next.js pages
│   ├── admin/          # Admin-only pages
│   │   ├── users.js    # User management
│   │   ├── shops.js    # Shop management
│   │   ├── orders.js   # Order management
│   │   └── analytics.js # System analytics
│   ├── dashboard/      # Dashboard pages
│   │   ├── products.js # Product management
│   │   ├── categories.js # Category management
│   │   └── orders.js   # Shop orders
│   ├── login.jsx       # Login page
│   ├── signup.jsx      # Registration page
│   └── dashboard.js    # Main dashboard
├── styles/             # Global styles
└── public/             # Static assets
```

## API Integration

The admin frontend communicates with the WebHub backend API through a centralized service layer (`lib/api.js`). All API calls include:

- Automatic JWT token attachment
- Error handling and token refresh
- Request/response interceptors
- TypeScript support

### Available API Services

- `authAPI` - Authentication endpoints
- `userAPI` - User management
- `shopAPI` - Shop operations
- `productAPI` - Product management
- `orderAPI` - Order handling
- `categoryAPI` - Category management
- `notificationAPI` - Notifications
- `adminAPI` - Admin operations

## Role-Based Access Control

The application implements three user roles:

### User
- Access to own shop dashboard
- Manage own products and orders
- View own analytics

### Admin
- All user permissions
- Access to admin panel
- Manage all shops and orders
- View system analytics

### Super Admin
- All admin permissions
- Manage user roles
- Full system access
- User management

## Features by Role

### Shop Owner Dashboard
- Product management
- Order tracking
- Shop analytics
- Category management
- Notification center

### Admin Panel
- User management
- Shop oversight
- Order management
- System analytics
- Category administration

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

- Use Material-UI components
- Follow React best practices
- Implement proper error handling
- Use TypeScript for type safety
- Follow the established folder structure

### Adding New Features

1. Create API endpoints in `lib/api.js`
2. Add new pages in `pages/` directory
3. Use existing components or create new ones
4. Implement proper authentication checks
5. Add appropriate error handling

## Deployment

### Production Build

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm run start
   ```

### Environment Variables

Set these environment variables in production:

```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
NEXT_PUBLIC_APP_NAME=WebHub Admin
NEXT_PUBLIC_APP_VERSION=1.0.0
```

### Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For support and questions, please contact the development team or create an issue in the repository.