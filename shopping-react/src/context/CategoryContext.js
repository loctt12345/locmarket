import { createContext } from "react";

export const CategoryContext = createContext({
    category : null,
    setCategory : (category) => {}
});
