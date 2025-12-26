// src/App.jsx
import { Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/userContext.jsx";
import { AuthProvider } from "../../admin-panel/src/context/AuthContext.jsx";
import { ThemeProvider } from "../../admin-panel/src/context/ThemeContext.jsx";

import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Payment from './pages/Payment';
import Profile from './pages/profile.jsx';
import EventDetail from './pages/eventDetail.jsx';
import NotFound from '../../admin-panel/src/pages/404.jsx';
import ProtectedRoute from './component/protectedRoute.jsx';
import EditProfile from './pages/editProfile.jsx';
import EventRegister from "./pages/EventRegiatration.jsx";
import PaymentSuccess from "./pages/PaymentSuccess.jsx";
import MyTickets from "./pages/MyTickets.jsx";
function App() {
  return (
    <UserProvider>
      <AuthProvider>
        <ThemeProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/events" element={<Events />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/my-tickets" element={<ProtectedRoute><MyTickets /></ProtectedRoute>} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/editProfile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
         <Route path="/events/:id/register" element={<ProtectedRoute><EventRegister /></ProtectedRoute>} /> 
        <Route path="*" element={<NotFound />} />
      </Routes>
      </ThemeProvider>
      </AuthProvider>
    </UserProvider>

  );
}

export default App;