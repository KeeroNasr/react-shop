import { getAuth, signInWithPopup, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import github from "../assets/github.png";
import google from "../assets/google.png";
import { addUser, removeUSer } from "../store/shopSlice";
import { RootState } from "../store/store";
import { app, provider } from "../utils/firebase";
const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userInfo = useSelector((state: RootState) => {
    return state.userInfo
  })
  const dispatch = useDispatch();
  const auth = getAuth(app);
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      setIsLoggedIn(true)
    }
  },[userInfo])
  const handleGooogleLogin = (e: React.MouseEvent) => {
    e.preventDefault();

    signInWithPopup(auth, provider).then((res) => {
      const user = res.user
      setIsLoggedIn(true)
      dispatch(addUser({
        id: user.uid,
        name: user.displayName,
        email: user.email,
        image: user.photoURL
      }))
      setTimeout(() => {
        navigate("/")
      }, 1500)
    }).catch((error) => console.log('fe mo4kla', error)
    )
  }
  const handleSignOut = () => {
    signOut(auth).then(() => {
      toast.success("Signed Out Successfully")
      dispatch(removeUSer())
      setIsLoggedIn(false)
    }).catch((error) => console.log("lesa ma3ml4 sign out", error)
    )
  }
  return (
    <div className="flex flex-col items-center justify-center h-52 w-full gap-10 py-20">
      {!isLoggedIn && <>
        <div className="flex items-center justify-between gap-10">
          <div onClick={handleGooogleLogin} className="text-base w-60 h-12 tracking-wide border-[1px] border-gray-400 rounded-md flex items-center justify-center gap-2 hover:border-blue-600 cursor-pointer duration-300">
            <img className="w-8" src={google} alt="google Logo" />
            <span className="text-sm text-gray-900">Login with Google</span>
          </div>
        </div>
        <div className="flex items-center justify-between gap-10 ">
          <div className="text-base w-60 h-12 tracking-wide border-[1px] border-gray-400 rounded-md flex items-center justify-center gap-2 hover:border-blue-600 cursor-pointer duration-300">
            <img className="w-8" src={github} alt="github Logo" />
            <span className="text-sm text-gray-900">Login with Github</span>
          </div>
        </div>
      </>}
      {isLoggedIn && <button onClick={handleSignOut} className="bg-black text-white text-base py-3 px-8 tracking-wide rounded-md hover:bg-gray-800 duration-300">Sign out</button>}
      <ToastContainer position="top-left" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false}
        pauseOnFocusLoss draggable pauseOnHover theme="dark" />
    </div>
  )
}

export default Login