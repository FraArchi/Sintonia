import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing.tsx';
import Login from './pages/Login.tsx';
import Signup from './pages/Signup.tsx';
import DashboardRedirect from './pages/DashboardRedirect.tsx';
import ChatWidget from './components/ChatWidget.tsx';
import { AuthProvider } from './lib/AuthContext.tsx';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ChatWidget />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<DashboardRedirect />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;
