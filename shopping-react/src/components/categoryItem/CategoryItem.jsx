import './categoryItem.css';
import { CategoryContext } from '../../context/CategoryContext';
import { SearchContext } from '../../context/SearchContext';
import { useContext, useEffect} from 'react'
import axios from 'axios';
import { Buffer } from 'buffer';

export default function CategoryItem({category}) {
  
    const {setCategory} = useContext(CategoryContext);
    const {setSearch} = useContext(SearchContext);

    const handleClick = () => {
        setCategory(category);
        setSearch("");
    }

    return (
        <div className='categoryItemContainer'>
            <button className="categoryItemBtn" onClick={handleClick}>
                <img src={`https://picsum.photos/200?random&dummyParam=${category.categoryId}`} className='categoryItemImg' />
                <span>{category.name}</span>
            </button>
        </div>
    )
}
