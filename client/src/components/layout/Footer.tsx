import { BsPaypal, BsPersonFill } from "react-icons/bs";
import { FaFacebookF, FaGithub, FaHome, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import logo from "../../assets/logo.png";
import payments from "../../assets/payments.png";
const Footer = () => {
  return (
    <div className=" bg-black text-[#949494] py-20 font-title">
      <div className=" max-w-screen-xl mx-auto grid grid-cols-4">
        <div className="flex flex-col gap-7">
          <img className="w-32" src={logo} alt="logo" />
          <p className="text-white text-sm tracking-wide">@ ReactBD.com</p>
          <img className="w-56" src={payments} alt="payments" />
          <div className="flex items-center justify-start gap-5 text-lg text-gray-400">
            <FaGithub className=" hover:text-white duration-300 cursor-pointer" />
            <FaFacebookF className=" hover:text-white duration-300 cursor-pointer" />
            <FaYoutube className=" hover:text-white duration-300 cursor-pointer" />
            <FaInstagram className=" hover:text-white duration-300 cursor-pointer" />
            <FaTwitter className=" hover:text-white duration-300 cursor-pointer" />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">Locate Us</h2>
          <div>
            <p>
              Engalnd,UK
            </p>
            <p>mobile: 90129303098910</p>
            <p>phone: 90201380192</p>
            <p>e-mail:react-shop@mail.com </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">Profile</h2>
          <div className="flex flex-col gap-2 text-base">
            <p className="flex items-center gap-3 hover:text-white duration-300 cursor-pointer"> <span><BsPersonFill /></span>My Acctount</p>
            <p className="flex items-center gap-3 hover:text-white duration-300 cursor-pointer"> <span><BsPaypal /></span>Checkout</p>
            <p className="flex items-center gap-3 hover:text-white duration-300 cursor-pointer"> <span><FaHome /></span>Order Tracking</p>
            <p className="flex items-center gap-3 hover:text-white duration-300 cursor-pointer"> <span><MdLocationOn /></span>Help & Support</p>
          </div>
        </div>
        <div className=" flex flex-col justify-center">
          <input className=" bg-transparent border px-4 py-2 text-sm" placeholder="e-mail" type="text" />
          <button className="text-sm border text-white border-t-0 hover:bg-gray-900 active:bg-white active:text-black">Subscribe</button>
        </div>
      </div>
    </div>
  )
}

export default Footer