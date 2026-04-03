import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./Components/Header";
import Footer from "./Components/Footer/Footer";
import { createContext, useState } from "react";
import ProductModel from "./Components/ProductModel/ProductModel";
import Listing from "./Pages/Listing/Listing";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import Cart from "./Pages/Cart/Cart";
import SignIn from "./Pages/SignIn/SignIn";
import SignUp from "./Pages/SignUp/SignUp";

const MyContext = createContext();

function App() {
  const [isOpenProductModel, setisOpenProductModel] = useState(false);
  const [isHeaderFooterShow, setisHeaderFooterShow] = useState(true);

  const values = {
    isOpenProductModel,
    setisOpenProductModel,
    isHeaderFooterShow,
    setisHeaderFooterShow,
  };

  return (
    <BrowserRouter>
      <MyContext.Provider value={values}>
        {isHeaderFooterShow === true && <Header />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cat" element={<Listing />} />
          <Route path="/cat/:id" element={<Listing />} />
          <Route path="/cat/" element={<Listing />} />
          <Route path="/product/*" element={<ProductDetails />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
          {isHeaderFooterShow === true && <Footer />}   
          {isOpenProductModel === true && <ProductModel />}
      </MyContext.Provider>
    </BrowserRouter>
  );
}
export default App;
export { MyContext };
