import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Profile from './pages/Profile';
import Addresses from './pages/Addresses';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Register';

// Seller Pages
import Dashboard from './pages/seller/Dashboard';
import ProductsManagement from './pages/seller/ProductsManagement';
import OrdersManagement from './pages/seller/OrdersManagement';

// Protected Route Component
const ProtectedRoute = ({ children, requireSeller = false }) => {
  const { isAuthenticated, isSeller, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen bg-black" />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requireSeller && !isSeller) {
    return <Navigate to="/" />;
  }

  return children;
};

// Layout Component
const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Routes>
              {/* Public Routes with Layout */}
              <Route
                path="/"
                element={
                  <Layout>
                    <Home />
                  </Layout>
                }
              />
              <Route
                path="/products"
                element={
                  <Layout>
                    <Products />
                  </Layout>
                }
              />
              <Route
                path="/product/:id"
                element={
                  <Layout>
                    <ProductDetail />
                  </Layout>
                }
              />

              {/* Auth Routes with Layout */}
              <Route
                path="/login"
                element={
                  <Layout>
                    <Login />
                  </Layout>
                }
              />
              <Route
                path="/register"
                element={
                  <Layout>
                    <Register />
                  </Layout>
                }
              />

              {/* Protected Buyer Routes with Layout */}
              <Route
                path="/cart"
                element={
                  <Layout>
                    <Cart />
                  </Layout>
                }
              />
              <Route
                path="/wishlist"
                element={
                  <Layout>
                    <Wishlist />
                  </Layout>
                }
              />
              <Route
                path="/profile"
                element={
                  <Layout>
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  </Layout>
                }
              />
              <Route
                path="/addresses"
                element={
                  <Layout>
                    <ProtectedRoute>
                      <Addresses />
                    </ProtectedRoute>
                  </Layout>
                }
              />
              <Route
                path="/chat"
                element={
                  <Layout>
                    <Chat />
                  </Layout>
                }
              />

              {/* Protected Seller Routes with Layout */}
              <Route
                path="/seller/dashboard"
                element={
                  <Layout>
                    <ProtectedRoute requireSeller={true}>
                      <Dashboard />
                    </ProtectedRoute>
                  </Layout>
                }
              />
              <Route
                path="/seller/products"
                element={
                  <Layout>
                    <ProtectedRoute requireSeller={true}>
                      <ProductsManagement />
                    </ProtectedRoute>
                  </Layout>
                }
              />
              <Route
                path="/seller/orders"
                element={
                  <Layout>
                    <ProtectedRoute requireSeller={true}>
                      <OrdersManagement />
                    </ProtectedRoute>
                  </Layout>
                }
              />

              {/* 404 Route */}
              <Route
                path="*"
                element={
                  <Layout>
                    <div className="min-h-screen flex items-center justify-center">
                      <div className="text-center">
                        <h1 className="text-6xl font-bold text-cyan-400 mb-4">404</h1>
                        <p className="text-white text-2xl mb-6">Page Not Found</p>
                        <a
                          href="/"
                          className="bg-cyan-500 text-white px-6 py-3 rounded-full inline-block hover:bg-cyan-600 transition-colors"
                        >
                          Go Home
                        </a>
                      </div>
                    </div>
                  </Layout>
                }
              />
            </Routes>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
