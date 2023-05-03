import { useContext } from 'react';
import {CategoryContext} from '../../context/CategoryContext';
import './productPath.css';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';


export default function ProductPath({product}) {

    const navigate = useNavigate();
    const {setSearch} = useContext(SearchContext);
    const {category, setCategory} = useContext(CategoryContext);

    const handleHomeClick = () => {
        setSearch("");
        setCategory(null);
        navigate("/");
    }

    const handleCategoryClick = () => {
        setSearch("");
        setCategory(product?product.category : category);
        navigate("/");
    }

    return (
        <div className='productPathContainer'>
            <h3> 
                <a href="#" style={{color : "black"}} onClick={handleHomeClick}>Trang chủ</a> 
                /
                <a href="#" style={{color : "black"}} onClick={handleCategoryClick}> {product? product.category.name : category?category.name:null}</a> 
                /
                { product &&  <span>  {product.name}</span>}
            </h3>
        </div>
    )
}
