import { configureStore } from '@reduxjs/toolkit';
import requestSlice  from "./slices/requestSlice.tsx"

const store = configureStore({
  reducer: {
    request:requestSlice
  },
});

export default store;