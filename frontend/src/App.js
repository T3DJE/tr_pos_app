import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './auth/Register'
import Login from './auth/Login'
import RegisterCashier from './auth/../admin/Account/RegisterCashier'
import POSCashier from './Cashier/PointOfSale'
import AdminDashboard from "./admin/Dashboard/AdminDashboard";
import Category from "./admin/Category/Category"

function App() {
  return (
    <>
      <Router>
        <Routes>
          //auth
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>

          //admin feature
          <Route path="/registercashier" element={<RegisterCashier />}></Route>
          <Route path="/admindashboard" element={<AdminDashboard />}></Route>
          <Route path="/category" element={<Category />}></Route>

        //cahier feature
          <Route path="/poscashier" element={<POSCashier />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
