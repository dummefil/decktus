import {configureStore} from "@reduxjs/toolkit";
import systemSlice from "./system.slice.js";

const store = configureStore({
    reducer: {
        system: systemSlice
    }
})

export default store;
