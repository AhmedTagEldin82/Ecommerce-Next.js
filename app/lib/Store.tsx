import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./features/Product-Slice";
import { cartSlice } from "./features/Cart-Slice";

export const store: any = configureStore({
  reducer: {
    products: ProductSlice,
    cart: cartSlice.reducer,
  },
});
export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;

export type AppDispatch = AppStore["dispatch"];
