import { useEffect, useState } from 'react';
import { MdOutlineClose } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { decreamentQuantity, deleteItem, getTotalQuantityAsync, increamentQuantity } from '../../store/shopSlice';
import { AppDispatch } from '../../store/store';
import { Product } from '../../utils/Product.interface';

const ProductItem = (props: { product: Product }) => {
    // You can manage quantity and update it using a state if needed
    const [quantity, setQuantity] = useState(props.product.quantity);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        setQuantity(props.product.quantity)
    }, [props.product])

    const handleQuantityUpdate = (productId: number, quantityAction: string) => {
        if (quantityAction === 'increament') {
            dispatch(increamentQuantity(productId))
            dispatch(getTotalQuantityAsync());
            if(quantity)setQuantity(quantity + 1)
        } else {
    dispatch(decreamentQuantity(productId))
    dispatch(getTotalQuantityAsync());
        if(quantity)setQuantity(quantity - 1)
        }
    }

    return (
        <>
            <div key={props.product._id} className="flex items-center justify-between gap-6 mt-6">
                <div className="flex items-center gap-2">
                    <MdOutlineClose onClick={() => dispatch(deleteItem(props.product._id)) && toast.error(`${props.product.title} is removed `)}
                        className="text-xl text-gray-600 hover:text-red-600 cursor-pointer duration-300" />
                    <img className="w-32 h-32 object-cover" src={props.product.image} alt={props.product.title} />
                </div>
                <h2 className="w-52">{props.product.title}</h2>
                <p>${props.product.price}</p>
                <div className="w-52 flex ite justify-between text-gray-500 gap-4 border p-3">
                    <p className="text-sm">Quantity</p>
                    <div className="flex items-center gap-4 text-sm font-semibold">
                        <span className="border h-5 font-normal text-lg flex items-center justify-center px-2 hover:bg-gray-700 hover:text-white
                        cursor-pointer duration-300 active:bg-black" onClick={() => {
                            if (props.product) {
                                handleQuantityUpdate(props.product._id, 'decreament')
                            }
                            if (props.product.quantity === 1) {
                                dispatch(deleteItem(props.product._id))
                                dispatch(getTotalQuantityAsync());
                                toast.success(`${props.product.title} removed`)
                            }
                        }}> - </span>
                        <span>{quantity}</span>
                        <span className="border h-5 font-normal text-lg flex items-center justify-center px-2 hover:bg-gray-700 hover:text-white
                        cursor-pointer duration-300 active:bg-black" onClick={() => {
                            if (props.product) {
                                handleQuantityUpdate(props.product._id, 'increament')
                            }
                        }}>+</span>
                    </div>
                </div>
                {props.product.quantity && <p className="w-14">${props.product?.quantity * props.product.price}</p>}
            </div>
        </>
    );
}

export default ProductItem