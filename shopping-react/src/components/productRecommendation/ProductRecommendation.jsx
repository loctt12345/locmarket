import { useEffect, useState } from 'react';
import './productRecommendation.css';
import axios from 'axios';
import ProductCard from '../productCard/ProductCard';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function ProductRecommendation({category}) {
    
    const [recomProducts, setRecomProducts] = useState([]);
    const responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5,
        slidesToSlide: 3 // optional, default to 1.
      }
    };

    useEffect(() => {
        const getData = async() => {
          const data = await axios.get(`http://localhost:5225/api/Product?categoryId=${category.categoryId}`);
          setRecomProducts(data.data);
        } 
        getData();
    }, [category]);

    return (
      <>
        <h3 className="title">Các sản phẩm cùng loại: </h3>
        <Carousel
            showDots={true}
            responsive={responsive}
            itemClass="productRecommendationContainer"
          >
            {
              recomProducts.map((p, index) => {
                return <ProductCard key={index} product = {p}/>
              })
            } 
          
        </Carousel>
        </>
    )
}
