import { createContext } from "react";
import { Product } from '../utils/Product.interface';

export const CartContext = createContext({
    items: [] as Product[],
    // updatePrice:() =>{}
    
});
