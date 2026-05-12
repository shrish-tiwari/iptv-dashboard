import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; 
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import ProtectedRoute from './components/reusable/ProtectedRoute';
import WatchPage from './pages/WatchPage';
import Search from './pages/Search'; 
import NewPopular from './pages/NewPopular'; // 👈 Naya page import kiya
// Context Provider Import kiya hai
import { WatchlistProvider } from './context/WatchlistContext'; 

function App() {
  return (
    <WatchlistProvider>
      <Router>
        {/* Notification Toaster - Untouched */}
        <Toaster 
          position="top-center" 
          reverseOrder={false} 
          toastOptions={{
            style: {
              background: '#333',
              color: '#fff',
            },
          }}
        />

        <Routes>
          {/* Public Routes - Untouched */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes (Sirf login ke baad) - Untouched */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              
              {/* Phase 1: New Feature Pages */}
              <Route path="movies" element={<Home defaultCategory="movies" />} />
              <Route path="tv-series" element={<Home defaultCategory="series" />} />
              <Route path="mylist" element={<Home defaultCategory="mylist" />} />
              <Route path="search" element={<Search />} />
              
              {/* 🆕 Naya Page Route add kiya (New & Popular) */}
              <Route path="new" element={<NewPopular />} />
              
              {/* Video Player Route */}
              <Route path="watch/:id" element={<WatchPage />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </WatchlistProvider>
  );
}

export default App;