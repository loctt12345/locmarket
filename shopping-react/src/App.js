import Home from "./pages/home/Home";
import {HashRouter as Router, Routes, Route} from "react-router-dom";
import Product from "./pages/product/Product";
import { useEffect, useState } from 'react';
import { CategoryContext } from './context/CategoryContext';
import { SearchContext } from './context/SearchContext';
import { CartContext } from './context/CartContext';
import Cart from "./pages/cart/Cart";
import axios from "axios";


function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const getData = async() => {
        //const data = await axios.get("http://localhost:5225/api/Cart/", { withCredentials: true });
        setCart([]);
    }
    getData();
}, []);

  return (
    <SearchContext.Provider value={{search, setSearch}}>
      <CategoryContext.Provider value={{category, setCategory}}>
      <CartContext.Provider value={{cart, setCart}}>
    <Router basename="/">
      <Routes>
        <Route path="/" element={
            <Home/>
          } />
        <Route path="/home" element={
            <Home/>
          } />
        
        <Route path="/product/:id" element={
            <Product/>
          } />

        <Route path="/cart" element= {
            <Cart/>
        } />
      </Routes>
  </Router>  
  </CartContext.Provider>
  </CategoryContext.Provider>
  </SearchContext.Provider>

  );
}

export default App;
