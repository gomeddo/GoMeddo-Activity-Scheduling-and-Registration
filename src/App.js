import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/Layout";
import Map from "./pages/map/Map"
import Dashboard from "./pages/dashboard/Dashboard";
import BookingLayout from "./pages/BookingLayout";
import Booking from "./pages/booking/Booking";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />} path="/">
          <Route element={<Navigate to="dashboard" replace />} index />
          <Route element={<Dashboard />} path="dashboard" />
          <Route element={<Map />} path="map" />
        </Route>
        <Route element={<BookingLayout />} path="/">
          <Route element={<Booking />} path="booking" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
