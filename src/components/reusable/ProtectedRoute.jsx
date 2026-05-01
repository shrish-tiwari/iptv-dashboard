import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth'; // Hook use kiya

const ProtectedRoute = () => {
  const { user, loading } = useAuth(); // Global state se user aur loading lo

  // Jab tak backend se verification ho rahi hai, tab tak "Loading..." dikhao
  if (loading) {
    return (
      <div className="h-screen w-full bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-red-600"></div>
      </div>
    );
  }

  // Agar user nahi mila verification ke baad, toh login bhej do
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />; // Agar sab sahi hai, toh dashboard dikhao
};

export default ProtectedRoute;