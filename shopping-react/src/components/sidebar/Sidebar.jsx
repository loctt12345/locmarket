import { useEffect, useState } from 'react'
import './sidebar.css'
import CategoryItem from '../categoryItem/CategoryItem';
import { categoryApi } from '../../data/categoryFakeApi';

export default function Sidebar() {

    const [categories, setCategories] = useState([]);
    


    useEffect(() => {
        const getData = async () => {
            //const data = await axios.get("http://localhost:5225/api/Product/Category").data;
            const data = categoryApi.getAll();
            setCategories(data);
        }
        getData();
    }, []);

    return (
        <div className="sidebarContainer">
            <div className="sidebar">
                <div className="sidebarCategory">
                    <h3 className="sidebarCategoryTitle">
                        Thể loại
                    </h3>
                    <ul className="sidebarCategoryList" >
                        {
                            categories.map((cate, index) => {
                                if (cate.name.length > 0)
                                return ( 
                                    <li className="sidebarCategoryItem" key={index}>
                                        <CategoryItem key={index} category={cate}/>
                                    </li>
                                )
                            })
                        }                 
                       
                    </ul>                
                </div>
                
            </div>
        </div>
  )
}
