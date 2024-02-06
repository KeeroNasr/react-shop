import { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { getAllProductsInCart } from "../api/Api";
import { getTotalQuantityAsync, resetCart } from "../store/shopSlice";
import { AppDispatch } from "../store/store";
import { Product } from "../utils/Product.interface";
import ProductItem from "./products/ProductItem";

const CartitemDetails = () => {
const [products,setProducts] = useState<Product[]>([])
    const dispatch: AppDispatch = useDispatch();
    useEffect(() => {
        // Fetch the list of products in the cart when the component mounts
        getall();
        dispatch(getTotalQuantityAsync())
    }, [products.length]);

    const getall = () => {
      getAllProductsInCart()
            .then((products) => setProducts(products) )
            .catch((error) => console.error('Error fetching products:', error));
    }
    return (
        <div className='w-2/3 pr-10'>
            <div className="w-full">
                <h2 className="font-title text-2xl">Shopping Cart</h2>
            </div>
            {products.length >= 1 &&
                <div>
                    {products.map((product: Product) => {
                        if (product) {
                            return <ProductItem key={product._id} product={product} />
                        }
                    })}
                </div>
            }
            {products.length <= 0 &&
                <div>your cart is empty please add some products</div>
            }
            {products.length > 1 && <button className="bg-red-500 text-white mt-8 ml-7 py-1 px-6 hover:bg-red-800 duration-300" onClick={() => dispatch(resetCart()) && toast.error('all items removed and cart is empty now ;(')}>Remove all items</button>
            }
            <Link to="/"><button className="mt-8 ml-7 flex items-center gap-1 text-gray-400 hover:text-black duration-300">
                <span><BsArrowLeft /></span> {products.length >= 1 ? ' Continue Shopping' : 'Back to Shopping'}</button></Link>
            <ToastContainer position="top-left" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
        </div>
    )
}

export default CartitemDetails