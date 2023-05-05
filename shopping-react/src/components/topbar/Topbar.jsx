import "./topbar.css";
import { SearchOutlined} from '@mui/icons-material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useContext, useEffect, useRef, useState } from "react";
import {SearchContext} from "../../context/SearchContext";
import {CategoryContext} from "../../context/CategoryContext";
import { CartContext } from '../../context/CartContext';
import {Link, useNavigate} from "react-router-dom"; 
import axios from "axios";
import { categoryApi } from "../../data/categoryFakeApi";

export default function Topbar() {

    const [categories, setCategories] = useState([]);
    const {cart} = useContext(CartContext);
    const {setSearch} = useContext(SearchContext);
    const {setCategory} = useContext(CategoryContext);
    const searchBarValue = useRef();
    const navigate = useNavigate();
        
    useEffect(() => {
        const getData = async() => {
            //const data = await axios.get("http://localhost:5225/api/Product/Category").data;
            const data = categoryApi.getAll();
            setCategories(data.slice(30, 38));
        }
        getData();
    }, []);

    const handleClick = () => {
        setSearch(searchBarValue.current.value);
        navigate('/');
    }


    const handleClickLogo = () => {
        setSearch("");
        setCategory(null);
        navigate('/');
    }

    const handleClickCate = (e, cate) => {
        setCategory(cate);
        setSearch("");
        navigate("/");  
    }

    return (
        <>
        <div className="topbar">
            <div className="topbarLeft" onClick={handleClickLogo}>
                    <h2 className="topbarLogo">
                        LOCMARKET
                    </h2>
            </div>
            <div className="topbarCenter">
                <div className="topbarSearchBar">
                    <SearchOutlined className="topbarSearchIcon" />
                    <input 
                        type="text" 
                        className="topbarSearchInput"
                        placeholder="Tìm kiếm sản phẩm"
                        ref={searchBarValue}
                    />
                    <button className="topbarSearchButton"
                            onClick={handleClick}>
                        <SearchOutlined className="" />
                    </button>
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarActions">
                        <div className="topbarCartIcon">
                            <Link to="/cart" style={{color: "white"}}>
                                <ShoppingCartIcon className="cartIcon"/>
                                <span className="topbarIconBadge">{cart.length}</span>
                            </Link>
                            
                        </div>
                        
                        <AccountCircleIcon fontSize="large" className="topbarProfileIcon" />
                </div>
            </div>
        </div>
        <div className="topbarBottom">
            {
                categories.map((cate, index) => {
                    return <span className="topbarBottomItem" 
                                 key={index} onClick={(e) =>handleClickCate(e, cate)}
                                 >{cate.name}
                            </span>
                })
            }
        </div>
        </>
    )
}
