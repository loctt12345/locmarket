import {productData} from './productData';

const getAll = (categoryId="", searchValue="") => {
    const result = productData.filter(p => p.category.categoryId.includes(categoryId) 
                                    && p.name.includes(searchValue));
    return result;
}

 const getById = (id) => {
    return productData.find(p => p.productId === id);
}

export const productApi = {getAll, getById};