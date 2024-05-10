import { onAuthStateChanged } from "firebase/auth";
import { Suspense, lazy, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './App.css';
import { getUser } from './api calls/user';
import { Loader } from './components/loader';
import { auth } from "./firebase";
import NewCoupon from './pages/admin/management/newCoupon';
import { addLocalCart } from './redux/cartSlice';
import { userExists, userNotExists } from './redux/userSlice';


const Home = lazy(() => import("./pages/home"));
const ProtectedRoute = lazy(()=> import('./components/protectedRoute'));
const Search = lazy(() => import("./pages/search"));
const Cart = lazy(() => import("./pages/cart"));
const Shipping = lazy(()=> import('./pages/shipping'));
const Login = lazy(()=>import("./pages/login"));
const Orders = lazy(()=> import('./pages/orders'));
const OrderDetails = lazy(()=> import("./pages/orderDetails"));
const NotFound = lazy(()=> import('./pages/notFound'));
const Checkout = lazy(()=> import('./pages/checkout'));
const ProductDetail = lazy(()=> import('./pages/productDetail'));


// Admin Routes Importing
const Dashboard = lazy(() => import("./pages/admin/dashboard"));
const Products = lazy(() => import("./pages/admin/products"));
const Transactions = lazy(() => import("./pages/admin/transactions"));
const Customers = lazy(() => import("./pages/admin/customers"));
const Coupons = lazy(()=>import('./pages/admin/coupons'))
const BarCharts = lazy(() => import("./pages/admin/charts/BarCharts"));
const PieCharts = lazy(() => import("./pages/admin/charts/PieCharts"));
const LineCharts = lazy(() => import("./pages/admin/charts/LineCharts"));
const NewProduct = lazy(() => import("./pages/admin/management/newProduct"));
const ProductManagement = lazy( () => import("./pages/admin/management/productManagement"));
const TransactionManagement = lazy( () => import("./pages/admin/management/transactionManagement")); 


function App() {
  const {user,loading} = useSelector((state)=> state.users);
  const dispatch = useDispatch();

  useEffect(()=>{
   onAuthStateChanged(auth,async(user)=>{
     if(user){
      console.log(user);
      const data = await getUser(user.uid);
      dispatch(userExists(data?.user));
     }
     else
     dispatch(userNotExists());
   })
  },[]);  

  useEffect(()=>{
   let localCart = localStorage.getItem("cart");
   if(localCart){
    localCart = JSON.parse(localCart);
    dispatch(addLocalCart(localCart));
   }
   },[])

  return (
    <>
 { loading ? (
    <Loader />
  ) : (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Not logged In Route */}
          <Route
            path="/login"
            element={
              <ProtectedRoute isAuthenticated={user? false: true}>
                <Login />
              </ProtectedRoute>
            }   
          />
            <Route path='/search' element={<Search/>}></Route>
            <Route path='/productDetail/:id' element={<ProductDetail/>}></Route>
            <Route path='/cart' element={<Cart />} ></Route>
            
          {/* Logged In User Routes */}
            <Route element={
              <ProtectedRoute isAuthenticated={(user)? true : false} />
            }>
            <Route path='/shipping' element={<Shipping />} ></Route>
            <Route path="/orders" element={<Orders />} />
            <Route path='/orderDetails/:id' element={<OrderDetails/>} ></Route>
            <Route path='/pay' element={<Checkout />} ></Route>
            </Route>

          {/* Admin Routes */}
          <Route
            element={
              <ProtectedRoute
                isAuthenticated={true}
                adminOnly={true}
                admin={user?.role === "admin" ? true : false}
              />
            }
          >
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/customers" element={<Customers />} />
          <Route path="/admin/transactions" element={<Transactions />} /> 
          <Route path="/admin/coupons" element={<Coupons />} /> 


            {/* Charts */}
            <Route path="/admin/chart/bar" element={<BarCharts />} />
            <Route path="/admin/chart/pie" element={<PieCharts />} />
            <Route path="/admin/chart/line" element={<LineCharts />} />


            {/* Management */}
            <Route path='/admin/products/new' element={<NewProduct/>}></Route>
            <Route path='/admin/coupons/new' element={<NewCoupon/>}></Route>
            <Route path="/admin/transactions/:id" element={<TransactionManagement/>}/>
            <Route path='/admin/products/:id' element={<ProductManagement/>}></Route>
          </Route>

           <Route path='*' element={<NotFound/>}></Route>
         </Routes>
      </Suspense>
      <Toaster position="bottom-center" />
    </Router>
  )}
    </>
  )
}

export default App
