import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    addProduct(state, action) {
      state.products.push(action.payload);
    },
    filterProducts: (state, action) => {
        const { searchString } = action.payload;
        state.products = state.products.filter((product) =>
          product.name.toLowerCase().includes(searchString.toLowerCase())
        );
      },
  },
});

export const { setProducts, addProduct,filterProducts } = productSlice.actions;
export default productSlice.reducer;
