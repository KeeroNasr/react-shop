import { useEffect, useState } from "react";
import { MdOutlineStar } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { getProductDetails, updateProductQuantity } from "../../api/Api";
import { getTotalQuantityAsync, updateCart } from "../../store/shopSlice";
import { AppDispatch } from "../../store/store";
import { Product } from "../../utils/Product.interface";

const ProductDetails = () => {
  const dispatch: AppDispatch = useDispatch();
  const [baseQuantity, setBaseQuantity] = useState(1)
  const [product, setProduct] = useState<Product>();
  const data = useLocation();
  useEffect(() => {
    setInitialData()
  })
  const setInitialData = () => {
    setProduct(data.state.item)
    if (product) {
      getProductDetails(product?._id).then((data) => {
        if (data?.quantity) {
          setBaseQuantity(data?.quantity)
        }
      })
    }
  }
  const handleQuantityUpdate = (quantityAction: string) => {
    if (quantityAction === 'decreament' && product) {
      if (baseQuantity >= 2) {
        setBaseQuantity((prev) => prev - 1)
      } else if (baseQuantity === 0) {
        setBaseQuantity(1)
      }
      updateProductQuantity(product?._id, quantityAction)
      dispatch(getTotalQuantityAsync());
    } else if (quantityAction === 'increament' && product) {
      setBaseQuantity((prev) => prev + 1)
      updateProductQuantity(product?._id, quantityAction);
      dispatch(getTotalQuantityAsync());
    }
    // dispatch(updateTotalPrice())
  }


  let content;
  if (product) {
    content =
      <div className="max-w-screen-xl mx-auto my-10 flex gap-10">
        <div className="w-2/5 relative">
          <img className="w-full h-[550px] object-cover" src={product.image} alt={product.title} />
          <div className='absolute top-4 right-0'>
            {product.isNew &&
              <p className="bg-black text-white font-semibold font-title px-8  py-1">Sale</p>
            }</div>
        </div>
        <div className="w-3/5 flex flex-col justify-center gap-12">
          <div>
            <h2 className="text-4xl font-semibold">
              {product.title}
            </h2>
            <div className='flex items-center gap-4 mt-3 '>
              <p className='line-through text-gray-500'>${product.oldPrice}</p>
              <p className='font-semibold'>${product.price}</p>
            </div>
          </div>
          <div className=" flex items-center gap-2 text-base">
            <div className="flex">
              <MdOutlineStar />
              <MdOutlineStar />
              <MdOutlineStar />
              <MdOutlineStar />
              <MdOutlineStar />
            </div>
            <p className="text-xs text-gray-500">(1 Customer review)</p>
          </div>
          <p className="text-xs text-gray-500 mt-3">{product.description}</p>
          <div className="flex gap-4">
            <div className="w-52 flex ite justify-between text-gray-500 gap-4 border p-3">
              <p className="text-sm">Quantity</p>
              <div className="flex items-center gap-4 text-sm font-semibold">
                <button onClick={() => handleQuantityUpdate('decreament')}
                  className="border h-5 font-normal text-lg flex items-center justify-center px-2 hover:bg-gray-700 hover:text-white cursor-pointer duration-300 active:bg-black">-</button>
                {product.quantity !== baseQuantity && <span>{baseQuantity}</span>}
                <button onClick={() => {
                  handleQuantityUpdate('increament')
                }} className="border h-5 font-normal text-lg flex items-center justify-center px-2 hover:bg-gray-700 hover:text-white cursor-pointer duration-300 active:bg-black">+</button>
              </div>
            </div>
            <button onClick={() => dispatch(updateCart({
              _id: product._id,
              title: product.title,
              image: product.image,
              price: product.price,
              quantity: baseQuantity,
              description: product.description
            })) && toast.success(`${product.title} is added successfuly`)} className="bg-black text-white py-3 px-6 active:bg-gray-800">
              Add To Cart
            </button>
          </div>
          <p className="text-base text-gray-500">Category : <span className="font-medium capitalize">{product.category}</span></p>
        </div>
        <ToastContainer position="top-left" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false}
          pauseOnFocusLoss draggable pauseOnHover theme="dark" />
      </div>
  } else {
    content = <p>Loading Product</p>
  }

  return (
    <div>
      {content}
    </div>
  )
}

export default ProductDetails