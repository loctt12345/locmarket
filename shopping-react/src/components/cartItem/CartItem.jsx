import './cartItem.css';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';
import { CartContext } from '../../context/CartContext';
import { useState, useContext, useEffect } from 'react';
import {Link} from "react-router-dom"; 


export default function CartItem({item}) {
    const [quantityValue, setQuantityVale] = useState(item.quantity);
    const [isChanged, setIsChanged] = useState(false);
    const {cart, setCart} = useContext(CartContext);
    
    useEffect(() => {
        setQuantityVale(item.quantity);
    }, [item.quantity]);

    const handleRemove = () => {
        const removeCart = async () => {
            await axios("http://localhost:5225/api/Cart/" + item.product.productId, {
                method : "delete",
                withCredentials : true
            });
        }
        //removeCart();
        const newCart = cart.filter(c => c.product.productId !== item.product.productId);
        setCart(newCart);
    }

    const handleOnBlur = async() => {
        if (isChanged){
            // await axios(`http://localhost:5225/api/Cart/${item.product.productId}/${quantityValue}`, {
            //     method : "put",
            //     withCredentials : true
            // });
            const newCart = cart.map(c => {
                if (c.product.productId === item.product.productId) {
                    c.quantity = quantityValue;
                }
                return c;
            })
            setCart(newCart);
            setIsChanged(false);
        }
    }

    const handleOnChange = (e) => {
        setIsChanged(true);
        setQuantityVale(e.target.value);
    }

    const handleError = (e) => {
        e.target.src = "./locmarket/assets/product-not-found.png";
    }

    return (
        <div className='cartItemContainer'>
            <div className="cartItemLeft">
                <img src={item.product.image} alt="" className="cartItemImg" onError={handleError}/>
            </div>
            <div className="cartItemRight">
                <div className="cartItemRightTop">
                    <Link 
                    to={"/product/" + item.product.productId} style={{textDecoration:"none", color:"black", flex: "1"}}>
                        <h1 className="cartItemName">{item.product.name}</h1>
                    </Link>
                    <div className="cartItemCancel" onClick={handleRemove}><ClearIcon/></div>
                </div>
                <div className="cartItemRightBottom">
                    <div className="cartItemQuantity">
                        <label className='cartItemQuantityLabel' htmlFor={item.product.productId}>Số lượng: </label>
                        <input type="number" id={item.product.productId} 
                            className="cartItemQuantityInput" value={quantityValue}
                            onBlur={handleOnBlur}
                            onChange={(e) => handleOnChange(e)}
                            />
                    </div>
                    <div className="cartItemMulti"><ClearIcon fontSize='small'/></div>
                    <div className="cartItemPrice">
                        <span>{item.product.sellPrice}</span>
                    </div>
                    <div className="cartItemTotalPrice" key={item.product.sellPrice * item.quantity}>
                        <span>{item.product.sellPrice * item.quantity}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
