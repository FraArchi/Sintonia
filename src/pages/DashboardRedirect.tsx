import { Navigate } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function DashboardRedirect() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (user && !loading) {
      window.location.href = "https://app.sintonia.cloud";
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex text-blue-600 justify-center items-center bg-slate-50">
        <motion.div
           animate={{ rotate: 360 }}
           transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
           className="w-8 h-8 rounded-full border-t-2 border-r-2 border-blue-600"
        ></motion.div>
      </div>
    );
  }

  if (user) {
    return null;
  }

  // Se non si è loggati, rimanda al login
  return <Navigate to="/login" replace />;
}
