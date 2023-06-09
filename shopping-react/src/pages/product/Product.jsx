import './product.css';
import Topbar from '../../components/topbar/Topbar'
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import Banner from '../../components/banner/Banner';
import axios from 'axios';
import ProductPath from '../../components/productPath/ProductPath';
import Footer from '../../components/footer/Footer';
import ProductRecommendation from '../../components/productRecommendation/ProductRecommendation';
import { CartContext } from '../../context/CartContext';
import { productApi } from '../../data/productFakeApi';


export default function Product() {
    const productId = useParams().id;
    const [product, setProduct] = useState(null);    
    const {cart, setCart} = useContext(CartContext);
    useEffect(() => {
      const getData = async() => {
        //const data = await axios.get("http://localhost:5225/api/Product/" + productId).data;
        const data = productApi.getById(productId);
        setProduct(data);
      };
      getData();
    }, [productId]);

    const handleClick = async(e) => {
        // const data = await axios(`http://localhost:5225/api/Cart/${productId}/1`, 
        //             { 
        //                 method : "post",
        //                 withCredentials: true 
        //             }).data;
        let isContained = false;
        let newCart = [...cart];
        for (let i = 0; i < cart.length; ++i) {
          if (newCart[i].product.productId === productId) {
            newCart[i].quantity += 1;
            isContained = true;
          }
        }
        if (!isContained) {
          newCart.push({product, quantity: 1});
        }
        setCart(newCart);
        e.target.classList.add("sendtocart");
        setTimeout(function(){
          e.target.classList.remove('sendtocart');
        },250);
    }

    const handleError = (e) => {
      e.target.src = "./locmarket/assets/product-not-found.png";
    }

    return (
      <>
        <Topbar/>
        <Banner img = "banner.jpg"/>
        <ProductPath product={product}/>
        
        {
          product &&
          <div className="productContainer">
          <div className='productTop'>
            <div className="productLeft">
              <img src={product.image} alt="" className="productLeftImg" onError={handleError} />
            </div>
            <div className="productRight">
              <h1 className="productRightName">{product.name}</h1>
              <div className="productRightBottomContainer">
                <div className="productRightBottom">

                  <h2 className="productRightPrice">
                    <strong>Giá tiền: </strong>
                    {product.sellPrice}
                    </h2>
                    
                  <button className="productRightButton" onClick={(e) => handleClick(e)}>
                    Thêm vào giỏ hàng
                    <span className="cart-item"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <ProductRecommendation category={product.category}/>

            <p className="productRightDesc">
              Mô tả: {product.description}
            </p>
          </div>
          
        } 
      <Footer/>
      </>
    )
}
