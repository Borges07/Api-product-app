import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute";
import LoginPage from "./auth/LoginPage";
import ProductsPage from "./pages/ProductsPage";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <ProductsPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
