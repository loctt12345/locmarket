import './rightbar.css';
import ProductCard from '../productCard/ProductCard';
import {useEffect, useState, useMemo, useContext} from 'react';
import Pagination from '../pagination/Pagination';
import axios from 'axios';
import { SearchContext } from '../../context/SearchContext';
import { CategoryContext } from '../../context/CategoryContext';
import FeaturedProduct from '../featuredProduct/FeaturedProduct';
import { SearchOutlined} from '@mui/icons-material';
import Banner from '../banner/Banner';
import FeaturedCategory from '../featuredCategory/FeaturedCategory';


let PageSize = 40;

export default function Rightbar() {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const {search} = useContext(SearchContext);
  const {category} = useContext(CategoryContext);

  useEffect(() => {
    const getProducts = async() => {
      const data = await axios
      .get(`http://localhost:5225/api/Product?q=${search}&&categoryId=${category == null?"":category.categoryId}`);
      setProducts(data.data);
      setCurrentPage(1);
    }
    getProducts();
  }, [search, category]);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return products.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, products]);

  return (
    <div className="rightbarContainer">
        {search.length===0 && category===null && 
            <div className='rightbarHome'>
              <Banner img="saleBanner1.jpg"/>
              <FeaturedProduct/>
              <div className="rightbarHomeBannerContainer">
                <Banner img={"saleBanner.webp"}/> 
                <Banner img={"saleBanner.webp"}/> 
                <Banner img={"saleBanner.webp"}/> 
              </div>
              
              <FeaturedCategory/>
            </div>}
        {(search.length !==0 || category !== null) &&
          <div className="rightbarSeach">
              <div className="rightbarSearchTitle">
                  <SearchOutlined/>
                  <h3 className="">Kết quả tìm kiếm: </h3>
              </div>
              <div className="rightbarSearchProducts">
                {

                  currentTableData.map(product => 
                    <ProductCard key={product.productId} product={product} buyButton />
                  )
                  
                }
                <Pagination
                      className="pagination-bar"
                      currentPage={currentPage}
                      totalCount={products.length}
                      pageSize={PageSize}
                      onPageChange={page => setCurrentPage(page)}
                />   
              </div>       
          </div>
        }
    </div>
  )
}
