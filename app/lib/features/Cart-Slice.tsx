import { createSlice } from "@reduxjs/toolkit";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  quantity: number;
}

interface ProductState {
  products: Product[];
}

const storedProducts = localStorage.getItem("cart");
let parsedProducts = [];
if (storedProducts) {
  try {
    parsedProducts = JSON.parse(storedProducts);
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
}

export const cartSlice = createSlice({
  name: "cart",
  initialState: parsedProducts,
  reducers: {
    addToCart: (state, action) => {
      const findProduct = state.find(
        (product: Product) => product.id === action.payload.id
      );
      const productClone = { ...action.payload, quantity: 1 };
      if (findProduct) {
        findProduct.quantity += 1;
      } else {
        state.push(productClone);
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      const productIdToRemove = action.payload.id;
      const updatedState = state.filter(
        (product: Product) => product.id !== productIdToRemove
      );
      localStorage.setItem("cart", JSON.stringify(updatedState));
      return updatedState;
    },
    decrementQuantity: (state, action) => {
      const product = state.find(
        (product: Product) => product.id === action.payload.id
      );
      if (product && product.quantity > 0) {
        product.quantity -= 1;
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
    incrementQuantity: (state, action) => {
      const product = state.find(
        (product: Product) => product.id === action.payload.id
      );
      if (product) {
        product.quantity += 1;
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
    clear: (state: any, action: any) => {
      const clear: any = [];
      localStorage.setItem("cart", JSON.stringify(clear));
      return clear;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clear,
} = cartSlice.actions;
export default cartSlice.reducer;
