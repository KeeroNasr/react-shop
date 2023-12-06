import axios from "axios";
// import { Product } from "../utils/Product.interface";
// import { db } from "../utils/firebase";
// import { Product } from "../utils/Product.interface";
                                                                                                                                                                                                                                                                                                                                                                      

export async function getProductsList() {
  const products = await axios.get(
    "https://fakestoreapiserver.reactbd.com/products"
  );
  return products.data;
}

// export async function addItemsToCart(data: Product) {
  
// }
