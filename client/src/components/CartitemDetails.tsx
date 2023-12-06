import { BsArrowLeft } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { decreamentQuantity, deleteItem, increamentQuantity, resetCart } from "../store/shopSlice";
import { RootState } from '../store/store';
import { Product } from "../utils/Product.interface";

const CartitemDetails = () => {
    const dispatch = useDispatch()
    const products = useSelector((state: RootState) => {
        return state.shop.productData;
    })
    return (
        <div className='w-2/3 pr-10'>
            <div className="w-full">
                <h2 className="font-title text-2xl">Shopping Cart</h2>
            </div>
            <div>
                {
                    products.map((product: Product) => {
                        return (
                            <div key={product._id} className="flex items-center justify-between gap-6 mt-6">
                                <div className="flex items-center gap-2">
                                    <MdOutlineClose onClick={() => dispatch(deleteItem(product._id)) && toast.error(`${product.title} is removed `)}
                                        className="text-xl text-gray-600 hover:text-red-600 cursor-pointer duration-300" />
                                    <img className="w-32 h-32 object-cover" src={product.image} alt={product.title} />
                                </div>
                                <h2 className="w-52">{product.title}</h2>
                                <p>${product.price}</p>
                                <div className="w-52 flex ite justify-between text-gray-500 gap-4 border p-3">
                                    <p className="text-sm">Quantity</p>
                                    <div className="flex items-center gap-4 text-sm font-semibold">
                                        <span className="border h-5 font-normal text-lg flex items-center justify-center px-2 hover:bg-gray-700 hover:text-white cursor-pointer duration-300 active:bg-black" onClick={() => {
                                            if(product.quantity){
                                                dispatch(decreamentQuantity({
                                                    _id: product._id,
                                                })
                                                )
                                            }
                                            if (product.quantity === 1) {
                                                dispatch(deleteItem(product._id))
                                                toast.success(`${product.title} removed`)
                                            }
                                        }}> - </span>
                                        <span>{product.quantity}</span>
                                        <span className="border h-5 font-normal text-lg flex items-center justify-center px-2 hover:bg-gray-700 hover:text-white cursor-pointer duration-300 active:bg-black" onClick={() => {
                                            if(product.quantity) {     
                                            dispatch(increamentQuantity({
                                                    _id: product._id,
                                            }))
                                            }
                                        }}>+</span>
                                    </div>
                                </div>
                                {product.quantity && <p className="w-14">${product?.quantity * product.price}</p>}
                            </div>
                        )
                    })}
            </div>
            {products.length > 1 && <button className="bg-red-500 text-white mt-8 ml-7 py-1 px-6 hover:bg-red-800 duration-300" onClick={() => dispatch(resetCart()) && toast.error('all items removed and cart is empty now ;(')}>Remove all items</button>}
            <Link to="/"><button className="mt-8 ml-7 flex items-center gap-1 text-gray-400 hover:text-black duration-300">
                <span><BsArrowLeft /></span> {products.length >= 1 ? ' Continue Shopping' : 'Back to Shopping'}</button></Link>
            <ToastContainer position="top-left" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false}
                pauseOnFocusLoss draggable pauseOnHover theme="dark" />
        </div>
    )
}

export default CartitemDetails