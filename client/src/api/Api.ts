import axios from "axios";
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { Product } from "../utils/Product.interface";
import { firestoreDB } from "../utils/firebase";
// import { db } from "../utils/firebase";
// import { Product } from "../utils/Product.interface";

const cartRef = collection(firestoreDB, '/cart');

export async function getProductsList() {
  const products = await axios.get(
    "https://fakestoreapiserver.reactbd.com/products"
  );
  return products.data;
}

export const addProduct = async (product: Product) => {
  try {
    const productId = product._id.toString(); // Assuming the product already has an ID
    const existingProductDoc = await getDoc(doc(cartRef, productId));

    if (existingProductDoc.exists()) {
      // Product already exists in the cart, update the quantity
      const existingProductData = existingProductDoc.data();
      const updatedQuantity = existingProductData.quantity + 1;

      const updatedProduct = { ...existingProductData, quantity: updatedQuantity };
      await setDoc(doc(cartRef, productId), updatedProduct);
    } else {
      // Product doesn't exist in the cart, add the new product
      const updatedProduct = { ...product, id: productId, quantity: 1 };
      await setDoc(doc(cartRef, productId), updatedProduct);
    }

    // Further processing or updating state with the updatedProduct
  } catch (error) {
    console.error('Error adding product:', error);
    // Handle the error or display an error message to the user
  }
};

export const updateProductQuantity = async (productId: number, quantityAction: string) => {
  const product = await getDoc(doc(cartRef, productId.toString()));
  let existingProductData = product.data();
  if (product.exists() && quantityAction === 'increament'&& existingProductData) {

    const updatedQuantity = existingProductData.quantity + 1;
    const updatedProduct = { ...existingProductData, quantity: updatedQuantity };
    await setDoc(doc(cartRef, productId.toString()), updatedProduct);
    
  } else if (product.exists() && quantityAction === 'decreament' && existingProductData) {
    
    const updatedQuantity = existingProductData.quantity - 1;
    const updatedProduct = { ...existingProductData, quantity: updatedQuantity };
    await setDoc(doc(cartRef, productId.toString()), updatedProduct);
  }
}

export const getProductDetails = async (productId: number) => {
  const product = await getDoc(doc(cartRef, productId.toString()));
  let productDetails = product.data() as Product;
  if (productDetails) {
    return productDetails
  } else {
    return
  }
}
export const getAllProductsInCart = async () => {
  try {
    const querySnapshot = await getDocs(cartRef);
    const productsInCart: Product[] = [];

    querySnapshot.forEach((doc) => {
      const productData = doc.data() as Product;
      productsInCart.push(productData);
    });

    return productsInCart;
  } catch (error) {
    console.error('Error getting products from the cart:', error);
    // Handle the error or display an error message to the user
    return [];
  }
};

export const removeProductFromCart = async(productId:number) => {
  await deleteDoc(doc(cartRef,productId.toString()));
}
export async function getTotalQuantity(): Promise<number> {
  try {
    const productsInCart = await getAllProductsInCart();
    const totalQuantity = productsInCart.reduce((total, product) => {
      // Use optional chaining to handle the case where product.quantity is undefined
      const productQuantity = product.quantity ?? 0;
      return total + productQuantity;
    }, 0);

    return totalQuantity;
  } catch (error) {
    console.error('Error calculating total quantity:', error);
    // Handle the error or display an error message to the user
    return 0;
  }
};

