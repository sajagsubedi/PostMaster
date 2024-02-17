import { configureStore } from '@reduxjs/toolkit';
import requestSlice  from "./slices/requestSlice.tsx"
import collectionSlice  from "./slices/collectionSlice.tsx"
import responseSlice  from "./slices/responseSlice.tsx"

const store = configureStore({
  reducer: {
    request:requestSlice,
    response:responseSlice,
    collections:collectionSlice
  },
});

export default store;