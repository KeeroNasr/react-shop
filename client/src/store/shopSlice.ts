import { createSlice } from "@reduxjs/toolkit";
// import { addItemsToCart } from "../api/Api";
import { Product } from "../utils/Product.interface";
import { User } from "../utils/User.interface";

const initialState: { productData: Product[]; userInfo: User | null } = {
  productData: [],
  userInfo:null
};

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const productItem: Product | undefined = state.productData.find(
        (item: Product) => item._id === action.payload._id
      );
      if (productItem) {
        (productItem as Product).quantity += action.payload.quantity;
        addToCart(state.productData)
      } else {
         (state.productData as Product[]).push(action.payload);
         
        //  addItemsToCart(action.payload);
      }
      
    },
    deleteItem: (state, action) => {
      state.productData = state.productData.filter((item: Product) => {
       return item._id !== action.payload;
      });      
    },
    resetCart: (state) => {
      state.productData = [];
    },
    increamentQuantity: (state, action) => {
      const item = state.productData.find((item: Product) => {
        return item._id === action.payload._id;
      });
      if (item && item.quantity) {
        item.quantity++;
      }
    },
    decreamentQuantity: (state, action) => {
      const item = state.productData.find((item: Product) => {
       return item._id === action.payload._id;
      });
      if (item?.quantity === 1) {
        item.quantity = 1;
      } else if (item?.quantity) {
        item.quantity--;
      }
    },
    addUser: (state, action) => {
      state.userInfo = action.payload
    },
    removeUSer: (state) => {
      state.userInfo = null
    }
  },
});

export const {
  addToCart,
  deleteItem,
  resetCart,
  increamentQuantity,
  decreamentQuantity,
  addUser,removeUSer
} = shopSlice.actions;
export default shopSlice.reducer;
