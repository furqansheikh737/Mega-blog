import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlices";

const store = configureStore({
    reducer: {
        auth: authSlice,
    }
})


export default store