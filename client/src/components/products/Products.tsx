import { Product } from "../../utils/Product.interface"
import ProductCard from "./ProductCard"

const Products  = (props:{products:Product[]}) => {
    return (
        <div className="py-10">
            <div className="flex flex-col items-center gap-4 justify-center">
                <h1 className="text-white bg-black text-2xl py-2 w-80 text-center">Shopping Everyday</h1>
                <span className=" w-20 h-[3px] bg-black"></span>
                <p className=" text-center max-w-[700px] text-gray-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem debitis laboriosam tenetur architecto saepe quaerat libero, deserunt reiciendis minus vitae dolore aperiam sapiente, adipisci necessitatibus ratione dolorem. Repudiandae, ut nulla!</p>
            </div>
            <div className=" max-w-screen-xl mx-auto py-10 grid grid-cols-4 gap-10">
                {
                    props.products.map((product:Product) => {
                        return <ProductCard key={product._id} product={product}/>
                    })
                }
            </div>
        </div>
    )
}

export default Products