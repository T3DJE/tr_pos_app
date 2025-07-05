import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './auth/Register'
import Login from './auth/Login'
import RegisterCashier from './auth/../admin/Account/RegisterCashier'
import POSCashier from './Cashier/PointOfSale'
import AdminDashboard from "./admin/Dashboard/AdminDashboard";
import Category from "./admin/Category/Category"
import Member from "./admin/Member/Member"
import Supplier from "./admin/Supplier/Supplier";
import Payment from "./admin/Payment/Payment";
import Product from "./admin/Product/Product"
import HT from "./admin/History/HistoryTransaction";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/" element={<Login />}></Route>
          <Route path="/registercashier" element={<RegisterCashier />}></Route>
          <Route path="/admindashboard" element={<AdminDashboard />}></Route>
          <Route path="/category" element={<Category />}></Route>
          <Route path="/member" element={<Member />}></Route>
          <Route path="/supplier" element={<Supplier />}></Route>
          <Route path="/payment" element={<Payment />}></Route>
          <Route path="/product" element={<Product />}></Route>
          <Route path="/historytransaction" element={<HT />}></Route>
          <Route path="/poscashier" element={<POSCashier />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
