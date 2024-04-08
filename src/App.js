import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MapViewProvider } from "./providers/MapViewContext";
import Dashboard from "./pages/dashboard/Dashboard";
import Booking from "./pages/booking/Booking";
import Layout from "./pages/Layout";
import AppRoutes from "./constants/AppRoutes";
import "./i18n/i18n";
import { FilterProvider } from "./providers/FilterContext";

//Function component representing the main application
function App() {
  return (
    //Using BrowserRoutes to enable routing functionality
    <BrowserRouter>
      {/* Providing context for filters and map view */}
      <FilterProvider>
        <MapViewProvider>
          {/* Defining the routes of the application */}
          <Routes>
            {/* Main layout route */}
            <Route element={<Layout />} path={AppRoutes.root}>
              {/* Redirecting to dashboard by default */}
              <Route element={<Navigate to={AppRoutes.dashboard} replace />} index />
              {/* Route for the dashboard page */}
              <Route element={<Dashboard />} path={AppRoutes.dashboard} />
              {/* Route for the booking page */}
              <Route element={<Booking />} path={AppRoutes.booking} />
            </Route>
          </Routes>
        </MapViewProvider>
      </FilterProvider>
    </BrowserRouter>
  );
}

export default App;