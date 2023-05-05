import "./productCard.css";
import {Link} from "react-router-dom"; 

export default function ProductCard({product, buyButton}) {

    const handleError = (e) => {
        e.target.src = "./locmarket/assets/product-not-found.png";
    }
    return ( 
    <>{ product===null?"Loading":
        <div className="productCardContainer">
            <Link to={"/product/" + product.productId}
                style={{textDecoration : "none", color: "black"}}>
            <div className="productCard">
                <div className="productCardName">
                    <h4>{product.name}</h4>
                </div>
                <img src={product.image} alt="" className="productCardImg" onError={handleError}/>
                <div className="productCardPrice">
                    <h3>{product.sellPrice}</h3>
                </div>
                { buyButton && <button className="productCardBuyBtn">
                    Mua
                </button>}
            </div>
            </Link>
        </div>
    }
    </>)
}
