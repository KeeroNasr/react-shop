import { useState } from "react";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const data = ["https://amazonproone.vercel.app/static/media/img2.bc1bdb910ead16c65197.jpg",
    "https://amazonproone.vercel.app/static/media/img5.aa945e25375bfdee385f.jpg",
    "https://amazonproone.vercel.app/static/media/img3.c80809bb40bee5c34372.jpg",
    "https://amazonproone.vercel.app/static/media/img1.efb3d39101f7ef77d616.jpg",]
  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? 3 : (prev:number) => prev - 1)
  }
  const nextSlide = () => {
    setCurrentSlide(currentSlide === 3 ? 0 : (prev:number) => prev + 1)
    
  }
  return (
    <div className=" w-full h-auto overflow-x-hidden">
      <div className="w-screen h-[650px] relative">
        <div className="w-[400vw] h-full flex transition-transform duration-1000" style={{transform:`translateX(-${currentSlide * 100 }vw)`}}>
          <img className=" w-screen h-full" src={data[currentSlide]} alt="image1" loading="eager" />
          <img className=" w-screen h-full" src={data[currentSlide]} alt="image2" loading="lazy" />
          <img className=" w-screen h-full" src={data[currentSlide]} alt="image3" loading="lazy" />
          <img className=" w-screen h-full" src={data[currentSlide]} alt="image4" loading="lazy" />
        </div>
        <div className=" absolute w-fit left-0 right-0 mx-auto flex gap-8 bottom-44">
          <div onClick={prevSlide} className=" w-14 h-12 border-[1px] border-gray-700 flex items-center justify-center hover:cursor-pointer hover:bg-gray-700 hover:text-white
          active:bg-gray-900 duration-300">
            <GoArrowLeft />
          </div>
          <div onClick={nextSlide} className=" w-14 h-12 border-[1px] border-gray-700 flex items-center justify-center hover:cursor-pointer hover:bg-gray-700 hover:text-white
          active:bg-gray-900 duration-300">
            <GoArrowRight />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner