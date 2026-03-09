import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute.jsx';

// Lazy loaded pages
const DashboardPage = lazy(() => import('./pages/dashboard/DashboardPage'));
const ProductPage = lazy(() => import('./pages/products/ProductPage'));
const StockPage = lazy(() => import('./pages/stock/StockPage'));
const PurchasePage = lazy(() => import('./pages/transactions/PurchasePage'));
const SuppliersPage = lazy(() => import('./pages/suppliers/SuppliersPage'));
const SalesPage = lazy(() => import('./pages/transactions/SalesPage'));
const ReportsPage = lazy(() => import('./pages/reports/ReportsPage'));
const UsersPage = lazy(() => import('./pages/users/UsersPage'));
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));

// A simple loader fallback
const PageLoader = () => (
  <div className="flex items-center justify-center p-12 min-h-[50vh]">
    <div className="size-8 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
  </div>
);

// Wrapper to avoid repeating Suspense code
const LazyPage = ({ children }) => (
  <Suspense fallback={<PageLoader />}>
    {children}
  </Suspense>
);

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LazyPage><LoginPage /></LazyPage>} />

          <Route path="/" element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }>
            <Route index element={<LazyPage><DashboardPage /></LazyPage>} />
            <Route path="products" element={<LazyPage><ProductPage /></LazyPage>} />
            <Route path="stock" element={<LazyPage><StockPage /></LazyPage>} />
            <Route path="purchase" element={<LazyPage><PurchasePage /></LazyPage>} />
            <Route path="suppliers" element={<LazyPage><SuppliersPage /></LazyPage>} />
            <Route path="transactions" element={<LazyPage><SalesPage /></LazyPage>} />
            <Route path="reports" element={<LazyPage><ReportsPage /></LazyPage>} />
            <Route path="users" element={<LazyPage><UsersPage /></LazyPage>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
