import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import cart from "../../assets/cart.svg";
import logo from "../../assets/logo.png";
import { RootState } from "../../store/store";
import { User } from "../../utils/User.interface";
const Header = () => {
  const productsQuantity = useSelector((state: RootState) => {
    if (Array.isArray(state.shop.productData)) {
      const totalQuantity = state.shop.productData.reduce((acc, item) => acc + (item.quantity ?? 0), 0);
      return totalQuantity;
    } else {
      return 0;
    }
  });
  const userInfo: User | null = useSelector((state: RootState) => {
    return state.shop.userInfo
  })
  return (
    <div className=" block w-full h-20 bg-white border-b-[1px] border-b-gray-800 font-title sticky top-0 z-10">
      <div className=" max-w-screen-xl h-full mx-auto flex items-center justify-between">
        <Link to="/">
          <div>
            <img className=" w-28" src={logo} alt="shop" />
          </div>
        </Link>
        <div className="flex items-center gap-8">
          <ul className="flex items-center gap-8">
            <Link to="/">
              <li className="text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300">Home</li>
            </Link>
            <li className="text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300">Pages</li>
            <li className="text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300">Shop</li>
            <li className="text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300">Element</li>
            <li className="text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300">Blog</li>
          </ul>
          <Link to="/cart">
            <div className="relative">
              <img src={cart} className="w-7" alt="" />
              <span className="absolute w-6 top-2 left-0.5 text-sm flex items-center justify-center font-semibold font-title">{productsQuantity}</span>
            </div>
          </Link>
          <Link to="/login">
            {!userInfo && <button className="text-lg font-title font-bold">Login</button>}
            {userInfo &&
              <div className="flex items-center gap-5">
                <img className="w-8 h-8 rounded-full" src={userInfo.image} alt={`${userInfo.name}`} />
                <p className="text-base font-title font-semibold">{userInfo.name}</p>
              </div>
            }
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
