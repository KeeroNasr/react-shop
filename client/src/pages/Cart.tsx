import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import StripeCheckout, { Token } from "react-stripe-checkout"
import { ToastContainer, toast } from "react-toastify"
import CartitemDetails from "../components/CartitemDetails"
import { RootState } from "../store/store"
import { Product } from "../utils/Product.interface"
import { User } from "../utils/User.interface"

const Cart = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [payNow, setPayNow] = useState(false)
  const products = useSelector((state: RootState) => {
    return state.shop.productData
  })
  const userInfo: User | null = useSelector((state: RootState) => {
    return state.shop.userInfo
  })

  const onToken = async(token:Token) => {
    await axios.post("http://localhost:8000/pay", {
      amount: totalPrice * 100,
      token:token
    })
  }

  useEffect(() => {
    let price = 0;
    products.map((product: Product) => {
      if (product.quantity) {
        price += product.price * product.quantity;
        return price
      }
    })

    setTotalPrice(price)
  }, [products])

  const handleCheckout = () => {
    if (userInfo) {
      setPayNow(true);
    } else {
      toast.error("please login to continue")

    }
  }

  return (
    <div>
      <img className="w-full h-60 object-cover" src="https://images.pexels.com/photos/1435752/pexels-photo-1435752.jpeg?auto-compres" alt="cart-image" />
      <div className="max-w-screen-xl mx-auto py-20 flex">
        <CartitemDetails />
        <div className="w-1/3 bg-[#fafafa] py-6 px-4">
          <div className="flex flex-col gap-6 border-b-[1px] border-b-gray-400 pb-6">
            <h2 className="text-2xl font-medium">Total</h2>
            <p className="flex items-center gap-4 text-base">
              SubTotal: <span className="font-title font-bold text-lg">$ {totalPrice}</span>
            </p>
            <p className="flex items-start gap-4 text-base">
              Shipping: <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae sunt necessitatibus, voluptate suscipit illum temporibus autem earum praesentium, consectetur, officia reprehenderit quo facere placeat quidem hic expedita adipisci voluptatum consequuntur!</span>
            </p>
          </div>
          <p className="flex justify-between gap-4 font-title font-semibold mt-6">
            Total price: <span className="text-xl font-bold">$ {totalPrice}</span>
          </p>
          <button onClick={handleCheckout} className="text-base bg-black text-white w-full py-3 mt-6 hover:bg-slate-800 duration-300"> continue to checkout</button>
          {payNow && <div className="w-full mt-6 flex items-center justify-center">
            <StripeCheckout allowRememberMe={true} stripeKey="pk_test_51OK4fwKzES4I664FPyUqCUnO6r4ybdRN4x3jibYH6bdzjAJANUEudNHw2dJBz6GbdejmiioQeFiZNq5oH4MKmdsY00BBZR3XkK" name="react-shop" amount={totalPrice*100} label="pay to shop" description={`you will pay ${totalPrice}`} token={onToken} email={userInfo?.email}/>
          </div>}
        </div>
      </div>
      <ToastContainer position="top-left" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false}
        pauseOnFocusLoss draggable pauseOnHover theme="dark" />
    </div>
  )
}

export default Cart