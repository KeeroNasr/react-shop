import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Banner from "../components/Banner";
import Products from "../components/products/Products";
import { Product } from "../utils/Product.interface";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([])
  const data = useLoaderData() as Product[]
  useEffect(() => {
    setProducts(data)    
  },[data])
  return (
    <div>
      <Banner />
      <Products products={products} />
    </div>
  ) 
}

export default Home