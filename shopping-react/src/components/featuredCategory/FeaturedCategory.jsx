import { useEffect, useState } from 'react';
import './featuredCategory.css';
import axios from 'axios';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from '../productCard/ProductCard';
import ElectricBoltOutlinedIcon from '@mui/icons-material/ElectricBoltOutlined';


export default function FeaturedCategory() {

    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(null);
    const [products, setProducst] = useState([]);

    const responsive1 = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 5,
          slidesToSlide: 3 // optional, default to 1.
        }
    };

    const responsive2 = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4,
          slidesToSlide: 3 // optional, default to 1.
        }
    };

    useEffect(() => {
        const getData = async() => {
            const data = await axios.get(`http://localhost:5225/api/Product?categoryId=${category.categoryId}`);
            setProducst(data.data);
        }
        getData();
    }, [category]);

    useEffect(() => {
        const getData = async() => {
            const data = await axios.get(`http://localhost:5225/api/Product/Category`);
            setCategories(data.data);
            setCategory(data.data[0]);
        }
        getData();
    }, []);

    const handleCateClick = (e, cate) => {
        setCategory(cate);
    }

    return (
        <div className='featuredCategoryContainer'>
            <div className="featuredCategoryTitle">
                <ElectricBoltOutlinedIcon/>
                <h3>Các thể loại bán chạy:</h3>
            </div>
            <div className="featuredCategoryBar">
                <Carousel
                    responsive={responsive1}
                    containerClass='featuredCategoryCarouselContainer'
                    itemClass='featuredCategoryCarouselItem'
                >
                    {
                        categories.map((cate, index) => {
                            return (
                                <div key={index} 
                                    className="featuredCategoryItem"
                                    onClick={(e) => handleCateClick(e, cate)}
                                >
                                    <div>
                                        <div className="featuredCategoryImgContainer">
                                            <img src={`https://picsum.photos/200?random&dummyParam=${cate.categoryId}`}
                                                alt="" className="featuredCategoryImg" />
                                        </div>
                                        <span>{cate.name}</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </Carousel>
            </div>
            <div className="featuredCategoryList">
                <Carousel
                    showDots={true}
                    responsive={responsive2}
                    containerClass='featuredCategoryListCarouselContainer'
                    itemClass='featuredCategoryListCarouselItem'
                >
                {
                    products.map((p, index) => {
                        return (
                            <ProductCard key={index} product={p} buyButton />
                        )
                    })
                }
                </Carousel>
            </div>
        </div>
    )
}
