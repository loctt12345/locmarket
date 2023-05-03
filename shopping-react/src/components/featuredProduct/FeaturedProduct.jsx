import { useEffect, useState } from 'react';
import './featuredProduct.css';
import axios from 'axios';
import ProductCard from '../productCard/ProductCard';
import StarIcon from '@mui/icons-material/Star';
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';



export default function FeaturedProduct() {

    const [products, setProducts] = useState([]);
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4,
          slidesToSlide: 1 // optional, default to 1.
        }
      };

    useEffect(() => {
        const getData = async() => {
            const data = await axios.get("http://localhost:5225/api/Product/");
            setProducts(data.data.slice(1, 9));
        }
        getData();
    }, []);

    return (
        <div className='featuredProductContainer'>
            <div className="featureProductTitle">
                <StarIcon/>
                <h2>Sản phẩm nổi bật: </h2>
            </div>
            <div className="featuredProductList">
                <Carousel
                    showDots={true}
                    responsive={responsive}
                    containerClass="featuredProductList-carousel-container"
                    itemClass='featuredProductList-carousel-item'
                >
                    {
                        products.map((p, index) => {
                            return <ProductCard key={index} product={p} buyButton />
                        })
                    }
                </Carousel>
            </div>
        </div>
    )
}
