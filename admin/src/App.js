import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./responsive.css";

import Dashboard from "./pages/Dashboard/Dashboard";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Login from "./pages/Login/login";
import SignUp from "./pages/SignUp/SignUp";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import ProductUpload from "./pages/ProductUpload/ProductUpload";
import CategoryAdd from "./pages/CategoryAdd/CategoryAdd";
import ProductList from "./pages/ProductList/ProductList";
import Category from "./pages/CategoryList/CategoryList";
import { createContext, useEffect, useState } from "react";
import { SnackbarProvider } from "notistack";
import LoadingBar from "react-top-loading-bar";
import EditCategory from "./pages/CategoryEdit/CategoryEdit";
import ProductEdit from "./pages/ProductEdit/ProductEdit";

/* ================== CONTEXT ================== */
const MyContext = createContext();

/* ================== APP CONTENT ================== */
function AppContent() {
  const [isToggleSidebar, setIsToggleSidebar] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isHideSidebarAndHeader, setIsHideSidebarAndHeader] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isOpenNav, setIsOpenNav] = useState(false);
  const [themeMode, setThemeMode] = useState(true);
  const [progress, setProgress] = useState(0);

  const location = useLocation();

  /* Hide header & sidebar on login/signup */
  useEffect(() => {
    const path = location.pathname.toLowerCase();
    setIsHideSidebarAndHeader(path === "/login" || path === "/signup");
  }, [location.pathname]);

  /* Theme mode */
  useEffect(() => {
    document.body.classList.remove(themeMode ? "dark" : "light");
    document.body.classList.add(themeMode ? "light" : "dark");
    localStorage.setItem("themeMode", themeMode ? "light" : "dark");
  }, [themeMode]);

  /* Window resize */
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* Close sidebar on route change */
  useEffect(() => {
    setIsOpenNav(false);
  }, [location.pathname]);

  /* ESC key close sidebar */
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && setIsOpenNav(false);
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const values = {
    isToggleSidebar,
    setIsToggleSidebar,
    isLogin,
    setIsLogin,
    isHideSidebarAndHeader,
    setIsHideSidebarAndHeader,
    themeMode,
    setThemeMode,
    windowWidth,
    isOpenNav,
    setProgress
  };

  return (
    <MyContext.Provider value={values}>
      {/* 🔥 TOP LOADING BAR */}
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        className='topLoadingBar'
      />

      {!isHideSidebarAndHeader && <Header />}

      <div className="main d-flex">
        {!isHideSidebarAndHeader && (
          <>
            {isOpenNav && (
              <div
                className="sidebarOverlay"
                onClick={() => setIsOpenNav(false)}
              />
            )}

            <div
              className={`sidebarWrapper 
                ${isToggleSidebar ? "toggle" : ""} 
                ${isOpenNav ? "open" : ""}`}
            >
              <Sidebar />
            </div>
          </>
        )}

        <div
          className={`content 
            ${isHideSidebarAndHeader ? "full" : ""} 
            ${isToggleSidebar ? "toggle" : ""}`}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/product/details" element={<ProductDetails />} />
            <Route path="/product/upload" element={<ProductUpload />} />
            <Route path="/product/productlist" element={<ProductList />} />
            <Route path="/product/edit/:id" element={<ProductEdit/>} />
            <Route path="/category/add" element={<CategoryAdd />} />
            <Route path="/category/edit/:id" element={<EditCategory/>} />
            <Route path="/category" element={<Category />} />
          </Routes>
        </div>
      </div>
    </MyContext.Provider>
  );
}

/* ================== ROOT APP ================== */
function App() {
  return (
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </SnackbarProvider>
  );
}

export default App;
export { MyContext };
