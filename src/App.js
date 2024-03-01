import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MapViewProvider } from "./providers/MapViewContext";
import Layout from './pages/Layout';
import Dashboard from './pages/dashboard/Dashboard';
import Booking from './pages/booking/Booking';

function App() {
  return (
    <BrowserRouter>
      <MapViewProvider>
        <Routes>
          <Route element={<Layout />} path="/">
            <Route element={<Navigate to="dashboard" replace />} index />
            <Route element={<Dashboard />} path="dashboard" />
            <Route element={<Booking />} path="booking" />
          </Route>
        </Routes>
      </MapViewProvider>
    </BrowserRouter>
  );
}

export default App;
