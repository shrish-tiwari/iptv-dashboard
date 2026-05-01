import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // ✅ Notification ke liye
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import ProtectedRoute from './components/reusable/ProtectedRoute';
import WatchPage from './pages/WatchPage'; // 👈 Yeh line add ki hai

function App() {
  return (
    <Router>
      {/* ✅ Toaster ko yahan rakha hai taaki poori app mein kahi bhi popup dikh sake */}
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
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes (Sirf login ke baad) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            {/* 👇 Yeh route humne add kiya hai taaki movie watch ho sake */}
            <Route path="/watch/:id" element={<WatchPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;