import { Dispatch, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addProduct, getAllProductsInCart, getTotalQuantity, removeProductFromCart, updateProductQuantity } from "../api/Api";
import { Product } from "../utils/Product.interface";
import { User } from "../utils/User.interface";

const initialState: { productsList: Product[]; userInfo: User | null; totalCartQuantity: number; totalPrice:number} = {
  productsList: [],
  userInfo: null,
  totalCartQuantity: 0,
  totalPrice:0
};

export const getTotalQuantityAsync = createAsyncThunk('shop/getTotalQuantity', async () => {
  const totalQuantity = await getTotalQuantity();
  return totalQuantity;
});

export const fetchProductsInCart = () => async (dispatch:Dispatch) => {
  try {
    const data = await getAllProductsInCart();
    dispatch(getProductsInCart(data));
  } catch (error) {
    // Handle error if necessary
    console.error('Error fetching products:', error);
  }
};
export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    getProductsInCart: (state, action) => {
      // Assuming action.payload contains the data
      state.productsList = action.payload;
    },
    updateCart: (state, action) => {
      const productItem: Product | undefined = state.productsList.find(
        (item: Product) => item._id === action.payload._id
      );
      if (productItem) {
        (productItem as Product).quantity += action.payload.quantity;
        addProduct(action.payload)
      } else {
        (state.productsList as Product[]).push(action.payload);
        addProduct(action.payload)
      }
    },
    deleteItem: (state, action) => {
      state.productsList = state.productsList.filter((item: Product) => {
        return item._id !== action.payload;
      });
      removeProductFromCart(action.payload)
    },
    resetCart: (state) => {
      state.productsList = [];
    },
    increamentQuantity: (state, action) => {
      if (state.productsList.length >= 1) {    
        const item = state.productsList.find((item: Product) => {
          return item._id === action.payload;
        });
        if (item && item.quantity) {
          item.quantity++;
        }
      }
      updateProductQuantity(action.payload, 'increament')
    },
    decreamentQuantity: (state, action) => {
      const item = state.productsList.find((item: Product) => {
        return item._id === action.payload._id;
      });
      if (item?.quantity === 1) {
        item.quantity = 1;
        removeProductFromCart(item._id);
      } else if (item?.quantity) {
        item.quantity = action.payload.quantity;
        getAllProductsInCart()
      }
      updateProductQuantity(action.payload, 'decreament');
    },

    updateTotalPrice: (state) =>{
      const totalPrice = state.productsList.reduce((acc, product) => {
        const quantity = product.quantity || 0;
        const price = product.price || 0;
        return acc + (quantity * price);
      }, 0);
    
      // Return a new state object
      return {
        ...state,
        totalPrice: totalPrice,
      };
    
    },

    addUser: (state, action) => {
      state.userInfo = action.payload
    },
    removeUSer: (state) => {
      state.userInfo = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTotalQuantityAsync.fulfilled, (state, action) => {
        state.totalCartQuantity = action.payload;
      });
  },
});

export const {
  getProductsInCart,
  updateCart,
  deleteItem,
  resetCart,
  increamentQuantity,
  decreamentQuantity,
  updateTotalPrice,
  addUser, removeUSer
} = shopSlice.actions;
export default shopSlice.reducer;
