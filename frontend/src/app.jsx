import { Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Events from './pages/Events';
import EventBooking from './pages/EventBooking';
import Confirmation from './pages/Confirmation';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/event-booking" element={<EventBooking />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ErrorBoundary>
              <AdminDashboard />
            </ErrorBoundary>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;