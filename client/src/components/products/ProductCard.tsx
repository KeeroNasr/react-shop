import { BsArrowRight } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { addToCart } from '../../store/shopSlice';
import { Product } from '../../utils/Product.interface';

const ProductCard = (props: { product: Product }) => {

  const dispatch = useDispatch();
  const nav = useNavigate();
  const id = props.product.title;
  const idToString = (id: string): string => {
    return String(id).toLowerCase().split(" ").join("");
  }
  const finalId = idToString(id);
  const handleNav = (): void => {
    nav(`/product/${finalId}`, {
      state: {
        item: props.product
      }
    });
  }
  const addItemHandler = () => {
    dispatch(addToCart({
      _id: props.product._id,
      title: props.product.title,
      image: props.product.image,
      price: props.product.price,
      quantity: 1,
      description: props.product.description
    }))
    toast.success(`${props.product.title} is added to the cart`)
    // console.log('from com', props.product);

  }
  return (
    <div className='group relative'>
      <div onClick={handleNav} className=' w-full h-96 cursor-pointer overflow-hidden'>
        <img className='w-full h-full object-cover group-hover:scale-110 duration-500' src={props.product.image} alt="" />
      </div>
      <div className=' w-full border-[1px] px-2 py-4'>
        <div className=' flex justify-between items-center'>
          <div>
            <h2 className=' font-title text-base font-bold'>
              {props.product.title.substring(0, 15)}
            </h2>
          </div>
          <div className='flex justify-end gap-2 overflow-hidden w-28 relative text-sm'>
            <div className='flex transform group-hover:translate-x-24 transition-transform gap-2 duration-500'>
              <p className='line-through text-gray-500'>${props.product.oldPrice}</p>
              <p className='font-semibold'>${props.product.price}</p>
            </div>
            <p onClick={addItemHandler} className='absolute z-20 w-[100px] text-gray-500 hover:text-gray-900 flex items-center gap-1 top-0 transform -translate-x-32 group-hover:translate-x-0 transition-transform cursor-pointer duration-500'>add to cart <span>
              <BsArrowRight /></span></p>
          </div>
        </div>
        <div>
          <p>{props.product.category}</p>
        </div>
        <div className='absolute top-4 right-0'>
          {props.product.isNew && <p className='bg-black text-white font-semibold font-title px-6 py-1'>
            Sale
          </p>}
        </div>
      </div>
      <ToastContainer position="top-left" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false}
        pauseOnFocusLoss draggable pauseOnHover theme="dark" />
    </div>
  )
}

export default ProductCard