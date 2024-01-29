import Sidebar from './Components/Sidebar';
// import Offcanvas from "./Components/Offcanvas"
import "./App.css"
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import Astrologers from './Pages/astrologers/Astrologers';
import Users from './Pages/users/Users';
import Addastrologers from './Pages/astrologers/Addastrologers';
import { ToastContainer } from 'react-toastify';
import Login from "./Pages/Login"
import { useSelector } from "react-redux";
import React,{Suspense} from 'react';
import Dashboard from './Pages/Dashboard';
import ViewProfile from './Pages/astrologers/ViewProfile';
import ViewUserprofile from './Pages/users/ViewUserprofile';
import ViewPackage from './Pages/packages/ViewPackage'
import EditAstrologer from './Pages/astrologers/EditAstrologer';
import Packages from './Pages/packages/Packages';
import AddPackages from './Pages/packages/AddPackages';
import EditPackage from './Pages/packages/EditPackage';
import ShowMethodology from './Pages/methodology/ShowMethods'
import AddMethodology from './Pages/methodology/AddMethods'
import EditMethodology from './Pages/methodology/EditMethodology'
import AddLanguage from './Pages/languages/AddLanguage'
import ShowLanguage from './Pages/languages/ShowLanguage'
import EditLanguage from './Pages/languages/EditLanguage'
import { HelmetProvider } from 'react-helmet-async'
import Products from './Pages/products/Products'
import AddProduct from './Pages/products/AddProduct'
import EditProduct from './Pages/products/EditProduct'
import Courses from './Pages/courses/Courses';
import AddCourse from './Pages/courses/AddCourses';
import EditCourse from './Pages/courses/EditCourses';
import ViewCategory from './Pages/courseCategory/ViewCategory';
import AddCategory from './Pages/courseCategory/AddCategory';
import EditCategory from './Pages/courseCategory/EditCategory';
import EditProductCategory from './Pages/productCategory/EditProductCategory';
import AddProductCategory from './Pages/productCategory/AddProductCategory';
import ViewProductCategory from './Pages/productCategory/ViewProductCategory';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { isAuthenticated } = useSelector(state => state.authState)
const Astrologer = React.lazy(()=> import("./Pages/astrologers/Astrologers"))
  return (
    <div>
          <HelmetProvider>

      <BrowserRouter>
        <ToastContainer theme="dark" />
        <div id='fixedbar'>
          {isAuthenticated && <Sidebar />}
        </div>
        {/* <div id='offcanvas'>
          {isAuthenticated && <Offcanvas />}
        </div> */}
        <Routes>
          <Route path="/" element={isAuthenticated ? <Dashboard /> : <Login />} />
        </Routes>
        <Routes>
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
        
          <Route path='/astrologers' element={isAuthenticated ? <Astrologers /> : <Navigate to="/" />} />
          <Route path='/users' element={isAuthenticated ? <Users /> : <Navigate to="/" />} />
         
          <Route path='/addastrologers' element={isAuthenticated ? <Addastrologers /> : <Navigate to="/" />} />
          <Route path='/astrologer/:id' element={isAuthenticated ? <ViewProfile /> : <Navigate to="/" />} />
          <Route path='/editastrologer/:id' element={isAuthenticated ? <EditAstrologer /> : <Navigate to="/" />} />
          <Route path='/user/:id' element={isAuthenticated ? <ViewUserprofile /> : <Navigate to="/" />} />
          <Route path='/packages' element={isAuthenticated ? <Packages /> : <Navigate to="/" />} />
          <Route path='/package/:id' element={isAuthenticated ? <ViewPackage /> : <Navigate to="/" />} />
          <Route path='/editpackage/:id' element={isAuthenticated ? <EditPackage/> : <Navigate to="/" />} />
          <Route path='/addpackages' element={isAuthenticated ? <AddPackages /> : <Navigate to="/" />} />
          <Route path='/methods' element={isAuthenticated ? <ShowMethodology/> : <Navigate to="/" />} />
          <Route path='/editmethod/:id' element={isAuthenticated ? <EditMethodology/> : <Navigate to="/" />} />
          <Route path='/addmethod' element={isAuthenticated ? <AddMethodology/> : <Navigate to="/" />} />

          <Route path='/languages' element={isAuthenticated ? <ShowLanguage/> : <Navigate to="/" />} />
          <Route path='/editlanguage/:id' element={isAuthenticated ? <EditLanguage/> : <Navigate to="/" />} />
          <Route path='/addlanguage' element={isAuthenticated ? <AddLanguage/> : <Navigate to="/" />} />
          <Route path='/products' element={isAuthenticated ? <Products/> : <Navigate to="/" />} />
          <Route path='/addproduct' element={isAuthenticated ? <AddProduct/> : <Navigate to="/" />} />
          <Route path='/editproduct/:id' element={isAuthenticated ? <EditProduct/> : <Navigate to="/" />} />
          <Route path='/courses' element={isAuthenticated ? <Courses/> : <Navigate to="/" />} />
          <Route path='/editcourse/:id' element={isAuthenticated ? <EditCourse/> : <Navigate to="/" />} />
          <Route path='/addcourse' element={isAuthenticated ? <AddCourse/> : <Navigate to="/" />} />
          <Route path='/course_categories' element={isAuthenticated ? <ViewCategory/> : <Navigate to="/" />} />
          <Route path='/add_course_category' element={isAuthenticated ? <AddCategory/> : <Navigate to="/" />} />
          <Route path='/edit_course_categories/:id' element={isAuthenticated ? <EditCategory/> : <Navigate to="/" />} />
          <Route path='/product_categories' element={isAuthenticated ? <ViewProductCategory/> : <Navigate to="/" />} />
          <Route path='/add_product_category' element={isAuthenticated ? <AddProductCategory/> : <Navigate to="/" />} />
          <Route path='/edit_product_categories/:id' element={isAuthenticated ? <EditProductCategory/> : <Navigate to="/" />} />
          
        </Routes>
      </BrowserRouter>
      </HelmetProvider>

    </div>
  );
}

export default App;

