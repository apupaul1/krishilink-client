import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ICartItem } from "./cart.types";


interface CartState {
  items: ICartItem[];
  checkoutItems: ICartItem[];
}

const initialState: CartState = {
  items: [],
  checkoutItems: [],
};

// interface AddToCartPayload {
//   product: Omit<ICartItem, "quantity">;
//   quantity: number;
// }

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ICartItem>) => {
      const newItem = action.payload;

      const existingItem = state.items.find(
        (item) => item.productId === newItem.productId,
      );

      if (existingItem) {
        existingItem.quantity = Math.min(
          existingItem.quantity + newItem.quantity,
          existingItem.stock,
        );

        existingItem.isSelected = true;

        return;
      }

      state.items.push(newItem);
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload,
      );
    },

    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(
        (item) => item.productId === action.payload,
      );

      if (item && item.quantity < item.stock) {
        item.quantity++;
      }
    },

    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(
        (item) => item.productId === action.payload,
      );

      if (item && item.quantity > 1) {
        item.quantity--;
      }
    },

    toggleSelection: (state, action: PayloadAction<string>) => {
      const item = state.items.find(
        (item) => item.productId === action.payload,
      );

      if (item) {
        item.isSelected = !item.isSelected;
      }
    },

    toggleSelectAll: (state) => {
      const allSelected = state.items.every((item) => item.isSelected);

      state.items.forEach((item) => {
        item.isSelected = !allSelected;
      });
    },

    clearCart: (state) => {
      state.items = [];
    },

    setCheckoutItems: (state, action: PayloadAction<ICartItem[]>) => {
      state.checkoutItems = action.payload;
    },

    clearCheckoutItems: (state) => {
      state.checkoutItems = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  toggleSelection,
  toggleSelectAll,
  clearCart,
  setCheckoutItems,
  clearCheckoutItems,
} = cartSlice.actions;

export default cartSlice.reducer;
