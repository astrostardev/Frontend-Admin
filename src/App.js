import Sidebar from './Components/Sidebar';
// import Offcanvas from "./Components/Offcanvas"
import "./App.css"
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import Astrologers from './Pages/Astrologers';
import Users from './Pages/Users';
import Addastrologers from './Pages/Addastrologers';
import { ToastContainer } from 'react-toastify';
import Login from "./Pages/Login"
import { useSelector } from "react-redux";
import React from 'react';
import Dashboard from './Pages/Dashboard';
import ViewProfile from './Pages/ViewProfile';
import ViewUserprofile from './Pages/ViewUserprofile';
import ViewPackage from './Pages/ViewPackage'
import EditAstrologer from './Pages/EditAstrologer';
import Packages from './Pages/Packages';
import AddPackages from './Pages/AddPackages';
import EditPackage from './Pages/EditPackage';
import ShowMethodology from './Pages/methodology/ShowMethods'
import AddMethodology from './Pages/methodology/AddMethods'
import EditMethodology from './Pages/methodology/EditMethodology'
import AddLanguage from './Pages/languages/AddLanguage'
import ShowLanguage from './Pages/languages/ShowLanguage'
import EditLanguage from './Pages/languages/EditLanguage'
import { HelmetProvider } from 'react-helmet-async'





function App() {
  const { loading, error, isAuthenticated } = useSelector(state => state.authState)
  // const authGuard = Boolean(useSelector((state) => state.isAuthendicated));
  // const authGuard = true;
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

        </Routes>
      </BrowserRouter>
      </HelmetProvider>

    </div>
  );
}

export default App;

