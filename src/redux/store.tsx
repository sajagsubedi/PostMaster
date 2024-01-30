import { configureStore } from '@reduxjs/toolkit';
import requestSlice  from "./slices/requestSlice.tsx"
import responseSlice  from "./slices/responseSlice.tsx"

const store = configureStore({
  reducer: {
    request:requestSlice,
    response:responseSlice
  },
});

export default store;