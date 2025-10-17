# GymSupps - Gym Supplements E-Commerce Platform

A modern, full-featured e-commerce platform for gym supplements built with React, Tailwind CSS, and Framer Motion. Features separate interfaces for buyers and sellers with a beautiful dark theme UI.

## 🚀 Features

### For Buyers
- **Product Browsing**: View all supplements with filtering and search functionality
- **Product Details**: Detailed product information with images, pricing, and reviews
- **Shopping Cart**: Add/remove products, update quantities, and view cart total
- **Wishlist**: Save favorite products for later
- **User Profile**: Manage personal information and view order history
- **Address Management**: Add, edit, and manage multiple shipping addresses
- **Live Chat**: Real-time communication with sellers for queries
- **Responsive Design**: Fully responsive UI that works on all devices

### For Sellers
- **Dashboard**: Overview of sales, orders, and products
- **Product Management**: Add, edit, and delete products
- **Order Management**: View and manage customer orders
- **Chat System**: Respond to customer queries and feedback

### General Features
- **Authentication System**: Secure login and registration for buyers and sellers
- **Role-Based Access**: Different interfaces for buyers and sellers
- **Modern UI**: Dark theme with cyan accents and smooth animations
- **Demo Mode**: Pre-loaded demo data for testing
- **Responsive Navigation**: Mobile-friendly navigation with hamburger menu

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.2.0
- **Routing**: React Router DOM 7.9.4
- **Styling**: Tailwind CSS 3.4.18
- **Animations**: Framer Motion 12.23.24
- **Icons**: React Icons 5.5.0
- **HTTP Client**: Axios 1.12.2
- **Build Tool**: React Scripts 5.0.1

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd suppliments
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔑 Demo Credentials

### Buyer Account
- **Email**: rahul@example.com
- **Password**: demo123

### Seller Account
- **Email**: seller@example.com
- **Password**: demo123

## 📁 Project Structure

```
suppliments/
├── public/                 # Static files
├── src/
│   ├── components/        # Reusable components
│   │   ├── Header.js     # Navigation header
│   │   ├── Footer.js     # Footer component
│   │   ├── Loader.js     # Loading spinner
│   │   └── ProductCard.js # Product display card
│   ├── context/          # React Context providers
│   │   ├── AuthContext.js    # Authentication state
│   │   ├── CartContext.js    # Shopping cart state
│   │   └── WishlistContext.js # Wishlist state
│   ├── data/             # Demo data
│   │   └── demoData.js   # Products, users, orders, chats
│   ├── pages/            # Page components
│   │   ├── Home.js       # Landing page
│   │   ├── Products.js   # Product listing
│   │   ├── ProductDetail.js # Single product view
│   │   ├── Cart.js       # Shopping cart
│   │   ├── Wishlist.js   # Saved products
│   │   ├── Profile.js    # User profile
│   │   ├── Addresses.js  # Address management
│   │   ├── Chat.js       # Chat/feedback system
│   │   ├── Login.js      # Login page
│   │   ├── Register.js   # Registration page
│   │   └── seller/       # Seller-specific pages
│   │       ├── Dashboard.js
│   │       ├── ProductsManagement.js
│   │       └── OrdersManagement.js
│   ├── utils/            # Utility functions
│   │   └── axios.js      # Axios configuration
│   ├── App.js            # Main app component with routing
│   ├── App.css           # Global styles
│   └── index.js          # Entry point
├── package.json          # Dependencies
├── tailwind.config.js    # Tailwind configuration
└── README.md            # Documentation
```

## 🎨 Key Components

### Context Providers
- **AuthContext**: Manages user authentication state and login/logout functionality
- **CartContext**: Handles shopping cart operations (add, remove, update quantities)
- **WishlistContext**: Manages wishlist items

### Protected Routes
- Uses `ProtectedRoute` component to secure buyer and seller-specific pages
- Redirects unauthenticated users to login page
- Restricts seller pages to users with seller role

### Layout System
- Consistent header and footer across all pages using `Layout` component
- Responsive navigation with mobile menu support

## 🎯 Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm test`
Launches the test runner in interactive watch mode

### `npm run build`
Builds the app for production to the `build` folder

### `npm run eject`
Ejects from Create React App (one-way operation)

## 🌐 Pages & Routes

### Public Routes
- `/` - Home page
- `/products` - All products listing
- `/product/:id` - Product detail page
- `/login` - User login
- `/register` - User registration

### Buyer Routes (Protected)
- `/cart` - Shopping cart
- `/wishlist` - Saved products
- `/profile` - User profile
- `/addresses` - Manage addresses
- `/chat` - Customer support chat

### Seller Routes (Protected)
- `/seller/dashboard` - Seller dashboard
- `/seller/products` - Product management
- `/seller/orders` - Order management

## 🎨 Design System

### Color Palette
- **Primary**: Cyan (#06B6D4)
- **Background**: Black (#000000)
- **Cards**: Gray-900 (#111827)
- **Text**: White/Gray
- **Accents**: Cyan-400/500

### Typography
- Modern, clean font stack
- Responsive text sizes
- Good contrast for readability

### Animations
- Smooth page transitions with Framer Motion
- Hover effects on interactive elements
- Loading animations

## 📱 Responsive Design
- Mobile-first approach
- Breakpoints: sm, md, lg, xl
- Touch-friendly interface
- Optimized for all screen sizes

## 🔒 Security Features
- Client-side authentication validation
- Protected routes for authenticated users
- Role-based access control
- Password validation (minimum 6 characters)

## 📊 Demo Data Included
- 12 Products across different categories
- 2 Demo users (buyer and seller)
- 3 Sample orders with different statuses
- 4 Chat messages with replies

## 🚧 Current Limitations
- Uses demo data (no backend integration yet)
- Client-side only authentication (not production-ready)
- No payment gateway integration
- No real-time chat functionality
- No image upload for products

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!

## 📝 License
This project is for educational/demo purposes.

## 👨‍💻 Author
Built with ❤️ using React and Tailwind CSS

---

**Note**: This is a demo application using mock data. For production use, integrate with a backend API and implement proper authentication, payment gateway, and database.
